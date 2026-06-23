import type { EditorState } from "@codemirror/state";
import { syntaxTree } from "@codemirror/language";
import type { SyntaxNode } from "@lezer/common";
import type { JsonEditorSchema, JsonSchemaType } from "../JsonEditor.types";

export type JsonSchemaValidationError = {
  /** JSON path of the offending value, e.g. "$.users[0].age" */
  path:    string;
  message: string;
};

// Array children in the Lezer JSON tree include literal `[`, `,`, `]` tokens
// alongside the actual value nodes — only these names represent real values.
const VALUE_NODE_NAMES = new Set(["Object", "Array", "String", "Number", "True", "False", "Null"]);

const IDENTIFIER_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function formatKey(key: string): string {
  return IDENTIFIER_RE.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`;
}

function typeOf(value: unknown): JsonSchemaType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
  if (typeof value === "string") return "string";
  if (typeof value === "boolean") return "boolean";
  return "object";
}

function matchesType(value: unknown, expected: JsonSchemaType): boolean {
  const actual = typeOf(value);
  if (actual === expected) return true;
  // A whole number also satisfies a "number" schema.
  if (expected === "number" && actual === "integer") return true;
  return false;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a as Record<string, unknown>);
    const bKeys = Object.keys(b as Record<string, unknown>);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
  }
  return false;
}

/**
 * Validates a parsed JSON value against a focused JSON Schema subset (type,
 * required, enum, nested properties/items). Returns one error per violation,
 * each tagged with the JSON path of the offending value.
 */
export function validateAgainstSchema(
  value: unknown,
  schema: JsonEditorSchema,
  path = "$",
): JsonSchemaValidationError[] {
  const errors: JsonSchemaValidationError[] = [];

  if (schema.type) {
    const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!expectedTypes.some((t) => matchesType(value, t))) {
      errors.push({ path, message: `Expected type ${expectedTypes.join(" | ")}, got ${typeOf(value)}.` });
      return errors; // a type mismatch makes deeper structural checks meaningless
    }
  }

  if (schema.enum && !schema.enum.some((allowed) => deepEqual(allowed, value))) {
    errors.push({
      path,
      message: `Value must be one of: ${schema.enum.map((v) => JSON.stringify(v)).join(", ")}.`,
    });
  }

  if (typeOf(value) === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    for (const key of schema.required ?? []) {
      if (!(key in obj)) {
        // The missing key has no source range of its own — point at the
        // enclosing object, which does exist in the document.
        errors.push({ path, message: `Missing required property "${key}".` });
      }
    }
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in obj) {
          errors.push(...validateAgainstSchema(obj[key], propSchema, `${path}${formatKey(key)}`));
        }
      }
    }
  }

  if (schema.items && Array.isArray(value)) {
    value.forEach((item, index) => {
      errors.push(...validateAgainstSchema(item, schema.items!, `${path}[${index}]`));
    });
  }

  return errors;
}

type PathSegment = { type: "key"; value: string } | { type: "index"; value: number };

const PATH_SEGMENT_RE = /\.([A-Za-z_$][A-Za-z0-9_$]*)|\[(\d+)\]|\["((?:[^"\\]|\\.)*)"\]/g;

function parsePath(path: string): PathSegment[] {
  const segments: PathSegment[] = [];
  for (const match of path.matchAll(PATH_SEGMENT_RE)) {
    if (match[1] !== undefined) segments.push({ type: "key", value: match[1] });
    else if (match[2] !== undefined) segments.push({ type: "index", value: Number(match[2]) });
    else if (match[3] !== undefined) segments.push({ type: "key", value: JSON.parse(`"${match[3]}"`) });
  }
  return segments;
}

/** Unwraps the synthetic JsonText root node to the actual top-level value node. */
function topValueNode(tree: { topNode: SyntaxNode }): SyntaxNode | null {
  let node = tree.topNode;
  while (node && !VALUE_NODE_NAMES.has(node.name)) {
    const child = node.firstChild;
    if (!child) return null;
    node = child;
  }
  return node;
}

/**
 * Resolves a JSON path (as produced by `validateAgainstSchema`) to its
 * source range in the document, by walking the syntax tree down from the
 * root. Returns null if the path can't be resolved (e.g. document changed).
 */
export function findRangeForPath(state: EditorState, path: string): { from: number; to: number } | null {
  const tree = syntaxTree(state);
  let node = topValueNode(tree);
  if (!node) return null;

  for (const segment of parsePath(path)) {
    if (segment.type === "key") {
      if (node.name !== "Object") return null;
      let match: SyntaxNode | null = null;
      for (let child: SyntaxNode | null = node.firstChild; child; child = child.nextSibling) {
        if (child.name !== "Property") continue;
        const propName = child.getChild("PropertyName");
        if (!propName) continue;
        try {
          if (JSON.parse(state.sliceDoc(propName.from, propName.to)) === segment.value) {
            match = child.lastChild;
            break;
          }
        } catch {
          // malformed property name — skip
        }
      }
      if (!match) return null;
      node = match;
    } else {
      if (node.name !== "Array") return null;
      let index = 0;
      let match: SyntaxNode | null = null;
      for (let child: SyntaxNode | null = node.firstChild; child; child = child.nextSibling) {
        if (!VALUE_NODE_NAMES.has(child.name)) continue;
        if (index === segment.value) { match = child; break; }
        index++;
      }
      if (!match) return null;
      node = match;
    }
  }

  return { from: node.from, to: node.to };
}

import type { EditorState } from "@codemirror/state";
import { syntaxTree } from "@codemirror/language";

const IDENTIFIER_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// Array children in the Lezer JSON tree include literal `[`, `,`, `]` tokens
// alongside the actual value nodes — only these names represent real values.
const VALUE_NODE_NAMES = new Set(["Object", "Array", "String", "Number", "True", "False", "Null"]);

function formatKey(key: string): string {
  return IDENTIFIER_RE.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`;
}

/**
 * Walks up the Lezer JSON syntax tree from `pos` to compute the JSON path
 * (e.g. "$.users[0].name") of the value or property key under the cursor.
 *
 * Returns "$" for the document root, or null if `pos` doesn't resolve to any
 * node (e.g. an empty document).
 */
export function computeJsonPath(state: EditorState, pos: number): string | null {
  if (state.doc.length === 0) return null;

  const tree = syntaxTree(state);
  let current = tree.resolveInner(pos, 1);
  if (!current) return null;

  const segments: string[] = [];

  while (current) {
    const parent = current.parent;
    if (!parent) break;

    if (parent.name === "Property") {
      const propName = parent.getChild("PropertyName");
      if (propName) {
        const raw = state.sliceDoc(propName.from, propName.to);
        try {
          segments.unshift(formatKey(JSON.parse(raw)));
        } catch {
          // Malformed property name (e.g. while typing) — skip this segment.
        }
      }
      current = parent.parent ?? parent;
      continue;
    }

    if (parent.name === "Array") {
      let index = 0;
      let sibling = parent.firstChild;
      while (sibling && sibling.from < current.from) {
        if (VALUE_NODE_NAMES.has(sibling.name)) index++;
        sibling = sibling.nextSibling;
      }
      segments.unshift(`[${index}]`);
      current = parent;
      continue;
    }

    current = parent;
  }

  return segments.length > 0 ? `$${segments.join("")}` : "$";
}

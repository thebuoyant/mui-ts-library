import { describe, expect, it } from "vitest";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import { validateAgainstSchema, findRangeForPath } from "./jsonSchemaValidator";
import type { JsonEditorSchema } from "../JsonEditor.types";

function stateFor(doc: string): EditorState {
  return EditorState.create({ doc, extensions: [json()] });
}

describe("validateAgainstSchema", () => {
  it("returns no errors when the value matches the schema", () => {
    const schema: JsonEditorSchema = { type: "object", required: ["name"], properties: { name: { type: "string" } } };
    expect(validateAgainstSchema({ name: "Alice" }, schema)).toEqual([]);
  });

  it("reports a type mismatch at the root", () => {
    const schema: JsonEditorSchema = { type: "object" };
    const errors = validateAgainstSchema([1, 2], schema);
    expect(errors).toHaveLength(1);
    expect(errors[0].path).toBe("$");
    expect(errors[0].message).toMatch(/Expected type object, got array/);
  });

  it("accepts an integer where 'number' is expected", () => {
    const schema: JsonEditorSchema = { type: "number" };
    expect(validateAgainstSchema(42, schema)).toEqual([]);
  });

  it("accepts multiple allowed types", () => {
    const schema: JsonEditorSchema = { type: ["string", "null"] };
    expect(validateAgainstSchema(null, schema)).toEqual([]);
    expect(validateAgainstSchema("x", schema)).toEqual([]);
    expect(validateAgainstSchema(1, schema)).toHaveLength(1);
  });

  it("reports missing required properties, pointing at the enclosing object", () => {
    const schema: JsonEditorSchema = { type: "object", required: ["name", "age"] };
    const errors = validateAgainstSchema({ name: "Alice" }, schema);
    expect(errors).toEqual([{ path: "$", message: 'Missing required property "age".' }]);
  });

  it("validates nested properties recursively", () => {
    const schema: JsonEditorSchema = {
      type: "object",
      properties: { address: { type: "object", required: ["city"] } },
    };
    const errors = validateAgainstSchema({ address: {} }, schema);
    expect(errors).toEqual([{ path: "$.address", message: 'Missing required property "city".' }]);
  });

  it("validates array items against the items schema", () => {
    const schema: JsonEditorSchema = { type: "array", items: { type: "number" } };
    const errors = validateAgainstSchema([1, "two", 3], schema);
    expect(errors).toEqual([{ path: "$[1]", message: "Expected type number, got string." }]);
  });

  it("reports an enum violation", () => {
    const schema: JsonEditorSchema = { enum: ["active", "inactive"] };
    const errors = validateAgainstSchema("pending", schema);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toMatch(/Value must be one of/);
  });

  it("accepts a value present in the enum, including objects by deep equality", () => {
    const schema: JsonEditorSchema = { enum: [{ a: 1 }, { a: 2 }] };
    expect(validateAgainstSchema({ a: 2 }, schema)).toEqual([]);
  });

  it("uses bracket-quoted paths for keys that aren't valid identifiers", () => {
    const schema: JsonEditorSchema = {
      type: "object",
      properties: { "weird key": { type: "number" } },
    };
    const errors = validateAgainstSchema({ "weird key": "not a number" }, schema);
    expect(errors[0].path).toBe('$["weird key"]');
  });
});

describe("findRangeForPath", () => {
  const DOC = `{
  "name": "Alice",
  "address": { "city": "Berlin" },
  "tags": ["a", "b"],
  "items": [{ "id": 1 }, { "id": 2 }]
}`;

  it("resolves a top-level property path", () => {
    const state = stateFor(DOC);
    const range = findRangeForPath(state, "$.name")!;
    expect(state.sliceDoc(range.from, range.to)).toBe('"Alice"');
  });

  it("resolves a nested property path", () => {
    const state = stateFor(DOC);
    const range = findRangeForPath(state, "$.address.city")!;
    expect(state.sliceDoc(range.from, range.to)).toBe('"Berlin"');
  });

  it("resolves an array index path", () => {
    const state = stateFor(DOC);
    const range = findRangeForPath(state, "$.tags[1]")!;
    expect(state.sliceDoc(range.from, range.to)).toBe('"b"');
  });

  it("resolves a property nested inside an array element", () => {
    const state = stateFor(DOC);
    const range = findRangeForPath(state, "$.items[1].id")!;
    expect(state.sliceDoc(range.from, range.to)).toBe("2");
  });

  it("resolves the root path to the whole document value", () => {
    const state = stateFor(DOC);
    const range = findRangeForPath(state, "$")!;
    expect(range.from).toBe(0);
    expect(range.to).toBe(DOC.length);
  });

  it("returns null for a path that doesn't exist in the document", () => {
    const state = stateFor(DOC);
    expect(findRangeForPath(state, "$.doesNotExist")).toBeNull();
  });

  it("returns null for an out-of-bounds array index", () => {
    const state = stateFor(DOC);
    expect(findRangeForPath(state, "$.tags[5]")).toBeNull();
  });
});

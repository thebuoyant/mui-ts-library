import { describe, expect, it } from "vitest";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import { computeJsonPath } from "./jsonPathFinder";

function stateFor(doc: string): EditorState {
  return EditorState.create({ doc, extensions: [json()] });
}

/** Position of the first character inside the given substring's quotes/token. */
function posInside(doc: string, search: string): number {
  const idx = doc.indexOf(search);
  if (idx === -1) throw new Error(`"${search}" not found in fixture`);
  return idx + Math.ceil(search.length / 2);
}

const DOC = `{
  "name": "Alice",
  "age": 30,
  "address": {
    "city": "Berlin"
  },
  "tags": ["a", "b", "c"],
  "items": [
    { "id": 1 },
    { "id": 2 }
  ],
  "weird key": true,
  "123": false
}`;

describe("computeJsonPath", () => {
  it("returns the path of a top-level string value", () => {
    const state = stateFor(DOC);
    expect(computeJsonPath(state, posInside(DOC, '"Alice"'))).toBe("$.name");
  });

  it("returns the path of a top-level number value", () => {
    const state = stateFor(DOC);
    expect(computeJsonPath(state, posInside(DOC, "30"))).toBe("$.age");
  });

  it("returns the path of a nested object value", () => {
    const state = stateFor(DOC);
    expect(computeJsonPath(state, posInside(DOC, '"Berlin"'))).toBe("$.address.city");
  });

  it("returns the path of array elements by index", () => {
    const state = stateFor(DOC);
    expect(computeJsonPath(state, posInside(DOC, '"a"'))).toBe("$.tags[0]");
    expect(computeJsonPath(state, posInside(DOC, '"b"'))).toBe("$.tags[1]");
    expect(computeJsonPath(state, posInside(DOC, '"c"'))).toBe("$.tags[2]");
  });

  it("returns the path of a property inside an object nested in an array", () => {
    const state = stateFor(DOC);
    const firstIdPos = DOC.indexOf("1 }") ;
    const secondIdPos = DOC.indexOf("2 }");
    expect(computeJsonPath(state, firstIdPos)).toBe("$.items[0].id");
    expect(computeJsonPath(state, secondIdPos)).toBe("$.items[1].id");
  });

  it("returns the same path whether clicking the key or the value", () => {
    const state = stateFor(DOC);
    const keyPos   = posInside(DOC, '"name"');
    const valuePos = posInside(DOC, '"Alice"');
    expect(computeJsonPath(state, keyPos)).toBe(computeJsonPath(state, valuePos));
  });

  it("uses bracket notation for keys that aren't valid identifiers", () => {
    const state = stateFor(DOC);
    expect(computeJsonPath(state, posInside(DOC, "true"))).toBe('$["weird key"]');
    expect(computeJsonPath(state, posInside(DOC, "false"))).toBe('$["123"]');
  });

  it("returns '$' for the document root", () => {
    const state = stateFor(`{"a": 1}`);
    expect(computeJsonPath(state, 0)).toBe("$");
  });

  it("returns a path for a top-level scalar document", () => {
    const state = stateFor(`"hello"`);
    expect(computeJsonPath(state, 3)).toBe("$");
  });

  it("returns null for an empty document", () => {
    const state = stateFor("");
    expect(computeJsonPath(state, 0)).toBeNull();
  });
});

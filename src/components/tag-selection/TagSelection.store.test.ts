import { describe, expect, it } from "vitest";
import { createTagSelectionStore } from "./TagSelection.store";
import type { TagSelectionItem } from "./TagSelection.types";

const initialTags: TagSelectionItem[] = [
  { id: "1", label: "React" },
  { id: "2", label: "TypeScript", disabled: true },
  { id: "3", label: "MUI", selected: true },
];

describe("createTagSelectionStore", () => {
  it("Should create the initial state", () => {
    const store = createTagSelectionStore(initialTags);

    expect(store.getState()).toMatchObject({
      tags: initialTags,
      searchValue: "",
    });
  });

  it("Should update tags and search value", () => {
    const store = createTagSelectionStore(initialTags);

    store.getState().setTags([{ id: "9", label: "Vitest" }]);
    store.getState().setSearchValue("vit");

    expect(store.getState().tags).toEqual([{ id: "9", label: "Vitest" }]);
    expect(store.getState().searchValue).toBe("vit");
  });

  it("Should select a non-disabled tag and clear the current search", () => {
    const store = createTagSelectionStore(initialTags);

    store.getState().setSearchValue("rea");
    store.getState().selectTag("1");

    expect(store.getState().tags.find((tag) => tag.id === "1")?.selected).toBe(
      true,
    );
    expect(store.getState().searchValue).toBe("");
  });

  it("Should not select a disabled tag", () => {
    const store = createTagSelectionStore(initialTags);

    store.getState().selectTag("2");

    expect(
      store.getState().tags.find((tag) => tag.id === "2")?.selected,
    ).not.toBe(true);
  });

  it("Should delete a selected tag by resetting its selected flag", () => {
    const store = createTagSelectionStore(initialTags);

    store.getState().deleteTag("3");

    expect(store.getState().tags.find((tag) => tag.id === "3")?.selected).toBe(
      false,
    );
  });

  it("Should add a new tag as selected and clear the search value", () => {
    const store = createTagSelectionStore(initialTags);

    store.getState().setSearchValue("Vue");
    store.getState().addTag({ id: "vue", label: "Vue" });

    const added = store.getState().tags.find((tag) => tag.id === "vue");
    expect(added).toBeDefined();
    expect(added?.selected).toBe(true);
    expect(store.getState().searchValue).toBe("");
  });
});

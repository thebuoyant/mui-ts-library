import { createStore } from "zustand/vanilla";
import type { TagSelectionItem } from "./TagSelection.types";

export type TagSelectionStoreState = {
  tags: TagSelectionItem[];
  searchValue: string;

  setTags: (tags: TagSelectionItem[]) => void;
  setSearchValue: (searchValue: string) => void;
  selectTag: (tagId: string) => void;
  deleteTag: (tagId: string) => void;
  addTag: (tag: TagSelectionItem) => void;
};

export type TagSelectionStore = ReturnType<typeof createTagSelectionStore>;

export function createTagSelectionStore(initialTags: TagSelectionItem[]) {
  return createStore<TagSelectionStoreState>((set) => ({
    tags: initialTags,
    searchValue: "",

    setTags: (tags) => {
      set({ tags });
    },

    setSearchValue: (searchValue) => {
      set({ searchValue });
    },

    selectTag: (tagId) => {
      set((state) => ({
        tags: state.tags.map((tag) =>
          tag.id === tagId && !tag.disabled ? { ...tag, selected: true } : tag,
        ),
        // Suchfeld nach Auswahl leeren, damit der Nutzer direkt weitersuchen kann.
        searchValue: "",
      }));
    },

    deleteTag: (tagId) => {
      set((state) => ({
        tags: state.tags.map((tag) =>
          tag.id === tagId ? { ...tag, selected: false } : tag,
        ),
      }));
    },

    addTag: (tag) => {
      set((state) => ({
        tags: [...state.tags, { ...tag, selected: true }],
        searchValue: "",
      }));
    },
  }));
}

import { createStore } from "zustand/vanilla";
import type { TagSelectionItem } from "./TagSelection.types";

export type TagSelectionStoreState = {
  tags: TagSelectionItem[];
  searchValue: string;
  // Für zukünftiges "Alle Tags"-Panel – noch nicht über die UI zugänglich.
  detailsExpanded: boolean;

  setTags: (tags: TagSelectionItem[]) => void;
  setSearchValue: (searchValue: string) => void;
  setDetailsExpanded: (expanded: boolean) => void;
  selectTag: (tagId: string) => void;
  deleteTag: (tagId: string) => void;
  addTag: (tag: TagSelectionItem) => void;
};

export type TagSelectionStore = ReturnType<typeof createTagSelectionStore>;

export function createTagSelectionStore(initialTags: TagSelectionItem[]) {
  return createStore<TagSelectionStoreState>((set) => ({
    tags: initialTags,
    searchValue: "",
    detailsExpanded: false,

    setTags: (tags) => {
      set({ tags });
    },

    setSearchValue: (searchValue) => {
      set({ searchValue });
    },

    setDetailsExpanded: (detailsExpanded) => {
      set({ detailsExpanded });
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

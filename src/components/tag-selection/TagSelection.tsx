import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useStore } from "zustand";
import "./TagSelection.css";
import {
  createTagSelectionStore,
  type TagSelectionStore,
} from "./TagSelection.store";
import { TagSelectionAutocomplete } from "./TagSelectionAutocomplete";
import { TagSelectionSelectedTags } from "./TagSelectionSelectedTags";
import type {
  TagSelectionItem,
  TagSelectionProps,
  TagSelectionTranslation,
} from "./TagSelection.types";

const defaultTranslation: TagSelectionTranslation = {
  selectedTagsLabel: "Selected tags",
  autoCompleteLabel: "Search and add tags",
  detailsLabel: "All tags",
  noSelectedTagsText: "No tags selected.",
  noAvailableTagsText: "No tags available.",
  placeholder: "Type to search...",
};

const TagSelectionStoreContext = createContext<TagSelectionStore | null>(null);

function useTagSelectionStore<T>(
  selector: (state: ReturnType<TagSelectionStore["getState"]>) => T,
) {
  const store = useContext(TagSelectionStoreContext);

  if (!store) {
    throw new Error("TagSelectionStoreContext is missing.");
  }

  return useStore(store, selector);
}

// onDetailsToggle wird erst in einer zukünftigen Version implementiert.
// translation ist hier nicht optional, da der äußere Wrapper den Default bereits auflöst.
type TagSelectionInnerProps = Omit<
  TagSelectionProps,
  "translation" | "onDetailsToggle"
> & {
  translation: TagSelectionTranslation;
};

function TagSelectionInner({
  tags,
  showSelectedTags = true,
  showSelectedTagsLabel = true,
  showAutoComplete = true,
  showStartIcon = true,
  showDeleteIcon = true,
  inputSize = "medium",
  chipSize = "medium",
  translation,
  onTagSelect,
  onTagDelete,
  onTagsChange,
  onSearchChange,
}: TagSelectionInnerProps) {
  const storeTags = useTagSelectionStore((state) => state.tags);
  const searchValue = useTagSelectionStore((state) => state.searchValue);
  const setTags = useTagSelectionStore((state) => state.setTags);
  const setSearchValue = useTagSelectionStore((state) => state.setSearchValue);
  const selectTag = useTagSelectionStore((state) => state.selectTag);
  const deleteTag = useTagSelectionStore((state) => state.deleteTag);

  useEffect(() => {
    setTags(tags);
  }, [tags, setTags]);

  const selectedTags = useMemo(
    () => storeTags.filter((tag) => tag.selected),
    [storeTags],
  );

  const availableTags = useMemo(
    () => storeTags.filter((tag) => !tag.selected && !tag.disabled),
    [storeTags],
  );

  const emitTagsChange = (nextTags: TagSelectionItem[]) => {
    if (onTagsChange) {
      onTagsChange(
        nextTags.filter((tag) => tag.selected),
        nextTags,
      );
    }
  };

  const handleTagSelect = (tag: TagSelectionItem) => {
    if (tag.disabled || tag.selected) {
      return;
    }

    selectTag(tag.id);

    // Den nächsten Zustand manuell berechnen: selectTag aktualisiert den Store
    // asynchron, aber die Callbacks müssen sofort mit korrekten Werten aufgerufen werden.
    const nextTags = storeTags.map((currentTag) =>
      currentTag.id === tag.id ? { ...currentTag, selected: true } : currentTag,
    );

    const nextSelectedTags = nextTags.filter(
      (currentTag) => currentTag.selected,
    );
    const selectedTag = nextTags.find((currentTag) => currentTag.id === tag.id);

    if (selectedTag && onTagSelect) {
      onTagSelect(selectedTag, nextSelectedTags, nextTags);
    }

    emitTagsChange(nextTags);
  };

  const handleTagDelete = (tag: TagSelectionItem) => {
    deleteTag(tag.id);

    // Gleiche Strategie wie handleTagSelect: asynchronen Store-Update vorausberechnen.
    const nextTags = storeTags.map((currentTag) =>
      currentTag.id === tag.id
        ? { ...currentTag, selected: false }
        : currentTag,
    );

    const nextSelectedTags = nextTags.filter(
      (currentTag) => currentTag.selected,
    );
    const deletedTag = nextTags.find((currentTag) => currentTag.id === tag.id);

    if (deletedTag && onTagDelete) {
      onTagDelete(deletedTag, nextSelectedTags, nextTags);
    }

    emitTagsChange(nextTags);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <Box className="tag-selection-root">
      <Stack>
        {showSelectedTags && (
          <TagSelectionSelectedTags
            selectedTags={selectedTags}
            translation={translation}
            onTagDelete={handleTagDelete}
            showStartIcon={showStartIcon}
            showDeleteIcon={showDeleteIcon}
            showSelectedTagsLabel={showSelectedTagsLabel}
            chipSize={chipSize}
          />
        )}

        {showAutoComplete && (
          <TagSelectionAutocomplete
            availableTags={availableTags}
            searchValue={searchValue}
            translation={translation}
            onSearchChange={handleSearchChange}
            onTagSelect={handleTagSelect}
            showStartIcon={showStartIcon}
            inputSize={inputSize}
            chipSize={chipSize}
          />
        )}
      </Stack>
    </Box>
  );
}

export function TagSelection({
  tags,
  showSelectedTags = true,
  showSelectedTagsLabel = true,
  showAutoComplete = true,
  showStartIcon = true,
  showDeleteIcon = true,
  translation = defaultTranslation,
  inputSize = "medium",
  chipSize = "medium",
  onTagSelect,
  onTagDelete,
  onTagsChange,
  onSearchChange,
  onDetailsToggle,
}: TagSelectionProps) {
  const [store] = useState(() => createTagSelectionStore(tags));

  return (
    <TagSelectionStoreContext.Provider value={store}>
      <TagSelectionInner
        tags={tags}
        showSelectedTags={showSelectedTags}
        showSelectedTagsLabel={showSelectedTagsLabel}
        showAutoComplete={showAutoComplete}
        showStartIcon={showStartIcon}
        showDeleteIcon={showDeleteIcon}
        translation={translation}
        onTagSelect={onTagSelect}
        onTagDelete={onTagDelete}
        onTagsChange={onTagsChange}
        onSearchChange={onSearchChange}
        inputSize={inputSize}
        chipSize={chipSize}
      />
    </TagSelectionStoreContext.Provider>
  );
}

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useStore } from "zustand";
import "./TagSelection.css";
import {
  createTagSelectionStore,
  type TagSelectionStore,
} from "./TagSelection.store";
import { TagSelectionAutocomplete } from "./TagSelectionAutocomplete";
import { TagSelectionDetails } from "./TagSelectionDetails";
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
  selectedGroupLabel: "Selected",
  availableGroupLabel: "Available",
  disabledGroupLabel: "Disabled",
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

type TagSelectionInnerProps = Omit<TagSelectionProps, "translation"> & {
  translation: TagSelectionTranslation;
};

function TagSelectionInner({
  tags,
  showSelectedTags = true,
  showSelectedTagsLabel = true,
  showAutoComplete = true,
  showDetails = true,
  showStartIcon = true,
  showDeleteIcon = true,
  translation,
  onTagSelect,
  onTagDelete,
  onTagsChange,
  onSearchChange,
  onDetailsToggle,
}: TagSelectionInnerProps) {
  const storeTags = useTagSelectionStore((state) => state.tags);
  const searchValue = useTagSelectionStore((state) => state.searchValue);
  const detailsExpanded = useTagSelectionStore(
    (state) => state.detailsExpanded,
  );

  const setTags = useTagSelectionStore((state) => state.setTags);
  const setSearchValue = useTagSelectionStore((state) => state.setSearchValue);
  const setDetailsExpanded = useTagSelectionStore(
    (state) => state.setDetailsExpanded,
  );
  const selectTag = useTagSelectionStore((state) => state.selectTag);
  const deleteTag = useTagSelectionStore((state) => state.deleteTag);

  useEffect(() => {
    setTags(tags);
  }, [tags, setTags]);

  const selectedTags = useMemo(
    () => storeTags.filter((tag) => tag.selected),
    [storeTags],
  );

  const disabledTags = useMemo(
    () => storeTags.filter((tag) => tag.disabled),
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

  const handleDetailsToggle = (expanded: boolean) => {
    setDetailsExpanded(expanded);

    if (onDetailsToggle) {
      onDetailsToggle(expanded);
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
          />
        )}

        {showDetails && (
          <TagSelectionDetails
            selectedTags={selectedTags}
            availableTags={availableTags}
            disabledTags={disabledTags}
            translation={translation}
            expanded={detailsExpanded}
            onToggle={handleDetailsToggle}
            onTagDelete={handleTagDelete}
            onTagSelect={handleTagSelect}
            showStartIcon={showStartIcon}
            showDeleteIcon={showDeleteIcon}
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
  showDetails = true,
  showStartIcon = true,
  showDeleteIcon = true,
  translation = defaultTranslation,
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
        showDetails={showDetails}
        showStartIcon={showStartIcon}
        showDeleteIcon={showDeleteIcon}
        translation={translation}
        onTagSelect={onTagSelect}
        onTagDelete={onTagDelete}
        onTagsChange={onTagsChange}
        onSearchChange={onSearchChange}
        onDetailsToggle={onDetailsToggle}
      />
    </TagSelectionStoreContext.Provider>
  );
}

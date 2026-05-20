import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useStore } from "zustand";
import {
  createTagSelectionStore,
  type TagSelectionStore,
} from "./TagSelection.store";
import { TagSelectionAutocomplete } from "./TagSelectionAutocomplete";
import { TagSelectionSelectedTags } from "./TagSelectionSelectedTags";
import type {
  TagColor,
  TagSelectionItem,
  TagSelectionProps,
  TagSelectionTranslation,
} from "./TagSelection.types";
import { DEFAULT_TAG_SELECTION_TRANSLATION } from "./TagSelection.types";

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

// translation ist hier nicht optional, da der äußere Wrapper den Default bereits auflöst.
type TagSelectionInnerProps = Omit<TagSelectionProps, "translation"> & {
  translation: TagSelectionTranslation;
};

function TagSelectionInner({
  tags,
  showSelectedTags = true,
  showSelectedTagsLabel = true,
  showAutoComplete = true,
  inputSize = "medium",
  chipSize = "medium",
  disabled = false,
  loading = false,
  maxTags,
  allowCreate = false,
  maxVisibleChips,
  popoverPlacement = "bottom",
  listboxMaxHeight,
  translation,
  onTagSelect,
  onTagDelete,
  onTagsChange,
  onSearchChange,
  onTagCreate,
}: TagSelectionInnerProps) {
  const storeTags = useTagSelectionStore((state) => state.tags);
  const searchValue = useTagSelectionStore((state) => state.searchValue);
  const setTags = useTagSelectionStore((state) => state.setTags);
  const setSearchValue = useTagSelectionStore((state) => state.setSearchValue);
  const selectTag = useTagSelectionStore((state) => state.selectTag);
  const deleteTag = useTagSelectionStore((state) => state.deleteTag);
  const addTag = useTagSelectionStore((state) => state.addTag);

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

  const isMaxReached = maxTags !== undefined && selectedTags.length >= maxTags;

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

  const handleTagCreate = (label: string, color: TagColor) => {
    const newTag: TagSelectionItem = {
      id: label.toLowerCase().replace(/\s+/g, "-"),
      label,
      color,
      selected: true,
    };

    addTag(newTag);

    const nextTags = [...storeTags, newTag];
    const nextSelectedTags = nextTags.filter((t) => t.selected);

    if (onTagSelect) {
      onTagSelect(newTag, nextSelectedTags, nextTags);
    }

    emitTagsChange(nextTags);

    if (onTagCreate) {
      onTagCreate(label, color);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        {showSelectedTags && (
          <TagSelectionSelectedTags
            selectedTags={selectedTags}
            translation={translation}
            onTagDelete={handleTagDelete}
            showSelectedTagsLabel={showSelectedTagsLabel}
            chipSize={chipSize}
            disabled={disabled}
            maxVisibleChips={maxVisibleChips}
            popoverPlacement={popoverPlacement}
          />
        )}

        {showAutoComplete && (
          <TagSelectionAutocomplete
            availableTags={availableTags}
            searchValue={searchValue}
            translation={translation}
            onSearchChange={handleSearchChange}
            onTagSelect={handleTagSelect}
            onTagCreate={handleTagCreate}
            inputSize={inputSize}
            chipSize={chipSize}
            disabled={disabled}
            loading={loading}
            isMaxReached={isMaxReached}
            allowCreate={allowCreate}
            listboxMaxHeight={listboxMaxHeight}
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
  translation,
  inputSize = "medium",
  chipSize = "medium",
  disabled = false,
  loading = false,
  maxTags,
  allowCreate = false,
  maxVisibleChips,
  popoverPlacement = "bottom",
  listboxMaxHeight,
  onTagSelect,
  onTagDelete,
  onTagsChange,
  onSearchChange,
  onTagCreate,
}: TagSelectionProps) {
  const t: TagSelectionTranslation = { ...DEFAULT_TAG_SELECTION_TRANSLATION, ...translation };
  const [store] = useState(() => createTagSelectionStore(tags));

  return (
    <TagSelectionStoreContext.Provider value={store}>
      <TagSelectionInner
        tags={tags}
        showSelectedTags={showSelectedTags}
        showSelectedTagsLabel={showSelectedTagsLabel}
        showAutoComplete={showAutoComplete}
        translation={t}
        inputSize={inputSize}
        chipSize={chipSize}
        disabled={disabled}
        loading={loading}
        maxTags={maxTags}
        allowCreate={allowCreate}
        maxVisibleChips={maxVisibleChips}
        popoverPlacement={popoverPlacement}
        listboxMaxHeight={listboxMaxHeight}
        onTagSelect={onTagSelect}
        onTagDelete={onTagDelete}
        onTagsChange={onTagsChange}
        onSearchChange={onSearchChange}
        onTagCreate={onTagCreate}
      />
    </TagSelectionStoreContext.Provider>
  );
}

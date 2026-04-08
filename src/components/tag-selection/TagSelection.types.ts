import type { ReactElement } from "react";

export type TagSelectionItem = {
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  foregroundColor?: string;
  backgroundColor?: string;
  startIcon?: ReactElement;
  deleteIcon?: ReactElement;
};

export type TagSelectionTranslation = {
  selectedTagsLabel: string;
  autoCompleteLabel: string;
  detailsLabel: string;
  selectedGroupLabel: string;
  availableGroupLabel: string;
  disabledGroupLabel: string;
  noSelectedTagsText: string;
  noAvailableTagsText: string;
  placeholder: string;
};

export type TagSelectionProps = {
  tags: TagSelectionItem[];

  showSelectedTags?: boolean;
  showAutoComplete?: boolean;
  showDetails?: boolean;

  translation?: TagSelectionTranslation;

  /**
   * Wird aufgerufen, wenn ein Tag selektiert wurde.
   */
  onTagSelect?: (
    tag: TagSelectionItem,
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;

  /**
   * Wird aufgerufen, wenn ein selektiertes Tag per Delete/X wieder entfernt wurde.
   */
  onTagDelete?: (
    tag: TagSelectionItem,
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;

  /**
   * Zentraler Callback für jede Änderung der Tag-Liste.
   */
  onTagsChange?: (
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;

  /**
   * Optional: wenn sich der Autocomplete-Text ändert.
   */
  onSearchChange?: (searchValue: string) => void;

  /**
   * Optional: wenn das Accordion geöffnet/geschlossen wird.
   */
  onDetailsToggle?: (expanded: boolean) => void;
};

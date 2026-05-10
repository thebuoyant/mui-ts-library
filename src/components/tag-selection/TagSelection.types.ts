import type { ReactElement } from "react";

export type TagSelectionItem = {
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
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
  // detailsLabel: reserviert für das noch nicht implementierte "Alle Tags"-Panel.
  detailsLabel: string;
  noSelectedTagsText: string;
  noAvailableTagsText: string;
  placeholder: string;
};

export type TagSelectionProps = {
  tags: TagSelectionItem[];
  showSelectedTags?: boolean;
  showSelectedTagsLabel?: boolean;
  showAutoComplete?: boolean;
  showStartIcon?: boolean;
  showDeleteIcon?: boolean;
  translation?: TagSelectionTranslation;
  inputSize?: "small" | "medium";
  chipSize?: "small" | "medium";
  onTagSelect?: (
    tag: TagSelectionItem,
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;
  onTagDelete?: (
    tag: TagSelectionItem,
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;
  onTagsChange?: (
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;
  onSearchChange?: (searchValue: string) => void;
  // Reserviert für das noch nicht implementierte "Alle Tags"-Panel.
  onDetailsToggle?: (expanded: boolean) => void;
};

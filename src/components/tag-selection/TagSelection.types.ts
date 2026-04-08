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

  /**
   * Steuert global, ob das optionale Start-Icon eines Tags angezeigt wird.
   */
  showStartIcon?: boolean;

  /**
   * Steuert global, ob das optionale Delete-Icon angezeigt wird.
   * Das Icon erscheint nur dort, wo ein onDelete vorhanden ist.
   */
  showDeleteIcon?: boolean;

  translation?: TagSelectionTranslation;

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
  onDetailsToggle?: (expanded: boolean) => void;
};

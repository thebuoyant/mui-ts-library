import type { ReactElement } from "react";

// Entspricht den Farbnamen, die MUI Chip nativ unterstützt.
// Farben kommen aus dem aktiven Theme und funktionieren automatisch im Dark-Mode.
export type TagColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type TagSelectionItem = {
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
  startIcon?: ReactElement;
  deleteIcon?: ReactElement;
};

export type TagSelectionTranslation = {
  selectedTagsLabel: string;
  autoCompleteLabel: string;
  // Reserviert für das noch nicht implementierte "Alle Tags"-Panel.
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

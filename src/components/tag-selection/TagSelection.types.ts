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
};

export type TagSelectionTranslation = {
  selectedTagsLabel: string;
  autoCompleteLabel: string;
  noSelectedTagsText: string;
  noAvailableTagsText: string;
  placeholder: string;
  loadingText: string;
  maxTagsReachedText: string;
  colorPickerLabel: string;
  backgroundColorLabel: string;
  textColorLabel: string;
  autoTextColorLabel: string;
  confirmCreateLabel: string;
  cancelCreateLabel: string;
};

export const DEFAULT_TAG_SELECTION_TRANSLATION: TagSelectionTranslation = {
  selectedTagsLabel: "Selected tags",
  autoCompleteLabel: "Search and add tags",
  noSelectedTagsText: "No tags selected.",
  noAvailableTagsText: "No tags available.",
  placeholder: "Type to search...",
  loadingText: "Loading...",
  maxTagsReachedText: "Maximum number of tags reached.",
  colorPickerLabel: "Custom color",
  backgroundColorLabel: "Background color",
  textColorLabel: "Text color",
  autoTextColorLabel: "Auto",
  confirmCreateLabel: "Confirm new tag",
  cancelCreateLabel: "Cancel new tag",
};

export type TagSelectionProps = {
  // Ermöglicht das Erstellen neuer Tags durch freie Texteingabe.
  allowCreate?: boolean;
  chipSize?: "small" | "medium";
  disabled?: boolean;
  inputSize?: "small" | "medium";
  // Maximale Höhe der Autocomplete-Dropdown-Liste in px. Standard: MUI-Default.
  listboxMaxHeight?: number;
  loading?: boolean;
  // Maximale Anzahl auswählbarer Tags — Autocomplete wird gesperrt wenn erreicht.
  maxTags?: number;
  // Maximale Anzahl sichtbarer Chips im Auswahl-Bereich.
  // Überzählige Chips werden hinter einem "+N"-Chip versteckt, der einen Popover öffnet.
  maxVisibleChips?: number;
  // Richtung in der der Overflow-Popover aufgeht. Standard: "bottom".
  popoverPlacement?: "top" | "bottom";
  showAutoComplete?: boolean;
  showSelectedTags?: boolean;
  showSelectedTagsLabel?: boolean;
  tags: TagSelectionItem[];
  // Nur abweichende Keys angeben — Rest fällt auf DEFAULT_TAG_SELECTION_TRANSLATION zurück.
  translation?: Partial<TagSelectionTranslation>;
  // Callbacks
  onSearchChange?: (searchValue: string) => void;
  onTagCreate?: (tag: TagSelectionItem) => void;
  onTagDelete?: (
    tag: TagSelectionItem,
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;
  onTagSelect?: (
    tag: TagSelectionItem,
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;
  onTagsChange?: (
    selectedTags: TagSelectionItem[],
    allTags: TagSelectionItem[],
  ) => void;
};

/**
 * CSS class names for every named slot in the TagSelection component.
 *
 * Use these to style individual parts of the component without relying on
 * MUI's internal class names, which can change between versions.
 *
 * @example
 * ```css
 * .MuiTsTagSelection-chip { border-radius: 4px; }
 * .MuiTsTagSelection-chip.MuiTs-disabled { opacity: 0.5; }
 * ```
 */
export const tagSelectionClasses = {
  /** The outermost wrapper element of the TagSelection component. Also receives `MuiTs-disabled` when `disabled={true}`. */
  root:              "MuiTsTagSelection-root",
  /** The area that shows the selected-tags section (label + chips). */
  selectedTags:      "MuiTsTagSelection-selectedTags",
  /** The label text above the selected chips ("Selected tags"). */
  selectedTagsLabel: "MuiTsTagSelection-selectedTagsLabel",
  /** The flex row that wraps all selected chips. */
  chipsStack:        "MuiTsTagSelection-chipsStack",
  /** Each selected tag chip. Also receives `MuiTs-disabled` when the chip is disabled. */
  chip:              "MuiTsTagSelection-chip",
  /** The overflow "+N" chip shown when `maxVisibleChips` is exceeded. */
  overflowChip:      "MuiTsTagSelection-overflowChip",
  /** The content box inside the overflow popover. */
  overflowPopover:   "MuiTsTagSelection-overflowPopover",
  /** The autocomplete section (search input + dropdown). */
  autocomplete:      "MuiTsTagSelection-autocomplete",
  /** Each option chip rendered inside the autocomplete dropdown list. */
  option:            "MuiTsTagSelection-option",
  /** The create-tag panel (color row + palette) shown when `allowCreate={true}` and search has no match. */
  createPanel:       "MuiTsTagSelection-createPanel",
} as const;

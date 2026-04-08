import { Chip } from "@mui/material";
import type { TagSelectionItem } from "./TagSelection.types";

type TagSelectionChipProps = {
  tag: TagSelectionItem;
  onDelete?: (tag: TagSelectionItem) => void;
};

export function TagSelectionChip({ tag, onDelete }: TagSelectionChipProps) {
  return (
    <Chip
      label={tag.label}
      icon={tag.startIcon ?? undefined}
      deleteIcon={tag.deleteIcon ?? undefined}
      onDelete={onDelete ? () => onDelete(tag) : undefined}
      disabled={tag.disabled}
      variant={tag.selected ? "filled" : "outlined"}
      sx={{
        color: tag.foregroundColor ?? "inherit",
        backgroundColor: tag.backgroundColor ?? "transparent",
        borderColor: tag.backgroundColor ?? "rgba(0, 0, 0, 0.23)",
      }}
    />
  );
}

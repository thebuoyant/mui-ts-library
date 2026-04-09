import { Chip } from "@mui/material";
import type { TagSelectionItem } from "./TagSelection.types";

type TagSelectionChipProps = {
  tag: TagSelectionItem;
  onDelete?: (tag: TagSelectionItem) => void;
  onClick?: (tag: TagSelectionItem) => void;
  showStartIcon?: boolean;
  showDeleteIcon?: boolean;
  chipSize: "small" | "medium";
};

export function TagSelectionChip({
  tag,
  onDelete,
  onClick,
  showStartIcon = true,
  showDeleteIcon = true,
  chipSize = "medium",
}: TagSelectionChipProps) {
  const shouldShowStartIcon = showStartIcon && Boolean(tag.startIcon);
  const shouldShowDeleteIcon =
    showDeleteIcon && Boolean(onDelete) && Boolean(tag.deleteIcon);

  return (
    <Chip
      size={chipSize}
      label={tag.label}
      icon={shouldShowStartIcon ? tag.startIcon : undefined}
      deleteIcon={shouldShowDeleteIcon ? tag.deleteIcon : undefined}
      onDelete={showDeleteIcon && onDelete ? () => onDelete(tag) : undefined}
      onClick={onClick ? () => onClick(tag) : undefined}
      clickable={Boolean(onClick) && !tag.disabled}
      disabled={tag.disabled}
      variant={tag.selected ? "filled" : "outlined"}
      sx={{
        color: tag.foregroundColor ?? "inherit",
        backgroundColor: tag.backgroundColor ?? "transparent",
        borderColor: tag.backgroundColor ?? "rgba(0, 0, 0, 0.23)",
        cursor: onClick && !tag.disabled ? "pointer" : "default",
      }}
    />
  );
}

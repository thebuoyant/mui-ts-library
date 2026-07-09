import { Chip } from "@mui/material";
import type { TagSelectionItem } from "./TagSelection.types";

type TagSelectionChipProps = {
  tag: TagSelectionItem;
  onDelete?: (tag: TagSelectionItem) => void;
  onClick?: (tag: TagSelectionItem) => void;
  chipSize: "small" | "medium";
  chipVariant: "filled" | "outlined";
  disabled?: boolean;
};

export function TagSelectionChip({
  tag,
  onDelete,
  onClick,
  chipSize = "medium",
  chipVariant = "filled",
  disabled = false,
}: TagSelectionChipProps) {
  const hasCustomColors = Boolean(tag.foregroundColor || tag.backgroundColor);

  return (
    <Chip
      size={chipSize}
      label={tag.label}
      onDelete={onDelete ? () => onDelete(tag) : undefined}
      onClick={onClick ? () => onClick(tag) : undefined}
      clickable={Boolean(onClick) && !tag.disabled && !disabled}
      disabled={disabled || tag.disabled}
      variant={chipVariant}
      color={!hasCustomColors ? (tag.color ?? "default") : undefined}
      sx={{
        ...(hasCustomColors && {
          color: tag.foregroundColor ?? "inherit",
          backgroundColor: tag.backgroundColor ?? "transparent",
          borderColor: tag.backgroundColor ?? undefined,
          "& .MuiChip-deleteIcon": {
            color: tag.foregroundColor ? `${tag.foregroundColor}99` : "inherit",
            "&:hover": { color: tag.foregroundColor ?? "inherit" },
          },
        }),
        cursor: onClick && !tag.disabled && !disabled ? "pointer" : "default",
      }}
    />
  );
}

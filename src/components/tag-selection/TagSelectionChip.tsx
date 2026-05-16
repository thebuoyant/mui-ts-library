import { Chip } from "@mui/material";
import type { TagSelectionItem } from "./TagSelection.types";

type TagSelectionChipProps = {
  tag: TagSelectionItem;
  onDelete?: (tag: TagSelectionItem) => void;
  onClick?: (tag: TagSelectionItem) => void;
  showStartIcon?: boolean;
  showDeleteIcon?: boolean;
  chipSize: "small" | "medium";
  disabled?: boolean;
};

export function TagSelectionChip({
  tag,
  onDelete,
  onClick,
  showStartIcon = true,
  showDeleteIcon = true,
  chipSize = "medium",
  disabled = false,
}: TagSelectionChipProps) {
  const shouldShowStartIcon = showStartIcon && Boolean(tag.startIcon);

  // Nur das custom deleteIcon ersetzen – MUI zeigt sein Standard-Icon,
  // solange onDelete übergeben wird. shouldShowCustomDeleteIcon steuert
  // lediglich ob tag.deleteIcon das Standard-Icon überschreibt.
  const shouldShowCustomDeleteIcon =
    showDeleteIcon && Boolean(onDelete) && Boolean(tag.deleteIcon);

  // foregroundColor/backgroundColor haben Vorrang vor color, da sie explizite
  // Branding-Farben darstellen. color nutzt das MUI-Theme und ist der Standardweg.
  const hasCustomColors = Boolean(tag.foregroundColor || tag.backgroundColor);

  return (
    <Chip
      size={chipSize}
      label={tag.label}
      icon={shouldShowStartIcon ? tag.startIcon : undefined}
      deleteIcon={shouldShowCustomDeleteIcon ? tag.deleteIcon : undefined}
      onDelete={showDeleteIcon && onDelete ? () => onDelete(tag) : undefined}
      onClick={onClick ? () => onClick(tag) : undefined}
      clickable={Boolean(onClick) && !tag.disabled && !disabled}
      disabled={disabled || tag.disabled}
      variant={tag.selected ? "filled" : "outlined"}
      color={!hasCustomColors ? (tag.color ?? "default") : undefined}
      sx={{
        ...(hasCustomColors && {
          color: tag.foregroundColor ?? "inherit",
          backgroundColor: tag.backgroundColor ?? "transparent",
          // backgroundColor auch als Rahmenfarbe nutzen – ohne Angabe übernimmt MUI den Theme-Wert.
          borderColor: tag.backgroundColor ?? undefined,
        }),
        cursor: onClick && !tag.disabled && !disabled ? "pointer" : "default",
      }}
    />
  );
}

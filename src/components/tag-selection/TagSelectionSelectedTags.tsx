import { Box, Chip, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { TagSelectionChip } from "./TagSelectionChip";
import type {
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";
import { tagSelectionClasses } from "./tagSelectionClasses";

type TagSelectionSelectedTagsProps = {
  selectedTags: TagSelectionItem[];
  translation: Required<TagSelectionTranslation>;
  onTagDelete: (tag: TagSelectionItem) => void;
  showSelectedTagsLabel: boolean;
  chipSize: "small" | "medium";
  chipVariant: "filled" | "outlined";
  disabled?: boolean;
  maxVisibleChips?: number;
  popoverPlacement?: "top" | "bottom";
};

export function TagSelectionSelectedTags({
  selectedTags,
  translation,
  onTagDelete,
  showSelectedTagsLabel,
  chipSize = "medium",
  chipVariant = "filled",
  disabled = false,
  maxVisibleChips,
  popoverPlacement = "bottom",
}: TagSelectionSelectedTagsProps) {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const visibleTags =
    maxVisibleChips !== undefined
      ? selectedTags.slice(0, maxVisibleChips)
      : selectedTags;

  const overflowTags =
    maxVisibleChips !== undefined ? selectedTags.slice(maxVisibleChips) : [];

  const isPopoverOpen = Boolean(popoverAnchor) && overflowTags.length > 0;

  const anchorOrigin =
    popoverPlacement === "top"
      ? ({ vertical: "top", horizontal: "left" } as const)
      : ({ vertical: "bottom", horizontal: "left" } as const);

  const transformOrigin =
    popoverPlacement === "top"
      ? ({ vertical: "bottom", horizontal: "left" } as const)
      : ({ vertical: "top", horizontal: "left" } as const);

  return (
    <Box sx={{ mb: 2 }} className={tagSelectionClasses.selectedTags}>
      {showSelectedTagsLabel && (
        <Typography variant="subtitle2" gutterBottom className={tagSelectionClasses.selectedTagsLabel}>
          {translation.selectedTagsLabel}
        </Typography>
      )}
      {selectedTags.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {translation.noSelectedTagsText}
        </Typography>
      ) : (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }} className={tagSelectionClasses.chipsStack}>
          {visibleTags.map((tag) => (
            <TagSelectionChip
              key={tag.id}
              tag={tag}
              onDelete={onTagDelete}
              chipSize={chipSize}
              chipVariant={chipVariant}
              disabled={disabled}
            />
          ))}

          {overflowTags.length > 0 && (
            <>
              <Chip
                size={chipSize}
                label={`+${overflowTags.length}`}
                variant="outlined"
                clickable
                onClick={(e) => setPopoverAnchor(e.currentTarget)}
                className={tagSelectionClasses.overflowChip}
              />
              <Popover
                open={isPopoverOpen}
                anchorEl={popoverAnchor}
                onClose={() => setPopoverAnchor(null)}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
              >
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    maxWidth: 320,
                  }}
                  className={tagSelectionClasses.overflowPopover}
                >
                  {overflowTags.map((tag) => (
                    <TagSelectionChip
                      key={tag.id}
                      tag={tag}
                      onDelete={disabled ? undefined : onTagDelete}
                      chipSize={chipSize}
                      chipVariant={chipVariant}
                      disabled={disabled}
                    />
                  ))}
                </Box>
              </Popover>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
}

import { Box, Chip, Popover, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TagSelectionChip } from "./TagSelectionChip";
import type {
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

type TagSelectionSelectedTagsProps = {
  selectedTags: TagSelectionItem[];
  translation: TagSelectionTranslation;
  onTagDelete: (tag: TagSelectionItem) => void;
  showSelectedTagsLabel: boolean;
  chipSize: "small" | "medium";
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

  useEffect(() => {
    if (overflowTags.length === 0) {
      setPopoverAnchor(null);
    }
  }, [overflowTags.length]);

  const anchorOrigin =
    popoverPlacement === "top"
      ? ({ vertical: "top", horizontal: "left" } as const)
      : ({ vertical: "bottom", horizontal: "left" } as const);

  const transformOrigin =
    popoverPlacement === "top"
      ? ({ vertical: "bottom", horizontal: "left" } as const)
      : ({ vertical: "top", horizontal: "left" } as const);

  return (
    <Box sx={{ mb: 2 }}>
      {showSelectedTagsLabel && (
        <Typography variant="subtitle2" gutterBottom>
          {translation.selectedTagsLabel}
        </Typography>
      )}
      {selectedTags.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {translation.noSelectedTagsText}
        </Typography>
      ) : (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          {visibleTags.map((tag) => (
            <TagSelectionChip
              key={tag.id}
              tag={tag}
              onDelete={onTagDelete}
              chipSize={chipSize}
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
              />
              <Popover
                open={Boolean(popoverAnchor)}
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
                >
                  {overflowTags.map((tag) => (
                    <TagSelectionChip
                      key={tag.id}
                      tag={tag}
                      onDelete={disabled ? undefined : onTagDelete}
                      chipSize={chipSize}
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

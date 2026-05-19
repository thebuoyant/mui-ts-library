import { Box, Stack, Typography } from "@mui/material";
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
};

export function TagSelectionSelectedTags({
  selectedTags,
  translation,
  onTagDelete,
  showSelectedTagsLabel,
  chipSize = "medium",
  disabled = false,
}: TagSelectionSelectedTagsProps) {
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
          {selectedTags.map((tag) => (
            <TagSelectionChip
              key={tag.id}
              tag={tag}
              onDelete={onTagDelete}
              chipSize={chipSize}
              disabled={disabled}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

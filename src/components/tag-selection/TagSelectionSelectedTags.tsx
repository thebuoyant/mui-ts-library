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
  showStartIcon?: boolean;
  showDeleteIcon?: boolean;
  showSelectedTagsLabel: boolean;
  chipSize: "small" | "medium";
};

export function TagSelectionSelectedTags({
  selectedTags,
  translation,
  onTagDelete,
  showStartIcon = true,
  showDeleteIcon = true,
  showSelectedTagsLabel,
  chipSize = "medium",
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
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {selectedTags.map((tag) => (
            <TagSelectionChip
              key={tag.id}
              tag={tag}
              onDelete={onTagDelete}
              showStartIcon={showStartIcon}
              showDeleteIcon={showDeleteIcon}
              chipSize={chipSize}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

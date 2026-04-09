import { Stack, Typography } from "@mui/material";
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
};

export function TagSelectionSelectedTags({
  selectedTags,
  translation,
  onTagDelete,
  showStartIcon = true,
  showDeleteIcon = true,
  showSelectedTagsLabel,
}: TagSelectionSelectedTagsProps) {
  return (
    <div className="tag-selection-section">
      {showSelectedTagsLabel && (
        <Typography variant="subtitle2" gutterBottom>
          {translation.selectedTagsLabel}
        </Typography>
      )}
      {selectedTags.length === 0 ? (
        <Typography variant="body2" className="tag-selection-empty-text">
          {translation.noSelectedTagsText}
        </Typography>
      ) : (
        <Stack direction="row" className="tag-selection-chip-list">
          {selectedTags.map((tag) => (
            <TagSelectionChip
              key={tag.id}
              tag={tag}
              onDelete={onTagDelete}
              showStartIcon={showStartIcon}
              showDeleteIcon={showDeleteIcon}
            />
          ))}
        </Stack>
      )}
    </div>
  );
}

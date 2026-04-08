import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TagSelectionChip } from "./TagSelectionChip";
import type {
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

type TagSelectionDetailsProps = {
  selectedTags: TagSelectionItem[];
  availableTags: TagSelectionItem[];
  disabledTags: TagSelectionItem[];
  translation: TagSelectionTranslation;
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
  onTagDelete: (tag: TagSelectionItem) => void;
  onTagSelect: (tag: TagSelectionItem) => void;
  showStartIcon?: boolean;
  showDeleteIcon?: boolean;
};

type TagGroupProps = {
  label: string;
  tags: TagSelectionItem[];
  onTagDelete?: (tag: TagSelectionItem) => void;
  onTagSelect?: (tag: TagSelectionItem) => void;
  showStartIcon?: boolean;
  showDeleteIcon?: boolean;
};

function TagGroup({
  label,
  tags,
  onTagDelete,
  onTagSelect,
  showStartIcon = true,
  showDeleteIcon = true,
}: TagGroupProps) {
  return (
    <div className="tag-selection-group">
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>

      {tags.length === 0 ? (
        <Typography variant="body2" className="tag-selection-empty-text">
          -
        </Typography>
      ) : (
        <Stack direction="row" className="tag-selection-chip-list">
          {tags.map((tag) => (
            <TagSelectionChip
              key={tag.id}
              tag={tag}
              onDelete={tag.selected ? onTagDelete : undefined}
              onClick={!tag.selected && !tag.disabled ? onTagSelect : undefined}
              showStartIcon={showStartIcon}
              showDeleteIcon={showDeleteIcon}
            />
          ))}
        </Stack>
      )}
    </div>
  );
}

export function TagSelectionDetails({
  selectedTags,
  availableTags,
  disabledTags,
  translation,
  expanded,
  onToggle,
  onTagDelete,
  onTagSelect,
  showStartIcon = true,
  showDeleteIcon = true,
}: TagSelectionDetailsProps) {
  return (
    <div className="tag-selection-section">
      <Accordion
        expanded={expanded}
        onChange={(_, isExpanded) => onToggle(isExpanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">
            {translation.detailsLabel}
          </Typography>
        </AccordionSummary>

        <AccordionDetails className="tag-selection-details-content">
          <TagGroup
            label={translation.selectedGroupLabel}
            tags={selectedTags}
            onTagDelete={onTagDelete}
            showStartIcon={showStartIcon}
            showDeleteIcon={showDeleteIcon}
          />

          <TagGroup
            label={translation.availableGroupLabel}
            tags={availableTags}
            onTagSelect={onTagSelect}
            showStartIcon={showStartIcon}
            showDeleteIcon={false}
          />

          <TagGroup
            label={translation.disabledGroupLabel}
            tags={disabledTags}
            showStartIcon={showStartIcon}
            showDeleteIcon={false}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

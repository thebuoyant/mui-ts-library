import { Autocomplete, Chip, TextField } from "@mui/material";
import type { SyntheticEvent } from "react";
import type {
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

type TagSelectionAutocompleteProps = {
  availableTags: TagSelectionItem[];
  searchValue: string;
  translation: TagSelectionTranslation;
  onSearchChange: (value: string) => void;
  onTagSelect: (tag: TagSelectionItem) => void;
  showStartIcon?: boolean;
};

export function TagSelectionAutocomplete({
  availableTags,
  searchValue,
  translation,
  onSearchChange,
  onTagSelect,
  showStartIcon = true,
}: TagSelectionAutocompleteProps) {
  return (
    <div className="tag-selection-section">
      <Autocomplete<TagSelectionItem, false, false, false>
        options={availableTags}
        getOptionLabel={(option) => option.label}
        inputValue={searchValue}
        onInputChange={(_, newInputValue) => {
          onSearchChange(newInputValue);
        }}
        onChange={(_: SyntheticEvent, value: TagSelectionItem | null) => {
          if (value) {
            onTagSelect(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translation.autoCompleteLabel}
            placeholder={translation.placeholder}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <Chip
              label={option.label}
              icon={showStartIcon ? (option.startIcon ?? undefined) : undefined}
              sx={{
                color: option.foregroundColor ?? "inherit",
                backgroundColor: option.backgroundColor ?? "transparent",
              }}
            />
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText={translation.noAvailableTagsText}
      />
    </div>
  );
}

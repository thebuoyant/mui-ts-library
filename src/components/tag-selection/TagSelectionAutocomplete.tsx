import { Autocomplete, Chip, TextField } from "@mui/material";
import type { SyntheticEvent } from "react";
import type {
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

type TagSelectionAutocompleteProps = {
  inputSize: "medium" | "small";
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
  inputSize = "medium",
}: TagSelectionAutocompleteProps) {
  return (
    <div className="tag-selection-section">
      <Autocomplete<TagSelectionItem, false, false, false>
        options={availableTags}
        size={inputSize}
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
        slotProps={{
          listbox: {
            sx: {
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              padding: 1,
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translation.autoCompleteLabel}
            placeholder={translation.placeholder}
          />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            key={option.id}
            style={{
              width: "auto",
              padding: 0,
              margin: 0,
            }}
          >
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

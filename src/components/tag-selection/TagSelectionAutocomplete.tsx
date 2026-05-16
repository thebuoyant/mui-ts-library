import { Autocomplete, Box, Chip, TextField, createFilterOptions } from "@mui/material";
import type { SyntheticEvent } from "react";
import type {
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

const filter = createFilterOptions<TagSelectionItem>();

// Internes Sentinel-ID um "Neu erstellen"-Optionen von echten Tags zu unterscheiden.
const CREATE_SENTINEL_ID = "__create__";

type TagSelectionAutocompleteProps = {
  inputSize: "medium" | "small";
  chipSize: "medium" | "small";
  availableTags: TagSelectionItem[];
  searchValue: string;
  translation: TagSelectionTranslation;
  onSearchChange: (value: string) => void;
  onTagSelect: (tag: TagSelectionItem) => void;
  onTagCreate?: (label: string) => void;
  showStartIcon?: boolean;
  disabled?: boolean;
  loading?: boolean;
  isMaxReached?: boolean;
  allowCreate?: boolean;
};

export function TagSelectionAutocomplete({
  availableTags,
  searchValue,
  translation,
  onSearchChange,
  onTagSelect,
  onTagCreate,
  showStartIcon = true,
  inputSize = "medium",
  chipSize = "medium",
  disabled = false,
  loading = false,
  isMaxReached = false,
  allowCreate = false,
}: TagSelectionAutocompleteProps) {
  const isDisabled = disabled || isMaxReached;

  return (
    <Box sx={{ mb: 2 }}>
      <Autocomplete<TagSelectionItem, false, false, false>
        options={availableTags}
        // value=null hält die Auswahl immer leer: nach einem Klick auf eine Option
        // soll kein "ausgewählter Wert" im Feld stehen, sondern das Feld über
        // searchValue="" (aus dem Store) automatisch geleert werden.
        value={null}
        size={inputSize}
        disabled={isDisabled}
        loading={loading}
        getOptionLabel={(option) => option.label}
        inputValue={searchValue}
        onInputChange={(_, newInputValue) => {
          onSearchChange(newInputValue);
        }}
        onChange={(_: SyntheticEvent, value: TagSelectionItem | null) => {
          if (value) {
            if (value.id === CREATE_SENTINEL_ID && onTagCreate) {
              onTagCreate(searchValue.trim());
            } else {
              onTagSelect(value);
            }
          }
        }}
        filterOptions={
          allowCreate
            ? (options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;

                if (inputValue.trim() !== "") {
                  const exactMatch = options.some(
                    (opt) =>
                      opt.label.toLowerCase() === inputValue.trim().toLowerCase(),
                  );
                  if (!exactMatch) {
                    filtered.push({
                      id: CREATE_SENTINEL_ID,
                      label: translation.createTagLabel.replace(
                        "{query}",
                        inputValue.trim(),
                      ),
                    });
                  }
                }

                return filtered;
              }
            : undefined
        }
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
            helperText={
              isMaxReached && !disabled ? translation.maxTagsReachedText : undefined
            }
          />
        )}
        renderOption={(props, option) => {
          if (option.id === CREATE_SENTINEL_ID) {
            return (
              <li {...props} key={CREATE_SENTINEL_ID} style={{ width: "100%" }}>
                {option.label}
              </li>
            );
          }

          const hasCustomColors = Boolean(
            option.foregroundColor || option.backgroundColor,
          );

          return (
            <li
              {...props}
              key={option.id}
              style={{ width: "auto", padding: 0, margin: 0 }}
            >
              <Chip
                size={chipSize}
                label={option.label}
                icon={
                  showStartIcon ? (option.startIcon ?? undefined) : undefined
                }
                color={!hasCustomColors ? (option.color ?? "default") : undefined}
                sx={
                  hasCustomColors
                    ? {
                        color: option.foregroundColor ?? "inherit",
                        backgroundColor: option.backgroundColor ?? "transparent",
                      }
                    : undefined
                }
              />
            </li>
          );
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText={translation.noAvailableTagsText}
        loadingText={translation.loadingText}
      />
    </Box>
  );
}

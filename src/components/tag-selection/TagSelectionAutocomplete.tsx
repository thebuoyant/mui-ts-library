import { Autocomplete, Box, Chip, IconButton, Stack, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState, type SyntheticEvent } from "react";
import type {
  TagColor,
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

const TAG_COLORS: TagColor[] = [
  "default", "primary", "secondary", "error", "info", "success", "warning",
];

type TagSelectionAutocompleteProps = {
  inputSize: "medium" | "small";
  chipSize: "medium" | "small";
  availableTags: TagSelectionItem[];
  searchValue: string;
  translation: TagSelectionTranslation;
  onSearchChange: (value: string) => void;
  onTagSelect: (tag: TagSelectionItem) => void;
  onTagCreate?: (label: string, color: TagColor) => void;
  disabled?: boolean;
  loading?: boolean;
  isMaxReached?: boolean;
  allowCreate?: boolean;
  listboxMaxHeight?: number;
};

export function TagSelectionAutocomplete({
  availableTags,
  searchValue,
  translation,
  onSearchChange,
  onTagSelect,
  onTagCreate,
  inputSize = "medium",
  chipSize = "medium",
  disabled = false,
  loading = false,
  isMaxReached = false,
  allowCreate = false,
  listboxMaxHeight,
}: TagSelectionAutocompleteProps) {
  const [selectedColor, setSelectedColor] = useState<TagColor>("default");
  const [popupOpen, setPopupOpen] = useState(false);

  const isDisabled = disabled || isMaxReached;

  // isCreateMode only activates when there are no matching options at all.
  const filteredOptions = availableTags.filter((tag) =>
    tag.label.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );
  const isCreateMode = allowCreate && searchValue.trim() !== "" && filteredOptions.length === 0;

  useEffect(() => {
    if (isCreateMode) setPopupOpen(false);
  }, [isCreateMode]);

  const handleConfirmCreate = () => {
    onTagCreate?.(searchValue.trim(), selectedColor);
    setSelectedColor("default");
  };

  const handleCancelCreate = () => {
    onSearchChange("");
    setSelectedColor("default");
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Autocomplete<TagSelectionItem, false, false, false>
        options={availableTags}
        value={null}
        open={popupOpen}
        onOpen={() => { if (!isCreateMode) setPopupOpen(true); }}
        onClose={() => setPopupOpen(false)}
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
              ...(listboxMaxHeight !== undefined && {
                maxHeight: listboxMaxHeight,
                overflowY: "auto",
              }),
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
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps?.input,
                endAdornment: (
                  <>
                    {isCreateMode && (
                      <>
                        <IconButton
                          size="small"
                          sx={{ color: "success.main" }}
                          onMouseDown={(e) => { e.preventDefault(); }}
                          onClick={handleConfirmCreate}
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onMouseDown={(e) => { e.preventDefault(); }}
                          onClick={handleCancelCreate}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                    {params.slotProps?.input?.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
        renderOption={({ key, ...props }, option) => {
          const hasCustomColors = Boolean(option.foregroundColor || option.backgroundColor);

          return (
            <li key={key} {...props} style={{ width: "auto", padding: 0, margin: 0 }}>
              <Chip
                size={chipSize}
                label={option.label}
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

      {isCreateMode && (
        <Stack direction="row" sx={{ mt: 0.5, flexWrap: "wrap", gap: 0.5, alignItems: "center" }}>
          {TAG_COLORS.map((c) => (
            <Chip
              key={c}
              size="small"
              color={c}
              label={c}
              variant={selectedColor === c ? "filled" : "outlined"}
              onClick={() => setSelectedColor(c)}
              clickable
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

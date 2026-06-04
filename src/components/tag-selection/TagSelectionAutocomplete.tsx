import { Autocomplete, Box, Chip, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState, type SyntheticEvent } from "react";
import type {
  TagColor,
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

const TAG_COLORS: TagColor[] = [
  "default", "primary", "secondary", "error", "info", "success", "warning",
];

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#ffffff";
}

type TagSelectionAutocompleteProps = {
  inputSize: "medium" | "small";
  chipSize: "medium" | "small";
  availableTags: TagSelectionItem[];
  searchValue: string;
  translation: TagSelectionTranslation;
  onSearchChange: (value: string) => void;
  onTagSelect: (tag: TagSelectionItem) => void;
  onTagCreate?: (
    label: string,
    color: TagColor,
    customColors?: { backgroundColor: string; foregroundColor: string },
  ) => void;
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
  const [customBgColor, setCustomBgColor] = useState<string | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const isDisabled = disabled || isMaxReached;
  const isCustomColorSelected = customBgColor !== null;

  const filteredOptions = availableTags.filter((tag) =>
    tag.label.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );
  const isCreateMode = allowCreate && searchValue.trim() !== "" && filteredOptions.length === 0;

  const effectivePopupOpen = popupOpen && !isCreateMode;

  const handleConfirmCreate = () => {
    if (isCustomColorSelected && customBgColor) {
      onTagCreate?.(searchValue.trim(), "default", {
        backgroundColor: customBgColor,
        foregroundColor: getContrastColor(customBgColor),
      });
    } else {
      onTagCreate?.(searchValue.trim(), selectedColor);
    }
    setSelectedColor("default");
    setCustomBgColor(null);
  };

  const handleCancelCreate = () => {
    onSearchChange("");
    setSelectedColor("default");
    setCustomBgColor(null);
  };

  const handleCustomColorChange = (hex: string) => {
    setCustomBgColor(hex);
    setSelectedColor("default");
  };

  const circleSize = chipSize === "small" ? 24 : 32;

  return (
    <Box sx={{ mb: 2 }}>
      <Autocomplete<TagSelectionItem, false, false, false>
        options={availableTags}
        value={null}
        open={effectivePopupOpen}
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
            onKeyDown={(e) => {
              if (isCreateMode && e.key === "Enter") {
                e.preventDefault();
                handleConfirmCreate();
              }
            }}
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
              size={chipSize}
              color={c}
              label={c}
              variant={!isCustomColorSelected && selectedColor === c ? "filled" : "outlined"}
              onClick={() => {
                setSelectedColor(c);
                setCustomBgColor(null);
              }}
              clickable
            />
          ))}

          {/* Custom hex color picker */}
          <Tooltip title={translation.colorPickerLabel}>
            <Box
              onClick={() => colorInputRef.current?.click()}
              sx={{
                width: circleSize,
                height: circleSize,
                borderRadius: "50%",
                cursor: "pointer",
                flexShrink: 0,
                border: "2px solid",
                borderColor: isCustomColorSelected ? "primary.main" : "divider",
                background: customBgColor
                  ?? "conic-gradient(red 0deg, yellow 60deg, lime 120deg, cyan 180deg, blue 240deg, magenta 300deg, red 360deg)",
                ...(isCustomColorSelected && {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                }),
              }}
            />
          </Tooltip>
          <input
            ref={colorInputRef}
            type="color"
            value={customBgColor ?? "#1976d2"}
            style={{ display: "none" }}
            onChange={(e) => handleCustomColorChange(e.target.value)}
          />
        </Stack>
      )}
    </Box>
  );
}

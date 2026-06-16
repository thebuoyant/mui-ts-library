import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState, type SyntheticEvent } from "react";
import type {
  TagColor,
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

const TAG_COLORS: TagColor[] = [
  "default", "primary", "secondary", "error", "info", "success", "warning",
];

const PALETTE_COLORS = [
  "#f44336", "#e91e63", "#9c27b0", "#673ab7",
  "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
  "#009688", "#4caf50", "#8bc34a", "#cddc39",
  "#ffeb3b", "#ffc107", "#ff9800", "#ff5722",
  "#795548", "#9e9e9e", "#607d8b", "#000000",
];

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#ffffff";
}

function highlightMatch(text: string, query: string) {
  const trimmed = query.trim();
  if (!trimmed) return text;
  const idx = text.toLowerCase().indexOf(trimmed.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + trimmed.length)}</strong>
      {text.slice(idx + trimmed.length)}
    </>
  );
}

type TagSelectionAutocompleteProps = {
  inputSize: "medium" | "small";
  chipSize: "medium" | "small";
  availableTags: TagSelectionItem[];
  searchValue: string;
  translation: TagSelectionTranslation;
  onSearchChange: (value: string) => void;
  onTagSelect: (tag: TagSelectionItem) => void;
  onTagCreate?: (tag: TagSelectionItem) => void;
  disabled?: boolean;
  loading?: boolean;
  isMaxReached?: boolean;
  allowCreate?: boolean;
  listboxMaxHeight?: number;
};

function ColorSwatch({
  color,
  selected,
  onClick,
}: {
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 24,
        height: 24,
        borderRadius: 0.5,
        backgroundColor: color,
        cursor: "pointer",
        border: "2px solid",
        borderColor: selected ? "primary.main" : "transparent",
        outline: selected ? "1px solid" : "none",
        outlineColor: "primary.main",
        outlineOffset: 1,
        flexShrink: 0,
        "&:hover": { transform: "scale(1.2)", borderColor: "primary.main" },
        transition: "transform 0.1s",
      }}
    />
  );
}

function HexInput({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  return (
    <TextField
      size="small"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="#rrggbb"
      disabled={disabled}
      error={!disabled && value.length > 1 && !isValidHex(value)}
      sx={{
        "& .MuiInputBase-root": { height: 28 },
        "& .MuiInputBase-input": {
          py: 0,
          px: 0.5,
          fontSize: "0.72rem",
          fontFamily: "monospace",
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: 0.25,
                flexShrink: 0,
                mr: 0.5,
                backgroundColor: isValidHex(value) ? value : "action.disabledBackground",
                border: "1px solid",
                borderColor: "divider",
              }}
            />
          ),
        },
      }}
    />
  );
}

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
  const [customFgColor, setCustomFgColor] = useState<string | null>(null);
  const [autoFg, setAutoFg] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [hexBg, setHexBg] = useState("#1976d2");
  const [hexFg, setHexFg] = useState("#ffffff");

  const isDisabled = disabled || isMaxReached;
  const isCustomColorSelected = customBgColor !== null;

  const filteredOptions = availableTags.filter((tag) =>
    tag.label.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );
  const isCreateMode = allowCreate && searchValue.trim() !== "" && filteredOptions.length === 0;
  const effectivePopupOpen = popupOpen && !isCreateMode;

  const resolvedFgColor = isCustomColorSelected
    ? (autoFg ? getContrastColor(customBgColor!) : (customFgColor ?? "#000000"))
    : undefined;

  const handleConfirmCreate = () => {
    const label = searchValue.trim();
    const id = label.toLowerCase().replace(/\s+/g, "-");
    const newTag: TagSelectionItem = isCustomColorSelected && customBgColor
      ? {
          id,
          label,
          selected: true,
          color: "default",
          backgroundColor: customBgColor,
          foregroundColor: resolvedFgColor!,
        }
      : {
          id,
          label,
          selected: true,
          color: selectedColor,
        };

    onTagCreate?.(newTag);
    setSelectedColor("default");
    setCustomBgColor(null);
    setCustomFgColor(null);
    setAutoFg(true);
    setPaletteOpen(false);
    onSearchChange("");
  };

  const handleCancelCreate = () => {
    onSearchChange("");
    setSelectedColor("default");
    setCustomBgColor(null);
    setCustomFgColor(null);
    setAutoFg(true);
    setPaletteOpen(false);
  };

  const handleBgSwatchClick = (color: string) => {
    setCustomBgColor(color);
    setHexBg(color);
    setSelectedColor("default");
  };

  const handleBgHexChange = (val: string) => {
    setHexBg(val);
    if (isValidHex(val)) {
      setCustomBgColor(val);
      setSelectedColor("default");
    }
  };

  const handleFgSwatchClick = (color: string) => {
    setCustomFgColor(color);
    setHexFg(color);
  };

  const handleFgHexChange = (val: string) => {
    setHexFg(val);
    if (isValidHex(val)) setCustomFgColor(val);
  };

  const handleAutoFgToggle = (checked: boolean) => {
    setAutoFg(checked);
    if (checked) setCustomFgColor(null);
    else if (customBgColor) {
      const auto = getContrastColor(customBgColor);
      setCustomFgColor(auto);
      setHexFg(auto);
    }
  };

  // Verhindert clearOnBlur vom Autocomplete (würde isCreateMode = false setzen).
  const preventBlur = (e: React.MouseEvent) => e.preventDefault();

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
        onInputChange={(_, newInputValue) => onSearchChange(newInputValue)}
        onChange={(_: SyntheticEvent, value: TagSelectionItem | null) => {
          if (value) onTagSelect(value);
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
            helperText={isMaxReached && !disabled ? translation.maxTagsReachedText : undefined}
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
                          onMouseDown={preventBlur}
                          onClick={handleConfirmCreate}
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onMouseDown={preventBlur}
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
                label={highlightMatch(option.label, searchValue)}
                color={!hasCustomColors ? (option.color ?? "default") : undefined}
                sx={
                  hasCustomColors
                    ? { color: option.foregroundColor ?? "inherit", backgroundColor: option.backgroundColor ?? "transparent" }
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
        // position: relative → Anker für das absolut positionierte Palette-Panel.
        // onMouseDown → Autocomplete-Input behält Fokus (verhindert clearOnBlur).
        <Box sx={{ position: "relative" }} onMouseDown={preventBlur}>

          {/* Zeile 1: semantische Farb-Chips + Rainbow-Chip */}
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
                  setCustomFgColor(null);
                  setPaletteOpen(false);
                }}
                clickable
              />
            ))}

            {/* Rainbow-Chip: Farbverlauf-Border signalisiert "eigene Farbe wählbar" */}
            <Tooltip title={translation.colorPickerLabel}>
              <Chip
                size={chipSize}
                label={isCustomColorSelected ? customBgColor! : "···"}
                variant="outlined"
                onClick={() => {
                  setPaletteOpen((prev) => !prev);
                  if (customBgColor) setHexBg(customBgColor);
                  if (customFgColor) setHexFg(customFgColor);
                }}
                sx={(theme) => ({
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  ...(isCustomColorSelected
                    ? {
                        backgroundColor: customBgColor!,
                        color: resolvedFgColor,
                        border: "1.5px solid transparent",
                        backgroundImage: `linear-gradient(${customBgColor}, ${customBgColor}), linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0)`,
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                      }
                    : {
                        border: "1.5px solid transparent",
                        backgroundImage: `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}), linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0)`,
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                      }),
                })}
                clickable
              />
            </Tooltip>
          </Stack>

          {/* Palette-Panel: absolut positioniert, kein Content-Push */}
          {paletteOpen && (
            <Box
              sx={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                zIndex: 1400,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                boxShadow: 8,
                p: 1.25,
                width: "max-content",
              }}
            >
              {/* Zwei Spalten: Background color | Text color */}
              <Box sx={{ display: "grid", gridTemplateColumns: "auto auto", gap: 2 }}>

                {/* Spalte A: Hintergrundfarbe */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", display: "block", mb: 0.5 }}>
                    {translation.backgroundColorLabel}
                  </Typography>
                  {/* Swatches + HexInput im selben Grid → gleiche Breite garantiert */}
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 24px)", gap: 0.5 }}>
                    {PALETTE_COLORS.map((color) => (
                      <ColorSwatch
                        key={color}
                        color={color}
                        selected={customBgColor === color}
                        onClick={() => handleBgSwatchClick(color)}
                      />
                    ))}
                    <Box sx={{ gridColumn: "span 5", mt: 0.25 }}>
                      <HexInput value={hexBg} onChange={handleBgHexChange} />
                    </Box>
                  </Box>
                </Box>

                {/* Spalte B: Textfarbe — Auto-Toggle unterhalb des Hex-Inputs */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", display: "block", mb: 0.5 }}>
                    {translation.textColorLabel}
                  </Typography>
                  {/* Swatches + HexInput gedimmt — Auto-Toggle ist NICHT drin */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(5, 24px)",
                      gap: 0.5,
                      opacity: autoFg ? 0.3 : 1,
                      pointerEvents: autoFg ? "none" : "auto",
                      transition: "opacity 0.15s",
                    }}
                  >
                    {PALETTE_COLORS.map((color) => (
                      <ColorSwatch
                        key={color}
                        color={color}
                        selected={customFgColor === color}
                        onClick={() => handleFgSwatchClick(color)}
                      />
                    ))}
                    <Box sx={{ gridColumn: "span 5", mt: 0.25 }}>
                      <HexInput
                        value={autoFg ? (resolvedFgColor ?? "#000000") : hexFg}
                        onChange={handleFgHexChange}
                        disabled={autoFg}
                      />
                    </Box>
                  </Box>
                  {/* Auto-Toggle außerhalb der gedimmten Box → immer klickbar */}
                  <Stack
                    direction="row"
                    sx={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 0.5,
                      mt: 0.25,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {translation.autoTextColorLabel}
                    </Typography>
                    <Switch
                      size="small"
                      checked={autoFg}
                      onChange={(e) => handleAutoFgToggle(e.target.checked)}
                    />
                  </Stack>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

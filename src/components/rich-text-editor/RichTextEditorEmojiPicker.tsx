import { useState, useMemo } from "react";
import { Box, InputAdornment, Popover, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { EMOJI_CATEGORIES } from "./util/emojis";
import { type RichTextEditorTranslation } from "./RichTextEditor.types";

type RichTextEditorEmojiPickerProps = {
  anchorEl:    HTMLElement | null;
  open:        boolean;
  onClose:     () => void;
  onSelect:    (emoji: string) => void;
  translation: RichTextEditorTranslation;
};

export function RichTextEditorEmojiPicker({
  anchorEl,
  open,
  onClose,
  onSelect,
  translation: t,
}: RichTextEditorEmojiPickerProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return EMOJI_CATEGORIES;
    return EMOJI_CATEGORIES.map((cat) => ({
      ...cat,
      emojis: cat.emojis.filter((e) => e.name.includes(q) || e.emoji === q),
    })).filter((cat) => cat.emojis.length > 0);
  }, [search]);

  function handleSelect(emoji: string) {
    onSelect(emoji);
    onClose();
    setSearch("");
  }

  function handleClose() {
    onClose();
    setSearch("");
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{ paper: { sx: { width: 320, maxHeight: 380, display: "flex", flexDirection: "column" } } }}
    >
      <Box sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}>
        <TextField
          autoFocus
          fullWidth
          size="small"
          placeholder={t.emojiSearchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{ overflowY: "auto", flex: 1, px: 1, pb: 1 }}>
        {filtered.map((cat) => (
          <Box key={cat.label}>
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary", mt: 1, mb: 0.5, px: 0.5 }}
            >
              {cat.label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.25 }}>
              {cat.emojis.map((entry) => (
                <Box
                  key={entry.emoji}
                  component="button"
                  title={entry.name}
                  onClick={() => handleSelect(entry.emoji)}
                  sx={{
                    border:       "none",
                    background:   "none",
                    cursor:       "pointer",
                    fontSize:     "1.375rem",
                    lineHeight:   1,
                    p:            0.5,
                    borderRadius: 1,
                    "&:hover":    { bgcolor: "action.hover" },
                  }}
                >
                  {entry.emoji}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
        {filtered.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
            No emoji found
          </Typography>
        )}
      </Box>
    </Popover>
  );
}

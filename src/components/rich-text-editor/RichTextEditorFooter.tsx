import { Box, FormHelperText } from "@mui/material";
import { type RichTextEditorTranslation } from "./RichTextEditor.types";

type RichTextEditorFooterProps = {
  helperText?:         string;
  error?:              boolean;
  showCharacterCount?: boolean;
  charCount:           number;
  maxCharacters?:      number;
  translation:         RichTextEditorTranslation;
};

export function RichTextEditorFooter({
  helperText,
  error,
  showCharacterCount,
  charCount,
  maxCharacters,
  translation: t,
}: RichTextEditorFooterProps) {
  const countLabel =
    maxCharacters !== undefined
      ? t.characterCountMax
          .replace("{count}", String(charCount))
          .replace("{max}", String(maxCharacters))
      : t.characterCount.replace("{count}", String(charCount));

  const countColor =
    maxCharacters !== undefined && charCount >= maxCharacters ? "error" : "text.secondary";

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5, px: 0.5 }}>
      <FormHelperText error={error}>{helperText ?? ""}</FormHelperText>
      {showCharacterCount && (
        <FormHelperText sx={{ color: countColor }}>{countLabel}</FormHelperText>
      )}
    </Box>
  );
}

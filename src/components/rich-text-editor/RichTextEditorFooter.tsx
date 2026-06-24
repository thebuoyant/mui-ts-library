import { Box, FormHelperText } from "@mui/material";
import { type RichTextEditorTranslation } from "./RichTextEditor.types";

type RichTextEditorFooterProps = {
  helperText?:         string;
  error?:              boolean;
  showCharacterCount?: boolean;
  charCount:           number;
  maxCharacters?:      number;
  showWordCount?:      boolean;
  wordCount:           number;
  translation: Required<RichTextEditorTranslation>;
};

export function RichTextEditorFooter({
  helperText,
  error,
  showCharacterCount,
  charCount,
  maxCharacters,
  showWordCount,
  wordCount,
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

  const wordLabel = t.wordCount.replace("{count}", String(wordCount));

  const showRight = showCharacterCount || showWordCount;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5, px: 0.5 }}>
      <FormHelperText error={error}>{helperText ?? ""}</FormHelperText>
      {showRight && (
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          {showWordCount && (
            <FormHelperText sx={{ color: "text.secondary" }}>{wordLabel}</FormHelperText>
          )}
          {showCharacterCount && (
            <FormHelperText sx={{ color: countColor }}>{countLabel}</FormHelperText>
          )}
        </Box>
      )}
    </Box>
  );
}

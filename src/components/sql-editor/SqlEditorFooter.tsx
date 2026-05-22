import { Box, FormHelperText } from "@mui/material";
import type { SqlEditorTranslation } from "./SqlEditor.types";

type SqlEditorFooterProps = {
  helperText?:     string;
  error?:          boolean;
  showLineColumn?: boolean;
  cursorLine:      number;
  cursorCol:       number;
  translation:     SqlEditorTranslation;
};

export function SqlEditorFooter({
  helperText,
  error,
  showLineColumn,
  cursorLine,
  cursorCol,
  translation: t,
}: SqlEditorFooterProps) {
  const lineColLabel = t.lineColumn
    .replace("{line}", String(cursorLine))
    .replace("{col}",  String(cursorCol));

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5, px: 0.5 }}>
      <FormHelperText error={error}>{helperText ?? ""}</FormHelperText>
      {showLineColumn && (
        <FormHelperText sx={{ color: "text.disabled", fontFamily: "monospace" }}>
          {lineColLabel}
        </FormHelperText>
      )}
    </Box>
  );
}

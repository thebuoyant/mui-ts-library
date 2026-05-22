import { Box, FormHelperText } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { SqlEditorTranslation } from "./SqlEditor.types";

type SqlEditorFooterProps = {
  helperText?:      string;
  error?:           boolean;
  showLineColumn?:  boolean;
  showErrorCount?:  boolean;
  diagnosticsCount: number;
  cursorLine:       number;
  cursorCol:        number;
  translation:      SqlEditorTranslation;
};

export function SqlEditorFooter({
  helperText,
  error,
  showLineColumn,
  showErrorCount,
  diagnosticsCount,
  cursorLine,
  cursorCol,
  translation: t,
}: SqlEditorFooterProps) {
  const lineColLabel = t.lineColumn
    .replace("{line}", String(cursorLine))
    .replace("{col}",  String(cursorCol));

  const errorLabel = t.errorCount.replace("{count}", String(diagnosticsCount));

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mt: 0.5, px: 0.5 }}>
      <Box>
        {showErrorCount && diagnosticsCount > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <WarningAmberIcon sx={{ fontSize: "0.875rem", color: "error.main" }} />
            <FormHelperText sx={{ color: "error.main", m: 0 }}>{errorLabel}</FormHelperText>
          </Box>
        )}
        <FormHelperText error={error}>{helperText ?? ""}</FormHelperText>
      </Box>
      {showLineColumn && (
        <FormHelperText sx={{ color: "text.disabled", fontFamily: "monospace", whiteSpace: "nowrap" }}>
          {lineColLabel}
        </FormHelperText>
      )}
    </Box>
  );
}

import { Box, FormHelperText } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlinedIcon       from "@mui/icons-material/ErrorOutlined";
import type { JsonEditorTranslation } from "./JsonEditor.types";

type JsonEditorFooterProps = {
  helperText?:     string;
  error?:          boolean;
  showLineColumn?: boolean;
  showValidation?: boolean;
  isValid:         boolean;
  cursorLine:      number;
  cursorCol:       number;
  translation:     JsonEditorTranslation;
};

export function JsonEditorFooter({
  helperText,
  error,
  showLineColumn,
  showValidation,
  isValid,
  cursorLine,
  cursorCol,
  translation: t,
}: JsonEditorFooterProps) {
  const lineColLabel = t.lineColumn
    .replace("{line}", String(cursorLine))
    .replace("{col}",  String(cursorCol));

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mt: 0.5, px: 0.5 }}>
      <Box>
        {showValidation && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {isValid ? (
              <CheckCircleOutlinedIcon
                sx={{ fontSize: "0.875rem", color: "success.main" }}
                data-testid="json-valid-icon"
              />
            ) : (
              <ErrorOutlinedIcon
                sx={{ fontSize: "0.875rem", color: "error.main" }}
                data-testid="json-invalid-icon"
              />
            )}
            <FormHelperText sx={{ color: isValid ? "success.main" : "error.main", m: 0 }}>
              {isValid ? t.validJson : t.invalidJson}
            </FormHelperText>
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

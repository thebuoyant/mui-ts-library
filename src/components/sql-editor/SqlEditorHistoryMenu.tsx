import { useState } from "react";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import type { SqlEditorTranslation } from "./SqlEditor.types";
import type { SqlQueryHistoryEntry } from "./util/sqlQueryHistory.util";

function truncate(sql: string, maxLength = 60): string {
  const singleLine = sql.replace(/\s+/g, " ").trim();
  return singleLine.length > maxLength ? `${singleLine.slice(0, maxLength)}…` : singleLine;
}

type SqlEditorHistoryMenuProps = {
  history:     SqlQueryHistoryEntry[];
  onSelect:    (sql: string) => void;
  onClear:     () => void;
  translation: SqlEditorTranslation;
  disabled?:   boolean;
};

export function SqlEditorHistoryMenu({
  history,
  onSelect,
  onClear,
  translation: t,
  disabled,
}: SqlEditorHistoryMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function close() { setAnchorEl(null); }

  function handleSelect(sql: string) {
    onSelect(sql);
    close();
  }

  function handleClear() {
    onClear();
    close();
  }

  return (
    <>
      <Tooltip title={t.history} arrow>
        <span>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            disabled={disabled}
            aria-label={t.history}
          >
            <HistoryIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        slotProps={{ paper: { sx: { minWidth: 280, maxWidth: 400 } } }}
      >
        {history.length === 0 && (
          <MenuItem disabled>
            <ListItemText>{t.historyEmpty}</ListItemText>
          </MenuItem>
        )}

        {history.map((entry) => (
          <MenuItem key={entry.timestamp} onClick={() => handleSelect(entry.sql)}>
            <ListItemText
              primary={truncate(entry.sql)}
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {new Date(entry.timestamp).toLocaleString()}
                </Typography>
              }
              slotProps={{ primary: { sx: { fontFamily: "monospace", fontSize: "0.8125rem" } } }}
            />
          </MenuItem>
        ))}

        {history.length > 0 && <Divider />}

        {history.length > 0 && (
          <MenuItem onClick={handleClear}>
            <ListItemIcon><DeleteSweepIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText sx={{ color: "error.main" }}>{t.clearHistory}</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

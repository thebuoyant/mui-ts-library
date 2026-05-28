import { useState } from "react";
import { type Editor } from "@tiptap/react";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { type RichTextEditorTranslation } from "./RichTextEditor.types";

type RichTextEditorTableMenuProps = {
  editor:      Editor | null;
  translation: RichTextEditorTranslation;
  disabled?:   boolean;
};

export function RichTextEditorTableMenu({
  editor,
  translation: t,
  disabled,
}: RichTextEditorTableMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isDisabled  = disabled || !editor;
  const isInTable   = editor?.isActive("table") ?? false;

  function close() { setAnchorEl(null); }

  function run(fn: () => void) {
    fn();
    close();
  }

  return (
    <>
      <Tooltip title={t.table} arrow>
        <span>
          <IconButton
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            disabled={isDisabled}
            color={isInTable ? "primary" : "default"}
            sx={{ borderRadius: 1 }}
            aria-label={t.table}
            aria-pressed={isInTable}
          >
            <TableChartIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        slotProps={{ paper: { sx: { minWidth: 220 } } }}
      >
        <MenuItem onClick={() => run(() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}>
          <ListItemIcon><TableChartIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t.insertTable}</ListItemText>
        </MenuItem>

        {isInTable && <Divider />}

        {isInTable && (
          <MenuItem onClick={() => run(() => editor?.chain().focus().addRowBefore().run())}>
            <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{t.addRowBefore}</ListItemText>
          </MenuItem>
        )}
        {isInTable && (
          <MenuItem onClick={() => run(() => editor?.chain().focus().addRowAfter().run())}>
            <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{t.addRowAfter}</ListItemText>
          </MenuItem>
        )}
        {isInTable && (
          <MenuItem onClick={() => run(() => editor?.chain().focus().deleteRow().run())}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText sx={{ color: "error.main" }}>{t.deleteRow}</ListItemText>
          </MenuItem>
        )}

        {isInTable && <Divider />}

        {isInTable && (
          <MenuItem onClick={() => run(() => editor?.chain().focus().addColumnBefore().run())}>
            <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{t.addColumnBefore}</ListItemText>
          </MenuItem>
        )}
        {isInTable && (
          <MenuItem onClick={() => run(() => editor?.chain().focus().addColumnAfter().run())}>
            <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{t.addColumnAfter}</ListItemText>
          </MenuItem>
        )}
        {isInTable && (
          <MenuItem onClick={() => run(() => editor?.chain().focus().deleteColumn().run())}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText sx={{ color: "error.main" }}>{t.deleteColumn}</ListItemText>
          </MenuItem>
        )}

        {isInTable && <Divider />}

        {isInTable && (
          <MenuItem onClick={() => run(() => editor?.chain().focus().deleteTable().run())}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText sx={{ color: "error.main" }}>{t.deleteTable}</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

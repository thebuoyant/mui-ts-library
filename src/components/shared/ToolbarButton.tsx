import { IconButton, Tooltip } from "@mui/material";

export type ToolbarButtonProps = {
  label:     string;
  icon:      React.ReactNode;
  onClick:   () => void;
  active?:   boolean;
  disabled?: boolean;
};

/**
 * Gemeinsamer Toolbar-Button für SqlEditor, JsonEditor und RichTextEditor.
 * Tooltip mit Arrow, kleines Icon-Format, optionaler Active-State (primary color).
 * onMouseDown preventDefault verhindert Fokus-Verlust im Editor beim Klick.
 */
export function ToolbarButton({ label, icon, onClick, active, disabled }: ToolbarButtonProps) {
  return (
    <Tooltip title={label} arrow>
      <span>
        <IconButton
          size="small"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onClick}
          disabled={disabled}
          color={active ? "primary" : "default"}
          sx={{ borderRadius: 1 }}
          aria-label={label}
          aria-pressed={active}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}

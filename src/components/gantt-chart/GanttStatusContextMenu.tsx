import { Menu, MenuItem } from "@mui/material";
import { useGanttTranslations } from "./GanttChart";
import type { GanttTaskNode, GanttTaskStatus } from "./GanttChart.types";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type ContextMenuState = {
  task:   GanttTaskNode;
  mouseX: number;
  mouseY: number;
};

type GanttStatusContextMenuProps = {
  contextMenu: ContextMenuState | null;
  onClose:     () => void;
  /** Wird aufgerufen wenn der User einen Status wählt. Business-Logik (Store-Update,
   *  Callbacks) bleibt in GanttTimeline — diese Komponente ist rein präsentational. */
  onSelect:    (task: GanttTaskNode, status: GanttTaskStatus) => void;
};

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

/**
 * Rechtsklick-Kontextmenü für schnellen Statuswechsel eines Gantt-Balkens.
 * Übersetzungen werden intern via useGanttTranslations() gelesen.
 */
export function GanttStatusContextMenu({ contextMenu, onClose, onSelect }: GanttStatusContextMenuProps) {
  const t = useGanttTranslations();

  const labels: Record<GanttTaskStatus, string> = {
    planned:       t.statusPlanned,
    "in-progress": t.statusInProgress,
    done:          t.statusDone,
    blocked:       t.statusBlocked,
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      {(["planned", "in-progress", "done", "blocked"] as GanttTaskStatus[]).map((s) => (
        <MenuItem
          key={s}
          selected={contextMenu?.task.status === s}
          data-testid={`gantt-status-menu-${s}`}
          onClick={() => {
            if (!contextMenu) return;
            onSelect(contextMenu.task, s);
          }}
        >
          {labels[s]}
        </MenuItem>
      ))}
    </Menu>
  );
}

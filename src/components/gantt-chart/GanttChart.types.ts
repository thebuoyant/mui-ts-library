export type GanttTaskStatus = "planned" | "in-progress" | "done" | "blocked";

export type GanttTimeScale = "days" | "weeks" | "months" | "quarters";

export type GanttTask = {
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
};

// Interner Knoten für den aufgebauten Task-Baum — nicht Teil der öffentlichen API.
export type GanttTaskNode = GanttTask & {
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
};

export type GanttChartProps = {
  tasks: GanttTask[];
  timeScale?: GanttTimeScale;
  height?: number | string;
  onTaskClick?: (task: GanttTask) => void;
  onMilestoneClick?: (task: GanttTask) => void;
  onAddTask?: (parentTask?: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
};

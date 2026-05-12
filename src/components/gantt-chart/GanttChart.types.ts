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

// Alle Texte die der GanttChart rendert — für einfache Lokalisierung überschreibbar.
export type GanttTranslations = {
  // Toolbar — Skalen-Buttons
  scaleDays: string;
  scaleWeeks: string;
  scaleMonths: string;
  scaleQuarters: string;
  // Toolbar — Datumsbereich
  rangeFrom: string;
  rangeTo: string;
  rangeResetTooltip: string;
  // Task-Panel — Spalten-Header
  columnName: string;
  columnStatus: string;
  // Status-Labels (Chip + Kontextmenü)
  statusPlanned: string;
  statusInProgress: string;
  statusDone: string;
  statusBlocked: string;
  // Timeline — Wochen-Prefix (z. B. "KW" → "W" für Englisch)
  weekColumnPrefix: string;
  // Locale für die Datums-Formatierung im Timeline-Header
  dateLocale: string;
};

// Standardwerte entsprechen dem aktuell gerenderten Verhalten (DE Toolbar, EN Status).
export const DEFAULT_GANTT_TRANSLATIONS: GanttTranslations = {
  scaleDays: "Tage",
  scaleWeeks: "Wochen",
  scaleMonths: "Monate",
  scaleQuarters: "Quartale",
  rangeFrom: "Von",
  rangeTo: "Bis",
  rangeResetTooltip: "Bereich zurücksetzen",
  columnName: "Name",
  columnStatus: "Status",
  statusPlanned: "Planned",
  statusInProgress: "In Progress",
  statusDone: "Done",
  statusBlocked: "Blocked",
  weekColumnPrefix: "KW",
  dateLocale: "de-DE",
};

export type GanttChartProps = {
  tasks: GanttTask[];
  timeScale?: GanttTimeScale;
  /** Höhe des Charts. "auto" = 100 % des Eltern-Containers. Standard: 400. */
  height?: number | string;
  /** Breite des Charts. "auto" = 100 % des Eltern-Containers. Standard: "100%". */
  width?: number | string;
  // Wenn true, startet der Chart mit allen Knoten aufgeklappt statt nur den Root-Tasks.
  initialExpandAll?: boolean;
  // Toolbar mit Skalen-Switcher und Datumsbereich ein-/ausblenden (Standard: true).
  showToolbar?: boolean;
  // Optionaler initialer Sichtbereich — überschreibt die automatische Berechnung aus den Tasks.
  defaultRangeStart?: Date;
  defaultRangeEnd?: Date;
  // Texte überschreiben für einfache Lokalisierung — nur abweichende Keys angeben.
  translations?: Partial<GanttTranslations>;
  onTaskClick?: (task: GanttTask) => void;
  onMilestoneClick?: (task: GanttTask) => void;
  onAddTask?: (parentTask?: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
};

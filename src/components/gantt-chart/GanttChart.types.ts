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
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
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
  // Timeline — Heute-Chip über der gestrichelten Linie (leer = kein Chip)
  /** @since 2.0.0 */
  todayLabel?: string;
  // Locale für die Datums-Formatierung im Timeline-Header
  dateLocale: string;
  // Dialoge — Titel und Buttons
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  // Dialoge — Formularfelder
  dialogFieldName: string;
  dialogFieldStartDate: string;
  dialogFieldEndDate: string;
  dialogFieldStatus: string;
  dialogFieldMilestone: string;
  dialogFieldParent: string;
  dialogFieldParentNone: string;
  // Dialoge — Bestätigungstext ({name} wird durch den Task-Namen ersetzt)
  dialogDeleteConfirm: string;
  // Dialoge — Vorgänger-Multiselect
  dialogFieldDependencies: string;
  dialogFieldDependenciesNone: string;
  /** Label for the progress slider in the task dialog (0–100 %) @since 3.16.0 */
  dialogFieldProgress?: string;
  /** "All" option label in the assignee filter dropdown @since 3.17.0 */
  filterAssigneeAll?: string;
  /** Assignee filter Select label in the toolbar @since 3.17.0 */
  filterAssigneeLabel?: string;
  // Task-Panel — Aktions-Spalten-Header
  columnActions: string;
  /** Header label for the Assignee column — shown when showAssigneeColumn=true @since 2.7.0 */
  columnAssignee?: string;
  // Task-Panel — Zeilen-Icon-Tooltips
  addTaskTooltip: string;
  editTaskTooltip: string;
  deleteTaskTooltip: string;
  // Toolbar — Heute-Button + Expand/Collapse + Reset
  scrollToTodayTooltip: string;
  expandAllTooltip: string;
  collapseAllTooltip: string;
  resetViewTooltip: string;
  /** Toolbar tooltip for the CSV export button @since 2.7.0 */
  exportCsvTooltip?: string;
};

// Standardwerte entsprechen dem aktuell gerenderten Verhalten (DE Toolbar, EN Status).
export const DEFAULT_GANTT_TRANSLATIONS: Required<GanttTranslations> = {
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
  todayLabel: "Heute",
  dateLocale: "de-DE",
  dialogAddTitle: "Aufgabe hinzufügen",
  dialogEditTitle: "Aufgabe bearbeiten",
  dialogDeleteTitle: "Aufgabe löschen",
  dialogSave: "Speichern",
  dialogCancel: "Abbrechen",
  dialogDelete: "Löschen",
  dialogFieldName: "Name",
  dialogFieldStartDate: "Startdatum",
  dialogFieldEndDate: "Enddatum",
  dialogFieldStatus: "Status",
  dialogFieldMilestone: "Ist Meilenstein",
  dialogFieldParent: "Übergeordnete Aufgabe",
  dialogFieldParentNone: "— Keine —",
  dialogDeleteConfirm: "Soll die Aufgabe \"{name}\" wirklich gelöscht werden?",
  dialogFieldDependencies: "Vorgänger",
  dialogFieldDependenciesNone: "— Keine —",
  dialogFieldProgress: "Fortschritt (%)",
  filterAssigneeAll: "Alle",
  filterAssigneeLabel: "Assignee",
  scrollToTodayTooltip: "Zum heutigen Tag",
  expandAllTooltip: "Alle aufklappen",
  collapseAllTooltip: "Alle zuklappen",
  resetViewTooltip: "Ansicht zurücksetzen",
  columnActions: "Aktionen",
  columnAssignee: "Assignee",
  exportCsvTooltip: "Als CSV exportieren",
  addTaskTooltip: "Aufgabe hinzufügen",
  editTaskTooltip: "Aufgabe bearbeiten",
  deleteTaskTooltip: "Aufgabe löschen",
};

// Überschreibt die Standard-Balkenfarben je Status — CSS-Farbwerte oder MUI-Theme-Keys.
export type GanttStatusColors = Partial<Record<GanttTaskStatus, string>>;

// Gebündeltes Theming-Objekt — fasst alle visuellen Konfigurationsoptionen zusammen.
// Einzelne Keys überschreiben die MUI-Palette-Defaults; nicht gesetzte Keys behalten das Standard-Aussehen.
export type GanttTheme = {
  // Per-Status-Balkenfarben (CSS-Farbwerte).
  statusColors?: GanttStatusColors;
  // Farbe des kritischen-Pfad-Indikators (Default: error.main).
  criticalPathColor?: string;
  // Farbe der Meilenstein-Raute (Default: warning.main).
  milestoneColor?: string;
  // Farbe der Heute-Linie (Default: primary.main).
  todayLineColor?: string;
  // Hintergrundfarbe der Wochenend-Spalten (Default: action.hover).
  weekendColor?: string;
  // Hintergrundfarbe der Feiertags-Spalten (Default: warmes Amber, ~18 % Opacity).
  // Feiertage werden immer anders gefärbt als Wochenenden damit man sie auf einen Blick unterscheiden kann.
  holidayColor?: string;
  // Eckenradius der Aufgaben-Balken in Pixeln (Default: 4).
  barBorderRadius?: number;
};

// Feingranulare Konfiguration der Toolbar-Elemente — alle Felder optional (Default: true/sichtbar).
export type GanttToolbarConfig = {
  showScaleDays?: boolean;
  showScaleWeeks?: boolean;
  showScaleMonths?: boolean;
  showScaleQuarters?: boolean;
  showExpandCollapseAll?: boolean;
  showScrollToToday?: boolean;
  showDateRange?: boolean;   // Von/Bis-Inputs
  showRangeReset?: boolean;  // Restore-Button (erscheint wenn Bereich angepasst)
  showResetView?: boolean;   // Reset-Button (Skala + Bereich zurücksetzen)
  /** Show CSV export button in the toolbar (default: false) */
  showExportCSV?: boolean;
  /** Show assignee filter dropdown in toolbar (default: false) */
  showAssigneeFilter?: boolean;
};

export type GanttChartProps = {
  // Wenn true, werden beim Verschieben/Resizen alle Finish-to-Start-Nachfolger automatisch mitverschoben.
  cascadeDependencies?: boolean;
  // Optionaler initialer Sichtbereich — überschreibt die automatische Berechnung aus den Tasks.
  defaultRangeEnd?: Date;
  defaultRangeStart?: Date;
  // Drag & Drop — Balken horizontal verschieben (Default: false).
  draggable?: boolean;
  // Wenn true (Standard), öffnen Add/Edit/Delete-Icons MUI-Dialoge statt Callbacks direkt aufzurufen.
  enableBuiltinDialogs?: boolean;
  // Gebündeltes Theming-Objekt — überschreibt alle visuellen Defaults auf einmal.
  ganttTheme?: GanttTheme;
  /** Höhe des Charts. "auto" = 100 % des Eltern-Containers. Standard: 400. */
  height?: number | string;
  // Wenn true, startet der Chart mit allen Knoten aufgeklappt statt nur den Root-Tasks.
  initialExpandAll?: boolean;
  // Doppelklick auf Task-Namen startet Inline-Editierung (Default: false).
  inlineEdit?: boolean;
  // Maximalbreite des linken Panels in Pixeln (Standard: 600).
  maxPanelWidth?: number;
  // Mindestbreite des linken Panels in Pixeln (Standard: 200).
  minPanelWidth?: number;
  // Fortschritt per Drag am Progress-Handle direkt im Balken setzen (Default: false).
  progressDraggable?: boolean;
  // Resize — endDate am rechten Balkenrand per Drag ändern (Default: false).
  resizable?: boolean;
  // Hebt den kritischen Pfad (längste Abhängigkeitskette) farbig hervor (Default: false).
  showCriticalPath?: boolean;
  // Toolbar mit Skalen-Switcher und Datumsbereich ein-/ausblenden (Standard: true).
  showToolbar?: boolean;
  // Überschreibt die Standard-Balkenfarben je Status — beliebige CSS-Farbwerte.
  // @deprecated — bitte `ganttTheme.statusColors` verwenden.
  statusColors?: GanttStatusColors;
  tasks: GanttTask[];
  timeScale?: GanttTimeScale;
  // Feingranulare Toolbar-Konfiguration — nur abweichende Keys angeben, Rest bleibt sichtbar.
  toolbarConfig?: GanttToolbarConfig;
  // Texte überschreiben für einfache Lokalisierung — nur abweichende Keys angeben.
  translations?: Partial<GanttTranslations>;
  // Wenn true, werden nur sichtbare Zeilen gerendert (für 200+ Tasks empfohlen). Default: false.
  virtualizeRows?: boolean;
  /** Show the Assignee column in the task panel (default: false) */
  showAssigneeColumn?: boolean;
  /**
   * Arbeitstag-Wochentag-Indices (0=So, 1=Mo … 6=Sa). Default: [] (kein Snap).
   * Wenn gesetzt, aktiviert Drag-Snap (Start/End landen auf einem Arbeitstag),
   * Cascade-Advance und farblich unterschiedliche Nicht-Arbeitstags-Spalten in der Tages-Skala.
   * Typischer Wert: [1,2,3,4,5] für Mo–Fr.
   */
  workdays?: number[];
  /**
   * Konkrete Feiertage (z. B. gesetzliche Feiertage, Betriebsferien) die als
   * Nicht-Arbeitstage gelten, unabhängig davon welcher Wochentag sie sind.
   * Werden in der Tages-Skala grau hinterlegt und mit einem Punkt markiert.
   */
  holidays?: Date[];
  /** Breite des Charts. "auto" = 100 % des Eltern-Containers. Standard: "100%". */
  width?: number | string;
  // Wenn true, ändert Strg+Mausrad die Zeitskala (days ↔ weeks ↔ months ↔ quarters).
  zoomable?: boolean;
  // Callbacks
  onAddTask?: (parentTask?: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onEditTask?: (task: GanttTask) => void;
  onMilestoneClick?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
  onTaskClick?: (task: GanttTask) => void;
  // Dialog-Callbacks — werden nur ausgelöst wenn enableBuiltinDialogs=true
  onTaskCreated?: (task: GanttTask) => void;
  onTaskDeleted?: (taskId: string) => void;
  /**
   * Fired once when the user presses the mouse button on a draggable bar (before any movement).
   * Use this for optimistic UI, analytics, or showing a shadow element during drag.
   * `type` distinguishes between a move gesture and a resize gesture.
   * @since 3.17.0
   */
  onDragStart?: (task: GanttTask, type: "move" | "resize") => void;
  onTaskMoved?: (task: GanttTask, newStart: Date, newEnd: Date) => void;
  onTaskResized?: (task: GanttTask, newEnd: Date) => void;
  // Wird nach jeder CRUD-Aktion mit der vollständigen aktuellen Task-Liste aufgerufen.
  onTasksChange?: (tasks: GanttTask[]) => void;
  /**
   * Fired when the user clicks the CSV export button.
   * The first argument is the ready-to-download CSV string.
   * When not provided, the chart triggers a browser download automatically.
   */
  onExportCSV?: (csv: string, tasks: GanttTask[]) => void;
  onTaskUpdated?: (task: GanttTask) => void;
};

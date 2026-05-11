import type { GanttTask, GanttTaskNode } from "../GanttChart.types";

// ---------------------------------------------------------------------------
// Timeline-Bereich
// ---------------------------------------------------------------------------

export type TimelineRange = {
  start: Date;
  end: Date;
};

/**
 * Berechnet den frühesten Start und das späteste Ende aller Tasks.
 * Liefert einen Puffer von einem Monat auf jeder Seite, damit Balken
 * nie bündig am Rand der Timeline kleben.
 */
export function getTimelineRange(tasks: GanttTask[]): TimelineRange {
  if (tasks.length === 0) {
    const now = new Date();
    return { start: startOfMonth(now), end: addMonths(now, 3) };
  }

  const starts = tasks.map((t) => t.startDate.getTime());
  const ends = tasks.map((t) => t.endDate.getTime());

  return {
    start: startOfMonth(new Date(Math.min(...starts))),
    end: endOfMonth(new Date(Math.max(...ends))),
  };
}

// ---------------------------------------------------------------------------
// Balken-Positionierung
// ---------------------------------------------------------------------------

export type TaskPosition = {
  // Prozentualer Abstand vom linken Rand der Timeline (0–100).
  left: number;
  // Prozentuale Breite innerhalb der Timeline (0–100).
  width: number;
};

/**
 * Berechnet Left und Width eines Balkens relativ zur gesamten Timeline.
 * Meilensteine (isMilestone=true) erhalten eine Mindestbreite von 0,
 * da sie als Punkt/Raute statt als Balken gerendert werden.
 */
export function calculateTaskPosition(
  task: GanttTask,
  range: TimelineRange,
): TaskPosition {
  const total = range.end.getTime() - range.start.getTime();

  if (total <= 0) {
    return { left: 0, width: 0 };
  }

  const left =
    ((task.startDate.getTime() - range.start.getTime()) / total) * 100;
  const width =
    ((task.endDate.getTime() - task.startDate.getTime()) / total) * 100;

  return {
    left: Math.max(0, left),
    width: Math.max(0, width),
  };
}

// ---------------------------------------------------------------------------
// Task-Baum
// ---------------------------------------------------------------------------

/**
 * Baut aus einer flachen Task-Liste einen verschachtelten Baum auf.
 * Voraussetzung: parentId referenziert eine id, die in derselben Liste vorhanden ist.
 */
export function buildTaskTree(tasks: GanttTask[]): GanttTaskNode[] {
  const nodeMap = new Map<string, GanttTaskNode>();

  for (const task of tasks) {
    nodeMap.set(task.id, { ...task, children: [], depth: 0 });
  }

  const roots: GanttTaskNode[] = [];

  for (const node of nodeMap.values()) {
    if (node.parentId && nodeMap.has(node.parentId)) {
      nodeMap.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  // Tiefe rekursiv setzen, damit der Baum korrekt eingerückt werden kann.
  assignDepth(roots, 0);

  return roots;
}

function assignDepth(nodes: GanttTaskNode[], depth: number): void {
  for (const node of nodes) {
    node.depth = depth;
    assignDepth(node.children, depth + 1);
  }
}

/**
 * Gibt die sichtbare, geordnete Flachliste zurück, abhängig davon welche
 * Knoten aufgeklappt sind. Root-Tasks sind immer sichtbar.
 */
export function getVisibleTasks(
  nodes: GanttTaskNode[],
  expandedIds: Set<string>,
): GanttTaskNode[] {
  const result: GanttTaskNode[] = [];

  function collect(nodeList: GanttTaskNode[]): void {
    for (const node of nodeList) {
      result.push(node);
      if (node.children.length > 0 && expandedIds.has(node.id)) {
        collect(node.children);
      }
    }
  }

  collect(nodes);
  return result;
}

// ---------------------------------------------------------------------------
// Datum-Hilfsfunktionen (keine externe Abhängigkeit nötig)
// ---------------------------------------------------------------------------

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

/**
 * Gibt alle Monatsersten zwischen start und end zurück.
 * Wird für den Timeline-Header benötigt.
 */
export function getMonthsInRange(range: TimelineRange): Date[] {
  const months: Date[] = [];
  let current = startOfMonth(range.start);

  while (current <= range.end) {
    months.push(current);
    current = addMonths(current, 1);
  }

  return months;
}

// ---------------------------------------------------------------------------
// Wochen-Hilfsfunktionen
// ---------------------------------------------------------------------------

/** Gibt den Montag der Woche zurück, die das gegebene Datum enthält (ISO 8601). */
export function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=So, 1=Mo, ..., 6=Sa
  // Sonntag (0) liegt 6 Tage nach Montag, alle anderen Tage liegen (day-1) Tage nach Montag.
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Berechnet die ISO-8601-Kalenderwoche.
 * Woche 1 = die Woche mit dem ersten Donnerstag des Jahres.
 */
export function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayOfWeek = d.getUTCDay() || 7; // 1=Mo ... 7=So
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek); // Donnerstag dieser Woche
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/** Gibt alle Wochenanfänge (Montage) zwischen start und end zurück. */
export function getWeeksInRange(range: TimelineRange): Date[] {
  const weeks: Date[] = [];
  let current = startOfWeek(range.start);

  while (current <= range.end) {
    weeks.push(new Date(current));
    // +7 Tage — Date-Konstruktor normalisiert Monats-/Jahresübergänge automatisch.
    current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
  }

  return weeks;
}

// ---------------------------------------------------------------------------
// Quartals-Hilfsfunktionen
// ---------------------------------------------------------------------------

export type QuarterLabel = {
  key: string;   // z. B. "2025-Q2"
  label: string; // z. B. "Q2 2025"
  start: Date;
};

export function startOfQuarter(date: Date): Date {
  const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;
  return new Date(date.getFullYear(), quarterStartMonth, 1, 0, 0, 0, 0);
}

export function endOfQuarter(date: Date): Date {
  const quarterEndMonth = Math.floor(date.getMonth() / 3) * 3 + 2;
  return endOfMonth(new Date(date.getFullYear(), quarterEndMonth, 1));
}

/**
 * Gibt alle Quartalsstarts zwischen start und end zurück.
 * Beginnt immer am Quartalsbeginn, der start enthält.
 */
export function getQuartersInRange(range: TimelineRange): QuarterLabel[] {
  const result: QuarterLabel[] = [];
  let current = startOfQuarter(range.start);

  while (current <= range.end) {
    const q = (Math.floor(current.getMonth() / 3) + 1) as 1 | 2 | 3 | 4;
    result.push({
      key: `${current.getFullYear()}-Q${q}`,
      label: `Q${q} ${current.getFullYear()}`,
      start: new Date(current),
    });
    current = new Date(current.getFullYear(), current.getMonth() + 3, 1);
  }

  return result;
}

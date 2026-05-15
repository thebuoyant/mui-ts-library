import type { GanttTask, GanttTaskNode, GanttTimeScale } from "../GanttChart.types";

// ---------------------------------------------------------------------------
// Timeline-Bereich
// ---------------------------------------------------------------------------

export type TimelineRange = {
  start: Date;
  end: Date;
};

/**
 * Standardbereich = aktuelles Quartal. Hat der Task-Set Daten außerhalb dieses Quartals,
 * wird der Bereich auf beiden Seiten mit einem Monat Puffer erweitert — er wird nie verkleinert.
 */
export function getTimelineRange(tasks: GanttTask[]): TimelineRange {
  const now = new Date();
  const quarterStart = startOfQuarter(now);
  const quarterEnd = endOfQuarter(now);

  if (tasks.length === 0) {
    return { start: quarterStart, end: quarterEnd };
  }

  const starts = tasks.map((t) => t.startDate.getTime());
  const ends = tasks.map((t) => t.endDate.getTime());
  const taskStart = startOfMonth(addMonths(new Date(Math.min(...starts)), -1));
  const taskEnd = endOfMonth(addMonths(new Date(Math.max(...ends)), 1));

  return {
    start: taskStart < quarterStart ? taskStart : quarterStart,
    end: taskEnd > quarterEnd ? taskEnd : quarterEnd,
  };
}

// Skala-spezifische Erweiterung des timelineRange auf Spalten-Grenzen.
// Wird von GanttTimeline und GanttChartInner (für scrollToToday) geteilt.
export function getDisplayRange(timelineRange: TimelineRange, timeScale: GanttTimeScale): TimelineRange {
  if (timeScale === "weeks") {
    return { start: startOfWeek(timelineRange.start), end: timelineRange.end };
  }
  if (timeScale === "quarters") {
    return { start: startOfQuarter(timelineRange.start), end: endOfQuarter(timelineRange.end) };
  }
  return timelineRange;
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

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 0, 0, 0, 0);
}

/**
 * Verschiebt alle Finish-to-Start-Nachfolger des geänderten Tasks um dasselbe Zeit-Delta.
 * Läuft via BFS durch den Abhängigkeitsgraphen — zyklische Abhängigkeiten werden durch
 * das `visited`-Set abgefangen.
 */
export function cascadeDateUpdate(
  tasks: GanttTask[],
  changedTaskId: string,
  deltaMs: number,
): GanttTask[] {
  if (deltaMs === 0) return tasks;

  // Vorgänger→Nachfolger-Map aufbauen.
  const successorMap = new Map<string, string[]>();
  for (const task of tasks) {
    for (const depId of task.dependencies ?? []) {
      if (!successorMap.has(depId)) successorMap.set(depId, []);
      successorMap.get(depId)!.push(task.id);
    }
  }

  const updatedMap = new Map<string, GanttTask>(tasks.map((t) => [t.id, t]));
  const queue = [...(successorMap.get(changedTaskId) ?? [])];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const succId = queue.shift()!;
    if (visited.has(succId)) continue;
    visited.add(succId);

    const succ = updatedMap.get(succId)!;
    updatedMap.set(succId, {
      ...succ,
      startDate: new Date(succ.startDate.getTime() + deltaMs),
      endDate: new Date(succ.endDate.getTime() + deltaMs),
    });

    queue.push(...(successorMap.get(succId) ?? []));
  }

  // Original-Reihenfolge beibehalten.
  return tasks.map((t) => updatedMap.get(t.id)!);
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
// Tages-Hilfsfunktionen
// ---------------------------------------------------------------------------

/** Gibt alle Tage (Mitternacht) zwischen start und end zurück (inklusive). */
export function getDaysInRange(range: TimelineRange): Date[] {
  const days: Date[] = [];
  let current = new Date(
    range.start.getFullYear(),
    range.start.getMonth(),
    range.start.getDate(),
    0, 0, 0, 0,
  );
  const endMidnight = new Date(
    range.end.getFullYear(),
    range.end.getMonth(),
    range.end.getDate(),
    0, 0, 0, 0,
  ).getTime();

  while (current.getTime() <= endMidnight) {
    days.push(new Date(current));
    current = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + 1,
      0, 0, 0, 0,
    );
  }

  return days;
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

// ---------------------------------------------------------------------------
// Kritischer Pfad (Critical Path Method)
// ---------------------------------------------------------------------------

/**
 * Berechnet den kritischen Pfad: alle Tasks, von denen aus über Finish-to-Start-Abhängigkeiten
 * das globale Projektende erreichbar ist.
 *
 * Algorithmus: Für jeden Task wird per DFS (mit Memoization) das späteste Enddatum berechnet,
 * das über seine Nachfolger-Kette erreichbar ist. Tasks, deren Wert dem globalen Maximum
 * entspricht, bilden den kritischen Pfad.
 *
 * Zirkuläre Abhängigkeiten werden durch einen `inStack`-Guard abgefangen.
 */
export function computeCriticalPath(tasks: GanttTask[]): Set<string> {
  if (tasks.length === 0) return new Set();

  // Nachfolger-Map aufbauen: Vorgänger-ID → Liste der Nachfolger-IDs.
  const successorMap = new Map<string, string[]>();
  for (const task of tasks) {
    for (const predId of (task.dependencies ?? [])) {
      if (!successorMap.has(predId)) successorMap.set(predId, []);
      successorMap.get(predId)!.push(task.id);
    }
  }

  const taskMap = new Map(tasks.map((t) => [t.id, t]));
  const memo = new Map<string, number>();
  const inStack = new Set<string>();

  function latestReachable(taskId: string): number {
    if (memo.has(taskId)) return memo.get(taskId)!;
    // Zyklus-Guard: Task bereits auf dem aktuellen DFS-Stack → eigenes endDate zurückgeben.
    if (inStack.has(taskId)) return taskMap.get(taskId)?.endDate.getTime() ?? 0;
    inStack.add(taskId);
    const task = taskMap.get(taskId);
    let result = task?.endDate.getTime() ?? 0;
    for (const succId of (successorMap.get(taskId) ?? [])) {
      result = Math.max(result, latestReachable(succId));
    }
    inStack.delete(taskId);
    memo.set(taskId, result);
    return result;
  }

  for (const t of tasks) latestReachable(t.id);

  const projectEnd = Math.max(...memo.values());
  const critical = new Set<string>();
  for (const t of tasks) {
    if (latestReachable(t.id) === projectEnd) critical.add(t.id);
  }
  return critical;
}

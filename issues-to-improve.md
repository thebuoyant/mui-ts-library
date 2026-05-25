# Issues to Improve

Gesammelte Refactoring- und Code-Quality-Aufgaben für `@thebuoyant-tsdev/mui-ts-library`.
Wird am Ende jeder Session aktualisiert — so starten wir morgen optimal.

Branch: `refactor/code-quality`

---

## Legende

- 🔴 Priorität 1 — größter Impact, zuerst angehen
- 🟡 Priorität 2 — wichtig, aber abhängig von P1
- 🟢 Priorität 3 — polish, nice to have

---

## 🔴 DRY-Verletzungen — sofort beheben

### [DRY-1] `ToolbarButton` dreifach dupliziert

Identische (oder fast identische) Komponente in drei Dateien:
- `src/components/sql-editor/SqlEditorToolbar.tsx:40`
- `src/components/json-editor/JsonEditorToolbar.tsx:29`
- `src/components/rich-text-editor/RichTextEditorToolbar.tsx:46`

**Fix:** Gemeinsame Datei `src/components/shared/ToolbarButton.tsx` mit allen Varianten (mit `active`-Prop, ohne). Von allen drei Toolbars importieren.

---

### [DRY-2] `normalizeSize()` dreifach dupliziert

Identische Funktion in drei Dateien:
- `src/components/rich-text-editor/RichTextEditor.tsx:21`
- `src/components/sql-editor/SqlEditor.tsx:13`
- `src/components/json-editor/JsonEditor.tsx:13`

**Fix:** `src/components/shared/normalizeSize.ts` — einmal, überall importieren.

---

### [DRY-3] Gantt Status-Farb-Maps dupliziert

`BAR_COLOR` in `GanttTimeline.tsx:33` und `STATUS_DOT_COLOR` + `STATUS_CHIP_COLOR` in `GanttTaskPanel.tsx:16/23` — alle bilden denselben Status → Farbe ab.

**Fix:** Alle Status-Farb-Maps in `GanttChart.constants.ts` zusammenführen. Beide Dateien importieren daraus.

---

## 🔴 Sub-Komponenten-Extraktion — GanttTimeline.tsx (811 Zeilen)

Die größte Datei im Projekt. Folgende Teile müssen raus:

### [GANTT-1] `renderBarRow` → `GanttBarRow` Komponente

`renderBarRow` ist eine Inline-Closure-Funktion innerhalb des JSX-Returns (Zeile 493–701). Bei jedem Render neu erstellt, nicht testbar, zu groß.

**Fix:** Eigene Datei `GanttBarRow.tsx` — Props: `task`, `activeDrag`, `displayRange`, `totalWidth`, Callbacks. Dann in GanttTimeline importieren.

---

### [GANTT-2] Drag-Logik → `useGanttDrag` Hook

`handleBarMouseDown` (Zeile 336–394) und `handleProgressMouseDown` (396–450) plus alle zugehörigen Refs sind ~120 Zeilen reine Drag-Logik in einer Render-Komponente.

**Fix:** `src/components/gantt-chart/hooks/useGanttDrag.ts` — gibt `activeDrag`, `handleBarMouseDown`, `handleProgressMouseDown` zurück.

---

### [GANTT-3] Dependency-Arrows → `GanttDependencyArrows` Komponente

Der SVG-Layer (Zeile 754–807) ist eigenständig genug für eine eigene Komponente.

**Fix:** `GanttDependencyArrows.tsx` — Props: `dependencyLines`, `todayX`, `totalWidth`, `height`, `arrowMarkerId`, Theme-Farben.

---

### [GANTT-4] Status-Context-Menu → `GanttStatusContextMenu` Komponente

Das `<Menu>` für Rechtsklick-Statuswechsel (Zeile 714–752) ist vollständig isolierbar.

**Fix:** `GanttStatusContextMenu.tsx` — Props: `contextMenu`, `onClose`, `onStatusChange`, Translations.

---

### [GANTT-5] Weekend-Strips → `GanttWeekendStrips` Komponente

Die Wochenend-Hintergrund-Schicht (Zeile 462–489) ist vollständig isolierbar.

**Fix:** `GanttWeekendStrips.tsx` — Props: `weekendStrips`, `totalWidth`, `height`, `weekendColor`.

---

## 🟡 Sub-Komponenten-Extraktion — weitere Dateien

### [PSM-1] `PasswordStrengthMeter.tsx` — Strength Bar extrahieren

Der Fortschrittsbalken (Zeile 178–208) könnte eine `PasswordStrengthBar`-Komponente werden.

**Fix:** `PasswordStrengthBar.tsx` — Props: `percent`, `color`. Besser testbar, wiederverwendbar.

---

### [RTE-1] `RichTextEditorToolbar.tsx` — H1/H2/H3 Icons vereinheitlichen

Drei identische Komponenten `H1Icon`, `H2Icon`, `H3Icon` (Zeile 106–114):
```tsx
function H1Icon() { return <Box ...>H1</Box>; }
function H2Icon() { return <Box ...>H2</Box>; }
function H3Icon() { return <Box ...>H3</Box>; }
```

**Fix:** `function HeadingIcon({ level }: { level: 1 | 2 | 3 })` — eine Komponente.

---

### [GANTT-6] `GanttTaskPanel.tsx` — `GanttTaskRow` ist gut, aber Status-Menü dupliziert GanttTimeline

`GanttTaskRow` hat ein eigenes Status-Menü per Zeile. `GanttTimeline` hat ebenfalls ein Context-Menu. Beide nutzen `getStatusLabel`. 

**Fix:** Nach [DRY-3] und [GANTT-4] automatisch gelöst.

---

## 🟡 Konsistenz zwischen Komponenten

### [CONS-1] `SqlEditor` hat `showErrorCount`, `JsonEditor` hat `showValidation` — beide meinen dasselbe Konzept

Unterschiedliche Prop-Namen für dasselbe Muster (Footer-Status-Anzeige).

**Fix:** Nicht umbenennen (Breaking Change), aber in Doku einheitlich erklären und in zukünftigen Komponenten `showStatus` verwenden.

---

### [CONS-2] Fehlender `onClear`-Callback in SqlEditor und JsonEditor

`RichTextEditor` hat `onClear`? Check ob alle Code-Editoren einen `onClear`-Callback anbieten — Konsistenz.

**Status:** Zu prüfen.

---

### [CONS-3] GanttChart hat kein `helperText`/`error`-Prop

Alle Code-Editoren und PasswordStrengthMeter haben `error` + `helperText` für Form-Integration. GanttChart nicht.

**Fix:** Nicht notwendig (GanttChart ist kein Form-Field), aber in Doku erklären warum.

---

## 🟢 Code Cleanliness

### [CLEAN-1] Import-Reihenfolge nicht konsistent

Manche Dateien: React → externe Deps → MUI → lokale Imports.
Andere Dateien: Gemischt.

**Fix:** ESLint `import/order` Regel konfigurieren oder manuell vereinheitlichen.

---

### [CLEAN-2] Kommentare in Deutsch, Code-Identifiers auf Englisch — gut, aber nicht 100% konsistent

Einige Inline-Kommentare auf Englisch, die meisten auf Deutsch.

**Fix:** Alle Inline-Kommentare auf Deutsch (oder alle auf Englisch — entscheiden).

---

## Session-Log

| Datum | Was erledigt | Was noch offen |
|---|---|---|
| 2026-05-25 | Branch angelegt, alle Issues analysiert und dokumentiert | Alles oben noch offen |

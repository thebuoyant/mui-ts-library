# Issues to Improve

Gesammelte Refactoring- und Code-Quality-Aufgaben für `@thebuoyant-tsdev/mui-ts-library`.
Wird am Ende jeder Session aktualisiert — so starten wir morgen optimal.

Branch: `MTL-15`

---

## Legende

- 🔴 Priorität 1 — größter Impact, zuerst angehen
- 🟡 Priorität 2 — wichtig, aber abhängig von P1
- 🟢 Priorität 3 — polish, nice to have

---

## 🔴 DRY-Verletzungen — sofort beheben ✅ Alle erledigt

### [DRY-1] `ToolbarButton` dreifach dupliziert — ✅ Erledigt 2026-05-25

`src/components/shared/ToolbarButton.tsx` erstellt, in SqlEditorToolbar, JsonEditorToolbar, RichTextEditorToolbar importiert.

---

### [DRY-2] `normalizeSize()` dreifach dupliziert — ✅ Erledigt 2026-05-25

`src/components/shared/normalizeSize.ts` erstellt, in SqlEditor, JsonEditor, RichTextEditor importiert.

---

### [DRY-3] Gantt Status-Farb-Maps dupliziert — ✅ Erledigt 2026-05-25

`STATUS_BAR_COLOR` und `STATUS_CHIP_COLOR` in `GanttChart.constants.ts` zusammengeführt. GanttTimeline und GanttTaskPanel importieren daraus.

---

## 🔴 Sub-Komponenten-Extraktion — GanttTimeline.tsx (811 → ~300 Zeilen) ✅ Alle erledigt

### [GANTT-2] Drag-Logik → `useGanttDrag` Hook — ✅ Erledigt 2026-05-25

`src/components/gantt-chart/hooks/useGanttDrag.ts` erstellt. Dokumentiert 4 Muster für komplexe Interaktions-Hooks.

---

### [GANTT-1] `renderBarRow` → `GanttBarRow` Komponente — ✅ Erledigt 2026-05-25

`GanttBarRow.tsx` mit Sub-Komponenten `GanttMilestoneBar`, `GanttTaskBar`, `DragTooltip`. Theme intern via `useGanttTheme()`.

---

### [GANTT-3] Dependency-Arrows → `GanttDependencyArrows` Komponente — ✅ Erledigt 2026-05-25

`GanttDependencyArrows.tsx` — SVG-Layer mit Abhängigkeitspfeilen und Today-Line. Theme intern via `useTheme()` + `useGanttTheme()`.

---

### [GANTT-4] Status-Context-Menu → `GanttStatusContextMenu` Komponente — ✅ Erledigt 2026-05-25

`GanttStatusContextMenu.tsx` — rein präsentational, Business-Logik (Store-Update, Callbacks) bleibt in GanttTimeline via `onSelect`-Prop.

---

### [GANTT-5] Weekend-Strips → `GanttWeekendStrips` Komponente — ✅ Erledigt 2026-05-25

`GanttWeekendStrips.tsx` — `weekendColor` intern via `useGanttTheme()`.

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
| 2026-05-25 | Branch angelegt (MTL-15), alle Issues analysiert und dokumentiert | Alles oben noch offen |
| 2026-05-25 | DRY-1, DRY-2, DRY-3 erledigt; GANTT-2, GANTT-1, GANTT-3, GANTT-4, GANTT-5 erledigt | PSM-1, RTE-1, GANTT-6, CONS-*, CLEAN-* |

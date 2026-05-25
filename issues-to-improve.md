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

## 🟡 Sub-Komponenten-Extraktion — weitere Dateien ✅ Alle erledigt

### [PSM-1] `PasswordStrengthMeter.tsx` — Strength Bar extrahieren — ✅ Erledigt 2026-05-25

`PasswordStrengthBar.tsx` erstellt — Props: `percent`, `color`, `ariaLabel`. In PasswordStrengthMeter importiert.

---

### [RTE-1] `RichTextEditorToolbar.tsx` — H1/H2/H3 Icons vereinheitlichen — ✅ Erledigt 2026-05-25

`H1Icon`, `H2Icon`, `H3Icon` → `HeadingIcon({ level: 1 | 2 | 3 })`. Alle drei Usages aktualisiert.

---

### [GANTT-6] `GanttTaskPanel.tsx` — `GanttTaskRow` ist gut, aber Status-Menü dupliziert GanttTimeline

`GanttTaskRow` hat ein eigenes Status-Menü per Zeile. `GanttTimeline` hat ebenfalls ein Context-Menu. Beide nutzen `getStatusLabel`. 

**Fix:** Nach [DRY-3] und [GANTT-4] automatisch gelöst.

---

## 🟡 Konsistenz zwischen Komponenten

### [CONS-1] `SqlEditor` hat `showErrorCount`, `JsonEditor` hat `showValidation` — ✅ Entschieden 2026-05-25

Unterschiedliche Prop-Namen für dasselbe Muster (Footer-Status-Anzeige).

**Entscheidung:** Nicht umbenennen — wäre ein Breaking Change für bestehende Nutzer. Bestehende Namen bleiben. In zukünftigen Komponenten wird `showStatus` als einheitlicher Name verwendet. In den User-Manuals ist der Zweck beider Props klar erklärt.

---

### [CONS-2] Fehlender `onClear`-Callback in SqlEditor und JsonEditor — ✅ Geprüft 2026-05-25

Keiner der drei Editoren (SqlEditor, JsonEditor, RichTextEditor) hat einen `onClear`-Callback — kein Handlungsbedarf, da konsistent.

---

### [CONS-3] GanttChart hat kein `helperText`/`error`-Prop — ✅ Entschieden 2026-05-25

Alle Code-Editoren und PasswordStrengthMeter haben `error` + `helperText` für Form-Integration. GanttChart nicht.

**Entscheidung:** Kein `error`/`helperText` nötig — GanttChart ist kein Formular-Feld sondern ein eigenständiges Planungs-Widget. Eingetragen in User Manual unter "Notes and Known Limitations".

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
| 2026-05-25 | PSM-1, RTE-1 erledigt; CONS-2 geprüft (konsistent, kein Fix nötig) | CONS-1, CONS-3 (Doku), CLEAN-1 (ESLint), CLEAN-2 (Kommentarsprache) |
| 2026-05-25 | CONS-1, CONS-3 entschieden und dokumentiert; README auf npm-only; CHANGELOG v1.0.0 komplett nachgepflegt | CLEAN-1 (ESLint import/order), CLEAN-2 (Kommentarsprache) — separate Session |

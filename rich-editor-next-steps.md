# RichTextEditor — Next Steps

Roadmap für geplante Erweiterungen des `RichTextEditor`.  
Basis: `component-features-nice-to-have.md` — RichTextEditor-Abschnitt.

---

## Legende

- 🟢 Aufwand: Niedrig
- 🟡 Aufwand: Mittel
- 🔴 Aufwand: Hoch

---

## Phase 1 — Quick Wins ✅ ERLEDIGT (v1.4.0 — 2026-05-26)

**Ziel:** Sofort spürbarer Mehrwert, wenig Aufwand, keine neuen Dependencies.  
**Version:** `1.4.0`

| ID | Feature | Aufwand | Status |
|---|---|---|---|
| RTE-QW-1 | Word Count | 🟢 Niedrig | ✅ Implementiert |
| RTE-QW-2 | Full Screen Mode | 🟢 Niedrig | ✅ Implementiert |

### Ergebnisse Phase 1

- `showWordCount`-Prop → Wörter-Zähler im Footer, neben Zeichen-Zähler (`showCharacterCount`)
- `toolbarConfig.showFullscreenButton` (opt-in, Standard `false`) → Button rechts in Toolbar; CSS `position: fixed` — kein neues Paket
- 3 neue Translation-Keys: `wordCount`, `fullscreen`, `exitFullscreen`
- 2 neue Stories: `WithWordCount`, `WithFullscreen`
- 9 neue Tests (313 gesamt, alle grün)
- CHANGELOG.md + CHANGELOG.de.md: v1.4.0 eingetragen
- User Manual (EN + DE): neue Abschnitte "Word Count" und "Fullscreen Mode"

---

## Phase 2 — Content Enrichment

**Ziel:** Reichhaltigere Inhalte — Tabellen, Bilder, Emojis.  
**Version:** `1.5.0` (Minor)

| ID | Feature | Aufwand | Beschreibung |
|---|---|---|---|
| RTE-CE-1 | Tabellen | 🟡 Mittel | Tiptap `@tiptap/extension-table` — Toolbar-Button öffnet Zeilen/Spalten-Picker |
| RTE-CE-2 | Bild-Embed | 🟡 Mittel | `<img>` per URL einfügen — Toolbar-Button öffnet Mini-Dialog mit URL-Input |
| RTE-CE-3 | Emoji Picker | 🟡 Mittel | 😀-Button öffnet Popover mit Suchfeld und häufigen Emojis |

### Ergebnisse Phase 2

- Tabellen: neuer `showTableButton`-Prop; Tiptap Table-Extension als neue `peerDependency` oder direkt gebündelt (evaluieren)
- Tabellen: Zeilen/Spalten über Context-Menu bearbeiten (add/remove row, add/remove column)
- Bild-Embed: neuer `showImageButton`-Prop; Dialog mit URL-Eingabe + optionalem Alt-Text
- Emoji Picker: neuer `showEmojiButton`-Prop; leichtgewichtiges Emoji-Paket evaluieren (z.B. `emoji-mart`) oder einfache Unicode-Liste
- Alle drei Features sind prop-gesteuert und standardmäßig `false` (opt-in)
- i18n: alle Labels/Tooltips übersetzbar
- Storybook: je eine neue Story
- Tests: je mind. 3 neue Vitest-Tests
- CHANGELOG + User Manual aktualisiert

---

## Phase 3 — Power Features

**Ziel:** Editor-Erfahrung auf Notion-Niveau — Mention, Slash Commands, Formeln, Diff.  
**Version:** `1.6.0` (Minor)

| ID | Feature | Aufwand | Beschreibung |
|---|---|---|---|
| RTE-PF-1 | Slash Commands (/) | 🔴 Hoch | Kontextmenü beim Tippen von `/` — Blöcke einfügen (Heading, Liste, Tabelle, Bild …) |
| RTE-PF-2 | Mention (@) | 🔴 Hoch | Personen/Entitäten per `@` referenzieren — `mentionSuggestions`-Prop mit Autocomplete |
| RTE-PF-3 | Mathformel (KaTeX) | 🔴 Hoch | `$$`-Block für LaTeX-Formeln via Tiptap Mathematics Extension + KaTeX |
| RTE-PF-4 | Diff View | 🔴 Hoch | Zwei HTML-Strings vergleichen in einem readonly Split-View |

### Ergebnisse Phase 3

- Slash Commands: `showSlashCommands`-Prop (boolean); Tiptap Suggestion-Extension als Basis; verfügbare Blöcke sind konfigurierbar
- Mention: `mentionSuggestions: MentionItem[]`-Prop + `onMentionSearch?: (query: string) => Promise<MentionItem[]>` für async; `MentionItem` als exportierter Typ
- KaTeX: `showMathButton`-Prop; `katex` als peerDependency; Render im Editor + im Output-HTML
- Diff View: separater `RichTextEditorDiff`-Export mit Props `oldValue: string` und `newValue: string` (readonly, kein Tiptap-Editor nötig — reines HTML-Diff)
- Alle Features opt-in via Props
- i18n vollständig
- Storybook je eine Story
- Tests je mind. 3 Vitest-Tests
- CHANGELOG + User Manual aktualisiert

---

## Offene Entscheidungen

| # | Frage | Auswirkung |
|---|---|---|
| OD-1 | Emoji Picker: `emoji-mart` (vollständig, 45 kB) vs. einfache Unicode-Liste (leichtgewichtig) | Paketgröße |
| OD-2 | Tiptap Table: als `peerDependency` oder direkt gebündelt? | Bundle-Größe, User-Erfahrung |
| OD-3 | Diff View: eigene Implementierung oder `diff`-npm-Paket als Basis? | Aufwand, Präzision |
| OD-4 | Reihenfolge Phase 2 & 3: Kann Emoji Picker vorgezogen werden (Aufwand Niedrig–Mittel)? | Release-Kadenz |

---

## Session-Log

| Datum | Was erledigt | Was noch offen |
|---|---|---|
| 2026-05-25 | Datei angelegt, 3 Phasen + offene Entscheidungen definiert | Alles oben noch offen |
| 2026-05-26 | Phase 1 vollständig implementiert (v1.4.0) — Word Count + Fullscreen, 9 Tests, Stories, Doku | Phase 2 (Content Enrichment, v1.5.0): Tabellen, Bild-Embed, Emoji Picker |
| 2026-05-26 | Library-wide: Props A-Z für alle 7 Komponenten abgeschlossen (TagSelection, GanttChart, ConfirmDialog + vorher JsonEditor, SqlEditor, PasswordStrengthMeter, RichTextEditor). 313/313 Tests grün. Alle types, stories, Manuale (EN+DE) konsistent. | Phase 2 unverändert |

# RichTextEditor — Next Steps

Roadmap für geplante Erweiterungen des `RichTextEditor`.  
Basis: `component-features-nice-to-have.md` — RichTextEditor-Abschnitt.

---

## Legende

- 🟢 Aufwand: Niedrig
- 🟡 Aufwand: Mittel
- 🔴 Aufwand: Hoch

---

## Phase 1 — Quick Wins

**Ziel:** Sofort spürbarer Mehrwert, wenig Aufwand, keine neuen Dependencies.  
**Version:** `1.4.0` (Minor — neue Props/Features, keine Breaking Changes)

| ID | Feature | Aufwand | Beschreibung |
|---|---|---|---|
| RTE-QW-1 | Word Count | 🟢 Niedrig | Wörter- und Zeichen-Zähler im Footer — neuer `showWordCount`-Prop |
| RTE-QW-2 | Full Screen Mode | 🟢 Niedrig | Editor nimmt den gesamten Viewport ein — neuer `fullScreenButton`-Prop in der Toolbar |

### Ergebnisse Phase 1

- `RichTextEditor` hat zwei neue optionale Props: `showWordCount` und `fullScreenButton`
- Wort-/Zeichen-Zähler erscheint im Footer neben dem bestehenden Zeichen-Zähler (`showCharacterCount`)
- Full-Screen-Button in der Toolbar: Editor expandiert auf 100vw × 100vh mit eigenem Close-Button
- Full-Screen nutzt MUI `Modal` oder CSS `position: fixed` — kein neues Paket
- i18n: beide Features vollständig übersetzbar (`RichTextEditorTranslation` erweitern)
- Storybook: je eine neue Story
- Tests: je mind. 3 neue Vitest-Tests
- CHANGELOG + User Manual aktualisiert

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

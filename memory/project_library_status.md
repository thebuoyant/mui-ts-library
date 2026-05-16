---
name: project-library-status
description: Aktueller Stand aller drei Komponenten in mui-ts-library — Phasen, Tests, Exports
metadata:
  type: project
---

Stand: 2026-05-16. 237 Tests grün (10 Test-Dateien).

**Why:** Vollständige Referenz für Einstieg in neue Sessions ohne erneutes Lesen aller Dateien.

**How to apply:** Zu Beginn einer neuen Session kurz prüfen ob der Stand noch stimmt (`npx vitest run` → Anzahl Tests).

---

## GanttChart

Vollständig implementiert. Keine offenen Phasen bekannt.

Features: Drag & Drop, Resize, Zoom (Strg+Rad), Inline-Edit, Fortschritts-Drag, kritischer Pfad, Meilensteine, Abhängigkeiten mit Cascade, Toolbar-Konfiguration, Virtualisierung, Status-Kontextmenü, eingebaute Dialoge, GanttTheme.

Auffälligkeit: `DEFAULT_GANTT_TRANSLATIONS` sind auf Deutsch (Toolbar) und Englisch (Status-Labels) — historisch gewachsen, noch nicht normalisiert.

Kickoff-Datei: `claude-gantt-kickoff.md` im Root.

---

## PasswordStrengthMeter

Vollständig implementiert (Phasen 1–4 abgeschlossen).

Features: Input + Sichtbarkeits-Toggle, animierter Stärke-Balken, Anforderungscheckliste, Form-Integration (name, inputRef, disabled, error, helperText, autoComplete), kontrollierter und unkontrollierter Modus, vollständige i18n inkl. Aria-Labels.

Scoring-Algorithmus in `util/password-strength.util.ts` — deterministisch, clientseitig.

Kickoff-Datei: `claude-psm-kickoff.md` im Root.

---

## TagSelection

Vollständig professionalisiert in dieser Session (2026-05-16).

Features: Autocomplete-Suche, Chip-Anzeige, disabled (global), loading (async), maxTags mit Hinweistext, allowCreate + onTagCreate (freie Texteingabe), semantische und Custom-Colors, Dark-Mode-kompatibel.

State-Management: Zustand Vanilla Store intern; externe Synchronisation über tags-Prop + Callbacks.

Neue Props in dieser Session: `disabled`, `loading`, `maxTags`, `allowCreate`, `onTagCreate`.
Neue Translation-Keys: `loadingText`, `createTagLabel` ({query}-Platzhalter), `maxTagsReachedText`.

Kein Kickoff-Dokument vorhanden (anders als GanttChart und PSM).

---

## Gemeinsame Struktur (alle Komponenten)

- Typen in `*.types.ts` — exportierte `DEFAULT_*`-Konstanten
- Stories in `*.stories.tsx` — meta args + argTypes + fn() + dedizierte Stories
- Tests in `*.test.tsx` / `*.test.ts` — Vitest + @testing-library/react
- Alles re-exportiert aus `src/index.ts`
- Kein CSS — nur MUI `sx`-Prop

---

## Dokumentation

- `README.md` im Root — vollständige API-Referenz für alle drei Komponenten
- `user-manuals/GanttChart.md` — detailliertes Benutzerhandbuch (Deutsch, Confluence-ready)
- `user-manuals/TagSelection.md` — detailliertes Benutzerhandbuch (Deutsch, Confluence-ready)
- `user-manuals/PasswordStrengthMeter.md` — detailliertes Benutzerhandbuch (Deutsch, Confluence-ready)

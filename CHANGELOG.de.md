# Changelog

> [English Version →](CHANGELOG.md)

Alle wesentlichen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-05-21

Erste öffentliche Veröffentlichung von `@thebuoyant-tsdev/mui-ts-library`.

### Hinzugefügt

#### GanttChart
- Hierarchische Projekt-Zeitleiste mit ein-/ausklappbaren Aufgabengruppen
- Meilenstein-Marker mit eigenem visuellen Stil
- Drag-and-Drop zum Umsortieren von Zeilen via `@dnd-kit`
- Abhängigkeitspfeile zwischen Aufgaben
- Zoom-Stufen: Tag, Woche, Monat, Quartal
- Integrierte CRUD-Dialoge zum Erstellen, Bearbeiten und Löschen von Aufgaben
- Heute-Linie mit Auto-Scroll
- Virtualisiertes Zeilen-Rendering für große Datensätze
- Vollständige i18n-Unterstützung über `translation`-Prop
- Dark-Mode-Unterstützung via MUI-Theme

#### TagSelection
- Multi-Tag-Selektor mit Autocomplete-Suche
- Optionaler Tag-Erstellungsmodus (`allowCreate`) mit Enter-Taste als Shortcut
- Konfigurierbare Chip-Größe und maximale Anzahl sichtbarer Chips
- Alphabetische Sortierung der ausgewählten Chips und Dropdown-Optionen
- `onTagCreate`-Callback zum Persistieren neu erstellter Tags
- Vollständige i18n-Unterstützung über `translation`-Prop
- Dark-Mode-Unterstützung via MUI-Theme

#### PasswordStrengthMeter
- Passwort-Eingabe mit Live-Stärkebewertung (0–4 Stufen)
- Konfigurierbare Anforderungsliste für Passwort-Regeln
- Sichtbarkeits-Umschalter
- Anpassbare Stärkebezeichnungen über `translation`-Prop
- Dark-Mode-Unterstützung via MUI-Theme

#### RichTextEditor
- WYSIWYG-Editor auf Basis von TipTap v3 und ProseMirror
- Toolbar: Fett, Kursiv, Unterstrichen, Durchgestrichen, Überschriften (H1–H3), Aufzählung, Nummerierte Liste, Zitat, Code-Block, Link, Trennlinie, Textfarbe, Hervorheben, Rückgängig/Wiederholen, Formatierung löschen
- Konfigurierbare Toolbar über `toolbarConfig`-Prop (einzelne Buttons ein-/ausblenden)
- Textfarbe und Hervorhebung mit Farbpalette und nativem Browser-Farbwähler
- Dialog zum Einfügen und Bearbeiten von Links
- Zeichenzähler mit optionalem Hartlimit (`maxCharacters`)
- Kontrollierter Modus über `value` / `onChange`
- Ausgabeformat: `"html"` (Standard) oder `"json"`
- Markdown-zu-Rich-Text-Konvertierung beim Einfügen
- `readonly`-Modus (ohne Toolbar) und `disabled`-Modus
- Native Formular-Integration über verstecktes `<input type="hidden">`
- `error`-Zustand und `helperText` — konsistent mit MUI TextField
- `onBlur`- / `onFocus`-Callbacks
- Konfigurierbare `height` und `width` (Zahl → px, CSS-Strings, `"auto"` für Flex-Container)
- Vollständige i18n-Unterstützung über `translation`-Prop
- Dark-Mode-Unterstützung via MUI-Theme

#### Allgemein
- Dualer ESM + CJS Output (`dist/index.js` / `dist/index.cjs`)
- Vollständige TypeScript-Deklarationen (`.d.ts`) für alle Komponenten und Typen
- Tree-Shakeable (`sideEffects: false`)
- Peer-Dependencies: React 19, MUI 9, Emotion
- Storybook-10-Stories für alle Komponenten
- 271 Unit-Tests mit Vitest und Testing Library
- Zweisprachige Dokumentation: Englisch (`*.md`) und Deutsch (`*.de.md`)

---

## [Unveröffentlicht]

_Noch keine unveröffentlichten Änderungen._

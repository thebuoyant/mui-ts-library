# Komponentenideen

Sammlung von Komponentenideen für zukünftige Erweiterungen der `mui-ts-library`. Alle Vorschläge adressieren reale Implementierungslücken im MUI-Alltag — sie sind in MUI entweder gar nicht oder nur in der kostenpflichtigen MUI X Variante verfügbar.

---

## Eingabe & Formulare

### OTP / PIN-Input
Mehrteilige Eingabe für 2FA- und SMS-Verifizierungscodes. Einzelne Felder pro Ziffer, automatisches Weiterschalten (Auto-Advance), Paste-Support für den gesamten Code.

### Telefonnummer-Input
Ländervorwahl-Selector (Flagge + Dial-Code) kombiniert mit formatierter Texteingabe und Validierung via `libphonenumber`.

### Currency / Number-Input
Locale-aware formatiertes Zahlenfeld (`1.234,56 €`), Min/Max/Step-Unterstützung. Das native `<input type="number">` ist für kaufmännische Eingaben unbrauchbar.

### IBAN / Kreditkarten-Input
Auto-Masking mit Leerzeichen-Formatierung, Issuer-Erkennung und passendem Icon (Visa, Mastercard etc.). Fintech-Standard.

### Datei-Dropzone
Drag & Drop Upload mit Dateivorschau (Bilder, PDF), Dateitypfilter, Größenvalidierung und Multi-File-Support.

---

## Auswahl & Navigation

### Country / Language-Selector
Flagge + Name + Suche, häufig verwendete Länder oben angeheftet. Ein einfaches `<Select>` skaliert bei 250 Einträgen nicht mehr sinnvoll.

### Command Palette (⌘K)
Spotlight-artiger Modal für app-weite Actions und Seitennavigation. In modernen Dashboards inzwischen Standard-UX-Pattern.

### Notification Center
Bell-Icon mit Dropdown, Read/Unread-Status, Zeitstempel und optionaler Gruppierung nach Typ. Jedes Dashboard braucht das — niemand baut es gern von Grund auf neu.

---

## Darstellung & Feedback

### JSON Tree Viewer
Collapsible Key/Value-Baum mit Syntax-Coloring und Copy-Button. Unverzichtbar in DevTools, API-Explorern und Debug-Ansichten.

### Rich Text Editor
WYSIWYG-Block auf Basis TipTap oder Quill, vollständig mit MUI-Theme gestylt (Toolbar, Buttons, Farben). Für CMS, E-Mail-Templates und Kommentarfelder.

### Inline Date-Range-Picker
Sichtbarer Doppel-Kalender für Start/End-Auswahl ohne Modal-Öffnung. MUI X hat `DateRangePicker`, aber nur in der kostenpflichtigen Variante.

---

## Upload & Medien

### Image Cropper
Zuschneiden, Rotieren und Zoomen direkt im Browser vor dem Upload. Ohne das landen Profilbilder regelmäßig im falschen Seitenverhältnis.

### Color Picker
Hex/RGB/HSL-Eingabe, visuelles Farbfeld und Swatch-Liste — nahtlos ins MUI-Theme integriert. Für Branding-Einstellungen und Design-Tools.

---

## Layout & Struktur

### Multi-Step Form Wizard
Gesteuertes Formular mit Stepper, schrittweiser Validierung (React Hook Form-kompatibel) und Back/Next/Submit-Navigation. Onboarding-Flows sind ohne das sehr mühsam.

### Kanban Board
Drag & Drop zwischen Statusspalten, virtualisierte Cards für große Listen, konfigurierbare Spaltendefinition. Klassisches Widget für Projekt- und Task-Management-Anwendungen.

---

## Priorität (subjektiv — nach Häufigkeit im Alltag)

| # | Komponente | Begründung |
|---|---|---|
| 1 | **OTP / PIN-Input** | 2FA ist in jeder modernen App Pflicht |
| 2 | **Datei-Dropzone** | Upload-Features sind allgegenwärtig |
| 3 | **Multi-Step Form Wizard** | Onboarding-Flows in fast jedem Produkt |
| 4 | **Notification Center** | Jedes Dashboard, immer wieder neu gebaut |
| 5 | **Command Palette** | Hoher UX-Mehrwert, komplexe Eigenimplementierung |

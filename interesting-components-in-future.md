# Interesting Components for the Future

Neue Komponenten-Ideen, die gut zu einer MUI-basierten Library passen.
Sortiert nach Nutzwert und Nischen-Eignung (was fehlt im Ecosystem).

---

## Priorität 1 — Hoher Nutzwert, gut umsetzbar

### FileUpload
Drag & Drop Datei-Upload mit Fortschrittsbalken, Preview und MUI-Styling.
- Props: `accept`, `maxSize`, `multiple`, `onUpload`, `onError`
- Features: Drag-Overlay, Dateiliste mit Remove-Button, Upload-Progress per File
- Warum: Jede App braucht das, alle MUI-Lösungen sind unbefriedigend

### StatCard / KPI Card
Kennzahl-Karte im Dashboard-Stil: Zahl, Trend-Indikator, Sparkline.
- Props: `value`, `label`, `trend`, `trendLabel`, `color`, `icon`
- Features: Positiv/Negativ-Trend mit Pfeilen, animierter Zähler, Dark Mode
- Warum: Jedes Admin-Panel braucht das, passt perfekt zu MUI Paper

### OTP / PIN Input
Einmalpasswort-Eingabe mit automatischem Fokus-Sprung zwischen Feldern.
- Props: `length`, `onComplete`, `type` (number/alphanumeric), `disabled`
- Features: Paste-Support, Auto-Submit, Backspace-Navigation
- Warum: 2FA ist Standard, MUI hat keine native Lösung

---

## Priorität 2 — Spezialisiert, hohe Nischen-Relevanz

### Timeline / Audit Log
Vertikale Ereignis-Timeline wie ein Aktivitäts-Feed oder Audit-Log.
- Props: `events[]` mit `date`, `title`, `description`, `icon`, `color`
- Features: Kollabierbare Gruppen per Tag/Monat, Infinite Scroll
- Warum: Audit-Logs, Aktivitäts-Streams — kein MUI-Äquivalent

### CommandPalette (Cmd+K)
Globale Suchpalette à la VS Code / Linear / Vercel.
- Props: `commands[]`, `onSelect`, `open`, `onClose`, Keyboard-Shortcut-Config
- Features: Fuzzy Search, Keyboard-Navigation, Gruppen, Icons
- Warum: Moderner UX-Standard, kein MUI-Äquivalent, sehr gefragt

### DataGrid Wrapper
MUI X DataGrid mit sinnvollen Defaults und vereinheitlichter API.
- Props: `rows`, `columns`, `onEdit`, `onDelete`, Pagination, Export CSV
- Features: Inline-Edit, Bulk-Select, Column-Resize, Toolbar mit Search
- Warum: MUI DataGrid ist mächtig aber komplex — ein opinionated Wrapper hilft

### DateRangePicker
Start- und Enddatum-Auswahl in einem Popover-Kalender.
- Props: `startDate`, `endDate`, `onChange`, `minDate`, `maxDate`, `presets[]`
- Features: Schnell-Presets (letzte 7 Tage, letzter Monat), Single-/Two-Month-View
- Warum: MUI X DatePicker existiert, aber DateRangePicker fehlt in der Free-Version

---

## Priorität 3 — Nice to Have, größerer Aufwand

### Stepper / Wizard
Schritt-für-Schritt-Formular mit Validierung pro Schritt.
- Props: `steps[]`, `activeStep`, `onNext`, `onBack`, `onComplete`
- Features: Linear und non-linear, Schritt-Validierung, Zusammenfassungs-Schritt
- Warum: MUI Stepper ist low-level, ein vollständiger Wizard-Wrapper fehlt

### NotificationCenter
Glocken-Icon mit Dropdown für ungelesene Benachrichtigungen.
- Props: `notifications[]`, `onRead`, `onReadAll`, `onDelete`, `maxHeight`
- Features: Ungelesen-Badge, Zeitstempel, Gruppen, Infinite Scroll
- Warum: Jede SaaS-App hat das, kein MUI-Standard

### ColorPicker
Farb-Auswahl-Komponente mit Hex/RGB/HSL-Input und Palette.
- Props: `value`, `onChange`, `presetColors[]`, `format`
- Features: Gradient-Bar, Opacity-Slider, Copy-Button
- Warum: `RichTextEditorColorPicker` ist bereits intern vorhanden — könnte exported werden

### ImageCropper
Bild-Zuschnitt-Dialog mit Zoom und Rotation.
- Props: `src`, `aspectRatio`, `onCrop`, `circular`
- Features: Drag-to-Crop, Zoom-Slider, Preview
- Warum: Avatar-Upload-Flow ist ein häufiger Use Case

### Breadcrumb mit Overflow
MUI Breadcrumbs mit automatischem Kollaps bei zu vielen Einträgen.
- Props: `items[]`, `maxItems`, `onNavigate`
- Features: Ellipsis-Menü für ausgeblendete Items, Router-Integration
- Warum: MUI Breadcrumbs hat keinen eingebauten Overflow-Mechanismus

---

## Entscheidungskriterien für neue Komponenten

1. **Fehlt im MUI-Standard** — kein Doppeln von MUI-Kernfunktionen
2. **Häufig gebraucht** — jede Business-App braucht das
3. **Komplex genug** — lohnt sich als Library-Komponente vs. schnell selbst bauen
4. **Passt zum Stil** — Dark Mode, TypeScript, MUI-Theme, bilingual

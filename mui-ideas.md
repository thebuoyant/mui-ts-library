# MUI-Komponentenideen

Sammlung von Ideen für zukünftige Erweiterungen der `mui-ts-library`. Alle Vorschläge adressieren reale Implementierungslücken im MUI-Alltag — entweder gar nicht in MUI vorhanden oder nur in der kostenpflichtigen MUI X Variante verfügbar.

**Aktuell implementiert:** GanttChart · PasswordStrengthMeter · RichTextEditor · SqlEditor · TagSelection · ConfirmDialog · JsonEditor

---

## Eingabe & Formulare

### ConfirmDialog + `useConfirm`-Hook ✅ Implementiert
Deklarative API für Bestätigungs-Dialoge statt immer wieder `useState + Dialog + DialogTitle + DialogContent + DialogActions`. Ein `<ConfirmDialogProvider>` und ein Hook: `const confirm = useConfirm(); await confirm({ title: "Löschen?", ... })`. Löst den häufigsten Boilerplate in jeder MUI-App.

### FileUpload / Datei-Dropzone
Drag & Drop Upload mit Dateivorschau (Bilder, PDF), Dateitypfilter, Größenvalidierung und Multi-File-Support. API wie ein MUI TextField: `error`, `helperText`, `disabled`, `accept`, `multiple`. MUI hat keinen nativen Dropzone-Support.

### ColorPicker
Hex/RGB/HSL-Eingabe, visuelles Farbfeld und Swatch-Liste — nahtlos ins MUI-Theme integriert. Für Branding-Einstellungen und Design-Tools. MUI hat keinen eigenen ColorPicker.

### OTP / PIN-Input
Mehrteilige Eingabe für 2FA- und SMS-Verifizierungscodes. Einzelne Felder pro Ziffer, automatisches Weiterschalten (Auto-Advance), Paste-Support für den gesamten Code.

### DateRangePicker (frei)
Sichtbarer Doppel-Kalender für Start/End-Auswahl ohne Modal, mit Presets (Letzte 7 Tage, Dieser Monat, Dieses Quartal …). MUI X hat `DateRangePicker`, aber nur in der kostenpflichtigen Variante.

### Currency / Number-Input
Locale-aware formatiertes Zahlenfeld (`1.234,56 €`), Min/Max/Step-Unterstützung. Das native `<input type="number">` ist für kaufmännische Eingaben unbrauchbar.

### IBAN / Kreditkarten-Input
Auto-Masking mit Leerzeichen-Formatierung, Issuer-Erkennung und passendem Icon (Visa, Mastercard etc.). Fintech-Standard.

### Telefonnummer-Input
Ländervorwahl-Selector (Flagge + Dial-Code) kombiniert mit formatierter Texteingabe und optionaler Validierung via `libphonenumber`.

---

## Editoren & Code

### JsonEditor ✅ Implementiert
Gleiche Basis wie SqlEditor (CodeMirror 6), aber für JSON: Syntax-Highlighting, Live-Linting (ungültiges JSON), Format-Button. Sehr häufiger Use Case in Admin-Panels, DevTools und API-Konfigurationen. Geringer Zusatzaufwand durch Wiederverwendung der SqlEditor-Infrastruktur.

### JsonTreeViewer
Read-only collapsible Key/Value-Baum mit Syntax-Coloring und Copy-Button. Unverzichtbar in DevTools, API-Explorern und Debug-Ansichten — im Gegensatz zum JsonEditor rein zur Darstellung.

---

## Darstellung & Feedback

### StatCard
Die allgegenwärtige Dashboard-Kachel: Zahl + Label + Trend-Pfeil (positiv/negativ) + optional Sparkline. Kein MUI-Standard dafür — wird in jedem Projekt neu gebaut.

### Timeline (Audit-Log)
Interaktiver Verlauf mit Status-Icons, Timestamps und expandierbaren Schritten. MUI hat einen einfachen `Timeline`-Block, aber keinen mit vollem Interaktions-Support. Gut für Audit-Logs, Deployment-Pipelines, Order-Tracking.

### EmptyState
Illustration/Icon + Titel + Beschreibung + CTA-Button. Als standardisierte Slot-Komponente. Wird in jeder App dutzendfach benötigt und immer wieder unterschiedlich implementiert.

### NotificationCenter
Bell-Icon mit Dropdown, Read/Unread-Status, Zeitstempel und optionaler Gruppierung nach Typ. Jedes Dashboard braucht das — niemand baut es gern von Grund auf neu.

---

## Auswahl & Navigation

### DataTable
MUI hat kein vollständiges Table-Widget mit Sort, Pagination, Selektion und Column-Resize — alles vollständig MUI-themed, ohne externe Abhängigkeit wie AG Grid. MUI X hat `DataGrid`, aber wieder hinter Lizenz.

### SidebarNav
Collapsible Sidebar mit verschachtelten Menü-Einträgen, Active-State, Icon-Support, MUI-Theme-Integration. Das Standardproblem bei jeder Admin-App.

### Country / Language-Selector
Flagge + Name + Suche, häufig verwendete Länder oben angeheftet. Ein einfaches `<Select>` skaliert bei 250 Einträgen nicht mehr sinnvoll.

### Command Palette (⌘K)
Spotlight-artiger Modal für app-weite Actions und Seitennavigation. In modernen Dashboards inzwischen Standard-UX-Pattern.

---

## Upload & Medien

### ImageCropper
Zuschneiden, Rotieren und Zoomen direkt im Browser vor dem Upload. Ohne das landen Profilbilder regelmäßig im falschen Seitenverhältnis.

---

## Layout & Struktur

### MultiStepFormWizard
Gesteuertes Formular mit Stepper, schrittweiser Validierung (React Hook Form-kompatibel) und Back/Next/Submit-Navigation. Onboarding-Flows sind ohne das sehr mühsam.

### KanbanBoard
Drag & Drop zwischen Statusspalten, virtualisierte Cards für große Listen, konfigurierbare Spaltendefinition. Klassisches Widget für Projekt- und Task-Management-Anwendungen.

---

## Priorität (nach Aufwand/Nutzen)

| # | Komponente | Begründung | Aufwand |
|---|---|---|---|
| 1 | ~~**ConfirmDialog + `useConfirm`**~~ ✅ | Größter Boilerplate-Pain, jede App braucht das | Klein |
| 2 | ~~**JsonEditor**~~ ✅ | Nutzt SqlEditor-Infra wieder, hoher Mehrwert | Klein–Mittel |
| 3 | **FileUpload** | Kein MUI-Equivalent, klare API | Mittel |
| 4 | **OTP / PIN-Input** | 2FA ist in jeder modernen App Pflicht | Mittel |
| 5 | **StatCard** | Dashboard-Standard, immer wieder neu gebaut | Klein |
| 6 | **EmptyState** | Kleiner Aufwand, große Konsistenz-Wirkung | Klein |
| 7 | **DateRangePicker** | Hohe Nachfrage, MUI X sperrt das hinter Lizenz | Groß |
| 8 | **DataTable** | Mächtiger Ersatz für MUI X DataGrid | Sehr groß |
| 9 | **CommandPalette** | Hoher UX-Mehrwert, komplexe Eigenimplementierung | Groß |
| 10 | **NotificationCenter** | Jedes Dashboard, immer wieder neu gebaut | Mittel |

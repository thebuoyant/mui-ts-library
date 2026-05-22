# Storybook — Docker-Anleitung

> [English Version →](how-to.md)

Willkommen! Dieses Paket ermöglicht es, einen **interaktiven Komponenten-Katalog** der `mui-ts-library` direkt auf deinem Computer zu starten — ohne Entwicklerwerkzeuge. Du brauchst nur **Docker**.

---

## Was werde ich sehen?

Storybook ist ein visueller Katalog aller UI-Komponenten der Bibliothek. Du kannst jede Komponente durchsuchen, verschiedene Einstellungen ausprobieren und genau sehen, wie sie aussieht — alles im Browser.

---

## Was ist in diesem Paket?

| Datei | Zweck |
|---|---|
| `storybook-X.X.X.tar` | Vorgefertigtes Docker-Image — enthält das komplette Storybook |
| `docker-compose.yml` | Docker-Konfiguration |
| `start.sh` | Startskript für **macOS / Linux** |
| `start.bat` | Startskript für **Windows** |
| `how-to.de.md` | Diese Anleitung |

---

## Schritt 1 — Docker Desktop installieren

Falls Docker Desktop noch nicht auf deinem Computer installiert ist, lade es zuerst herunter und installiere es:

| Betriebssystem | Download-Link |
|---|---|
| **Windows** | https://www.docker.com/products/docker-desktop/ |
| **macOS** | https://www.docker.com/products/docker-desktop/ |
| **Linux** | https://docs.docker.com/engine/install/ |

Nach der Installation **Docker Desktop starten** und warten, bis das Docker-Symbol in der Taskleiste / Menüleiste grün (bereit) angezeigt wird.

> **Hinweis:** Docker Desktop ist für den privaten und Bildungs-Einsatz kostenlos.

---

## Schritt 2 — ZIP-Datei entpacken

Die ZIP-Datei (z. B. `storybook-1.1.0.zip`) in einen Ordner deiner Wahl entpacken — zum Beispiel auf dem Schreibtisch oder in den Dokumenten-Ordner.

Es wird ein Ordner namens `storybook-1.1.0` erstellt (die Versionsnummer kann abweichen).

---

## Schritt 3 — Storybook starten

### macOS

1. **Spotlight** mit `Cmd + Leertaste` öffnen, `Terminal` eingeben und **Enter** drücken
2. Zum entpackten Ordner navigieren:
   ```
   cd /Users/DeinName/Desktop/storybook-1.1.0
   ```
   **Tipp:** Den Ordner nach dem Tippen von `cd ` direkt ins Terminal-Fenster ziehen — der Pfad wird automatisch eingefügt.
3. Startskript ausführen:
   ```
   ./start.sh
   ```

### Windows

1. Den entpackten Ordner im **Datei-Explorer** öffnen
2. **`start.bat` doppelklicken**

Das Skript führt folgende Schritte aus:
1. Das vorgefertigte Docker-Image laden (einmalig, dauert ~10–30 Sekunden)
2. Den Storybook-Container starten

---

## Schritt 4 — Im Browser öffnen

Einen beliebigen Browser öffnen und folgende Adresse aufrufen:

**➜ http://localhost:6006**

Der Storybook-Komponenten-Katalog öffnet sich. Du kannst nun alle Komponenten durchsuchen.

---

## Schritt 5 — Storybook stoppen

### macOS / Linux — im Terminal:

```
docker compose down
```

### Windows — im selben Ordner eine Eingabeaufforderung öffnen und ausführen:

```
docker compose down
```

---

## Fehlerbehebung

### „Permission denied" beim Ausführen von start.sh (macOS / Linux)

Einmalig ausführen, um das Skript ausführbar zu machen:
```
chmod +x start.sh
```
Dann `./start.sh` erneut versuchen.

### „Port 6006 ist bereits belegt"

Ein anderes Programm verwendet Port 6006. Die Datei `docker-compose.yml` in einem Texteditor öffnen und den Port ändern:
```yaml
ports:
  - "7000:80"   # Port 7000 verwenden
```
Dann **http://localhost:7000** im Browser öffnen.

### „docker compose: command not found"

Die ältere Syntax mit Bindestrich verwenden:
```
docker-compose up -d
```

### Docker Desktop läuft nicht

Sicherstellen, dass Docker Desktop gestartet ist (das Docker-Symbol in der Taskleiste / Menüleiste sollte sichtbar sein). Dann erneut versuchen.

### Der Browser zeigt „Diese Website ist nicht erreichbar"

Einige Sekunden warten und die Seite neu laden — Docker benötigt manchmal einen Moment, bis der Container vollständig gestartet ist.

---

## Kurzübersicht — Wichtigste Befehle

| Was | Befehl |
|---|---|
| Storybook starten | `./start.sh` (Mac) oder `start.bat` (Windows) |
| Storybook stoppen | `docker compose down` |
| Im Browser öffnen | http://localhost:6006 |
| Status prüfen | `docker compose ps` |
| Logs anzeigen | `docker compose logs` |

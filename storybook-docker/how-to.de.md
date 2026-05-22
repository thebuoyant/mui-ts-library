# Storybook — Docker-Anleitung

> [English Version →](how-to.md)

Willkommen! Dieses Paket ermöglicht es, einen **interaktiven Komponenten-Katalog** der `mui-ts-library` direkt auf deinem Computer zu starten — ohne Entwicklerwerkzeuge. Du brauchst nur **Docker**.

---

## Was werde ich sehen?

Storybook ist ein visueller Katalog aller UI-Komponenten der Bibliothek. Du kannst jede Komponente durchsuchen, verschiedene Einstellungen ausprobieren und genau sehen, wie sie aussieht — alles im Browser.

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

## Schritt 3 — Terminal öffnen

Du benötigst ein **Terminal** (Eingabeaufforderung) und musst zum entpackten Ordner navigieren.

### Windows

1. `Win + R` drücken, `cmd` eingeben und **Enter** drücken
2. Folgendes eingeben (Pfad anpassen):

```
cd C:\Users\DeinName\Desktop\storybook-1.1.0
```

### macOS

1. **Spotlight** mit `Cmd + Leertaste` öffnen, `Terminal` eingeben und **Enter** drücken
2. Folgendes eingeben (Pfad anpassen):

```
cd /Users/DeinName/Desktop/storybook-1.1.0
```

**Tipp für macOS:** Den Ordner nach dem Tippen von `cd ` direkt ins Terminal-Fenster ziehen — der Pfad wird automatisch eingefügt.

---

## Schritt 4 — Storybook starten

Im Terminal folgenden Befehl eingeben und **Enter** drücken:

```
docker compose up -d
```

Docker führt nun folgende Schritte aus:
1. Nginx-Webserver herunterladen (~25 MB, nur beim ersten Start)
2. Das Storybook-Image bauen
3. Den Container im Hintergrund starten

Die Ausgabe sieht etwa so aus — das ist normal:

```
[+] Running 2/2
 ✔ Network storybook_default  Created
 ✔ Container storybook-1      Started
```

---

## Schritt 5 — Im Browser öffnen

Einen beliebigen Browser öffnen und folgende Adresse aufrufen:

**➜ http://localhost:6006**

Der Storybook-Komponenten-Katalog öffnet sich. Du kannst nun alle Komponenten durchsuchen.

---

## Schritt 6 — Storybook stoppen

Wenn du fertig bist, folgenden Befehl im Terminal eingeben, um Docker zu stoppen:

```
docker compose down
```

Das Storybook wird beendet und der Speicher freigegeben. Die Daten bleiben erhalten — mit `docker compose up -d` kann es jederzeit wieder gestartet werden.

---

## Fehlerbehebung

### „Port 6006 ist bereits belegt"

Ein anderes Programm verwendet bereits Port 6006. Einen anderen Port verwenden:

1. Die Datei `docker-compose.yml` in einem Texteditor öffnen (z. B. Notepad unter Windows, TextEdit unter macOS)
2. Die Zeile `- "6006:80"` suchen und `6006` durch eine andere Zahl ersetzen, z. B.:
   ```
   - "7000:80"
   ```
3. Datei speichern und `docker compose up -d` erneut ausführen
4. **http://localhost:7000** im Browser öffnen

### „docker compose: command not found"

Die ältere Syntax mit Bindestrich verwenden:

```
docker-compose up -d
```

### Docker Desktop läuft nicht

Sicherstellen, dass Docker Desktop gestartet ist (das Docker-Symbol in der Taskleiste / Menüleiste sollte sichtbar sein). Dann den Befehl erneut ausführen.

### Der Browser zeigt „Diese Website ist nicht erreichbar"

Einige Sekunden warten und die Seite neu laden. Docker benötigt manchmal einen Moment, bis der Container vollständig gestartet ist.

---

## Kurzübersicht — Wichtigste Befehle

| Was | Befehl |
|---|---|
| Storybook starten | `docker compose up -d` |
| Storybook stoppen | `docker compose down` |
| Im Browser öffnen | http://localhost:6006 |
| Status prüfen | `docker compose ps` |
| Logs anzeigen | `docker compose logs` |

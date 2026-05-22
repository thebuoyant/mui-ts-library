# Storybook — Docker Setup Guide

> [Deutsche Version →](how-to.de.md)

Welcome! This package lets you run an **interactive component catalog** of the `mui-ts-library` directly on your computer — without any development tools. The only thing you need is **Docker**.

---

## What will I see?

Storybook is a visual catalog of all UI components in the library. You can browse every component, try out different settings, and see exactly how it looks — all in your browser.

---

## What's in this package?

| File | Purpose |
|---|---|
| `storybook-X.X.X.tar` | Pre-built Docker image — contains the complete Storybook |
| `docker-compose.yml` | Docker configuration |
| `start.sh` | Start script for **macOS / Linux** |
| `start.bat` | Start script for **Windows** |
| `how-to.md` | This guide |

---

## Step 1 — Install Docker Desktop

If Docker Desktop is not yet installed on your computer, download and install it first:

| Operating System | Download link |
|---|---|
| **Windows** | https://www.docker.com/products/docker-desktop/ |
| **macOS** | https://www.docker.com/products/docker-desktop/ |
| **Linux** | https://docs.docker.com/engine/install/ |

After installation, **start Docker Desktop** and wait until the Docker icon in the taskbar / menu bar turns green (ready).

> **Note:** Docker Desktop is free for personal and educational use.

---

## Step 2 — Unzip the file

Unzip the ZIP file (e.g. `storybook-1.1.0.zip`) to a folder of your choice — for example your Desktop or Documents folder.

You will get a folder called `storybook-1.1.0` (the version number may vary).

---

## Step 3 — Start Storybook

### macOS

1. Open **Spotlight** with `Cmd + Space`, type `Terminal` and press **Enter**
2. Navigate to the unzipped folder:
   ```
   cd /Users/YourName/Desktop/storybook-1.1.0
   ```
   **Tip:** You can drag the folder into the Terminal window after typing `cd ` — the path is inserted automatically.
3. Run the start script:
   ```
   ./start.sh
   ```

### Windows

1. Open the unzipped folder in **File Explorer**
2. **Double-click `start.bat`**

The script will:
1. Load the pre-built Docker image (one-time, takes ~10–30 seconds)
2. Start the Storybook container

---

## Step 4 — Open in your browser

Open any browser and go to this address:

**➜ http://localhost:6006**

The Storybook component catalog will open. You can now browse all components.

---

## Step 5 — Stop Storybook

### macOS / Linux — in the terminal:

```
docker compose down
```

### Windows — in the same folder, double-click `start.bat` again, or open a command prompt and run:

```
docker compose down
```

---

## Troubleshooting

### "Permission denied" when running start.sh (macOS / Linux)

Run this once to make the script executable:
```
chmod +x start.sh
```
Then try `./start.sh` again.

### "Port 6006 is already in use"

Another program is using port 6006. Open `docker-compose.yml` in a text editor and change the port:
```yaml
ports:
  - "7000:80"   # use port 7000 instead
```
Then open **http://localhost:7000** in your browser.

### "docker compose: command not found"

Try the older syntax with a hyphen:
```
docker-compose up -d
```

### Docker Desktop is not running

Make sure Docker Desktop is started (the Docker icon in the taskbar / menu bar should be visible). Then try again.

### The browser shows "This site can't be reached"

Wait a few seconds and refresh the page — Docker sometimes needs a moment to fully start the container.

---

## Summary — Quick Reference

| What | Command |
|---|---|
| Start Storybook | `./start.sh` (Mac) or `start.bat` (Windows) |
| Stop Storybook | `docker compose down` |
| Open in browser | http://localhost:6006 |
| Check status | `docker compose ps` |
| View logs | `docker compose logs` |

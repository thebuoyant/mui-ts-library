# Storybook — Docker Setup Guide

> [Deutsche Version →](how-to.de.md)

Welcome! This package lets you run an **interactive component catalog** of the `mui-ts-library` directly on your computer — without any development tools. The only thing you need is **Docker**.

---

## What will I see?

Storybook is a visual catalog of all UI components in the library. You can browse every component, try out different settings, and see exactly how it looks — all in your browser.

---

## Step 1 — Install Docker Desktop

If Docker Desktop is not yet installed on your computer, download and install it first:

| Operating System | Download link |
|---|---|
| **Windows** | https://www.docker.com/products/docker-desktop/ |
| **macOS** | https://www.docker.com/products/docker-desktop/ |
| **Linux** | https://docs.docker.com/engine/install/ |

After installation, **start Docker Desktop** and wait until the Docker icon in the taskbar/menu bar turns green (ready).

> **Note:** Docker Desktop is free for personal and educational use.

---

## Step 2 — Unzip the file

Unzip the ZIP file (e.g. `storybook-1.1.0.zip`) to a folder of your choice — for example your Desktop or Documents folder.

You will get a folder called `storybook-1.1.0` (the version number may vary).

---

## Step 3 — Open a Terminal

You need to open a **terminal** (command prompt) and navigate to the unzipped folder.

### Windows

1. Press `Win + R`, type `cmd` and press **Enter**
2. Type the following (adjust the path to match your folder):

```
cd C:\Users\YourName\Desktop\storybook-1.1.0
```

### macOS

1. Open **Spotlight** with `Cmd + Space`, type `Terminal` and press **Enter**
2. Type the following (adjust the path to match your folder):

```
cd /Users/YourName/Desktop/storybook-1.1.0
```

**Tip for macOS:** You can also drag the folder directly into the Terminal window after typing `cd ` — the path will be inserted automatically.

---

## Step 4 — Start Storybook

In the terminal, type the following command and press **Enter**:

```
docker compose up -d
```

Docker will now:
1. Download the nginx web server (~25 MB, only on the first start)
2. Build the Storybook image
3. Start the container in the background

You will see output similar to this — this is normal:

```
[+] Running 2/2
 ✔ Network storybook_default  Created
 ✔ Container storybook-1      Started
```

---

## Step 5 — Open in your browser

Open any browser and go to this address:

**➜ http://localhost:6006**

The Storybook component catalog will open. You can now browse all components.

---

## Step 6 — Stop Storybook

When you are done, type the following command in the terminal to stop Docker:

```
docker compose down
```

The Storybook will stop and the memory will be freed. Your data is not deleted — you can start it again at any time with `docker compose up -d`.

---

## Troubleshooting

### "Port 6006 is already in use"

Another program is already using port 6006. You can use a different port:

1. Open the file `docker-compose.yml` in a text editor (e.g. Notepad on Windows, TextEdit on macOS)
2. Find the line `- "6006:80"` and change `6006` to any other number, e.g.:
   ```
   - "7000:80"
   ```
3. Save the file and run `docker compose up -d` again
4. Open **http://localhost:7000** in your browser

### "docker compose: command not found"

Try the older syntax with a hyphen:

```
docker-compose up -d
```

### Docker Desktop is not running

Make sure Docker Desktop is started (the Docker icon in the taskbar/menu bar should be visible). Then try the command again.

### The browser shows "This site can't be reached"

Wait a few seconds and refresh the page. Docker sometimes needs a moment to fully start the container.

---

## Summary — Quick Reference

| What | Command |
|---|---|
| Start Storybook | `docker compose up -d` |
| Stop Storybook | `docker compose down` |
| Open in browser | http://localhost:6006 |
| Check status | `docker compose ps` |
| View logs | `docker compose logs` |

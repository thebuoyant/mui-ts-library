# Development Guide

This document covers everything you need to contribute to or build `@thebuoyant-tsdev/mui-ts-library` locally.

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/thebuoyant/mui-ts-library.git
cd mui-ts-library

# 2. Install dependencies
npm install

# 3. Start the Vite dev server
npm run dev
```

---

## Storybook

Every component includes Storybook stories covering all major use cases and prop combinations.

```bash
# Start Storybook dev server (http://localhost:6006)
npm run storybook

# Build a static Storybook for deployment
npm run build-storybook
```

### Storybook Docker Distribution

Share an interactive Storybook with non-developers (Product Owners, Designers) — only Docker required on their end.

```bash
npm run build-storybook-docker
```

Creates `storybook-docker/storybook-{version}.zip` — a self-contained package with a pre-built Docker image and start scripts (`start.sh` for macOS/Linux, `start.bat` for Windows). Recipients unzip, run the script, and open `http://localhost:6006`.

See [`storybook-docker/how-to.md`](storybook-docker/how-to.md) for the full end-user guide.

---

## Tests

Tests are written with [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/).

```bash
# Watch mode (development)
npm run test

# Single run (CI)
npm run test:run

# With coverage report
npm run test:coverage
```

Coverage reports are generated in `./coverage/`. Open `coverage/index.html` in a browser for the full report.

---

## Build

```bash
npm run build
```

Produces dual ESM + CJS output in `./dist/`:

| File | Format |
|---|---|
| `dist/index.js` | ESM |
| `dist/index.cjs` | CommonJS |
| `dist/index.d.ts` | TypeScript declarations |

---

## Local Package (.tgz)

To share the library without publishing to npm:

```bash
npm pack
# → thebuoyant-tsdev-mui-ts-library-1.3.0.tgz
```

Install in a target project:

```bash
npm install /path/to/thebuoyant-tsdev-mui-ts-library-1.3.0.tgz
```

---

## Publishing to npm

### Deploy Script

All steps are combined into a single interactive command:

```bash
npm run npm-deploy
```

The script steps through:

1. **User check** — verifies that npm user `thebuoyant-tsdev` is logged in
2. **Git check** — verifies there are no uncommitted changes
3. **Version selection** — interactive: `patch` / `minor` / `major` or keep current
4. **Tests → Build → Publish** — via `prepublishOnly`
5. **Git push** — commit and tag are pushed to `main`

If not logged in, run `npm login` first. For 2FA-protected accounts, use an **Automation token** from [npmjs.com → Access Tokens](https://www.npmjs.com/settings/thebuoyant-tsdev/tokens) to avoid the 2FA prompt during publish.

### Versioning (SemVer)

| Change type | Level | Example |
|---|---|---|
| Bug fix, non-breaking improvement | **patch** | `1.3.0` → `1.3.1` |
| New feature, backwards compatible | **minor** | `1.3.0` → `1.4.0` |
| Breaking API change | **major** | `1.3.0` → `2.0.0` |

### GitHub Actions (optional CI/CD)

Store an npm Automation token as `NPM_TOKEN` in **GitHub → Settings → Secrets → Actions**, then create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - run: npm ci
      - run: npm run test:run
      - run: npm run build
      - run: npm publish --access public --provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Trigger a release: `npm version minor && git push origin main --tags`

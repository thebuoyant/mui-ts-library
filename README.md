# mui-ts-library

A type-safe React component library built with **TypeScript** and **MUI (Material UI)**. Components are designed as standalone additions to MUI — they follow MUI's design language, support theming out of the box, and ship with full TypeScript types, Storybook stories, and unit tests.

---

## Table of Contents

- [Components](#components)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [TagSelection](#tagselection)
  - [PasswordStrengthMeter](#passwordstrengthmeter)
- [Props Reference](#props-reference)
  - [TagSelection Props](#tagselection-props)
  - [TagSelectionItem](#tagselectionitem)
  - [PasswordStrengthMeter Props](#passwordstrengthmeter-props)
- [Customization](#customization)
  - [Translations](#translations)
  - [Colors & Theming](#colors--theming)
- [Development](#development)
  - [Local Setup](#local-setup)
  - [Storybook](#storybook)
  - [Tests](#tests)
  - [Coverage](#coverage)
- [Publishing to npm](#publishing-to-npm)
  - [1. Prepare package.json](#1-prepare-packagejson)
  - [2. Versioning (SemVer)](#2-versioning-semver)
  - [3. Build](#3-build)
  - [4. Dry Run](#4-dry-run)
  - [5. Publish](#5-publish)
  - [6. Automate with GitHub Actions](#6-automate-with-github-actions)
- [License](#license)

---

## Components

| Component | Description |
|---|---|
| `TagSelection` | Multi-tag picker with search autocomplete, chip display, and full callback API |
| `PasswordStrengthMeter` | Password input with live strength scoring, animated meter, and requirements summary |

---

## Requirements

This library treats the following packages as **peer dependencies**. Your project must have them installed:

```
react >= 19
react-dom >= 19
@mui/material >= 7
@emotion/react >= 11
@emotion/styled >= 11
@mui/icons-material >= 7
```

---

## Installation

```bash
# npm
npm install mui-ts-library

# yarn
yarn add mui-ts-library

# pnpm
pnpm add mui-ts-library
```

> **Note:** Make sure all peer dependencies are installed. If you have not set up MUI yet, follow the [MUI installation guide](https://mui.com/material-ui/getting-started/installation/).

---

## Usage

Wrap your app in MUI's `ThemeProvider` as usual. No additional provider is needed for this library.

### TagSelection

```tsx
import { TagSelection } from 'mui-ts-library';
import type { TagSelectionItem } from 'mui-ts-library';

const tags: TagSelectionItem[] = [
  { id: 'react',      label: 'React',      selected: true  },
  { id: 'typescript', label: 'TypeScript'                  },
  { id: 'legacy',     label: 'Legacy',     disabled: true  },
];

function App() {
  return (
    <TagSelection
      tags={tags}
      onTagSelect={(tag, selectedTags, allTags) => {
        console.log('Selected:', tag.label);
      }}
      onTagDelete={(tag, selectedTags, allTags) => {
        console.log('Removed:', tag.label);
      }}
      onTagsChange={(selectedTags, allTags) => {
        console.log('Current selection:', selectedTags.map(t => t.label));
      }}
    />
  );
}
```

**With custom icons and colors:**

```tsx
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

const tags: TagSelectionItem[] = [
  {
    id: 'featured',
    label: 'Featured',
    selected: true,
    startIcon: <StarIcon style={{ color: '#fff' }} />,
    deleteIcon: <CloseIcon style={{ color: '#ccc' }} />,
    foregroundColor: '#ffffff',
    backgroundColor: '#1976d2',
  },
];
```

---

### PasswordStrengthMeter

```tsx
import { PasswordStrengthMeter } from 'mui-ts-library';
import type { StrengthResult } from 'mui-ts-library';

function App() {
  const handlePasswordChange = (password: string, result: StrengthResult) => {
    console.log(`Score: ${result.score}/4 — ${result.meterStatus}`);
  };

  return (
    <PasswordStrengthMeter
      passwordMinLength={10}
      onPasswordChange={handlePasswordChange}
    />
  );
}
```

**Minimal variant (input only, no meter or summary):**

```tsx
<PasswordStrengthMeter
  showMeter={false}
  showSummary={false}
/>
```

---

## Props Reference

### TagSelection Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tags` | `TagSelectionItem[]` | — | **Required.** Full list of tags (selected + available + disabled). |
| `showSelectedTags` | `boolean` | `true` | Show the selected-tags chip area. |
| `showSelectedTagsLabel` | `boolean` | `true` | Show the label above the selected chips. |
| `showAutoComplete` | `boolean` | `true` | Show the search autocomplete input. |
| `showStartIcon` | `boolean` | `true` | Globally toggle start icons on all chips. |
| `showDeleteIcon` | `boolean` | `true` | Globally toggle delete icons on all chips. |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Size of the autocomplete input. |
| `chipSize` | `"small" \| "medium"` | `"medium"` | Size of all chips. |
| `translation` | `TagSelectionTranslation` | English defaults | All display texts (see [Translations](#translations)). |
| `onTagSelect` | `(tag, selectedTags, allTags) => void` | — | Called when a tag is selected. |
| `onTagDelete` | `(tag, selectedTags, allTags) => void` | — | Called when a tag is removed. |
| `onTagsChange` | `(selectedTags, allTags) => void` | — | Called after every selection change. |
| `onSearchChange` | `(searchValue: string) => void` | — | Called when the search input changes. |
| `onDetailsToggle` | `(expanded: boolean) => void` | — | Reserved for a future "show all tags" panel. |

### TagSelectionItem

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier used as React key and for store operations. |
| `label` | `string` | Yes | Display text of the tag. |
| `selected` | `boolean` | No | Pre-selected state (e.g. for initial load). |
| `disabled` | `boolean` | No | Prevents selection and deletion. |
| `foregroundColor` | `string` | No | Text color of the chip. |
| `backgroundColor` | `string` | No | Background and border color of the chip. |
| `startIcon` | `ReactElement` | No | Icon rendered at the start of the chip. |
| `deleteIcon` | `ReactElement` | No | Replaces MUI's default delete icon. |

---

### PasswordStrengthMeter Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `showPasswordAdornment` | `boolean` | `true` | Show the show/hide password toggle button. |
| `showMeter` | `boolean` | `true` | Show the animated strength meter bar. |
| `showSummary` | `boolean` | `true` | Show the requirements checklist. |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Size of the password input field. |
| `passwordMinLength` | `number` | `8` | Minimum required password length. |
| `translation` | `PasswordStrengthMeterTranslation` | English defaults | All display texts (see [Translations](#translations)). |
| `meterColors` | `MeterColors` | Red → Green | Colors for each of the four strength levels. |
| `checkColors` | `CheckColors` | Red / Green | Colors for the fulfilled/unfulfilled icons. |
| `onPasswordChange` | `(password, result: StrengthResult) => void` | — | Called on every keystroke with the current password and strength result. |

**`StrengthResult` shape:**

```ts
type StrengthResult = {
  score: 0 | 1 | 2 | 3 | 4;
  percent: number;           // 0, 25, 50, 75, or 100
  meterStatus: 'weak' | 'ok' | 'good' | 'very good';
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
};
```

---

## Customization

### Translations

Both components accept a `translation` prop for full i18n support without any external library.

**TagSelection (German example):**

```tsx
<TagSelection
  tags={tags}
  translation={{
    selectedTagsLabel:   'Ausgewählte Tags',
    autoCompleteLabel:   'Tags suchen und hinzufügen',
    detailsLabel:        'Alle Tags',
    noSelectedTagsText:  'Keine Tags ausgewählt.',
    noAvailableTagsText: 'Keine Tags verfügbar.',
    placeholder:         'Suchen...',
  }}
/>
```

**PasswordStrengthMeter (German example):**

```tsx
<PasswordStrengthMeter
  passwordMinLength={10}
  translation={{
    label:                  'Passwort',
    summaryHeaderLabel:     'Anforderungen an dein Passwort',
    summaryMinCharsLeft:    'Mindestens',
    summaryMinCharsRight:   'Zeichen',
    summaryCapitalLetter:   'Mindestens 1 Großbuchstabe',
    summaryLowerCaseLetter: 'Mindestens 1 Kleinbuchstabe',
    summaryNumber:          'Mindestens 1 Zahl',
    summarySpecialChar:     'Mindestens 1 Sonderzeichen',
  }}
/>
```

### Colors & Theming

Both components use MUI's theme system wherever possible (e.g. `color="text.secondary"`, `borderColor: "divider"`). Custom colors can be passed via props:

```tsx
<PasswordStrengthMeter
  meterColors={{
    weak:     '#e53935',
    ok:       '#fb8c00',
    good:     '#43a047',
    veryGood: '#00897b',
  }}
  checkColors={{
    failure: '#e53935',
    success: '#00897b',
  }}
/>
```

---

## Development

### Local Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd mui-ts-library

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

### Storybook

Storybook is used to develop and document components in isolation.

```bash
# Start Storybook dev server (http://localhost:6006)
npm run storybook

# Build a static Storybook for deployment
npm run build-storybook
```

### Tests

Tests are written with [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/).

```bash
# Run tests in watch mode (re-runs on file changes)
npm run test

# Run tests once (e.g. in CI)
npm run test:run
```

### Coverage

```bash
npm run test:coverage
```

Coverage reports are generated in `./coverage/`. Open `coverage/index.html` in your browser to view the full report.

Coverage is configured to include all component source files (`src/components/**/*.{ts,tsx}`) and automatically excludes stories and type-only files.

---

## Publishing to npm

This section explains how to publish the library to the npm registry. The steps apply whether you publish manually or through a CI/CD pipeline.

### 1. Prepare package.json

Before the first publish, update `package.json` with the fields npm requires:

```json
{
  "name": "@your-org/mui-ts-library",
  "version": "1.0.0",
  "private": false,
  "description": "Type-safe React component library built on MUI",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/mui-ts-library.git"
  }
}
```

> **`"files": ["dist"]`** restricts what npm uploads — only the built output. Source files and dev configs are excluded automatically.

### 2. Versioning (SemVer)

This library follows [Semantic Versioning](https://semver.org/):

| Change type | Version bump | Example |
|---|---|---|
| Bug fix, non-breaking improvement | **Patch** | `1.0.0` → `1.0.1` |
| New feature, backwards compatible | **Minor** | `1.0.0` → `1.1.0` |
| Breaking change in public API | **Major** | `1.0.0` → `2.0.0` |

Use npm to bump the version and create a git tag in one step:

```bash
npm version patch   # or minor, or major
```

### 3. Build

Always build before publishing so `dist/` reflects the latest source:

```bash
npm run build
```

This runs TypeScript compilation (`tsc`) followed by Vite's library build. Output is placed in `dist/`.

### 4. Dry Run

Inspect exactly which files will be uploaded to npm without publishing:

```bash
npm pack --dry-run
```

Review the output carefully. If unexpected files appear, restrict them via the `files` field in `package.json` or an `.npmignore` file.

### 5. Publish

```bash
# Log in to npm (one-time setup, opens browser)
npm login

# Publish a public scoped package
npm publish --access public

# Publish an unscoped package
npm publish
```

> **Tip:** Pass `--access public` on the first publish of a scoped package (e.g. `@your-org/...`) unless it is intentionally private.

### 6. Automate with GitHub Actions

Create `.github/workflows/publish.yml` to publish automatically when a version tag is pushed:

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
      id-token: write   # required for npm provenance attestation

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Build
        run: npm run build

      - name: Publish
        run: npm publish --access public --provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Setup steps:**

1. Generate an npm access token at [npmjs.com → Access Tokens → Generate New Token (Automation)](https://www.npmjs.com/settings/~/tokens)
2. Add it to your GitHub repository: **Settings → Secrets and variables → Actions → New repository secret** → name it `NPM_TOKEN`
3. Push a version tag to trigger the workflow:

```bash
npm version minor
git push origin main --tags
```

The workflow runs tests and build before publishing — a failed test will abort the publish automatically.

---

## License

MIT © Thomas Schlender

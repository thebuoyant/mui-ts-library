#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_DIR}"

VERSION=$(node -p "require('./package.json').version")
PACKAGE_NAME="storybook-${VERSION}"
OUTPUT_ZIP="storybook-docker/${PACKAGE_NAME}.zip"
BUILD_DIR=".storybook-docker-tmp"

echo "┌──────────────────────────────────────────────────┐"
echo "│  Storybook Docker Build — v${VERSION}"
echo "└──────────────────────────────────────────────────┘"
echo ""

# ── 1. Build Storybook static files ──────────────────────
echo "▶ [1/3] Building Storybook static files ..."
npm run build-storybook
echo ""

# ── 2. Assemble Docker package ────────────────────────────
echo "▶ [2/3] Assembling Docker package ..."
rm -rf "${BUILD_DIR}"
mkdir -p "${BUILD_DIR}/${PACKAGE_NAME}/storybook-static"

cp -r storybook-static/. "${BUILD_DIR}/${PACKAGE_NAME}/storybook-static/"
cp storybook-docker/Dockerfile        "${BUILD_DIR}/${PACKAGE_NAME}/"
cp storybook-docker/docker-compose.yml "${BUILD_DIR}/${PACKAGE_NAME}/"
cp storybook-docker/nginx.conf        "${BUILD_DIR}/${PACKAGE_NAME}/"
cp storybook-docker/how-to.md         "${BUILD_DIR}/${PACKAGE_NAME}/"
cp storybook-docker/how-to.de.md      "${BUILD_DIR}/${PACKAGE_NAME}/"

# ── 3. Create ZIP ─────────────────────────────────────────
echo "▶ [3/3] Creating ${OUTPUT_ZIP} ..."
rm -f "${OUTPUT_ZIP}"
(cd "${BUILD_DIR}" && zip -qr "${PROJECT_DIR}/${OUTPUT_ZIP}" "${PACKAGE_NAME}")
rm -rf "${BUILD_DIR}"

SIZE=$(du -sh "${OUTPUT_ZIP}" | cut -f1)

echo ""
echo "┌──────────────────────────────────────────────────┐"
echo "│  ✓  ${OUTPUT_ZIP}  (${SIZE})"
echo "│"
echo "│  Share this file with anyone who has Docker."
echo "│  They can follow how-to.md to get started."
echo "└──────────────────────────────────────────────────┘"

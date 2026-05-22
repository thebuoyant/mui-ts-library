#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_DIR}"

VERSION=$(node -p "require('./package.json').version")
PACKAGE_NAME="storybook-${VERSION}"
IMAGE_NAME="storybook-local:${VERSION}"
IMAGE_TAR="storybook-${VERSION}.tar"
OUTPUT_ZIP="storybook-docker/${PACKAGE_NAME}.zip"
BUILD_DIR=".storybook-docker-tmp"

echo "┌──────────────────────────────────────────────────┐"
echo "│  Storybook Docker Build — v${VERSION}"
echo "└──────────────────────────────────────────────────┘"
echo ""

# ── 1. Build Storybook static files ──────────────────────
echo "▶ [1/4] Building Storybook static files ..."
npm run build-storybook
echo ""

# ── 2. Build Docker image ─────────────────────────────────
echo "▶ [2/4] Building Docker image (${IMAGE_NAME}) ..."
DOCKER_CTX="${BUILD_DIR}/docker-ctx"
rm -rf "${BUILD_DIR}"
mkdir -p "${DOCKER_CTX}"
cp -r storybook-static/. "${DOCKER_CTX}/storybook-static/"
cp storybook-docker/Dockerfile  "${DOCKER_CTX}/"
cp storybook-docker/nginx.conf  "${DOCKER_CTX}/"
docker build -t "${IMAGE_NAME}" "${DOCKER_CTX}" --quiet
echo ""

# ── 3. Save image + assemble package ──────────────────────
echo "▶ [3/4] Saving Docker image ..."
mkdir -p "${BUILD_DIR}/${PACKAGE_NAME}"
docker save "${IMAGE_NAME}" -o "${BUILD_DIR}/${PACKAGE_NAME}/${IMAGE_TAR}"

# Version-specific docker-compose.yml (references pre-built image, no build context)
cat > "${BUILD_DIR}/${PACKAGE_NAME}/docker-compose.yml" <<EOF
services:
  storybook:
    image: ${IMAGE_NAME}
    ports:
      - "6006:80"
    restart: unless-stopped
EOF

# start.sh — Mac / Linux
cat > "${BUILD_DIR}/${PACKAGE_NAME}/start.sh" <<EOF
#!/usr/bin/env bash
set -e
echo "Loading Storybook Docker image ..."
docker load -i ${IMAGE_TAR}
echo "Starting Storybook ..."
docker compose up -d
echo ""
echo "✓ Storybook is running → open http://localhost:6006 in your browser"
EOF
chmod +x "${BUILD_DIR}/${PACKAGE_NAME}/start.sh"

# start.bat — Windows
cat > "${BUILD_DIR}/${PACKAGE_NAME}/start.bat" <<EOF
@echo off
echo Loading Storybook Docker image ...
docker load -i ${IMAGE_TAR}
echo Starting Storybook ...
docker compose up -d
echo.
echo Storybook is running - open http://localhost:6006 in your browser
pause
EOF

cp storybook-docker/how-to.md    "${BUILD_DIR}/${PACKAGE_NAME}/"
cp storybook-docker/how-to.de.md "${BUILD_DIR}/${PACKAGE_NAME}/"

# ── 4. Create ZIP ─────────────────────────────────────────
echo "▶ [4/4] Creating ${OUTPUT_ZIP} ..."
rm -f "${OUTPUT_ZIP}"
(cd "${BUILD_DIR}" && zip -qr "${PROJECT_DIR}/${OUTPUT_ZIP}" "${PACKAGE_NAME}")
rm -rf "${BUILD_DIR}"

SIZE=$(du -sh "${OUTPUT_ZIP}" | cut -f1)

echo ""
echo "┌──────────────────────────────────────────────────┐"
echo "│  ✓  ${OUTPUT_ZIP}  (${SIZE})"
echo "│"
echo "│  Share this file — Docker image is pre-built."
echo "│  Recipients just run start.sh / start.bat."
echo "└──────────────────────────────────────────────────┘"

# npm Publish — Schritt für Schritt

## Schritt 1: 2FA auf dem npm-Account einrichten (einmalig, Pflicht)

npm verlangt zwingend 2FA bevor ein Paket veröffentlicht werden kann.

1. **Authenticator-App** auf dem Smartphone installieren:
   - iOS/Android: **Google Authenticator** oder **Authy** (kostenlos)

2. https://www.npmjs.com → einloggen → oben rechts **Avatar** → **"Account"**
3. Abschnitt **"Two-Factor Authentication"** → **"Enable 2FA"**
4. QR-Code mit der App scannen
5. 6-stelligen Code aus der App eingeben → bestätigen

---

## Schritt 2: Publishen

```bash
npm publish --access public --otp=XXXXXX
```

`XXXXXX` = aktueller 6-stelliger Code aus der Authenticator-App.

`--access public` ist bei Scoped Packages (`@thebuoyant-tsdev/...`) Pflicht — sonst kommt ein `402 Payment Required` Fehler.

---

## Schritt 3 (optional): Token für künftige Publishes

Um künftig ohne OTP-Code publishen zu können:

1. npmjs.com → **Avatar** → **"Access Tokens"** → **"Generate New Token"** → **"Granular Access Token"**
2. Felder:

   | Feld | Wert |
   |---|---|
   | Token name | `publish-mui-ts-library` |
   | ☑ Bypass two-factor authentication (2FA) | **Haken setzen** |
   | Packages → Permissions | `Read and write` |
   | Packages → Select packages | `All packages` |
   | Organizations → Permissions | `No access` ← wichtig! |
   | Expiration | `90 days` |

3. Token kopieren — **wird nur einmal angezeigt!**
4. Publishen:

```bash
NPM_TOKEN=npm_xxxxxxxxxxxxx npm publish --access public
```

---

## Neue Version publishen

```bash
# 1. Version erhöhen
npm version patch    # Bugfix:  1.0.0 → 1.0.1
npm version minor    # Feature: 1.0.0 → 1.1.0
npm version major    # Breaking: 1.0.0 → 2.0.0

# 2. Publishen (mit OTP oder Token)
npm publish --access public --otp=XXXXXX

# 3. Git-Tag pushen
git push origin main --tags
```

---

## Paket live prüfen

https://www.npmjs.com/package/@thebuoyant-tsdev/mui-ts-library

<p align="center">
  <a href="README.md"><img alt="简体中文-说明" src="https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-%E8%AF%B4%E6%98%8E-22d3ee?style=for-the-badge&labelColor=0b1220"></a>
  <a href="README.en.md"><img alt="English-Current" src="https://img.shields.io/badge/English-Current-a855f7?style=for-the-badge&labelColor=0b1220"></a>
</p>

# NebulaTree Desktop (Electron)

Cyberpunk-styled 3D particle tree powered by Three.js + MediaPipe hand-tracking, packaged as a Windows Electron desktop app.

- Platform: Windows (Electron)
- Graphics: Three.js (WebGL post-processing: bloom, etc.)
- Vision: MediaPipe Tasks Vision (hand landmarks)
- UI: Tailwind + custom HUD and a cyberpunk loading screen

## Project Structure

```text
NebulaTree_Desktop/
├─ index.html          # Frontend page (import maps + app logic)
├─ main.js             # Electron main process
├─ package.json        # Scripts and build config
├─ .gitignore          # Ignore build artifacts and deps
├─ README.md           # Chinese guide (maintained by author)
└─ README.en.md        # This English guide
```

> Note: `dist/`, `build/`, `win-unpacked/`, and `node_modules/` are ignored by `.gitignore`. Release packages are built locally or via CI.

---

## Run (Development)

Prerequisite: Node.js LTS (v18+ recommended)

```powershell
# Enter project directory
cd C:\Users\Katelya\Desktop\NebulaTree_Desktop

# Install deps
npm install

# Start the app (Electron)
npm start
```

On first run, allow camera permissions. A loading overlay shows status/progress while MediaPipe and video stream initialize.

---

## Build (Windows Portable EXE)

We use electron-builder to produce a portable `.exe`.

For faster downloads in China (optional):

```powershell
$env:ELECTRON_BUILDER_BINARIES_MIRROR="https://npmmirror.com/mirrors/electron-builder-binaries/"
```

Build locally:

```powershell
npm run build
```

Expected outputs:

- Primary: `dist\NebulaTree.exe` (portable exe on success)
- Fallback (always runnable): `dist\win-unpacked\NebulaTree.exe` (requires its adjacent files)

If you see winCodeSign/symlink errors on Windows:

- Recommended: enable Windows "Developer Mode" (allows symlinks) and re-run build.
- Temporary fallback: use `dist\win-unpacked\NebulaTree.exe` directly (it runs without installer, but isn’t single-file).

---

## Security Settings

- Camera permission: granted via `setPermissionRequestHandler` (main process) for `media`.
- WebPreferences: `nodeIntegration: true`, `contextIsolation: false` for local dev convenience.
- CSP (`<meta http-equiv="Content-Security-Policy">` in `index.html`):
  - Allows `jsDelivr`, `unpkg`, `esm.sh`, Google Fonts, `storage.googleapis.com`.
  - Enables `mediastream:`, `blob:`, and WebGL related resources.

For production hardening:

- Turn off `nodeIntegration` and enable `contextIsolation`.
- Remove `'unsafe-inline'` / `'unsafe-eval'`, move inline scripts to files, add Subresource Integrity.

---

## CI: GitHub Release (Automatic)

This repo includes a GitHub Actions workflow to build and upload a Windows portable release when you push a tag.

Trigger a release build:

```powershell
# From project root
# Update version as needed, then tag and push
git tag v1.0.0
git push origin v1.0.0
```

The workflow will:
- Check out code on a Windows runner
- Install dependencies and run electron-builder
- Create a GitHub Release for the tag and upload the generated `.exe` asset

If you prefer manual uploads, you can also build locally (`npm run build`) and upload the artifact to a draft release.

---

## FAQ

- "Failed to fetch" at startup?
  - Usually a CSP/network issue. We already allow `storage.googleapis.com` and common CDNs; ensure network access.

- Build fails with winCodeSign symlink errors?
  - Enable Windows Developer Mode or run PowerShell as Administrator. Alternatively, use the `win-unpacked` exe as a temporary portable.

- No camera prompt / cannot access camera?
  - Close other apps using the camera, and allow camera access in Windows privacy settings.

---

## License

MIT (you can adjust as needed).

## QR Scanner Web App — V1 MVP

A lightweight, privacy-first QR scanner. Users upload an image; the app decodes it entirely in the browser using `jsQR` and shows the result with copy / open / share actions. No backend, no tracking, no uploads.

### Scope (V1)

- Image upload via file picker + drag-and-drop (JPG/PNG/WebP, ≤10 MB)
- Client-side decode using `jsQR` on a Canvas
- Detect URL vs plain text; show formatted result + raw view toggle
- Actions: Copy, Open in new tab (URLs only, with `rel="noopener noreferrer"`), Share (Web Share API when available), Scan another
- Clear error states: no QR found, invalid type, file too large, decode failure
- Mobile-first responsive layout, WCAG AA, keyboard-accessible

Out of scope for V1: live camera scanning, history, multi-QR per image, PWA install, dark mode (can follow in V1.1).

### Tech mapping to this project

This project is TanStack Start (not raw Vite+React from the doc). The architecture still fits — everything runs client-side. Specifics:

- Single route: `src/routes/index.tsx` replaces the placeholder with the scanner UI
- `jsqr` added as a dependency
- Local React state (`useReducer` or `useState`) is enough; skipping Zustand to avoid a dep for one screen
- Decode runs in an async handler off the main render path; for V1 we call `jsQR` directly (Web Worker can come in V1.1 if needed)
- Styling via existing Tailwind v4 + design tokens in `src/styles.css` (no new CSS framework)
- No Lovable Cloud — fully static/client-side

### File plan

```text
src/routes/index.tsx              # Scanner page (replaces placeholder)
src/components/qr/Dropzone.tsx    # File picker + drag/drop + validation
src/components/qr/ResultCard.tsx  # Formatted result + raw toggle + actions
src/components/qr/ErrorState.tsx  # Friendly error messages
src/lib/qr/decode.ts              # File → ImageBitmap → Canvas → jsQR
src/lib/qr/validate.ts            # File-type/size guard + URL detection
src/styles.css                    # Minor token additions if needed
```

Also update `__root.tsx` head metadata (title, description, og tags) for SEO/share.

### Decode flow

```text
File → validate (type, size)
     → createImageBitmap (fast path) / fallback to <img>+canvas
     → draw to OffscreenCanvas (or HTMLCanvas) at capped max dimension (e.g. 1600px)
     → ctx.getImageData → jsQR(data, w, h, { inversionAttempts: "attemptBoth" })
     → { data, isUrl } | { error }
```

### UX states

1. Idle — dropzone with "Upload an image with a QR code", supported formats, size limit
2. Scanning — spinner + "Decoding…"
3. Success — result card with: detected text, badge (URL / Text), Copy, Open (if URL), Share (if supported), View raw toggle, "Scan another"
4. Error — icon + message + "Try another image"

### Design direction

Clean, calm, mobile-first. Light surface, single accent color, generous spacing, rounded cards, no decorative noise. Uses existing design tokens (`background`, `foreground`, `primary`, `muted`, `card`, `border`) so light/dark both work. One H1, semantic landmarks, focus-visible rings, 44px tap targets, `aria-live="polite"` for result/error announcements.

### Acceptance checks

- Upload a known QR image → decoded text shows within ~1s on desktop
- Non-image file → friendly type error, no crash
- >10 MB file → size error before decode
- Image without a QR → "No QR code found" message, can retry
- URL result → Open button works (`target="_blank"`, `noopener`); plain text → Open hidden
- Copy button gives visual confirmation; Share appears only when `navigator.share` exists
- Keyboard: Tab reaches dropzone, Enter/Space opens picker; all action buttons reachable
- Lighthouse a11y ≥ 95 on the page

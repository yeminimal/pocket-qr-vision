# Restore Seeqr as a Free Public Scanner

## Outcome
Seeqr will be a fully public, account-free browser tool. The homepage scanner, multi-image decoding, multiple QR results per image, URL checks, light/dark themes, and offline support remain available without payment or sign-in.

## Changes
- Remove all Premium, pricing, upgrade, trial, login, sign-up, subscription, and account calls-to-action from the scanner, navigation, footer, sitemap, and public copy.
- Replace pricing links with useful free-product destinations and retire `/pricing` with a redirect to the free scanner.
- Remove the unused account token attachment from app startup so the public experience has no authentication dependency.
- Correct the Vercel deployment configuration for TanStack Start instead of serving a missing `dist/client/index.html` fallback.
- Preserve the existing browser-only QR decoding and safety checks; no images or scan data will be uploaded.

## Validation
- Run the project checks used by the harness.
- Open the live preview on desktop and mobile, upload a QR image, and verify results render.
- Verify `/`, `/app`, `/pricing`, and a direct nested public URL resolve without a 404.
- Confirm no visible Premium, login, sign-up, or upgrade controls remain.

## Technical notes
- Keep TanStack Router and the current Vite/TanStack Start structure.
- Use Vercel's framework output rather than an SPA rewrite to `index.html`, because this app does not produce that file at `dist/client/index.html`.
- Database tables from the abandoned premium foundation can remain unused; deleting stored schema is unnecessary and riskier than removing all runtime dependencies and entry points.

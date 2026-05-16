# Repository Guidelines

## Project Shape

- This is a Vite app for an offline hotel front-desk phrase deck and small local-only tools.
- The browser app starts from `index.html`, which loads `/src/main.js`. Treat this as the Vite dev entry, not the double-click offline deliverable.
- The shared-drive/offline deliverable is generated at `dist/frontdesk-phrase-deck.html`.

## Commands

- Install dependencies: `npm install`
- Start local development server on localhost: `npm run dev`
- Build the normal Vite output: `npm run build`
- Build the single-file shared-drive HTML: `npm run build:file`
- Preview the built output locally: `npm run preview`

## Phrase Data

- Keep phrase corpus changes in `src/tools/comms-data.js`.
- Preserve the current data shape: `LANGUAGES` plus `CATEGORIES`, with phrase entries using `zh` and language objects shaped like `{ text, rom, pin }`.
- `src/tools/phraseDeck.js` should stay the renderer/adapter over that data, not a second source of phrase content.

## Generated Output

- Do not hand-edit generated files in `dist/`.
- When source changes need a refreshed offline HTML file, run `npm run build:file` and verify `dist/frontdesk-phrase-deck.html` was regenerated.
- `scripts/build-file.js` inlines linked CSS/JS and fails the shared-drive build when it finds forbidden runtime-network or placeholder markers; treat those warnings as real build issues.

## Verification Notes

- For blank-page reports, first distinguish `index.html` opened via `file://` from `dist/frontdesk-phrase-deck.html`; the former is a Vite entry and can fail outside a dev server.
- For startup regressions, prefer browser-based timing checks around `#tool-root .tool-screen` becoming available. Also confirm `.boot-intro` is not blocking input; its CSS should keep pointer events disabled.
- If unsure about a workflow, add a short `TODO:` with the uncertainty instead of inventing repo behavior.

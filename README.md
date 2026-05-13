# Frontdesk Phrase Deck

A fully offline multilingual phrase cheatsheet and service charge calculator for hotel front desk teams.

## Features

- Offline-first shared-drive HTML build
- Multilingual hotel phrases
- Romanization / transcription
- Mandarin-style emergency pronunciation hints
- Search
- Category filters
- Language filters
- Favorites
- Recent phrases
- Large text mode
- Copy buttons
- Room rate +15% calculator

## Supported Languages

- Chinese
- English
- Japanese
- Korean
- French
- Italian
- German
- Spanish
- Portuguese

## Local Development

This project uses npm and Vite.

```bash
npm install
npm run dev
```

## Standard Build

```bash
npm run build
```

## Shared-Drive Single HTML Build

```bash
npm run build:file
```

The shared-drive file is generated at:

```text
dist/frontdesk-phrase-deck.html
```

Copy `dist/frontdesk-phrase-deck.html` to a shared drive. Users can open it by double-clicking the HTML file. No web server is required.

## Privacy

- No backend
- No analytics
- No tracking
- No network requests at runtime
- Data stays in browser `localStorage`

## Pronunciation Disclaimer

Mandarin-style pronunciation hints are approximate emergency aids only and are not language-learning material.

## Runtime Notes

- The shared-drive version is designed for `file://` use.
- Some browser clipboard restrictions may require the manual copy fallback.
- Static hosting is optional but not required.

## Screenshots

Screenshots coming soon.

## License

MIT

<!-- Guidance for AI coding agents working in this repository -->
# Repo snapshot & quick start

- Purpose: Minimal static property-listings demo. Root server is a small Node static server. UI lives in `public/` and some sample data is in `data/`.
- Run locally: `npm start` (runs `node server.js`) then open http://localhost:3000 which serves `public/condo.html`.

# Big-picture architecture (what an agent should know)

- server: `server.js` — tiny HTTP static file server. It maps `/` to `public/condo.html` and serves files under `public/` as static assets. There are no API routes implemented by default.

- frontend (public/):
  - `public/condo.html` — single entry HTML currently used by the app. It includes `condo.css` and `app.js`.
  - `public/app.js` — vanilla JS client logic (DOM manipulation, searching, render, modals). This file is the active UI script used by `condo.html`.
  - `public/components/*.jsx` and `public/app.jsx` — React components exist, but they are not wired into `condo.html`. These files assume React/ReactDOM (and/or a JSX transpilation step) and appear to be alternative/parallel UI code.
  - `public/condo.css` — primary styling for site and modals.

- data: `data/listings.json` — sample listing data is present, but the running static server does not automatically expose `/api/*` endpoints; client code currently fetches `/api/listings` (see below — a useful mismatch to be aware of).

# Important discoverable patterns and gotchas

- Mixed frontend approaches: the project contains both plain vanilla DOM code (`app.js`) and React components (`*.jsx`). The current live page (`condo.html`) only loads `app.js`. To use the React files you must either:
  - Add React/ReactDOM + a JSX transpiler (Babel) to `condo.html` and load the `.jsx` files via `type="text/babel"` or
  - Precompile the `.jsx` into plain JS (recommended) and include the transpiled bundles in `condo.html`.

- Client data request vs server: `public/app.js` calls `fetch('/api/listings?...')`. Because `server.js` doesn't implement `/api/listings`, the fetch will fail and `app.js` intentionally falls back to keeping static sample cards in the DOM. Two quick dev fixes:
  - Change the fetch URL to `/data/listings.json` in `public/app.js` for an immediate dev experience, or
  - Add a simple server route in `server.js` that returns the contents of `data/listings.json` for `/api/listings`.

- Component export pattern: some React components attach themselves to `window` (for example `ListingDetail` exported as `window.ListingDetail`) so they were designed to be loaded via script tags rather than bundled modules.

- Image handling: components and `app.js` set `onerror` to `/images/placeholder.jpg` — keep `public/images/placeholder.jpg` available for graceful fallbacks.

# Developer workflows & commands

- Start dev server (Windows PowerShell):

```powershell
npm start
# open http://localhost:3000
```

- No build step is present by default. If you add React usage, pick one of:
  - Add a bundler (Vite/webpack) and add `build`/`dev` scripts to `package.json`, or
  - Use in-browser Babel for quick prototyping (not recommended for production).

- Debugging tips:
  - Network tab: check requests to `/api/listings` — if 404, switch to `/data/listings.json` or add server route.
  - Console: `app.js` prints errors for failed fetches and preserves sample DOM content — this is intentional.

# Integration & change guidance (practical examples)

- If you need a quick local API to satisfy `app.js`, add a route to `server.js` that returns `data/listings.json`:

  Example (conceptual): read `data/listings.json` and respond to `/api/listings` with JSON. This aligns the client fetch with the available sample data.

- To enable the React components without a bundler, add CDN links and use Babel (dev only):
  - Add React/ReactDOM CDN and Babel standalone script tags to `public/condo.html` then include `.jsx` files with `type="text/babel"`.

# Files to inspect for patterns or changes (explicit references)

- server.js — static server and place to add dev API routes
- public/condo.html — current entry page (loads `app.js`)
- public/app.js — active vanilla JS app (DOM-based rendering, fetch to `/api/listings`)
- public/app.jsx and public/components/*.jsx — React component sources (require transpilation or browser Babel)
- data/listings.json — sample data to be used by dev endpoints
- public/condo.css — main styles (modals, cards, responsive rules)

# What the AI agent should not assume

- Do not assume there is an API server: `server.js` is static-only by default.
- Do not assume a bundler or npm dependencies exist: `package.json` contains only `start`.

# Quick checklist for common tasks

- Add small API route for dev: modify `server.js` to serve `data/listings.json` at `/api/listings`.
- Wire React: decide between in-browser Babel (quick) or add a build step (recommended) and update `condo.html` accordingly.
- When modifying UI, prefer editing `public/condo.html`, `public/app.js`, or `public/components/*` depending on whether you choose vanilla or React path.

If anything here is unclear or you'd like me to (a) add the `/api/listings` dev route, (b) wire React via CDN/Babel for quick prototyping, or (c) create a minimal build script, tell me which and I'll implement it next.

# RealtyandCondo — Condo Project (Demo)

Simple React demo for a real-estate listing app (minimal, client-side mock). Built for a school assignment.

Features included:
- Home, Listings, Property Detail
- Login / Register (mocked, stored in localStorage)
- Dashboard (protected)
- Create Listing (adds to in-memory mock list)

Run locally (PowerShell-safe):

```powershell
cd 'c:\Momeam\Project\RealtyandCondo\condo-Project'
# If PowerShell blocks npm scripts, use the npm.cmd shim:
npm.cmd install
npm.cmd run dev
# OR relax execution policy for current session then run npm normally:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
npm install
npm run dev
```

Then open the URL printed by the dev server (typically http://localhost:5173).

Notes:
- This project uses in-memory mock services (`src/services/properties.js`). Data added via Create Listing will persist only during the running session.
- Auth is mocked (`src/context/AuthContext.jsx`) and saved in `localStorage` for demo purposes.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

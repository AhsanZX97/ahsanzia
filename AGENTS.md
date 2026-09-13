# Repository Guidelines

## Project Structure & Module Organization

This is a Vite-powered React 19 and TypeScript portfolio. Application startup is in `src/main.tsx`; the current single-page composition and small presentational components live in `src/App.tsx`; global CSS is in `src/index.css`. Keep image and other bundled media in `src/assets/` and static files served unchanged in `public/`. Build output is generated in `dist/` and must not be edited. There is no `tests/` directory yet.

Before changing the UI, read `CLAUDE.md`. It identifies the design source and explains how to translate its design-canvas markup into React.

## Build, Test, and Development Commands

- `npm install` installs the lockfile-pinned dependencies.
- `npm run dev` starts Vite with hot-module replacement for local development.
- `npm run build` type-checks with TypeScript and creates the production bundle in `dist/`.
- `npm run lint` runs Oxlint, including React hooks and TypeScript rules.
- `npm run preview` serves the built bundle locally; run `npm run build` first.

Run `npm run lint` and `npm run build` before proposing a change. For visual work, also use `npm run dev` or `npm run preview` to check layout, interactions, and responsive wrapping in a browser.

## Coding Style & Naming Conventions

Follow the existing style: TypeScript, functional React components, single quotes, no semicolons, and two-space indentation. Use PascalCase for components (`EmailLink`) and camelCase for functions, props, and local values (`copyEmail`). Name asset files descriptively; preserve existing filenames when updating references. Keep reusable UI pieces as named components within `src/App.tsx` until the page warrants a separate module. Do not bypass React hook rules; Oxlint enforces them.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. When adding behaviour, introduce focused tests with the chosen test framework in a matching `src/**/*.test.tsx` location, then add its command to `package.json`. Until then, validate changes with linting, a production build, and manual browser checks of affected interactions.

## Commit & Pull Request Guidelines

Recent commits use concise, imperative summaries (for example, `Update portfolio with new project details and assets`). Keep commits focused and describe the visible change. Pull requests should state the intent, list validation commands run, link any relevant issue, and include before/after screenshots for visual changes. Do not commit generated `dist/` output or unrelated working-tree changes.

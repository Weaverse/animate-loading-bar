# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@weaverse/animate-loading` (also published as `animate-loading`) — a lightweight, zero-dependency TypeScript library (~3kB gzipped) that provides a customizable top-of-page loading bar similar to Shopify/GitHub/JSFiddle.

## Commands

```bash
npm run dev    # Watch mode (tsup --watch)
npm run build  # Production build (tsup)
```

No test runner or linter is configured. Manual testing via [CodeSandbox demo](https://codesandbox.io/p/sandbox/h5945y).

## Architecture

The entire library is two source files:

- **`src/index.ts`** — `AnimateLoading` class (default export) and `AnimateLoadingOptions` interface (named export). The class manages a CSS-driven loading bar on any `HTMLElement` via `::before`/`::after` pseudo-elements. Configuration is applied as CSS custom properties (`--al-*`) on the target element. Animation state is controlled by toggling CSS classes (`al-loading-bar`, `start`, `loading`, `loaded`, `finished`).

- **`src/style.css`** — CSS animations and transitions driven by CSS custom properties. The bar animates from 0% to 80% width via `@keyframes al-loading` during `start()`, then completes to 100% and fades out on `finish()`. Imported as a side effect in `index.ts`.

### Build

tsup bundles to dual ESM (`.js`) + CJS (`.cjs`) with TypeScript declarations (`.d.ts`), source maps, and minification. CSS is output separately as `dist/style.css` and exported via `"./style.css"` in package.json exports map.

### Public API

- `new AnimateLoading(target?, options?)` — constructor, validates target is HTMLElement
- `.start()` — begins loading animation (guards against double-start)
- `.finish(callback?)` — completes animation with optional callback
- `.destroy()` — clears timeouts and removes DOM classes
- `.loading` — readonly getter for current loading state

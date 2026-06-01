# Json Beautifier Desktop

Json Beautifier Desktop is a lightweight desktop application for formatting, minifying, and exploring JSON data.

It provides a simple split-view interface where users can paste raw JSON, automatically beautify it, and inspect the result through an expandable tree viewer.

Built with **Electron**, **Svelte**, **TypeScript**, and **Vite**.

---

## Features

- Paste raw JSON and format it automatically
- Beautify JSON with readable indentation
- Minify JSON into compact form
- Explore JSON using an expandable/collapsible tree viewer
- Validate JSON syntax
- Show error messages for invalid JSON
- Copy formatted JSON to clipboard
- Clear editor content quickly
- Desktop-first experience using Electron

---

## Tech Stack

- [Electron](https://www.electronjs.org/) - Desktop runtime
- [Vite](https://vitejs.dev/) - Frontend build tool
- [Svelte](https://svelte.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [svelte-jsoneditor](https://github.com/josdejong/svelte-jsoneditor) - JSON tree viewer/editor

---

## Project Structure

```txt
json-beautifier-desktop/
├─ electron/
│  ├─ main.ts          # Electron main process
│  └─ preload.ts       # Electron preload script
├─ src/
│  ├─ App.svelte       # Main Svelte application
│  ├─ main.ts          # Renderer entry point
│  ├─ style.css        # Global styles
│  ├─ lib/
│  │  └─ json-utils.ts # JSON parsing/formatting helpers
│  └─ vite-env.d.ts
├─ public/
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
├─ package.json
└─ electron-builder.json5
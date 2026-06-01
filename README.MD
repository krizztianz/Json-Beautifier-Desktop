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
- [CodeMirror](https://codemirror.net/) - Syntax-colored JSON editor
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

## Getting Started

Follow these steps to clone, install, and run the project locally.

---

## Clone the Repository

Clone this repository from GitHub:

```bash
git clone https://github.com/krizztianz/Json-Beautifier-Desktop.git
```

Go to the project directory:

```bash
cd Json-Beautifier-Desktop
```

---

## Install Dependencies

Install all required npm dependencies:

```bash
npm install
```

This will install the dependencies needed for Electron, Svelte, TypeScript, Vite, CodeMirror, and the JSON tree viewer.

---

## Run the Project in Development Mode

Start the application in development mode:

```bash
npm run dev
```

This will start the Vite development server and launch the Electron desktop window.

When the app runs successfully, you should see the **Json Beautifier Desktop** window.

---

## Build the Project

To build the project for production:

```bash
npm run build
```

This will generate the production build output.

Depending on the current Electron Builder configuration, generated files may appear in folders such as:

```txt
dist/
dist-electron/
release/
```

---

## Create a Release Package

To create a Windows ZIP release package, run:

```bash
npx electron-builder --win zip
```

To create a Windows installer, run:

```bash
npx electron-builder --win nsis
```

To create both ZIP and installer outputs, run:

```bash
npx electron-builder --win nsis zip
```

The generated release files can then be uploaded to the GitHub Releases page.

---

## Development Workflow

A typical local development workflow looks like this:

```bash
git clone https://github.com/krizztianz/Json-Beautifier-Desktop.git
cd Json-Beautifier-Desktop
npm install
npm run dev
```

After making changes, test the app locally before committing:

```bash
npm run dev
```

If the project builds successfully, you can also run:

```bash
npm run build
```

---

## Troubleshooting

### Dependencies fail to install

Try deleting `node_modules` and `package-lock.json`, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Electron window opens but the screen is blank

Check the developer console inside the Electron window:

```txt
View → Toggle Developer Tools → Console
```

Look for runtime errors related to Svelte, CodeMirror, or JSON editor dependencies.

### Port already in use

If Vite cannot start because the port is already used, stop the other process or restart the terminal, then run:

```bash
npm run dev
```

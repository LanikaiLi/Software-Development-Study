# Nodemon: first-time setup, daily use, and vs `node` / `npm start`

This guide is for Node.js servers in this repo (for example `megaphone-server`, `movie-watchlist-server`). Commands assume your terminal **current directory** is the project folder that contains `package.json` and `server.js` (or your entry file).

---

## What is nodemon?

**Nodemon** is a development tool that runs your app with **Node**, but **watches your files**. When you save a change to a watched file (usually `.js`, `.mjs`, `.cjs`, `.json`), nodemon **stops the process and starts it again** automatically.

It is **not** a replacement for Node at runtime in production. In production you typically use plain `node` (or a process manager). Nodemon is for **local development** so you do not restart the server by hand after every edit.

---

## First-time setup (per project)

### 1. Go to the project directory

```bash
cd path/to/your-server-project
```

Example from this repo root:

```bash
cd 4-Backend-Dev/megaphone-server
```

### 2. Install dependencies (if you have not already)

```bash
npm install
```

### 3. Install nodemon as a dev dependency (recommended)

Installing nodemon **inside the project** keeps versions consistent for everyone who clones the repo:

```bash
npm install --save-dev nodemon
```

This adds `nodemon` under `devDependencies` in `package.json` and installs it into `node_modules/.bin/`.

### 4. (Optional) Add npm scripts

In `package.json`, under `"scripts"`, you can add:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

Adjust `server.js` if your entry file has another name.

- **`npm run dev`** — development: auto-restart on file changes (uses nodemon).
- **`npm start`** — often kept as **plain `node`** for a predictable “production-like” run, or for platforms that expect `npm start` to be stable.

Some teams instead set `"start": "nodemon server.js"` for convenience; then `npm start` and nodemon behave the same. Pick one convention and document it in that project’s README.

### Alternative: global install (not recommended for teams)

```bash
npm install -g nodemon
```

Then you can run `nodemon server.js` from any folder without adding it to the project. Downside: other machines may not have the same version, and CI will not use it unless you install it there too.

---

## After setup: how to use nodemon

### Option A — npm script (recommended)

```bash
npm run dev
```

(Only works if you added `"dev": "nodemon server.js"` or similar.)

### Option B — npx (no script required)

```bash
npx nodemon server.js
```

`npx` runs the local `nodemon` from `node_modules/.bin` if it is installed in the project.

### Option C — global nodemon

```bash
nodemon server.js
```

### While it is running

- Edit and save a watched file → nodemon prints a restart line and runs `node` again.
- Press **`Ctrl+C`** to stop.

### Tip: manual restart without saving a file

In the nodemon terminal, type **`rs`** and **Enter** to restart once.

---

## Nodemon vs `node`

| | **`node server.js`** | **`nodemon server.js`** |
|---|----------------------|-------------------------|
| **What runs your code** | Node only | Nodemon wraps Node: it starts `node` for you |
| **When you change code** | You must stop (`Ctrl+C`) and run the command again | Nodemon restarts the process for you (for watched files) |
| **Typical use** | Production, scripts, one-off runs | Local development |

Both end up executing your JavaScript with the same Node engine. The difference is **developer workflow**, not a different language runtime.

---

## Nodemon vs `npm start`

**`npm start`** is not a runtime. It is an **npm command** that runs whatever is in your `package.json` under `"scripts"` → `"start"`.

So the comparison is really:

| Command | What actually runs |
|---------|-------------------|
| `npm start` | Whatever the `"start"` script says, often `node server.js` |
| `npm run dev` | Whatever the `"dev"` script says, often `nodemon server.js` |
| `nodemon server.js` | Nodemon directly (if it is on your PATH or you use `npx`) |

Examples:

- If `"start": "node server.js"` then **`npm start` equals `node server.js`** — no auto-restart.
- If `"start": "nodemon server.js"` then **`npm start` equals nodemon** — auto-restart.
- If `"dev": "nodemon server.js"` then **`npm run dev` uses nodemon** — auto-restart.

**Why keep both?** A common pattern:

- **`npm run dev`** — you daily development with nodemon.
- **`npm start`** — plain `node` for “run exactly once like production” or for hosts that only know `npm start`.

---

## Quick checklist

1. `cd` into the server project.
2. `npm install --save-dev nodemon`
3. Add `"dev": "nodemon server.js"` to `scripts` (optional but handy).
4. Run `npm run dev` or `npx nodemon server.js`.
5. Remember: **nodemon is for dev convenience**; **Node** is what actually executes your code.

---

## See also

- [npm scripts documentation](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [nodemon documentation](https://github.com/remy/nodemon#readme)

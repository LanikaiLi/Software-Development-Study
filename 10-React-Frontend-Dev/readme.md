# React Frontend Dev

Notes for scaffolding and running a React app with Vite.

## Starting a new React project

1. Create a new empty directory and navigate into it.
2. Scaffold the project in the current directory:

```bash
npm create vite .
```

3. Answer the prompts:

| Prompt | Answer |
| --- | --- |
| Select a framework | React |
| Select a variant | JavaScript |
| Add ESLint for code quality? | Yes |
| Install with npm and start now? | Yes |

## Running the app again later

```bash
npm run dev
```

Vite prints a local URL (usually http://localhost:5173) — open it in the browser.

## After the starter code is generated

Open `src/App.jsx` and replace the boilerplate markup returned by the `App` component with your own.

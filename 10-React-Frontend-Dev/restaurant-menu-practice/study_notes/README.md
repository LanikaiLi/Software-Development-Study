# Restaurant Menu Practice — Study Notes

Notes from debugging why `<starters />` rendered nothing, and how React naming actually works.

---

## The short answer

**No. Not every `.jsx` file needs a capital first letter.**

PascalCase (`App.jsx`, `Starters.jsx`) is for **React components** — files that export a function you use as JSX, like `<App />` or `<Starters />`.

Lowercase names (`main.jsx`, `data.js`, `index.css`) are for **everything else**: the app entry file, data modules, styles, utilities.

The rule that actually matters is **how you write the tag in JSX**, not the filename by itself.

---

## Why `<starters />` disappeared

JSX uses the **first letter of the tag** to decide what you meant:

| You write | React treats it as | Compiles to (roughly) |
|-----------|--------------------|------------------------|
| `<div>` | HTML / DOM element | `createElement('div')` — a string |
| `<Starters />` | Your component | `createElement(Starters)` — a variable |
| `<starters />` | Fake HTML tag named `starters` | `createElement('starters')` — a string |

`<starters />` never called the function in `starters.jsx`. The browser created an unknown empty `<starters>` element. Props like `starters={menu.starters}` were ignored as unknown DOM attributes. **No crash — just a blank section.**

Fix:

```jsx
import Starters from './Starters'

<Starters starters={menu.starters} />
```

Convention: **component function, file, and JSX tag all PascalCase**, so they stay in sync.

---

## Why `main.jsx` stays lowercase

`src/main.jsx` is Vite’s **entry file**. It does not define a component. It:

1. Finds the empty `<div id="root">` in `index.html`
2. Creates a React root
3. Renders **one** component: `<App />`

```jsx
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

You never write `<Main />`. So there is no JSX “is this HTML or a component?” question. Lowercase `main.jsx` is the usual Vite + React layout, same as `index.js` in older setups.

`App.jsx` **is** a component (`function App()` → `<App />`), so it is PascalCase.

---

## File naming cheat sheet (this project)

| File | Capitalize? | Why |
|------|-------------|-----|
| `main.jsx` | No | Bootstraps React; not used as a tag |
| `App.jsx` | Yes | Root component: `<App />` |
| `Starters.jsx` | Yes | Component: `<Starters />` |
| `data.js` | No | Data module, not a component |
| `index.css` / `App.css` | No | Stylesheets |

macOS often ignores case (`./starters` vs `./Starters`), so a mismatch can “work” locally and break on Linux (CI, deploy). Match import paths to the real filename.

---

## Extra: prop name vs component name

This is valid:

```jsx
function Starters({ starters }) { ... }

<Starters starters={menu.starters} />
```

- `Starters` = component (must be PascalCase in JSX)
- `starters` = prop (plain object key; lowercase is fine)

If the names feel confusing, rename the prop, e.g. `items={menu.starters}`.

---

## Mental model: the render tree

```
index.html          → empty #root
  main.jsx          → createRoot(...).render(...)
    <App />         → layout + headings
      <Starters />  → maps menu.starters to <li>
      (mains / desserts still inlined in App for now)
```

Only nodes that appear as `<Something />` need PascalCase components.

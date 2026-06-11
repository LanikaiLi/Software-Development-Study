# Frontend Notes — Key Concepts

## API Calls

| Action | Method | URL | Body |
|--------|--------|-----|------|
| Load all | GET | `/note/get` | — |
| Create | POST | `/note/create` | `{ title, body }` |
| Update | PATCH | `/note/:id` | `{ title, body }` |
| Delete | DELETE | `/note/delete/:id` | — |
| Search | GET | `/note/search?query_text=...` | — |

- All requests use `${baseURL}/...` with `Authorization: Bearer ${token}`
- **When sending a JSON body** (POST / PATCH), include `Content-Type: application/json`; otherwise `req.body` is `undefined`
- **When there is no body** (GET / DELETE), `Content-Type` is not required
- Put search keywords in the URL; use `encodeURIComponent()` for spaces, non-ASCII characters, etc.

## Response Shape

- List: `data.notes` (array)
- Create/update: `data.note` (**array** — use `data.note[0]`)
- Defensive fallback: `data.notes ?? []` (`??` uses the default only when the value is `null` or `undefined`)

## Loading & Selecting Notes

1. `loadNotes()` → `renderNotesList(notes)` renders **all** notes in the left sidebar
2. When notes exist, `selectNote(notes[0])` auto-opens the first one (full list on the left, first note in the editor)
3. User clicks a list item → `selectNote(note)` fills the editor from **in-memory data**; no need to call `GET /note/:id`
4. `selectNote` sets `currentNoteId = note.id`; Save / Delete use it to build the URL
5. `clearEditor()`: on logout or when there are no notes, clears `currentNoteId` and the editor fields

## UI Details

- `active` class: highlights the selected item (JS toggles the class; CSS `.note-item.active` styles it)
- `item.onclick` inside `forEach`: each row binds its own `note` (closure)
- An empty `style.css` breaks the layout (sidebar / editor collapse onto one line)

## Search (not a button)

```javascript
searchInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return
  searchNotes()
})
```

- `onclick` = click; `keydown` + `event.key === 'Enter'` = Enter key
- Empty query → `loadNotes()` shows all notes
- `return` exits the entire function, not just the `if` block. Scope only controls variable visibility, not `return` behavior. To exit only the current block, use `break` (in `for` and `switch` loops)

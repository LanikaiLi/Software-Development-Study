// ------------------------------------------------------------
// 1. State — track current session
// ------------------------------------------------------------
let token = null        // JWT token received after login
let currentNoteId = null  // ID of the currently selected note

// No trailing slash — `${baseURL}/auth/...` must not become ...com//auth/...
// const baseURL = "https://your-notes-api.onrender.com"
const baseURL = "https://software-development-study-2-3dma.onrender.com"

// ------------------------------------------------------------
// 2. Grab all DOM elements we need
// ------------------------------------------------------------
const authPage = document.getElementById('auth-page')
const notesPage = document.getElementById('notes-page')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const authError = document.getElementById('auth-error')
const notesList = document.getElementById('notes-list')
const noteTitle = document.getElementById('note-title')
const noteBody = document.getElementById('note-body')
const searchInput = document.getElementById('search-input')

// ------------------------------------------------------------
// 3. Page switching
// ------------------------------------------------------------
function showNotesPage() {
  authPage.style.display = 'none' // none means to hide the element
  notesPage.style.display = 'block' // block means to display the element
}

function showAuthPage() {
  authPage.style.display = 'block'
  notesPage.style.display = 'none'
}

// ------------------------------------------------------------
// 4. Auth page — user action 1: register
// On register click, read usernameInput and passwordInput, then POST to /auth/user/register
// ------------------------------------------------------------
document.getElementById('btn-register').onclick = async () => {
  const username = usernameInput.value
  const password = passwordInput.value

  const res = await fetch(`${baseURL}/auth/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }) // JSON.stringify converts the object into a JSON string
  })

  const data = await res.json()

  if (!res.ok) {
    authError.textContent = data.error
    return
  }

  authError.textContent = 'Registered! Please sign in.'
}

// ------------------------------------------------------------
// 5. Auth page — user action 2: login
// On sign-in click, read usernameInput and passwordInput, then POST to /auth/user/login
// On success, store the token and show the notes page (the token is required on all note routes so each user only sees their own notes)
// On failure, show an error message from the backend, e.g.:
// - Unknown user: "Invalid username or password"
// - Wrong password: "Invalid password"
// - On success: store token and show notes page
// ------------------------------------------------------------
document.getElementById('btn-login').onclick = async () => {
  const username = usernameInput.value
  const password = passwordInput.value

  const res = await fetch(`${baseURL}/auth/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  const data = await res.json()

  if (!res.ok) {
    authError.textContent = data.error
    return
  }

  token = data.token  // store for use on every subsequent request
  showNotesPage()
  loadNotes()
}

// ------------------------------------------------------------
// 6. Notes page — user action 3: logout
// On sign-out click, clear the token and show the auth page
// token = null marks the user as logged out; we use token to represent the login session
// ------------------------------------------------------------
document.getElementById('btn-logout').onclick = () => {
  token = null
  clearEditor()
  notesList.innerHTML = ''
  showAuthPage()
}

// ------------------------------------------------------------
// 7. Notes page — user action 4: load all notes
// Called when switching to the notes page so we can show the user's existing notes
// Fetches all notes from the backend and renders them in the left sidebar
// ------------------------------------------------------------
async function loadNotes() {
  const res = await fetch(`${baseURL}/note/get`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  const data = await res.json()

  if (!res.ok) {
    console.error(data.error)
    return
  }

  const notes = data.notes ?? [] // ?? uses an empty array if data.notes is null/undefined
  renderNotesList(notes)

  // Like magaphone loading posts — auto-select the first note when any exist
  if (notes.length > 0) {
    selectNote(notes[0])
  } else {
    clearEditor()
  }
}

// ------------------------------------------------------------
// 8. Notes page Machine Behavior — render the left sidebar list
// Renders the notes array as individual items in the sidebar
// ------------------------------------------------------------
function renderNotesList(notes) {
  notesList.innerHTML = ''  // clear first; otherwise each call would keep appending

  notes.forEach(note => {
    const item = document.createElement('div')
    item.className = 'note-item'
    item.dataset.noteId = note.id
    item.textContent = note.title || 'Untitled'

    // User clicks a note → show its content on the right
    item.onclick = () => selectNote(note)

    notesList.appendChild(item)
  })
}

// ------------------------------------------------------------
// 9. Notes page — user action: select a note
// When the user clicks a sidebar item, populate the editor on the right
// ------------------------------------------------------------
function selectNote(note) {
  currentNoteId = note.id
  noteTitle.value = note.title || ''
  noteBody.value = note.body || ''

  notesList.querySelectorAll('.note-item').forEach(item => {
    item.classList.toggle('active', item.dataset.noteId === note.id)
  })
}

function clearEditor() { 
  currentNoteId = null
  noteTitle.value = ''
  noteBody.value = ''
}

// ------------------------------------------------------------
// 10. Notes page — user action: create a new note
// On "New note" click, create a blank note and add it to the sidebar
// Creating a note = first POST with title "Untitled" and empty body, secondly update the note, but you don't need to implement update here, these are considered as separate steps.
// ------------------------------------------------------------
document.getElementById('btn-new-note').onclick = async () => {
  const res = await fetch(`${baseURL}/note/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title: 'Untitled', body: '' })
  })

  const data = await res.json()
  //console.log(data)

  if (!res.ok) {
    console.error(data.error)
    return
  }

  // Supabase insert().select() returns an array, not a single object
  const note = data.note[0]
  await loadNotes()
  selectNote(note)
}

// ------------------------------------------------------------
// 11. Notes page — user action: update a note
// On save click, PATCH /note/:id with the current title and body
// Then reload the list and re-select the updated note
// ------------------------------------------------------------
document.getElementById('btn-save').onclick = async () => {
  if (!currentNoteId) return // if no note is selected, do nothing

  const res = await fetch(`${baseURL}/note/${currentNoteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title: noteTitle.value, body: noteBody.value })
  })

  const data = await res.json()

  if (!res.ok) {
    console.error(data.error)
    return
  }

  const note = data.note[0]
  await loadNotes()
  selectNote(note)
}

// ------------------------------------------------------------
// 12. Notes page — user action: delete a note
// On delete click, DELETE /note/delete/:id, then reload the list
// ------------------------------------------------------------
document.getElementById('btn-delete').onclick = async () => {
  if (!currentNoteId) return

  const res = await fetch(`${baseURL}/note/delete/${currentNoteId}`, {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${token}`
      }
  })

  const data = await res.json()

  if (!res.ok) {
    console.error(data.error)
    return
  }

  await loadNotes()
}

// ------------------------------------------------------------
// 13. Notes page — user action: search notes
// User types in the search box and presses Enter (not a button click)
// Backend route: GET /note/search?query_text=...
// ------------------------------------------------------------
async function searchNotes() {
  const query = searchInput.value.trim()

  // Empty query = show all notes
  if (!query) {
    await loadNotes()
    return // return stops the entire function; the API call below will not run
  }

  const res = await fetch(
    `${baseURL}/note/search?query_text=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  const data = await res.json()

  if (!res.ok) {
    console.error(data.error)
    return
  }

  const notes = data.notes ?? []
  renderNotesList(notes)

  if (notes.length > 0) {
    selectNote(notes[0])
  } else {
    clearEditor()
  }
}

// onclick = click; keydown = key press — use event.key to check which key was pressed
searchInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return

  searchNotes()
})

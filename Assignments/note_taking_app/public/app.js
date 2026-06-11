// ------------------------------------------------------------
// 1. State — 记录当前状态
// ------------------------------------------------------------
let token = null        // 存登录后拿到的 JWT token
let currentNoteId = null  // 存当前选中的 note id

// No trailing slash — `${baseURL}/auth/...` must not become ...com//auth/...
// const baseURL = "https://your-notes-api.onrender.com"
const baseURL = "https://software-development-study-2-3dma.onrender.com"

// ------------------------------------------------------------
// 2. 拿到页面上所有需要用的元素
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
// 3. 页面切换
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
// 4. 登陆页面用户行为1: 注册
// 用户点击register button时，摘取usernameInput和passwordInput的值，然后发送请求到backend的这个api route：/auth/user/register
// ------------------------------------------------------------
document.getElementById('btn-register').onclick = async () => {
  const username = usernameInput.value
  const password = passwordInput.value

  const res = await fetch(`${baseURL}/auth/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }) // JSON.stringify is used to convert the username and password object into a JSON string
  })

  const data = await res.json()

  if (!res.ok) {
    authError.textContent = data.error
    return
  }

  authError.textContent = 'Registered! Please sign in.'
}

// ------------------------------------------------------------
// 5. 登陆页面用户行为2: 登录
// 用户点击sign in button时，摘取usernameInput和passwordInput的值，然后发送请求到backend的这个api route：/auth/user/login
// 如果成功，则将token存起来并展示notes page （存起来是因为之后在notes 相关的所有routes都要带上这个token才能确保每个用户只能看到他们自己的notes）
// 如果不成功，则显示错误信息和对用户的建议，比如：
// - 如果用户名不存在，则显示："User not found. Please register first."
// - 如果密码错误，则显示："Invalid password. Please try again."
// - 如果用户名和密码都错误，则显示："Invalid username or password. Please try again."
// - 如果用户名和密码都正确，则将token存起来并展示notes page
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

  token = data.token  // 存起来，之后每次请求都要带
  showNotesPage()
  loadNotes()
}

// ------------------------------------------------------------
// 6. notes页面用户行为3:登出
// 用户点击sign out button时，将token清空并展示auth page， 将token清空是因为后续不需要这个token了，我们也需要用token = null的方式来标注当前没有登录的状态，我们用token来标注登陆的session
// ------------------------------------------------------------
document.getElementById('btn-logout').onclick = () => {
  token = null
  clearEditor()
  notesList.innerHTML = ''
  showAuthPage()
}

// ------------------------------------------------------------
// 7. notes页面用户行为4: 加载所有 notes
// 页面切换到 notes page 时自动调用，因为页面切换到 notes page 时，我们需要为用户展示他现在有的所有笔记
// 从后端拿到当前用户的所有 notes，渲染到左边列表
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

  const notes = data.notes ?? [] // ？？ means if the data.notes is null, then use an empty array
  renderNotesList(notes)

  // 像 magaphone 加载 posts 后立刻展示内容一样，有 note 时自动选中第一条
  if (notes.length > 0) {
    selectNote(notes[0])
  } else {
    clearEditor()
  }
}

// ------------------------------------------------------------
// 8. note页面机器行为 - 渲染 左侧notes 列表
// 把 notes 数组渲染成左边列表里的一条条 note
// ------------------------------------------------------------
function renderNotesList(notes) {
  notesList.innerHTML = ''  // 先清空，因为之前可能有其他的note，我们需要先清空， 不然每次call这个function会无限append下去

  notes.forEach(note => {
    const item = document.createElement('div')
    item.className = 'note-item'
    item.dataset.noteId = note.id
    item.textContent = note.title || 'Untitled'

    // 用户点击某条 note → 右边显示内容
    item.onclick = () => selectNote(note)

    notesList.appendChild(item)
  })
}

// ------------------------------------------------------------
// 9. note页面用户行为：选中某条 note
// 用户点击左边列表某条 note 时，右边显示它的内容
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
// 10. note页面用户行为：创建新 note
// 用户点击new note button时，创建一个新 blank note，并渲染到左边列表
// 创建新笔记其实 = 创建一个title为Untitled，body为空的note，然后再更新笔记的title和body为用户的输入
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

  // 后端 Supabase insert().select() 返回的是数组，不是单个对象
  const note = data.note[0] // data.note is an array, so we need to get the first element
  await loadNotes()
  selectNote(note)
}

// ------------------------------------------------------------
// 11. note页面用户行为：更新 note
// 用户点击save button时，发送请求到 PATCH /note/:id，更新 note 的 title 和 body
// 然后重新加载 notes 列表，并选中更新后的 note
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
// 12. note页面用户行为：删除 note
// 用户点击delete button时，发送请求到 DELETE /note/:id，删除 note
// 然后重新加载notes列表，并选中更新后的note
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
// 13. note页面用户行为：搜索 note
// 用户在 search 输入框里打字，按 Enter 键触发搜索（不是 button click）
// 后端 route: GET /note/search?query_text=...
// ------------------------------------------------------------
async function searchNotes() {
  const query = searchInput.value.trim()

  // 空关键词 = 显示全部 notes
  if (!query) {
    await loadNotes()
    return //here after return, the entire function will stop executing, so the api call below will not be made
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

// onclick 是「点击」；keydown 是「键盘按下」——用 event.key 判断按了哪个键
searchInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return

  searchNotes()
})
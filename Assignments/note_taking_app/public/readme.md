# Frontend Notes — 今日知识点

## API 调用

| 操作 | Method | URL | Body |
|------|--------|-----|------|
| 加载全部 | GET | `/note/get` | — |
| 创建 | POST | `/note/create` | `{ title, body }` |
| 更新 | PATCH | `/note/:id` | `{ title, body }` |
| 删除 | DELETE | `/note/delete/:id` | — |
| 搜索 | GET | `/note/search?query_text=...` | — |

- 所有请求用 `${baseURL}/...`，并带 `Authorization: Bearer ${token}`
- **有 JSON body 时**（POST / PATCH）必须加 `Content-Type: application/json`，否则 `req.body` 是 `undefined`
- **无 body 时**（GET / DELETE）不需要 `Content-Type`
- 搜索关键词放 URL 里，用 `encodeURIComponent()` 处理空格、中文等特殊字符

## 响应数据结构

- 列表：`data.notes`（数组）
- 创建/更新：`data.note`（**数组**，取 `data.note[0]`）
- 防御写法：`data.notes ?? []`（`??` = 仅当 `null`/`undefined` 时用默认值）

## 加载 & 选中 note

1. `loadNotes()` → `renderNotesList(notes)` 渲染**全部**到左侧列表
2. 有 note 时 `selectNote(notes[0])` 自动打开第一条（列表全显示，编辑区默认第一条）
3. 用户点击列表项 → `selectNote(note)` 用**内存里已有的数据**填右侧，不必再调 `GET /note/:id`
4. `selectNote` 设置 `currentNoteId = note.id`，Save / Delete 靠它拼 URL
5. `clearEditor()`：登出或没有 note 时，清空 `currentNoteId` 和编辑区

## UI 细节

- `active` class：选中项高亮（JS 切换 class，CSS `.note-item.active` 控制样式）
- `item.onclick` 写在 `forEach` 里：每行绑定自己的 `note`（闭包）
- 空 `style.css` 会导致布局混乱（sidebar / editor 挤在一行）

## 搜索（非 button）

```javascript
searchInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return
  searchNotes()
})
```

- `onclick` = 点击；`keydown` + `event.key === 'Enter'` = 回车
- 空关键词 → `loadNotes()` 显示全部
- return 是退出整个函数，不是退出 if block。scope 只管变量的可见范围，不管 return 的行为。如果你只想退出当前block 要用 break，break 才是只退出当前 block（用在 for 和 switch 里）

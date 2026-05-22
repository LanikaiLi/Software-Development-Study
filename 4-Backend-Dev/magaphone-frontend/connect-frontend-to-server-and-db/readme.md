# Megaphone 前端（学习笔记）

本目录是一个配合 `megaphone-server`（Express + MongoDB）使用的简单前端：用表单提交新帖子，并用 `fetch` 与本地 API 通信。

## 运行前准备

1. 先启动后端：`megaphone-server` 里运行 `nodemon server.js`（或 `node server.js`），默认监听 **http://localhost:3000**。
2. 用浏览器打开本目录下的 `index.html`（可直接 `file://` 打开，或通过本地静态服务器打开）。

---

## 我们曾经遇到的问题：`POST /posts` 返回 400

### 现象

浏览器控制台里出现：`POST http://localhost:3000/posts 400 (Bad Request)`。

### 原因（与 CORS 无关）

服务器在创建帖子时会检查请求体里是否包含 **`body`** 和 **`author`** 两个字段。若缺少任意一个，就会返回 **400**，并提示类似「body and author are required」。

若前端 JSON 里写的是 **`user`** 而不是 **`author`**，服务器解构不到 `author`，会认为参数不合法，从而返回 400。

### 结论

**前端发送的 JSON 字段名必须与后端 `req.body` 里读取的字段名一致。**  
本项目中：正文用 `body`，作者用 `author`（表单项的 `id` 仍可以是 `user`，只要在 `JSON.stringify` 的对象里映射成 `author` 即可）。

---

## 为什么请求体里用 `JSON.stringify`，而不是 `JSON.parse`？

这是两个相反的操作：

| 方法 | 作用 | 典型使用场景 |
|------|------|----------------|
| **`JSON.stringify(对象)`** | 把 JavaScript **对象** 转成 **JSON 字符串** | 发给服务器：放进 `fetch` 的 `body`，并配合 `Content-Type: application/json` |
| **`JSON.parse(字符串)`** | 把 **JSON 字符串** 转成 JavaScript **对象** | 处理服务器返回的文本；或直接用 **`response.json()`**（内部会做解析） |

`fetch` 的 `body` 需要的是**字符串**（或 `FormData` 等），不能直接传普通对象，所以提交时要对对象做 **`stringify`**。若在「构造请求体」这一步误用 **`parse`**，方向就反了。

---

## 与后端约定（便于对照）

创建帖子：`POST http://localhost:3000/posts`  

请求体示例（JSON）：

```json
{
  "body": "帖子正文",
  "author": "作者名"
}
```

读取全部帖子：`GET http://localhost:3000/posts`（本仓库中的 `getPosts` 已示例如何请求与 `response.json()` 取数）。

---

## 其他提示

- 若控制台是 **CORS** 相关报错，与本次 **400** 不同：400 表示请求已到达服务器，但服务器认为参数不合法。
- 表单提交处理里使用 **`event.preventDefault()`**，可避免默认整页刷新（否则有时会看到地址栏带上查询参数等意外行为）。

---

## 通过服务器打开 `newuser.html`（`express.static`）

注册页 `newuser.html` 可以通过后端访问：`http://localhost:3000/newuser`（需先启动 `megaphone-server`）。

若只配置了「返回 HTML」、没有配置静态文件，浏览器控制台会报：

- `style.css` / `create-user.js` 的 **MIME type** 错误（实际收到的是 HTML）
- **404** 找不到 JS 文件

**原因：** 页面里的 `<link href="style.css">` 会让浏览器去请求 `http://localhost:3000/style.css`，服务器必须能把这个文件发出来，不能只处理 `/newuser` 这一条路由。

**解决办法（在后端 `megaphone-server/server.js`）：** 使用 `express.static(frontendDir)`，把整个前端文件夹「挂」到服务器上。详细说明见 **`megaphone-server/readme.md`** 里的「学习笔记：用 Express 提供 HTML 页面和静态文件」一节。

**本地测试 `create-user.js`：** `baseURL` 需指向正在运行的 API，例如 `http://localhost:3000`（不要末尾加 `/`，避免 `//users` 双斜杠）。

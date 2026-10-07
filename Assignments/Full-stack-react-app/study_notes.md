# 学习笔记：Weather Forecasting App

记录每次提问和回答，按开发步骤排列。

---

## 总览：Full Stack App 的 4 层结构

```
① 前端 Frontend（React）     用户看到、点击的页面
        ↓ 发请求
② 后端 Backend（Express）    自己写的服务器，负责处理请求
        ↓                ↓
③ 数据库（MongoDB）       ④ 外部 API（OpenWeather）
   存自己的数据              提供天气数据
```

- 前端只管显示，后端只管处理和保存数据。

## 开发路线图

| 步骤 | 做什么 |
|---|---|
| 0. 准备环境 | 安装 Node，拿 API key，建 GitHub 仓库 |
| 1. 设计前端 | 页面区块 → 用户操作 → API 清单 |
| 2. 后端基础 | Express + 天气中间人接口 |
| 3. 数据库 + 用户系统 | MongoDB，注册和登录 |
| 4. 收藏功能 | 收藏的增、删、查接口 |
| 5. 前端骨架 | 先用假数据搭组件 |
| 6. 接通数据 | 4 个 hook + 连接后端 |
| 7. 错误处理 | |
| 8. 美化 | CSS、响应式、动画 |
| 9. 上线 | |
| 10. README | |

## 3 条 Developer 思维

1. 先让它能用，再让它好看。
2. 每次只做一小步，马上测试。
3. 报错是线索，不是失败。先读报错，再改代码。

---

## 第 1 步：设计前端

### 问：第 0 步和第 2 步之间，是不是少了"设计前端"？

**答：对。** API 是为用户操作服务的。先知道用户会点什么，才知道后端要提供什么。

**方法：从用户操作推出 API。** 每个操作问 2 个问题：
1. 需要什么数据？
2. 数据从哪里来？前端自己就有，还是要找后端拿？

---

### 问：要存收藏城市，是不是要做登录系统？

**答：** 真实产品需要。当时有 3 个方案：

| 方案 | 效果 | 工作量 |
|---|---|---|
| A. 不分用户 | 所有人共用 1 个收藏列表 | 最小 |
| B. 按设备区分 | 每个浏览器有自己的列表，不用注册 | 小 |
| C. 完整登录 | 每个用户有自己的列表 | 大 |

**决定：选 C。按正常的开发顺序做，先做用户系统，再做收藏功能。**

- 登录状态适合用 `useContext`，因为很多组件都要知道用户有没有登录。

---

### 决定：没登录时也要显示收藏功能

- 收藏列表：显示"注册登录后即可使用该功能"。
- ⭐ 收藏按钮：显示按钮，点击后出现同样的提示。
- **原因：** 让老师和用户看到功能存在，再引导他们去用。
- README 里放一个测试账号，方便老师测试。

---

### 问：需要单独设计手机版吗？

**答：不需要。** 这个作业做的是网页，不是 React Native 手机 App。

| 概念 | 意思 | 要不要做 |
|---|---|---|
| React Native | 做一个要安装的手机 App | 不用 |
| 响应式设计 | 同一个网页在手机上自动调整排版 | 要（老师的要求） |

响应式在第 8 步用 CSS 实现。

---

### 1.2 练习的重点：自己的后端接口也叫 API

**规则：前端不能直接连接数据库，必须先请求后端。**

```
前端  →  你的后端 API  →  数据库
```

- 原因：连接数据库需要密码。前端代码在用户浏览器里，任何人都能看到。

**天气数据会经过 2 段请求：**

```
前端      →  /api/forecast?city=Paris            →  你的后端
你的后端  →  api.openweathermap.org/...&appid=KEY  →  OpenWeather
```

- 前端只认识自己后端的地址。API key 只出现在第二段，所以很安全。

---

### 问：核对密码在前端还是后端？

**答：后端。**

- 数据库里存的不是密码原文，而是加密后的一串乱码（hash）。
- 后端把用户输入的密码加密一次，再和数据库里的比较。
- 核对成功后，后端给前端一张"门禁卡"（token）。之后每次请求收藏数据，都要带上它。

### 问："前端代码任何人都能修改，在前端核对等于没有核对"是什么意思？

**答：** 前端代码会下载到用户的浏览器里。按 F12 就能看到并修改。

如果在前端核对：

| 漏洞 | 发生什么 |
|---|---|
| 密码被看到 | "正确密码"必须先发送到浏览器，按 F12 就能看到 |
| 核对被跳过 | 用户把代码改成 `if (true)`，任何密码都能登录 |

- 比喻：前端核对 = 门卫站在你家里；后端核对 = 门卫站在大楼里。
- **规则：任何和安全有关的检查，都必须在后端做。**

---

### 问：退出登录需要后端吗？退出后页面也会变化。

**答：不需要。** 页面变化不需要新数据。

退出的 3 个步骤：
1. 前端删掉门禁卡（token）。
2. 前端把"当前用户"状态设为"没有人"。
3. React 发现状态变了，自动显示"未登录"页面。

- 验证方法：需要新数据吗？不需要 → 不需要 API。
- "当前用户"状态用 `useContext` 保存。它一变，顶部栏、收藏列表、⭐ 按钮会同时更新。

---

### 最终 API 清单

| # | 用户操作 | API |
|---|---|---|
| 1 | 搜索城市 | `GET /api/weather?city=Paris` |
| 2 | 切换 °C / °F | 不需要（前端换算） |
| 3 | 看 5 天预报 | `GET /api/forecast?city=Paris` |
| 4 | 注册 | `POST /api/auth/register` |
| 5 | 登录 | `POST /api/auth/login` |
| 6 | 退出登录 | 不需要（前端删掉门禁卡） |
| 7 | 看收藏列表 | `GET /api/favorites` |
| 8 | 收藏城市 | `POST /api/favorites` |
| 9 | 删除收藏 | `DELETE /api/favorites/:id` |
| 10 | 点击收藏的城市 | 复用第 1 行和第 3 行 |

- API 的 4 种动作：`GET` 读取、`POST` 新增、`PUT` 修改、`DELETE` 删除。
- 不同的按钮可以用同一个 API。能复用就不要重复写。

---

## 第 2 步：后端基础

### 问：`.gitignore` 应该在 server 和 client 里各放一个，还是放在外面？

**答：放在外面，整个项目只放 1 个。**

```
weather_forecasting_app/
├── .gitignore     ← 放这里
├── client/
└── server/
```

- 规则：`.gitignore` 对它所在的文件夹和所有子文件夹都有效。
- Vite 会自动在 `client` 里生成一个 `.gitignore`，保留它就好，不会冲突。

---

### 问：`package.json` 和 `package-lock.json` 有什么区别？

**答：** 一个是购物清单，一个是购物小票。

| | package.json | package-lock.json |
|---|---|---|
| 比喻 | 购物清单 | 购物小票 |
| 记录什么 | 需要哪些工具和大概的版本 | 实际安装的精确版本 |
| 例子 | `"express": "^5.1.0"`（5.x 都可以） | `express 5.1.0` 和它依赖的工具 |
| 谁来写 | 自己，或 npm 自动添加 | npm 自动生成 |
| 能手动改吗 | 可以 | 不要 |
| 上传 GitHub 吗 | 上传 | 也上传 |

- 作用：别人运行 `npm install` 后，装上和你完全一样的版本。

---

### 问：为什么写 `req.query.city`，而不写 `const { city } = req.query`？

**答：两种写法效果完全一样。**

```js
const city = req.query.city;   // 写法 A：点号读取
const { city } = req.query;    // 写法 B：解构
```

| 写法 | 什么时候更方便 |
|---|---|
| A. 点号 | 只拿 1 个值 |
| B. 解构 | 要拿多个值，比如 `const { city, units } = req.query` |

**`req.query` 里有什么？** 网址 `?` 后面的所有参数：

| 网址 | req.query |
|---|---|
| `/api/weather?city=Paris` | `{ city: 'Paris' }` |
| `/api/weather?city=Paris&abc=123` | `{ city: 'Paris', abc: '123' }` |

- 网址是自己设计的，所以知道里面有什么。
- **Developer 思维：不确定时就打印出来看**，比如 `console.log(req.query);`。

---

### 天气数据的位置

| 数据 | 位置 | 代码怎么读取 |
|---|---|---|
| 温度 | `main` 里 | `data.main.temp` |
| 湿度 | `main` 里 | `data.main.humidity` |
| 风速 | `wind` 里 | `data.wind.speed` |
| 天气描述 | `weather` 列表第 1 项 | `data.weather[0].description` |

---

### 2.5 代码检查：预报 API

**做得好的地方：** 代码能运行，而且自己想到了"先拿经纬度，再查预报"。

**要改的 3 个地方：**

| # | 问题 | 怎么改 | 学到什么 |
|---|---|---|---|
| 1 | 预报地址少了 `&units=metric`，温度会是开尔文（约 288，而不是 15） | 加上 `&units=metric` | 照着旧代码写新代码时，逐个检查参数 |
| 2 | 请求了 2 次 OpenWeather，其实 1 次就够 | 预报地址直接用 `q=${city}` | 先找最简单的方法；请求越少，速度越快，额度用得越少 |
| 3 | 地址写成 `/api/weather/forecast`，和 API 清单的 `/api/forecast` 不一样 | 改代码，或者更新清单 | API 清单是前后端的约定，两边必须一致 |

**命名习惯：** JavaScript 的变量名一般用 camelCase，比如 `forecastUrl`，不用 `url_get_city_forecast`。

---

### 问：API 返回的数据太多，看不懂怎么办？

**方法：先折叠，只看最外层。** 在浏览器里点击每个 `▼` 把内容收起来，只看第一层有哪些 key。

预报数据的最外层：

| key | 是什么 |
|---|---|
| `cnt` | `list` 里有多少项（40） |
| `list` | 预报列表，每一项是一个时间点的天气 |
| `city` | 城市信息：名字、国家等 |

`list` 里的每一项：

| key | 是什么 |
|---|---|
| `dt_txt` | 时间，例如 `"2026-10-03 18:00:00"` |
| `main.temp` | 温度 |
| `weather[0].description` | 天气描述 |
| `wind.speed` | 风速 |

- 40 项 = 5 天 × 每天 8 项。每 3 小时 1 项。
- 后面要解决的问题：页面只需要 5 天，怎么从 40 项里得到 5 项？

---

### 好习惯：每完成一步，就保存到 GitHub

```
git add .
git commit -m "说明这次做了什么"
git push
```

- 如果以后代码改坏了，可以回到能用的版本。
- `.gitignore` 会自动跳过 `.env`。

---

## 第 3 步：数据库 + 用户系统

### 问：为什么要在连接地址的 `.net/` 后面加上数据库名字 `weather-app`？以前上课有时候不加。

**答：不加也能用。** 但是不加的话，MongoDB 会把数据存进一个默认的数据库，名字叫 `test`。

| 写法 | 数据存在哪里 |
|---|---|
| `...mongodb.net/?retryWrites=true...` | `test` 数据库 |
| `...mongodb.net/weather-app?retryWrites=true...` | `weather-app` 数据库 |

**为什么这次建议加：** 免费版只能建 1 个集群，所以多个作业会共用同一个集群。如果都不加名字，所有作业的数据都会混在 `test` 里。

| 不加名字 | 加名字 |
|---|---|
| 笔记 App 和天气 App 的用户都存在 `test` 里 | 每个项目有自己的数据库 |
| 名字相同的数据会互相覆盖 | 互不影响 |
| 不容易看出数据属于哪个项目 | 一眼就能看出来 |

**另一种写法：** 在代码里指定名字，效果一样。

**决定：用代码指定，和上课的 `task_management_app` 写法一样：**
```js
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
db = client.db('weather-app');   // ← 在这里指定数据库名字
```

- `client.db('名字')` = 选择要用的数据库。
- 这样 `.env` 里的连接地址不用加名字。
- 我们用课上学过的 `mongodb` 工具（MongoClient），不用 Mongoose，少学一样新东西。

---

### 3.2 代码检查：连接数据库

**做得好的地方：**
- 提前加了 `app.use(express.json())`。以后注册、登录、收藏都要用它读取前端发来的数据。
- 提前导入了 `ObjectId`。第 4 步删除收藏时会用到。

**要改的地方：先连接数据库，成功后再启动服务器。**

```js
// 改之前：不等连接完成，服务器就启动了
connectDB()
app.listen(PORT, ...)

// 改之后：连接成功后，才启动服务器
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
```

- `.then(...)` = 等前面的事做完，再做括号里的事。
- 原因：如果数据库还没连上就有请求进来，`db` 是空的，程序会报错。

**小习惯：删掉注释掉的旧代码。** Git 已经保存了旧版本，需要时可以找回来。代码里留太多旧代码，会更难读。

---

### 决定：注册和登录由自己来写（复习 note_taking_app）

`note_taking_app` 已经做过注册和登录，只是数据库不同。

**Supabase → MongoDB 翻译表：**

| 要做的事 | Supabase（上次） | MongoDB（这次） |
|---|---|---|
| 新增 1 个用户 | `supabase.from('users').insert(newUser)` | `db.collection('users').insertOne(newUser)` |
| 按条件找 1 个用户 | `supabase.from('users').select('*').eq('email', email).single()` | `db.collection('users').findOne({ email: email })` |
| 用户的 id | `data.id` | `user._id` |

**不用改的部分：** `bcrypt.hash`、`bcrypt.compare`、`jwt.sign`、`jwt.verify` 的写法完全一样。

**常用状态码：**

| 状态码 | 意思 | 什么时候用 |
|---|---|---|
| 200 | 成功 | 登录成功 |
| 201 | 新建成功 | 注册成功 |
| 400 | 请求有问题 | 没填邮箱或密码 |
| 401 | 身份验证失败 | 密码错误、没有门禁卡 |
| 409 | 冲突 | 邮箱已经注册过 |
| 500 | 服务器出错 | 程序自己出了问题 |

---

### 问：`app.use(express.json())` 是干什么的？

**答：把前端发来的 JSON 文字转成 JavaScript 对象，放进 `req.body`。**

- 前端用 POST 发数据时，数据放在请求的 body 里，是一段 JSON 文字。
- Express 默认不读取 body。没有这一行，`req.body` 是 `undefined`。
- 比喻：门口的翻译员。所有请求进门前，都会先经过它。

| | 没有 `express.json()` | 有 `express.json()` |
|---|---|---|
| `req.body` | `undefined` | `{ email: 'demo@test.com', password: 'demo1234' }` |
| `const { email } = req.body` | 报错 | 正常 |

| 请求类型 | 数据放在哪里 | 需要 `express.json()` 吗 |
|---|---|---|
| GET `/api/weather?city=Paris` | 网址里 → `req.query` | 不需要 |
| POST `/api/auth/register` | body 里 → `req.body` | 需要 |

- `app.use(...)` = 对所有请求都执行。这种"进门前先经过"的函数叫 **middleware（中间件）**。

---

### 问：`ObjectId` 是什么？

**答：MongoDB 给每条数据自动生成的 id 类型。**

- 每条数据存进 MongoDB 时，会自动得到一个 `_id`，例如 `ObjectId("66f1a2b3c4d5e6f7a8b9c0d1")`。
- 它的类型是 ObjectId，**不是**普通文字。

**为什么需要 `new ObjectId(id)`：**
- 前端在网址里发来的 id 是**文字**：`/api/favorites/66f1a2b3...`
- 文字 `"66f1..."` 和 ObjectId `ObjectId("66f1...")` 不相等，就像文字 `"5"` 和数字 `5` 不相等。
- 所以查找前要先转换：

```js
db.collection('favorites').deleteOne({ _id: new ObjectId(id) })
```

- `task_management_app/server.js` 第 77 行，自己写过的注释就是这个意思。
- 这个项目在第 4 步删除收藏时会用到。

---

### 3.2 完成

- 自己加了 `.catch(...)`：连接失败时显示错误，并用 `process.exit(1)` 关闭程序。
- 原因：连不上数据库时，服务器继续运行也没有意义。直接停下来，问题更容易发现。

---

### 3.3 代码检查：注册 API

**报错：`Cannot GET /api/auth/register`**
- 意思：服务器上没有"GET + 这个地址"的 API。
- 原因：Postman 选的是 GET，但代码写的是 `app.post(...)`。
- **方法 + 地址，两个都要对上，才能找到 API。**

**3 个要改的地方：**

| # | 问题 | 怎么改 | 原因 |
|---|---|---|---|
| 1 | Postman 方法选了 GET | 改成 POST | 代码是 `app.post` |
| 2 | `db.collection(users)` | 改成 `db.collection('users')` | 没有引号时，`users` 被当成一个变量，但这个变量不存在，会报错。集合名字是文字，要加引号 |
| 3 | 先加密密码，再检查重复 | 把 `bcrypt.hash` 移到检查重复的后面 | bcrypt 故意设计得很慢，用来防止黑客暴力破解。邮箱已经注册过时，就不用浪费时间加密 |

**Developer 思维：先检查，再做费时的事。**

---

### 3.3 和 3.4 完成：注册和登录

**JWT_SECRET 是什么？** 服务器专用的"印章"。每张门禁卡（token）都盖着这个章。别人不知道这个章，就没法伪造门禁卡。和密码一样，放在 `.env` 里。

生成随机的 JWT_SECRET：
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**登录时，错误信息要模糊：**

| 情况 | 错误信息 |
|---|---|
| 邮箱不存在 | `Invalid email or password` |
| 密码错误 | `Invalid email or password`（一样） |

- 原因：如果提示"密码错误"，黑客就知道这个邮箱注册过。**错误信息越模糊，越安全。**

**放进门禁卡的用户 id：** `user._id.toString()`。MongoDB 的 id 叫 `_id`，类型是 ObjectId，要先转成文字。

---

### 3.5 检查门禁卡：middleware

**门禁卡怎么发给后端：** 放在请求的 header 里，格式固定：
```
Authorization: Bearer 门禁卡的内容
```
- `req.headers.authorization.split(' ')[1]` = 按空格切开，拿第 2 部分，也就是门禁卡本身。

**middleware 里的 `next()`：** 检查通过，放行，交给后面的 API 处理。不调用 `next()`，请求就停在这里。

```js
app.get('/api/auth/me', requireAuth, async (req, res) => { ... })
//                        ↑ 先经过门卫，通过了才执行后面的函数
```

**新发现的 API：** 设计图的顶部栏显示"你好，demo@test.com"。刷新页面后，前端只有门禁卡，不知道邮箱，所以需要一个 API 来问："这张门禁卡是谁的？"

| # | 用户操作 | API |
|---|---|---|
| 11 | 打开页面时，显示当前用户的邮箱 | `GET /api/auth/me` |

- **Developer 思维：做的过程中发现漏掉的需求，很正常。发现后更新 API 清单就好。**

---

### 问：API 分成了几大类，要不要拆分 routes？middleware 要不要单独放一个文件夹？

**答：要。** 现在正是好时机：已经有 2 类 API，第 4 步还会加收藏 API。

**拆分后的结构（和 note_taking_app 一样）：**
```
server/
├── index.js               ← 启动服务器、挂载路由
├── db.js                  ← 连接数据库
├── middleware/
│   └── requireAuth.js     ← 门卫：检查门禁卡
└── routes/
    ├── weather.js         ← 天气 API
    ├── auth.js            ← 注册、登录 API
    └── favorites.js       ← 收藏 API（第 4 步）
```

**规则：一个文件只负责一类事情。** 文件越短，越容易找到和修改代码。

**这叫 refactor（重构）：只改代码的结构，不改功能。** 改完后，所有旧测试都要重新跑一遍，结果应该和以前一样。

**3 个新知识点：**

| # | 知识点 | 说明 |
|---|---|---|
| 1 | 用 `getDB()`，不直接导出 `db` | 见下面的详细解释 |
| 2 | `import` 自己的文件时，要写 `.js` | `import { getDB } from '../db.js'`。用 `import` 写法时不能省略，用 `require` 时可以省略 |
| 3 | 挂载路由时，地址会拼在一起 | `app.use('/api/auth', authRoutes)` + `router.post('/register')` = `/api/auth/register` |

---

### 问：为什么用 `getDB()`，而不是直接导出 `db`？

**更正：** 之前说"直接导出 `db` 一定是空的"，这个说法不准确。准确的情况是：

| 写法 | 直接导出 `db` 会怎样 |
|---|---|
| `require` / `module.exports`（note_taking_app 用的） | ❌ 导出的是那一刻的值，也就是空的，以后也不会更新 |
| `import` / `export`（这个项目用的） | ✅ 其实也能用，因为 `import` 拿到的是最新的值 |

**时间线（require 写法为什么会出错）：**

| 时间 | 发生什么 | `db` 的值 |
|---|---|---|
| 第 1 秒 | 程序启动，`auth.js` 导入 `db` | 空的 → 被复制走了 |
| 第 2 秒 | `connectDB()` 连上数据库 | 有值了 |
| 第 5 秒 | 有人登录，`auth.js` 用 `db` | 还是第 1 秒复制走的空值 → 报错 |

**`getDB()` 每次都是现场去拿 `db`，所以第 5 秒拿到的是有值的 `db`。**

**为什么这个项目还是用 `getDB()`：**
1. `require` 和 `import` 两种写法都能用，不用记区别。
2. 和课上的写法一样。
3. 以后可以在里面加检查，比如 `db` 还是空的就报一个清楚的错误。

---

### 第 3 步完成 🎉

- **Developer 思维：测试时，失败的情况和成功的情况一样重要。** 门卫不只要放行，还要拦住不该进来的人。
- Postman 里改了请求方法后，要按 `Command + S` 保存。
- VS Code 自动整理格式：`Shift + Option + F`。
- 用到什么就导入什么，删掉没用到的导入。

---

## 第 4 步：收藏功能

### 数据设计：一条收藏长什么样

```js
{
  _id: ObjectId("..."),      // MongoDB 自动生成
  userId: "6ac29347...",     // 这条收藏属于谁（来自门禁卡）
  city: "Paris",
  createdAt: new Date()      // 什么时候收藏的
}
```

- **每条数据都要标明"属于谁"**，所以有 `userId`。
- `userId` 来自门禁卡（`req.userId`），**不能**让前端在 body 里传。否则别人可以假装成你，往你的列表里加东西。

### 安全规则：查、删的时候，条件里都要加上 `userId`

```js
deleteOne({ _id: new ObjectId(id), userId: req.userId })
```

- 只写 `_id` 的话，任何登录的人都能删掉别人的收藏。
- 加上 `userId`，就只能删自己的。

---

### 问：门禁卡（token）的作用是什么？哪些 API 要带上它？

**作用：证明"我是谁"，不用每次都输入密码。**

- 服务器不会记住你。每个请求对它来说都是陌生人发来的。
- 所以每次请求都要带上门禁卡，告诉服务器"我是谁"。

**比喻：酒店房卡**

| 酒店 | 我们的 App |
|---|---|
| 在前台出示身份证 | 登录时输入邮箱和密码 |
| 前台给你一张房卡 | 后端给你一张门禁卡（token） |
| 房卡上写着房间号 | 门禁卡里写着 `userId` |
| 房卡几天后失效 | 门禁卡 5 天后失效（`expiresIn: '5d'`） |
| 酒店的防伪标记 | `JWT_SECRET` 印章 |
| 每次进房间刷房卡，不用再给身份证 | 每次请求带门禁卡，不用再输密码 |
| 退房时扔掉房卡 | 退出登录时删掉门禁卡 |

**哪些 API 要带门禁卡：**

| API | 要带吗 | 原因 |
|---|---|---|
| `GET /api/weather` | 不用 | 谁都能查天气 |
| `GET /api/forecast` | 不用 | 谁都能查预报 |
| `POST /api/auth/register` | 不用 | 还没有账号 |
| `POST /api/auth/login` | 不用 | 这一步就是去拿门禁卡的 |
| `GET /api/auth/me` | **要** | 要知道"你是谁" |
| `GET /api/favorites` | **要** | 要知道"看谁的收藏" |
| `POST /api/favorites` | **要** | 要知道"收藏给谁" |
| `DELETE /api/favorites/:id` | **要** | 要确认"删的是你自己的" |

**规则：后端需要知道"你是谁"的 API，就要带门禁卡。**

**前端以后怎么用（第 6 步）：**
1. 登录成功 → 把门禁卡存在浏览器里（`localStorage`）。
2. 请求要带卡的 API → 在 header 里加上 `Authorization: Bearer 门禁卡`。
3. 退出登录 → 删掉门禁卡。

---

### 问：Postman 只发了 `{ "city": "Paris" }`，`req.userId` 是从哪来的？

**答：不是自动的，是自己写的门卫代码（`requireAuth.js`）放进去的。**

**一个请求的完整旅程：**

| 步骤 | 在哪里 | 发生什么 |
|---|---|---|
| 1 | Postman | 把 Authorization 里的 token 放进 header：`Authorization: Bearer eyJhbGci...` |
| 2 | `router.use(requireAuth)` | 请求先到门卫这里 |
| 3 | `requireAuth.js` | 从 header 拿出 token |
| 4 | `requireAuth.js` | `jwt.verify(...)` 检查印章，同时**解码**出里面的内容：`{ userId: "6ac29347...", ... }` |
| 5 | `requireAuth.js` | `req.userId = decoded.userId` ← **就是这一行放进去的** |
| 6 | `requireAuth.js` | `next()` 放行 |
| 7 | `favorites.js` | `req.userId` 已经有值了，直接用 |

- **关键：** 门卫和后面的 API 拿到的是**同一个 `req`**。门卫往 `req` 里放了东西，后面的 API 就能拿到。
- **`userId` 最开始从哪来：** 登录时的 `jwt.sign({ userId: user._id.toString() }, ...)` 把它写进了门禁卡。

| 数据 | 放在请求的哪里 | 代码怎么读 |
|---|---|---|
| `city` | body | `req.body.city` |
| 门禁卡 | header | `req.headers.authorization` |
| `userId` | 门卫从门禁卡里解码出来，放进 `req` | `req.userId` |

**注意：** 门禁卡只是盖了章，并没有加密。任何人都能读出里面的内容，但改不了。所以**不要把密码之类的秘密放进门禁卡**。

---

### 4.3 删除收藏：`req.params` 和 `req.query`

| | 地址长什么样 | 代码怎么写 | 怎么读 |
|---|---|---|---|
| `req.query` | `/api/weather?city=Paris` | `router.get('/weather')` | `req.query.city` |
| `req.params` | `/api/favorites/6ac29...` | `router.delete('/:id')` | `req.params.id` |

- `findOne` 找 1 条，`find(...).toArray()` 找所有符合条件的。
- 删除时条件写 `{ _id: new ObjectId(id), userId: req.userId }`，这样只能删自己的收藏。

---

## 第 4 步完成：后端全部完成 🎉

| # | API | 要门禁卡吗 | 文件 |
|---|---|---|---|
| 1 | `GET /api/weather?city=` | 不用 | `routes/weather.js` |
| 3 | `GET /api/forecast?city=` | 不用 | `routes/weather.js` |
| 4 | `POST /api/auth/register` | 不用 | `routes/auth.js` |
| 5 | `POST /api/auth/login` | 不用 | `routes/auth.js` |
| 11 | `GET /api/auth/me` | 要 | `routes/auth.js` |
| 7 | `GET /api/favorites` | 要 | `routes/favorites.js` |
| 8 | `POST /api/favorites` | 要 | `routes/favorites.js` |
| 9 | `DELETE /api/favorites/:id` | 要 | `routes/favorites.js` |

**第 7 步（错误处理）要回来处理的问题：**
- 城市名打错时，OpenWeather 返回的错误会直接传给前端。
- 删除收藏时，如果 id 格式不对，`new ObjectId(id)` 会报错，服务器会出问题。
- 注册、登录时，如果没填邮箱或密码，现在没有检查。

---

## 第 5 步：前端骨架

**先用假数据搭页面，再接真实数据。** 出问题时，才分得清是页面的问题还是数据的问题。

### 前端的设计

| 网址 | 页面 |
|---|---|
| `/` | `HomePage` 首页 |
| `/login` | `AuthPage` 登录 / 注册页 |

```
main.jsx
└── BrowserRouter
    └── App
        ├── Header              ← 每一页都显示
        └── Routes
            ├── "/"       → HomePage
            │                ├── SearchBar
            │                ├── FavoritesList
            │                ├── CurrentWeather
            │                └── Forecast
            └── "/login"  → AuthPage（登录 / 注册切换）
```

**规则：换页面用 Router，同一页里切换内容用 state。**
- 登录和注册在同一页，所以用 `useState('login')` 切换，不用 2 个网址。

| 文件夹 | 放什么 | 例子 |
|---|---|---|
| `pages/` | 一个网址对应的整个页面 | `HomePage` |
| `components/` | 页面里的一小块 | `SearchBar` |
| `context/` | useContext 用的文件 | 第 6 步再建 |

**React Router 的 4 个工具：**

| 工具 | 作用 |
|---|---|
| `BrowserRouter` | 包住整个 App，开启网址功能 |
| `Routes` + `Route` | 哪个网址显示哪个页面 |
| `Link` | 点击后跳到别的网址（代替 `<a>`，页面不会整个刷新） |
| `useNavigate` | 用代码跳转，比如登录成功后回首页 |

**分工：** CSS（第 8 步）由 Claude 写。写组件时要照着给定的 `className` 写，CSS 才能对上。

---

### 5.3 常见报错对照表

**React 页面一片空白 = 一定有报错。按 `F12` → 打开 Console 看。**

| 报错 | 常见原因 |
|---|---|
| `X is not defined` | 忘了 `import X` |
| `Failed to resolve import "X"` | 工具没装，或者名字、路径写错了（比如装的是 `react-router`，写成了 `react-router-dom`） |
| `does not provide an export named 'default'` | 文件里忘了 `export default`，或者文件没保存 |

- `import` 和 `export` 必须成对出现。
- VS Code 标签页上有白色圆点 ● = 文件还没保存。

---

### 问：React Router 是怎么运作的？

**比喻：电视换台**

| 电视 | React Router |
|---|---|
| 电视机 | `BrowserRouter`：一直盯着网址 |
| 频道号 | 网址，比如 `/` 或 `/login` |
| 节目单 | `Routes` + `Route`：几号频道播什么 |
| 遥控器 | `Link`：按一下就换频道 |
| 电视机外框 | `Header`：换台时不会变 |

**点击"登录 / 注册"后，发生了什么：**

| 步骤 | 谁 | 做了什么 |
|---|---|---|
| 1 | `Link to="/login"` | 把网址改成 `/login`，**不重新加载网页** |
| 2 | `BrowserRouter` | 发现网址变了，通知 `Routes` |
| 3 | `Routes` | 拿 `/login` 和每个 `Route` 的 `path` 比对 |
| 4 | `Routes` | 找到 `path="/login"`，显示它的 `element`，也就是 `<AuthPage />` |
| 5 | `Header` | 在 `Routes` 外面，不受影响，一直显示 |

**为什么每一页都有 Header：**
```jsx
<Header />          ← 在 Routes 外面：永远显示
<Routes>
  <Route ... />     ← 在 Routes 里面：网址对上了才显示
</Routes>
```

**为什么浏览器的"后退"按钮也能用：** 每次 `Link` 改网址，浏览器都会记进历史记录。后退 = 网址变回去，`Routes` 重新比对，显示对应的页面。

---

## 第 6 步：接通数据

### 问：为什么用 useReducer，而不是几个 useState？

**一句话：** 几个 state 总是一起变化时，用 useReducer 把"怎么变"集中写在一个地方。

**用 3 个 useState 的写法：**
```jsx
const [status, setStatus] = useState('idle');
const [current, setCurrent] = useState(null);
const [error, setError] = useState(null);

// 开始查
setStatus('loading');
setError(null);          // ← 容易忘
// 成功
setStatus('success');
setCurrent(data);
setError(null);          // ← 容易忘
// 失败
setStatus('error');
setError(err.message);
```

**用 useReducer 的写法：**
```jsx
dispatch({ type: 'FETCH_START' });
dispatch({ type: 'FETCH_SUCCESS', current: data });
dispatch({ type: 'FETCH_ERROR', error: err.message });
```

| | 3 个 useState | useReducer |
|---|---|---|
| 改状态时 | 每次要记得改 2～3 个 | 只写 1 行 dispatch |
| "怎么改"写在哪 | 分散在各处 | 集中在 reducer 函数里 |
| 漏改的风险 | 高。比如忘了清空 error，成功后还显示旧的错误 | 低。规则只写一次 |
| 读代码时 | 要看很多行才知道发生了什么 | `FETCH_SUCCESS`，一看就懂 |

**比喻：银行柜台**
- `dispatch` = 递一张申请单（写着类型，比如"开始查询"）
- `reducer` = 柜员，按申请单的类型更新账户
- `state` = 账户现在的状态

**什么时候用哪个：**

| 用 useState | 用 useReducer |
|---|---|
| 单独的一个值，比如输入框的文字 | 好几个值总是一起变化 |
| 变化很简单，比如开 / 关 | 有好几种"事件"，每种事件改法不同 |

---

### 6.1～6.4 学到的东西

**Vite 代理（vite.config.js）：** 前端 `5173`、后端 `3000` 是不同的地址，浏览器默认会拦住跨地址请求。设置 `proxy: { '/api': 'http://localhost:3000' }` 后，前端请求 `/api/...` 会被 Vite 转给后端。

**useContext（UnitContext）：**
- `createContext` = 建一块公告板
- `Provider value={{ ... }}` = 把东西贴到公告板上
- `{children}` = Provider 包住的内容（比如 `<App />`）。不写它，里面的内容就不会显示
- `useContext` = 读取公告板
- `value={{ }}` 的外层括号表示"这里写 JavaScript"，内层括号是一个对象

**组件函数分 2 部分：** `return` 上面写 JavaScript（读数据、写函数），`return` 里面写页面要显示的内容。

**受控输入框：** `value={city}` + `onChange={(e) => setCity(e.target.value)}`。`event.preventDefault()` 阻止表单提交时刷新页面。

**props 传函数：** HomePage 把 `searchCity` 传给 SearchBar（叫 `onSearch`）。SearchBar 调用 `onSearch(city)`，实际执行的是 HomePage 的 `searchCity`。子组件就是这样通知父组件的。

**错误信息的旅程：**
1. 后端：`res.status(404).json({ error: '...' })`
2. 前端：`if (!res.ok) throw new Error(data.error)`（`res.ok` = 状态码在 200～299 之间）
3. `catch` → `dispatch({ type: 'FETCH_ERROR', error: err.message })`
4. 页面：`{weather.status === 'error' && <p>{weather.error}</p>}`
- **后端一定要返回正确的状态码。** 之前后端总是返回 200，前端以为成功了，结果页面变空白。

**条件显示：** `{条件 && <内容 />}` = 条件成立时才显示。`&&` 后面只能放 1 个元素，多个元素用 `<> ... </>`（Fragment）包起来。

**列表显示：** `days.map((day) => <div key={day.dt}>...</div>)`。每一项都要有唯一的 `key`。

**5 天预报：** 40 项数据用 `filter` 只留中午 12 点的 → 5 天。`new Date(day.dt * 1000)`：`dt` 单位是秒，`Date` 要毫秒。

**变量名要看得懂：** `current` → `currentWeather`。VS Code 里按 `Command + D` 可以一起选中同名的词。

---

## 进度（第一天结束时）

| 已完成 | 还没做 |
|---|---|
| 后端全部 8 个 API | 6.5 登录页 |
| 前端：Router、Header、°C/°F、搜索、当前天气、5 天预报、错误提示 | 6.6 收藏列表 |
| 老师要求第 2、6、7 条 | CSS（Claude 写）、上线、README |

---

### 问：门禁卡放在 localStorage 里，有安全隐患吗？Inspect 能看到吗？

**能看到：** F12 → Application → Local Storage → `localhost:5173`。

**自己能看到，没关系。** 门禁卡本来就是你的，就像你能看到自己的酒店房卡。

**真正的风险：XSS 攻击。** 如果坏人想办法让一段恶意代码在你的网页上运行，这段代码也能读 localStorage，偷走门禁卡，假装成你。

| 存放方式 | JavaScript 能读到吗 | 优点 | 缺点 |
|---|---|---|---|
| localStorage（这个项目用的） | 能 | 简单，很多项目这样用 | 遇到 XSS 时，门禁卡可能被偷 |
| httpOnly cookie | 不能 | 更安全，XSS 偷不走 | 设置更复杂，还要防另一种攻击（CSRF） |

**这个项目已有的保护：**
1. 门禁卡 5 天后失效，就算被偷，也只能用一段时间。
2. React 默认会把显示的内容当成文字，不会当成代码运行，所以 XSS 很难发生。
3. 门禁卡里只放了 `userId`，没有密码之类的秘密。

**结论：** 学习项目和很多真实项目都用 localStorage。可以在 README 里写一句"以后可以改用 httpOnly cookie"，说明自己考虑过安全问题。

---

### useContext 语法速查表（3 步模板）

**每个 context 都是同样的 3 步，只换名字和内容。**

```jsx
// ===== 文件：context/XxxContext.jsx =====
import { createContext, useContext, useState } from 'react';

// 第 1 步：建公告板
const XxxContext = createContext(null);

// 第 2 步：Provider —— 把东西贴到公告板上
export function XxxProvider({ children }) {
  const [something, setSomething] = useState(初始值);
  function doSomething() { ... }

  return (
    <XxxContext.Provider value={{ something, doSomething }}>
      {children}
    </XxxContext.Provider>
  );
}

// 第 3 步：读公告板的 hook
export function useXxx() {
  return useContext(XxxContext);
}
```

**用的时候，也是固定 2 处：**

| 在哪里 | 写什么 |
|---|---|
| `main.jsx` | 用 `<XxxProvider>` 包住 `<App />` |
| 要用的组件里 | ① `import { useXxx } from '../context/XxxContext.jsx';` ② `const { something } = useXxx();` |

**这个项目的 2 个 context，对比看：**

| | UnitContext | AuthContext |
|---|---|---|
| 公告板上的 state | `unit` | `token` |
| 公告板上的函数 | `toggleUnit`、`formatTemp` | `login`、`logout` |
| 读取的 hook | `useUnit()` | `useAuth()` |
| 谁在用 | Header、CurrentWeather、Forecast | Header、（以后）AuthPage、收藏列表 |

**常见错误：** `X is not defined` → 忘了第 ① 或第 ② 步。

---

### 问：`handleSubmit` 没有参数 `mode`，它怎么知道现在是什么 mode？

**答：因为 `handleSubmit` 写在 `AuthPage` 函数的里面，它能直接读取同一个函数里的变量。** 这叫**闭包（closure）**。

```jsx
function AuthPage() {                              // ← 大房间
  const [mode, setMode] = useState('login');       //   房间里的东西
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {             //   ← 房间里的小房间
    if (mode === 'register') { ... }               //   能看到大房间里的 mode
    body: JSON.stringify({ email, password })      //   也能看到 email、password
  }
}
```

**比喻：** 小房间（`handleSubmit`）在大房间（`AuthPage`）里面，所以能看到大房间里的所有东西。反过来不行，大房间看不到小房间里的东西。

**为什么拿到的总是最新的 mode：**
1. 点 "Sign up" → `setMode('register')`
2. state 变了，React 重新运行一次 `AuthPage` 函数
3. 这一次 `mode` 是 `'register'`，同时建立了一个**新的** `handleSubmit`
4. 新的 `handleSubmit` 看到的就是 `'register'`

**其实 `email`、`password` 也是同样的道理**，它们也没有当作参数传进去。

| 什么时候用参数 | 什么时候直接读 |
|---|---|
| 数据来自函数**外面**，比如子组件传给父组件的 `onSearch(city)` | 数据就在同一个组件里，比如 `mode`、`email` |

---

### 问：☆ Save 按钮在 CurrentWeather 里，为什么 addFavorite 要写在 HomePage？

**答：因为 `favorites` 这份数据，有 2 个组件都要用。** 这叫**状态提升（lifting state up）**。

| 组件 | 要用 favorites 做什么 |
|---|---|
| `FavoritesList` | 显示收藏列表 |
| `CurrentWeather` | 判断按钮显示 `☆ Save` 还是 `★ Saved` |

**如果把 addFavorite 写在 CurrentWeather 里：**
- 后端确实会存上这条收藏。
- 但 `FavoritesList` 不知道多了一个城市，所以**列表不会更新**，要刷新页面才能看到。

**原因：兄弟组件之间不能直接传数据。**

```
            HomePage（存放 favorites）
           /                        \
  FavoritesList                 CurrentWeather
  （读 favorites）             （点 Save → 通知 HomePage）
```

**规则：** 好几个组件都要用的 state，放在它们**共同的父组件**里。

| 方向 | 怎么传 | 例子 |
|---|---|---|
| 父 → 子：给数据 | props | `favorites={favorites}`、`isFavorite={isFavorite}` |
| 子 → 父：通知 | 传一个函数当 props，子组件调用它 | `onFavorite={() => addFavorite(...)}` |

**SearchBar 也是一样：** SearchBar 调用 `onSearch(city)`，真正查天气的 `searchCity` 写在 HomePage 里。

**另一种做法：** 也可以做一个 FavoritesContext（像 AuthContext 那样）。但收藏只在首页用到，用 props 就够了。**规则：只有很多地方都要用的数据，才放进 context。**

---

## 进度（第二天结束时）

**已完成：** 后端全部 8 个 API；前端搜索、当前天气、5 天预报、°C/°F、错误提示、登录、注册、显示邮箱、收藏列表、☆ Save。4 个 hooks 全部用上。

**明天的任务清单：**

| 顺序 | 内容 | 预计时间 |
|---|---|---|
| 1 | 6.6c 删除收藏 + 点击城市查天气（最后一个功能，代码已经准备好） | 10 分钟 |
| 2 | 打开首页时显示默认城市（`useEffect` + 空依赖 `[]`） | 5 分钟 |
| 3 | 学写 CSS 30 分钟（卡片、Flexbox、`@media` + `transition`），其余由 Claude 补齐 | 30 分钟 |
| 4 | 上线：前端 Vercel、后端 Render | 30～45 分钟 |
| 5 | README：已由 Claude 写好，上线后填入网址，并删除 `client/README.md` | 5 分钟 |

---

### 问：删除后，为什么不重新从数据库读一次收藏列表，而是在前端用 filter 算出新列表？

**答：两种做法都对，各有取舍。**

| | A. 前端直接更新（现在的写法） | B. 删除后重新读数据库 |
|---|---|---|
| 请求次数 | 1 次（DELETE） | 2 次（DELETE + GET） |
| 速度 | 快，马上看到结果 | 慢一点，要等第 2 个请求 |
| 和数据库一致吗 | 一致，因为只在 `res.ok`（后端确认删除成功）之后才更新 | 一定一致，数据库就是"唯一真相" |
| 别的设备改了数据 | 看不到，要刷新页面 | 能看到 |

**关键：这不算 hard coding。** 前端做的改动和后端完全一样（删掉同一条），而且是在后端**确认成功之后**才做的。

**怎么选：**
- 数据只有自己会改（比如自己的收藏）→ A，更快
- 数据很多人一起改（比如聊天室、库存）→ B，更准

**还有第 3 种：乐观更新（optimistic update）。** 不等后端回复，先更新页面；如果后端失败，再改回来。体验最快，但代码更复杂。

---

## 总结：父组件和子组件怎么传数据（"爸爸和孩子"）

### 4 条规则

| # | 规则 | 怎么做 |
|---|---|---|
| 1 | **数据往下传**：爸爸给孩子数据 | props，例如 `days={weather.forecast}` |
| 2 | **事件往上报**：孩子通知爸爸"发生了什么" | 爸爸把一个函数当 props 传下去，孩子调用它，例如 `onSearch(city)` |
| 3 | **兄弟要共用数据**：放到共同的爸爸那里 | 状态提升（lifting state up） |
| 4 | **很多地方都要用**：放进 context | 像一块公告板，谁都能直接读，不用一层一层传 |

### 这个项目的组件树

```
App
├── Header ··························· 读 AuthContext、UnitContext（规则 4）
└── Routes
    ├── HomePage（爸爸）
    │   │  自己管理：weather（useReducer）、favorites（useState）
    │   │  自己的函数：searchCity、addFavorite、removeFavorite
    │   │
    │   ├── SearchBar ················ 收到：onSearch
    │   ├── FavoritesList ············ 收到：favorites、onSelect、onRemove
    │   ├── CurrentWeather ··········· 收到：data、isFavorite、onFavorite
    │   └── Forecast ················· 收到：days
    │
    └── AuthPage ····················· 读 AuthContext 的 login（规则 4）
```

### 每个孩子收到了什么

| 孩子 | 往下收到的数据（规则 1） | 往上报告用的函数（规则 2） |
|---|---|---|
| SearchBar | — | `onSearch` → 爸爸的 `searchCity` |
| FavoritesList | `favorites` | `onSelect` → `searchCity`；`onRemove` → `removeFavorite` |
| CurrentWeather | `data`、`isFavorite` | `onFavorite` → `addFavorite` |
| Forecast | `days` | — |

### 3 个完整的例子

**① 搜索城市**
1. 用户在 SearchBar 输入 Paris，点 Search
2. SearchBar 调用 `onSearch('Paris')` ↑ 往上报
3. 爸爸执行 `searchCity('Paris')`，更新 `weather`
4. 爸爸把新数据往下传 ↓：`data` 给 CurrentWeather，`days` 给 Forecast

**② 收藏城市**（规则 3：两个兄弟都要用 favorites）
1. 用户在 CurrentWeather 点 ☆ Save
2. CurrentWeather 调用 `onFavorite()` ↑
3. 爸爸执行 `addFavorite`，更新 `favorites`
4. 爸爸往下传 ↓：新的 `favorites` 给 FavoritesList，新的 `isFavorite` 给 CurrentWeather
5. 列表多了一项，按钮变成 ★ Saved

**③ 点收藏里的城市**（复用 searchCity）
1. 用户在 FavoritesList 点 ★ Toronto
2. FavoritesList 调用 `onSelect('Toronto')` ↑
3. 爸爸执行 `searchCity('Toronto')`，后面和例子 ① 一样

### 为什么登录状态和 °C/°F 用 context，不用 props

| | 用 props | 用 context |
|---|---|---|
| 谁要用 | 只在 HomePage 里用（weather、favorites） | Header、HomePage、AuthPage、CurrentWeather、Forecast、FavoritesList 都要用（token、unit） |
| 如果用 props | 简单 | 要从 App 一层一层往下传，很麻烦 |

**判断方法：** 数据只在一个页面里用 → props；很多页面、很多组件都要用 → context。

---

### 问：是不是只要和后端有关的，都放到爸爸那里做？

**答：不完全对。** 反例：
- `AuthPage` 自己调用了登录和注册 API，没有交给爸爸。
- `AuthContext` 自己调用了 `/api/auth/me`。

**真正的规则不看"有没有调用后端"，而是看"这份数据有谁要用"：**
- **state 放在所有要用它的组件都能拿到的地方**，也就是它们**最近的共同爸爸**。
- **修改这份 state 的函数（包括调用后端），跟 state 放在一起。**

### 自己设计时的 5 步方法（写代码之前先做）

1. 照着设计图，列出所有组件。
2. 列出所有数据（state）。
3. 每份数据都问 2 个问题：**谁要读它？谁要改它？**
4. 决定放在哪里：

| 读 / 改它的组件 | 放在哪里 |
|---|---|
| 只有 1 个组件 | 放在这个组件自己里面 |
| 几个兄弟组件 | 放在它们最近的共同爸爸里面 |
| 很多页面、很多组件 | 放进 context |

5. 修改它的函数也放在同一个地方。然后数据用 props 往下传，函数也用 props 往下传给孩子调用。

### 用这个方法检查我们的项目

| 数据 | 谁读 | 谁改 | 放在哪里 | 为什么 |
|---|---|---|---|---|
| 搜索框的文字 | SearchBar | SearchBar | **SearchBar** | 只有它自己用 |
| 登录表单（email、password、mode） | AuthPage | AuthPage | **AuthPage** | 只有它自己用，所以登录 API 也在这里调用 |
| 没登录的提示 `showLoginHint` | CurrentWeather | CurrentWeather | **CurrentWeather** | 只有它自己用 |
| 天气 `weather` | CurrentWeather、Forecast | SearchBar、FavoritesList（点城市） | **HomePage** | 4 个兄弟都有关 |
| 收藏 `favorites` | FavoritesList、CurrentWeather | CurrentWeather（加）、FavoritesList（删） | **HomePage** | 2 个兄弟都有关 |
| 门禁卡 `token`、`email` | Header、HomePage、FavoritesList、CurrentWeather、AuthPage | AuthPage（登录）、Header（退出） | **AuthContext** | 到处都要用 |
| 单位 `unit` | Header、CurrentWeather、Forecast | Header | **UnitContext** | 跨好几个组件 |

**口诀：先问谁要用，再决定放哪里。**

---

### 自己的思路练习：默认城市

**我的思路：**
1. 默认城市显示在哪里？→ CurrentWeather 和 Forecast
2. 它们的数据从哪来？→ props `data`、`days`，来自爸爸 HomePage
3. 所以要在爸爸里改
4. 爸爸里的 `initialState` 是 null / 空的 → 这就是没有默认城市的原因
5. 想法：先搜一个城市，把结果当作 reducer 的初始值
6. 遵守 DRY：复用 `searchCity`，不重复写

**做得好的地方：**
- **从"显示的地方"往回追数据来源**，一层一层找到真正要改的地方。这是很好的调试和设计方法。
- 找到了根本原因：`initialState` 是空的。
- 想到了 DRY，要复用已有的函数。

**要修正的 3 个地方：**

| # | 我的想法 | 修正 |
|---|---|---|
| 1 | CurrentWeather 和 Forecast 一定要改 | 不用改。它们只负责显示收到的 props。往回追以后，发现真正要改的是爸爸。先猜错、再追到正确的地方，这很正常 |
| 2 | data 和 days 放在爸爸里，是因为要和后端交互 | 主要原因是**好几个兄弟组件都要用它**：SearchBar、FavoritesList 会改它，CurrentWeather、Forecast 会读它 |
| 3 | 把搜索结果当成 reducer 的初始值 | 做不到。初始值必须在页面**第一次显示时马上就有**，但 fetch 需要时间。React 不会等它 |

**第 3 点的时间线：**

| 时间 | 发生什么 |
|---|---|
| 0 秒 | React 用 `initialState`（空的）显示页面 |
| 0 秒 | 页面显示完，useEffect 执行 `searchCity('Montreal')` |
| 0.5 秒 | 数据回来，dispatch → 页面更新，显示 Montreal |

- **useEffect 的意思就是：页面显示完以后，再去做的事。** 依赖写 `[]`，就是只在第一次显示后做 1 次。

**关于代码位置：**
- Hooks（useState、useEffect 等）**只能写在组件函数里面**，不能写在文件最上面、组件外面。
- 用 `function` 声明的函数会被"提升"，技术上写在前面也能调用。而且 useEffect 里的代码要等页面显示完才执行，那时 `searchCity` 早就定义好了。
- 但为了好读，习惯把 useEffect 写在它用到的函数**后面**。

---

### 核心概念：state 变化后会发生什么（re-render）

**state 一变，React 就会把这个组件的函数从头到尾重新执行一次。** 这叫 **re-render（重新渲染）**。

**re-render 不是"重新加载网页"：**

| | 重新加载网页（按刷新） | re-render |
|---|---|---|
| 谁触发 | 用户按刷新键 | state 变了 |
| 范围 | 整个网页从零开始 | 只有 state 变了的组件和它的孩子 |
| state 会怎样 | 全部清空 | 保留，拿到的是新值 |
| 屏幕上 | 闪一下，全部重画 | React 只更新**有变化的那一小块** |

**例子：** 在 HomePage 里 dispatch 新天气 → HomePage 函数重新执行 → 它的孩子 SearchBar、CurrentWeather 等也重新执行 → React 对比前后的结果，只把温度、城市名这些变了的地方更新到屏幕上。

**由此得出 3 条规则：**
1. 组件里直接写的代码，**每次 re-render 都会执行**，所以只能写"计算"，比如 `const isFavorite = ...`。
2. 会改 state 的事（dispatch、setXxx、调用后端），不能直接写在组件里，否则会无限循环。要放进 **useEffect** 或**事件函数**（比如 onClick、handleSubmit）。
3. useEffect 的依赖决定它什么时候再执行：`[]` = 只执行 1 次；`[token]` = token 变了才执行。

**之前的这些问题，其实都是这个概念：**
- 闭包：`handleSubmit` 每次 re-render 都会被重新建立，所以总能拿到最新的 `mode`
- 默认城市不能直接写在组件里：会无限循环
- `onClick={() => setMode('login')}`，不能写成 `onClick={setMode('login')}`：后者在 re-render 时就会执行

---

### re-render 的 3 条规则（用计数器的例子，从头讲）

**基础：state 一变，组件函数就从头到尾再跑一遍。**

**规则 1：组件里直接写"计算"，没问题**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const double = count * 2;          // ✅ 每跑一遍就重新算一次，结果总是对的
  return <p>{count} × 2 = {double}</p>;
}
```

**规则 2：组件里不能直接"改 state"，否则无限循环**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1);               // ❌
  ...
}
```
| 第几次跑 | count | 做了什么 | 结果 |
|---|---|---|---|
| 1 | 0 | setCount(1) | state 变了 → 再跑 |
| 2 | 1 | setCount(2) | state 变了 → 再跑 |
| 3 | 2 | setCount(3) | …… 永远停不下来 |

改 state 要放在 2 个地方之一：
- **事件函数**：用户点了才执行 → `<button onClick={() => setCount(count + 1)}>+1</button>`
- **useEffect**：页面显示后自动执行，次数由依赖控制

**规则 3：useEffect 的依赖决定它什么时候跑**

| 写法 | 什么时候跑 | 比喻 |
|---|---|---|
| `useEffect(() => {...}, [])` | 只在第 1 次显示后跑 1 次 | 闹钟只响一次 |
| `useEffect(() => {...}, [count])` | 第 1 次 + 每次 count 变了 | count 一变，闹钟就响 |
| `useEffect(() => {...})`（没有依赖） | 每次重跑都跑 | 闹钟一直响，很少这样用 |

---

## 学 CSS（30 分钟）

### 技能 1：卡片
```css
.current-weather {
  background-color: white;
  padding: 24px;                               /* 内边距：内容和边框之间 */
  border-radius: 16px;                         /* 圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);   /* 阴影 */
  margin-bottom: 20px;                         /* 外边距：和下一个元素之间 */
}
```
- 选择器 `.名字` 要和 JSX 里的 `className="名字"` 完全一样。
- 多个选择器用逗号隔开，可以共用一套样式（CSS 里的 DRY）。

### 技能 2：Flexbox
- `display: flex` 写在**爸爸**身上，孩子们就横着排。
- `gap` = 孩子之间的距离；孩子写 `flex: 1` = 平分宽度。

### 技能 3：手机适配 + 动画
```css
@media (max-width: 600px) {          /* 屏幕 ≤ 600px 时才生效，像一个 if */
  .forecast-list { flex-direction: column; }
}

.favorite-button { transition: transform 0.2s; }    /* 0.2 秒内慢慢变 */
.favorite-button:hover { transform: scale(1.05); }  /* 鼠标放上去时放大 */
```
- 测试手机模式：F12 → `Command + Shift + M`。

### index.css 和 App.css
- Vite 里，任何 CSS 文件只要被导入，样式就作用于**整个页面**。分文件只是为了整理。

### 问：所有样式都在一个文件里，像大杂烩。专业程序员会怎么整理？

| 方法 | 怎么做 | 优点 | 缺点 |
|---|---|---|---|
| A. 一个文件，分段加注释 | `/* ===== Header ===== */` | 最简单 | 文件会越来越长 |
| B. **每个组件一个 CSS 文件** | `Header.jsx` 旁边放 `Header.css`，在组件里 `import './Header.css'` | 和"一个文件只负责一件事"一致，好找 | 样式还是全局的，名字可能冲突 |
| C. CSS Modules | `Header.module.css` + `className={styles.header}` | 名字不会冲突，Vite 自带 | 要改所有 className 的写法 |
| D. styled-components / Tailwind | 把样式写在 JS 里，或用现成的 class | 大型项目常用 | 要学新工具 |

**这个项目选 B：** 最容易上手，而且和组件的文件结构一一对应。
- `index.css` 只放**全局**样式：`body`、颜色、字体。
- 每个组件的样式放在它自己的 CSS 文件里。

---

## 第 3 天结束时

**已完成：** 所有功能 + 默认城市 + CSS（每个组件一个 CSS 文件、CSS 变量、Grid 排版、手机适配、动画）。

**CSS 补充：**
- **CSS 变量：** 在 `:root` 里定义 `--color-primary: #1f5fd1;`，用的时候写 `var(--color-primary)`。改颜色只改一个地方。
- **transition 要写在元素本身，不要只写在 `:hover` 里**。写在 `:hover` 里时，鼠标移开会"啪"一下跳回去。
- **CSS Grid：** 用 `grid-template-areas` 把页面分成几块，像画格子一样排版。
- `grid-template-columns: minmax(0, 1fr)`：内容再长也不会把页面撑宽（手机上很重要）。

## 明天：用 Render 上线

**计划：只建 1 个 Render 服务，同时提供前端和后端。**

```
用户 → https://你的网址.onrender.com
          ├── /api/...  → Express 后端
          └── 其他网址  → React 前端（Express 把 client/dist 里打包好的文件发给浏览器）
```

**为什么只用 1 个服务：** 前端和后端在同一个网址下，就和本地开发时 Vite 代理的效果一样，前端代码不用改，也不用处理跨域（CORS）。

**明天要做的事：**
1. 后端改 3 个小地方：端口用 `process.env.PORT`；让 Express 提供前端打包好的文件；其他网址都返回 `index.html`，让 React Router 能正常工作
2. 在 Render 上建 Web Service，填写 build 和 start 命令
3. 在 Render 里填 3 个环境变量：`OPENWEATHER_API_KEY`、`MONGODB_URI`、`JWT_SECRET`
4. 测试线上网站，把网址填进 README

---

## 第 4 天：上线

### 问：让 Express 同时提供前端的那段代码是什么意思？

```js
const clientDist = path.join(import.meta.dirname, '../client/dist');
app.use(express.static(clientDist));
app.use((req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});
```

**先看 `npm run build` 打包出了什么：**
```
client/dist/
├── index.html            ← 网页的"外壳"
└── assets/
    ├── index-abc123.js   ← 你所有的 React 代码，压缩成 1 个文件
    └── index-xyz789.css  ← 你所有的 CSS，压缩成 1 个文件
```

**比喻：Express 是一个前台，有 3 个窗口，从上往下依次处理：**

| 顺序 | 窗口 | 代码 | 处理什么 |
|---|---|---|---|
| 1 | API 窗口 | `app.use('/api/...', ...)` | 地址以 `/api` 开头的请求 |
| 2 | 文件架 | `express.static(clientDist)` | `dist` 里**真的有这个文件**，就把文件给浏览器 |
| 3 | 兜底窗口 | 最后那个 `app.use(...)` | 前面都处理不了的，一律给 `index.html` |

**几个请求分别去了哪里：**

| 浏览器请求 | 去了哪个窗口 | 结果 |
|---|---|---|
| `/api/weather?city=Paris` | 1 API | 返回天气数据 |
| `/assets/index-abc123.js` | 2 文件架 | `dist` 里有这个文件 → 返回 JS |
| `/` | 2 文件架 | `express.static` 会自动返回 `index.html` |
| `/login` | 3 兜底 | `dist` 里没有叫 login 的文件 → 返回 `index.html` → React 启动 → React Router 看到网址是 `/login` → 显示登录页 |

**一句话：** 文件架有的就给文件，没有的就给 index.html，让 React Router 去决定显示哪一页。

**其他小知识：**
- `import.meta.dirname` = 当前文件所在的文件夹（`server/`）
- `path.join(a, '../client/dist')` = 从 `server/` 退回上一层，再进 `client/dist`
- `process.env.PORT || 3000`：Render 用它分配的端口，本地用 3000

---

### 上线完成 🎉

**网址：** https://weather-forecasting-app-v9ui.onrender.com

**Render 设置（以后做别的项目可以照抄）：**

| 栏位 | 值 |
|---|---|
| Root Directory | `Assignments/Full-stack-react-app/weather_forecasting_app` |
| Build Command | `cd client && npm install && npm run build && cd ../server && npm install` |
| Start Command | `cd server && node index.js` |
| 环境变量 | `OPENWEATHER_API_KEY`、`MONGODB_URI`、`JWT_SECRET`、`NODE_VERSION=22` |

- `.env` 不会上传到 GitHub，所以要在 Render 上重新填一次环境变量。
- 免费版闲置后会休眠，第一次打开要等大约 50 秒。
- 以后每次 `git push`，Render 都会自动重新部署。
- 上线后一定要测试：在 `/login` 页面按刷新，确认不会出现 "Not Found"。

---

## 交作业清单

| 老师要求交的 | 内容 |
|---|---|
| GitHub 仓库链接（含 README） | 仓库里 `weather_forecasting_app` 文件夹的链接 |
| 网站链接 | https://weather-forecasting-app-v9ui.onrender.com |
| 补充说明 | README 最后的 "Notes for the Evaluator"：测试账号、自己加的后端和数据库、为什么用 Vite、免费版要等 50 秒 |

---

## 整个项目的开发步骤回顾（以后做 full stack 项目可以照着走）

| 步骤 | 做什么 |
|---|---|
| 0 | 准备环境：Node、API key、GitHub 仓库 |
| 1 | 设计前端：画设计图 → 列出用户操作 → 推出 API 清单 |
| 2 | 后端基础：Express + 外部 API 的中间人 |
| 3 | 数据库 + 用户系统：MongoDB、注册、登录、门禁卡（JWT） |
| 4 | 业务功能 API：收藏的增删查 |
| 5 | 前端骨架：Vite、React Router、组件拆分 |
| 6 | 接通数据：4 个 hooks，连接后端 |
| 7 | 错误处理：后端返回正确的状态码，前端显示错误信息 |
| 8 | CSS：卡片、Flexbox、Grid、手机适配、动画 |
| 9 | 上线：Express 同时提供前后端，部署到 Render |
| 10 | README |

**最重要的 developer 思维：**
1. 先设计，再写代码。
2. 每次只做一小步，马上测试。
3. 报错是线索：先读报错，再改代码。不确定时就 `console.log` 打印出来看。
4. 先问"这份数据谁要用"，再决定 state 放在哪里。
5. 用不到的就删掉；看不懂的名字就改名。

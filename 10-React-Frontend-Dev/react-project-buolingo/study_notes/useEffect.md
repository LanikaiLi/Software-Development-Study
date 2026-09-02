# useEffect 学习笔记（Buolingo）

对照文件：`src/App.jsx`

---

## 1. 「渲染」是什么

先不要记术语。

**渲染 = React 又调用了一次 `App` 这个函数。**

React 在问：「现在屏幕上该显示什么？」

- 页面刚打开：会调用一次 `App`
- 你调用了 `setCourses(...)`：也会再调用一次 `App`

`setCourses` 不是只改一个变量，而是告诉 React：

> 数据变了，请再跑一遍 `App`，用新数据画页面。

**`setCourses` 之后 `App` 再跑一遍，是正常的。**  
第一次 `courses` 还是 `[]`，页面几乎是空的；第二次才有数据可以显示。

---

## 2. 所有 `setXXX` 都会让组件重跑吗？

对，可以这么记：

**你调用了 `setXXX`（`useState` 给你的那个函数），就是在请 React 再跑一遍「声明了这个 state 的那个组件」。**

在这个文件里，`useState` 写在 `App` 里，所以 `setCourses(...)` 会让 **`App` 再跑一遍**。如果 `useState` 写在某个子组件里，那只会让那个子组件再跑。

两点小精确：

1. 触发点是 **你调用 `setCourses(...)` 的那一下**，不是 `fetch` 自己结束。`fetch` 结束时如果没调用 `setCourses`，`App` 不会因此重跑。
2. 如果新值和现在的值按 React 看来完全一样（比如已经是 `5` 又 `setCount(5)`），它可能 **跳过** 这一次重跑。

所以：不是所有函数跑完都会 render，是 **`setXXX` 被调用、并且值有变化** 时，才会让对应组件再跑。

---

## 3. 为什么 fetch 不能直接写在 `App` 函数里

如果写成：

```js
function App() {
  const [courses, setCourses] = useState([])
  fetch('...').then(data => setCourses(data))  // 危险
  return <div>{courses[0]?.language}</div>
}
```

会发生：

1. 调用 `App` → 执行 `fetch`
2. 数据回来 → `setCourses`
3. React 再调用 `App` → **又执行 `fetch`**
4. 再 `setCourses` → 无限循环

原因：`App` 里的每一行，只要函数被调用就会再执行一遍。  
`fetch` 写在函数身体里 = 每次重画都再发一次请求。

---

## 4. `useEffect` 做了什么

`useEffect` 把「发请求」从「这次 `App` 从上到下执行」里拆出去。

意思是：

- 这次 `App` 在跑的时候：**先不 fetch**
- 等这次跑完、页面更新完：**再**跑里面的函数

所以第二次跑 `App` 时，并不是「顺着函数每一行又 fetch 一次」。  
第二次主要是：读到新的 `courses`，再 `return` 出页面。

**重要：写进 `useEffect` ≠ 一辈子只跑一遍。**  
它只是把时机改成「这次 `App` 结束之后」。

---

## 5. 第二个参数（依赖数组）

```js
useEffect(() => {
  // 副作用：fetch 等
}, [依赖项])
```

这里的「跑 `fn`」**不是** render。  
render = React 调用 `App`。  
`fn` = 你传给 `useEffect` 的那个函数（这个例子里就是去 `fetch`）。

| 写法 | 含义（什么时候跑 `fn` / fetch） |
|------|------|
| `useEffect(fn)` **不写**第二参数 | 每次 `App` 跑完，都再跑一遍 `fn` |
| `useEffect(fn, [])` | 只在第一次 `App` 跑完后，跑一遍 `fn` |
| `useEffect(fn, [courseId])` | 只有 `courseId` 变了，才再跑 `fn` |

这个项目要「进页面拿一次课程列表」，应该写：

```js
useEffect(() => {
  fetch('https://j-goodman.github.io/language-class-data/data/class-list.json')
    .then((response) => response.json())
    .then((data) => setCourses(data))
}, [])
```

`[]` 的意思：这个 effect 不依赖任何会变的东西，所以只在组件第一次出现时请求一次。

之后 `setCourses` 仍会让 `App` 再跑（为了把数据画出来），但 `[]` 没变，不会再 `fetch`。循环停住，是因为 **请求停了**，不是因为 `App` 不再跑。

---

## 6. 能不能写 `[courses]`？

这个例子里 **不能**。

依赖数组里放的是：**变了就该重新做这件事的值。**

这里的 effect 是去下载列表再 `setCourses`，并不需要先看当前的 `courses`。

如果写 `[courses]`：

1. `fetch` 回来 → `setCourses` → `courses` 变了
2. 依赖变了 → 再跑 effect → 再 `fetch`
3. 又循环

**不要把这个 effect 自己改掉的那个 state 放进依赖。**

更合理的例子：用户选中的 id 变了，才重新请求那一门课：

```js
useEffect(() => {
  fetch(`/api/courses/${courseId}`).then(...)
}, [courseId])
```

---

## 7. 什么时候不写第二参数？

几乎 **不会** 故意不写。

不写 = 每次 `App` 跑完都再执行 effect。

只在很少见的情况说得通：每次画面更新完都要做一件事，**而且这件事不会再 `setState`**（例如打 log）。  
只要 effect 里会改 state（`fetch` + `setCourses`），不写第二参数就很容易循环。

拉数据：写 `[]`，或写真正用到的参数。不写默认别这么干。

---

## 8. 「想实时同步后端」和「这个循环」不是一回事

后端数据变了、前端跟着变，这个需求是有的。  
但 **不写依赖数组造成的循环不是实时更新，是事故**：请求会尽量快地一直打，后端没变也在打。

真正的实时更新要自己控制频率，例如隔几秒问一次，或用 WebSocket。  
这个例子里的 JSON 是静态文件，进页面拿一次就够了。

**「想同步后端」≠「让 `useEffect` 每次 `App` 跑完都 fetch」。**

---

## 9. 对照记忆

| 东西 | 大白话 |
|------|--------|
| 渲染 / render | React 又调用了一次 `App` |
| `return` | 这次调用要显示什么 |
| `setXXX`（如 `setCourses`） | 调用它 = 请 React 再跑声明了这个 state 的组件；值没变则可能跳过 |
| 写在函数里的 `fetch` | 每次调用 `App` 都会再发请求 → 易循环 |
| `useEffect` | 等这次 `App` 结束再去做 fetch |
| `[]` | 只在第一次结束后请求一次 |
| 不写第二参数 | 每次结束后都跑；拉数据时别这样 |

一句话：`useState` 负责记住数据；`useEffect` 负责数据从哪来；依赖数组负责什么时候再去拿。

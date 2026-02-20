# 学习 Q&A 记录

## 工具链

### Vite 是什么？为什么需要它？
前端的构建工具，类比 Go 的 `go build` + `go run` + 热重载。浏览器不认 TypeScript 和 .vue 文件，需要 Vite 编译成 JS/CSS。

**开发模式原理：** 启动 HTTP 服务器，浏览器请求文件时按需编译（不预编译整个项目），通过 WebSocket 实现 HMR（改代码自动刷新）。内部用 esbuild（Go 写的）做编译，所以极快。

**生产构建原理：** 用 Rollup 打包所有文件，做 Tree Shaking（删无用代码）、Code Splitting（按路由拆包）、Minify（压缩）。

**缓存位置：** `node_modules/.vite/deps/`，第三方依赖预构建后缓存在这里。不动依赖就不会重新构建。

### Prettier 是什么？
前端的 `gofmt`，统一代码格式。原理：源码 → AST → 中间表示（Doc）→ 按规则重新打印。只管格式，不管逻辑。

### pnpm vs npm？
都是包管理器。pnpm 全局只存一份依赖，项目里用硬链接指过去，更省磁盘更快。`pnpm store prune` 清理全局缓存。

### node_modules 为什么还存在？
Node.js 的 import 机制写死了去 node_modules 找包。pnpm 在里面放的是符号链接，不是文件副本。

---

## HTML / CSS

### 前端布局的核心思维？
一切皆矩形盒子的嵌套。跟 Qt 的 QWidget + Layout 一样的思路。用 Flexbox 布局：`flex-direction: row`（横排）/ `column`（竖排），90% 的布局用 5 个 flex 属性就够了。

### div 是什么？语义化标签呢？
`div` 是万能空盒子（类比 Qt 的 QWidget）。`<header>`、`<footer>`、`<main>` 等功能跟 div 一样，只是名字不同方便阅读和 SEO。这些是 HTML 规范定义的，不能自定义。

### Vue 组件可以自定义标签吗？
可以。`<ArticleCard />` 看起来像自定义标签，但 Vue 编译时会替换成标准 HTML。类比 Qt 自定义 Widget 类。

### 按钮为什么排成 2×2 格子？
不是格子布局，是 `flex-direction: row`（横排）+ `flex-wrap: wrap`（满了换行）+ 每个按钮 `width: 48%`，一行放两个就满了自动换行。

### min-width / max-width？
跟 Qt 的 `setMinimumWidth()` / `setMaximumWidth()` 一一对应。

---

## JavaScript 基础

### 函数内部可以定义函数？
可以，JS 函数是一等公民。`const fn = value => { ... }` 是箭头函数，等价于 Go 的 `fn := func(value int) { ... }`。内部函数形成闭包，能访问外层变量。

### 闭包里的变量是 static 吗？
不是 static，是闭包捕获。生命周期跟闭包绑定，调两次外层函数会得到两个独立的变量。static 是全局唯一的。

### `() => xxx` 是什么语法？
箭头函数，`() => setCounter(counter + 1)` 等价于 `function() { setCounter(counter + 1) }`，Go 里写 `func() { ... }`。

### addEventListener 的 type 有哪些？
常用：`'click'`、`'input'`、`'keydown'`、`'submit'`、`'mouseover'`。Vue 里用 `@click="handler"` 代替。

### `.method()` 和 `,method()` 的区别？
`.` 是链式调用（访问对象方法），`,` 是逗号运算符（丢掉左边结果）。`obj.method()` 才对。

---

## Vue 3

### Composition API vs Options API？
- Options API（旧）：按 data/methods/computed 分类，像 Java 类
- Composition API（新，推荐）：`<script setup>` 直接写逻辑，像 Go 函数

### el-container 有什么用？
Element Plus 版的 div，自带 `display: flex; flex-direction: column`。省得手写 CSS。

### RouterLink 怎么实现不刷新页面？
拦截 click 事件 → 调 `history.pushState()` 改地址栏 → Vue Router 查路由表 → 只替换 `<RouterView />` 的内容。顶栏底栏不动。

### RouterView 的内容在哪定义？
在 `router/index.ts` 的映射表里。URL 变了 → 查表找组件 → 渲染到 RouterView 位置。

### `:ellipsis="false"` 是什么？
冒号表示传 JS 值（布尔值 false），不是字符串。关闭菜单项溢出时收进 `...` 的行为。

### Vue Router 的历史演进？
多页面（整页刷新）→ 后端模板（整页刷新，模板复用）→ Hash 路由（#/about，不刷新但丑）→ History 路由（/about，干净 URL）← Vue Router 用的。

---

## 项目结构

### views 和 components 的区别？
- **views**：页面，跟路由一一对应，用户通过 URL 访问
- **components**：可复用组件，被 views 或其他组件引用

### 各目录职责？
| 目录 | 职责 | Go 类比 |
|------|------|---------|
| views/ | 页面（路由对应） | handler 函数 |
| components/ | 可复用组件 | 公共工具模块 |
| router/ | 路由配置 | mux 路由注册 |
| stores/ | 跨组件共享状态 | 全局单例 struct |
| types/ | TypeScript 类型 | model/ 包里的 struct |
| mock/ | 假数据（开发用） | 后面删掉 |
| api/ | API 请求封装 | http.Client 封装 |
| utils/ | 工具函数 | pkg/utils/ |
| assets/ | 静态资源 | embed 静态文件 |

### `@/` 路径是什么？
`@` 是 `src/` 的别名，Vite 配置的。`@/types/article` = `src/types/article`。

---

## 详细解释

### import 花括号什么时候加？

跟文件类型（.ts/.vue）无关，只跟导出方式有关：

**默认导出（export default）→ 不加花括号，名字随便取：**

```typescript
// router/index.ts
export default router

// 导入时名字你自己定，以下都行：
import router from './router'
import myRouter from './router'
import abc from './router'
```

**命名导出（export const/function/interface）→ 加花括号，名字必须对上：**

```typescript
// mock/articles.ts
export const mockArticles = [...]
export const mockTags = [...]

// 导入时必须说清楚要哪个
import { mockArticles } from '@/mock/articles'
import { mockArticles, mockTags } from '@/mock/articles'  // 都要
```

**为什么 .vue 文件不加花括号？**

不是因为它是 .vue，而是因为 `<script setup>` 自动就是默认导出。Vue 编译器把 .vue 文件变成：

```typescript
// ArticleCard.vue 编译后（你看不到）
export default {
  __name: 'ArticleCard',
  setup() { /* 你 script setup 里写的代码 */ },
  render() { /* template 编译成的渲染函数 */ }
}
```

一个文件只能有一个 `export default`，所以不需要花括号区分。一个文件可以有多个 `export const`，所以需要花括号指定要哪个。

类比 Go：
- 默认导出 → `import http "net/http"`，别名随便取
- 命名导出 → Go 没有对应概念，但类似 `pkg.FuncA` / `pkg.FuncB` 要指定用包里的哪个函数

---

## Vue 模板语法速查

| 语法 | 含义 | Go 类比 |
|------|------|---------|
| `{{ value }}` | 插值 | `fmt.Sprintf` |
| `v-for="item in list"` | 循环渲染 | `for _, item := range list` |
| `:key="item.id"` | 唯一标识 | 循环里的主键 |
| `:prop="data"` | 传数据给子组件 | 函数传参 |
| `@click="handler"` | 绑定事件 | 事件回调 |
| `defineProps<{ ... }>()` | 声明组件参数 | `func(param Type)` |

import type { Article } from '@/types/article'

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Vue 3 入门笔记',
    summary: '今天开始学习 Vue 3，从项目搭建到组件开发，记录一下学习过程。',
    content: `## 为什么选 Vue 3

Vue 3 是目前最流行的前端框架之一，相比 Vue 2 有很多改进：

- **Composition API**：更灵活的代码组织方式，类似 Go 的函数式写法
- **TypeScript 支持**：原生支持 TS，类型推导更准确
- **性能提升**：虚拟 DOM 重写，编译时优化

## 项目搭建

使用 create-vue 脚手架一键生成项目：

\`\`\`bash
pnpm create vue@latest
\`\`\`

选择 TypeScript、Vue Router、Pinia 等选项，一个完整的项目骨架就搭好了。

## 第一个组件

Vue 的单文件组件（SFC）把模板、逻辑、样式放在一个 .vue 文件里，非常直观。`,
    date: '2026-02-16',
    tags: ['Vue', '前端'],
  },
  {
    id: 2,
    title: 'Go 后端搭建',
    summary: '用 Gin 框架搭建博客 API，实现文章的增删改查接口。',
    content: `## Gin 框架入门

Gin 是 Go 最流行的 Web 框架，性能极高，API 设计简洁。

## RESTful API 设计

博客后端需要以下接口：

- \`GET /api/articles\` — 获取文章列表
- \`GET /api/articles/:id\` — 获取文章详情
- \`POST /api/articles\` — 创建文章
- \`PUT /api/articles/:id\` — 更新文章
- \`DELETE /api/articles/:id\` — 删除文章

## 数据库

使用 GORM 操作 MySQL，定义 Article model 对应数据库表。`,
    date: '2026-02-15',
    tags: ['Go', '后端'],
  },
  {
    id: 3,
    title: 'TypeScript 类型体操',
    summary: '从 Go 的静态类型视角看 TypeScript，其实很多概念是相通的。',
    content: `## Go vs TypeScript 类型系统

两者都是静态类型语言，但有一些有趣的区别：

| 概念 | Go | TypeScript |
|------|-----|------------|
| 基础类型 | int, string, bool | number, string, boolean |
| 接口 | interface（隐式实现） | interface（显式声明） |
| 泛型 | Go 1.18+ 支持 | 从一开始就支持 |
| 空值 | nil | null / undefined |

## 联合类型

TypeScript 有 Go 没有的联合类型，非常灵活：

\`\`\`typescript
type Status = 'draft' | 'published' | 'archived'
\`\`\`

Go 里通常用 const + iota 模拟枚举来实现类似效果。`,
    date: '2026-02-14',
    tags: ['TypeScript', '前端'],
  },
]

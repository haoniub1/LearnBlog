import type { Article } from '@/types/article'

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Vue 3 入门笔记',
    summary: '今天开始学习 Vue 3，从项目搭建到组件开发，记录一下学习过程。',
    date: '2026-02-16',
    tags: ['Vue', '前端'],
  },
  {
    id: 2,
    title: 'Go 后端搭建',
    summary: '用 Gin 框架搭建博客 API，实现文章的增删改查接口。',
    date: '2026-02-15',
    tags: ['Go', '后端'],
  },
  {
    id: 3,
    title: 'TypeScript 类型体操',
    summary: '从 Go 的静态类型视角看 TypeScript，其实很多概念是相通的。',
    date: '2026-02-14',
    tags: ['TypeScript', '前端'],
  },
]

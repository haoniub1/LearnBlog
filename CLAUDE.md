# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

博客系统前端，技术栈 Vue 3 + Vite + TypeScript + pnpm，后端用 Go。

## 开发者背景

- 后端开发者（Go），前端新手，有 Qt 桌面开发基础
- 不需要解释通用编程概念（变量、循环、函数等）

## 命令

- `pnpm dev` — 启动 Vite 开发服务器（HMR）
- `pnpm build` — 生产构建（输出到 `dist/`）
- `pnpm preview` — 本地预览生产构建
- `npx prettier --write .` — Prettier 格式化

## 代码规范

- Prettier: 单引号、2 空格缩进、80 字符行宽（见 `.prettierrc`）
- Vue 3 Composition API + `<script setup>` 语法
- 组件用 PascalCase 命名（如 `ArticleList.vue`）
- 变量和函数用 camelCase
- TypeScript 严格模式，所有变量和函数都要有类型标注
- CSS 使用 scoped，避免样式污染
- 每个组件职责单一，超过 200 行就考虑拆分

## 项目结构

```
src/
  api/        # API 请求封装，对接 Go 后端只改这里
  mock/       # Mock 数据
  components/ # 通用组件
  views/      # 页面级组件
  router/     # 路由配置
  stores/     # Pinia 状态管理
  types/      # TypeScript 类型定义
  utils/      # 工具函数
  assets/     # 静态资源
```

## 教学模式

- 每次只做一个小功能
- 用 Go/Qt 概念做类比解释前端概念
- 先说要做什么，等确认后再写代码
- 只解释前端特有的概念
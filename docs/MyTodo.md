# 待强化知识点

## Vue 插槽（slot）

**现状：** 知道插槽是"坑位"，但不太理解为什么需要它、属性传字符串和插槽传 UI 结构的区别。

**需要搞清楚的：**
- 属性（props）只能传数据（字符串、数字、对象），插槽能传 HTML 结构和组件
- 默认插槽 vs 具名插槽（`#header`、`#footer`）
- 作用域插槽（子组件把数据暴露给父组件的插槽内容）
- 实际场景：什么时候用 props，什么时候用 slot

**项目中用到的地方：**
- `src/components/ArticleCard.vue` — `<template #header>` 给 el-card 的头部填内容

**建议看的资料：**
- Vue 官方文档：插槽章节
- Element Plus 的 el-card、el-dialog 等组件的源码，看它们怎么定义插槽的

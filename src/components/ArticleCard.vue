<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Article } from '@/types/article'

// 声明这个组件接收的 props（从父组件传进来的数据）
// 类比 Go：函数参数 func ArticleCard(article Article)
// q 这个 defineProps是什么语法 <{}>() ?
// a defineProps 是 Vue 宏函数。<{ article: Article }> 是 TypeScript 泛型，定义参数类型。() 是调用。
// a 整体意思：声明这个组件必须传入一个 Article 类型的 article 属性。
// q 这里为什么又改为const了？
// a 因为 goToArticle() 里需要用 props.article.id。不存返回值的话，在 <script> 里拿不到 props。
// a 在 <template> 里可以直接写 {{ article.title }}，但在 <script> 的函数里必须通过 props.article 访问。
const props = defineProps<{
  article: Article
}>()

// useRouter() 获取路由实例，可以用代码跳转页面
// 类比 Go：http.Redirect(w, r, "/article/1", 302)
const router = useRouter()

function goToArticle() {
  // q push是什么意思？跟post get push那个请求方式是一个意思吗？
  // a 跟 HTTP 无关。push 是"压入历史记录栈"，浏览器历史是个 stack，push 加一条，返回键 pop 一条。
  // a 类比 C++：std::stack history; history.push("/article/1");
  // a 还有 router.replace()，不压栈直接替换，返回时不会回到被替换的页面。
  router.push(`/article/${props.article.id}`)
}
</script>

<template>
<!--  q el-card又是什么？ 是elment的自定义组件吗？-->
<!--  a 对，el- 开头的都是 Element Plus 的组件。main.ts 里 app.use(ElementPlus) 注册后全局可用。-->
<!--  a 常见的：el-card（卡片）、el-button（按钮）、el-tag（标签）、el-input（输入框）、el-table（表格）等。-->
  <el-card class="article-card" shadow="hover" @click="goToArticle">
<!--    q 这里还有一个 template 是干嘛的？-->
<!--    a 这是"插槽（slot）"。el-card 预留了 #header 和默认两个坑位，你往里填内容。-->
<!--    a #header 的内容渲染到卡片头部区域，其余内容放到卡片主体区域。-->
<!--    a 这个 <template> 不会渲染成 HTML 元素，只是个容器标记，指定"塞到哪个坑位"。-->
<!--    a 类比 Qt：QMainWindow 有 menuBar/centralWidget/statusBar 几个槽位，你往里塞控件。-->
    <template #header>
      <span class="article-title">{{ article.title }}</span>
    </template>
    <p class="article-summary">{{ article.summary }}</p>
    <div class="article-footer">
<!--      q span又是什么？-->
<!--      a span = 行内盒子（不换行），div = 块级盒子（独占一行）。-->
<!--      a 这里用 span 包日期，是因为日期和标签要在同一行左右分布，不能用 div 独占一行。-->
      <span class="article-date">{{ article.date }}</span>
      <div class="article-tags">
        <el-tag v-for="tag in article.tags" :key="tag" size="small" class="article-tag">
          {{ tag }}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>
<!--q 这个是样式的-->
<!--a 对，scoped 表示这里的 CSS 只作用于当前组件，不会影响其他组件。-->
<style scoped>
.article-card {
  margin-bottom: 16px;
  cursor: pointer;
}

.article-title {
  font-size: 18px;
  font-weight: bold;
}

.article-summary {
  color: #606266;
  line-height: 1.6;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.article-date {
  color: #909399;
  font-size: 14px;
}

.article-tag {
  margin-left: 8px;
}
</style>

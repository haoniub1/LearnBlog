<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue'
// q 为什么这个引用要加花括号呢？
// a 因为 mockArticles 是"命名导出"（export const），需要花括号 + 名字对上。
// a ArticleCard 是"默认导出"（export default），不需要花括号，名字随便取。
// a 类比 Go：命名导出 = 包里多个函数要指定用哪个，默认导出 = 包里就一个主要的东西。
import { mockArticles } from '@/mock/articles'
</script>

<template>
<!--  q 这里用class 表示不值它用这个css 其他地方大概率也会用 不然直接用id对吧？-->
<!--  a 前端几乎全用 class，很少用 id。因为 id 全页面必须唯一，组件复用就冲突。-->
<!--  a 加了 scoped 后 class 自动限定在当前组件内，不会跟别的组件冲突。统一用 class 就行。-->
  <div class="home">
    <h2>最新文章</h2>
    <!-- v-for 循环渲染，类比 Go 的 for range -->
    <!-- :key 是给 Vue 标识每个元素用的，类似数据库主键 -->
    <!-- :article 把数据传给子组件，类比调用函数传参 -->
<!--    q 但是这里不应该先 v-for吗？再使用articecard渲染？难道这个是渲染多个的？-->
<!--    a 对，渲染多个。v-for 写在哪个标签上，就把那个标签复制 N 份。-->
<!--    a 这里 = 把 ArticleCard 复制 3 份（mockArticles 有 3 条数据），每份传不同的 article。-->
<!--    a 类比 Go 模板：{{range .Articles}}<div>{{.Title}}</div>{{end}}，div 重复多次。-->
    <ArticleCard
      v-for="article in mockArticles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}
</style>

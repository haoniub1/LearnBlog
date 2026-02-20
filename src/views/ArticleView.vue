<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockArticles } from '@/mock/articles'

// useRoute() 获取当前路由信息，能拿到 URL 里的参数
// 类比 Go Gin：c.Param("id")
const route = useRoute()

// 从 URL 参数拿到文章 id，再从 mock 数据里查找
// route.params.id 是字符串，要转成数字才能跟 article.id 比较
const article = computed(() => {
  const id = Number(route.params.id)
  return mockArticles.find((a) => a.id === id)
})
</script>

<template>
  <div class="article-page" v-if="article">
    <h1>{{ article.title }}</h1>
    <div class="article-meta">
      <span>{{ article.date }}</span>
      <el-tag v-for="tag in article.tags" :key="tag" size="small" class="article-tag">
        {{ tag }}
      </el-tag>
    </div>
    <el-divider />
    <div class="article-content">{{ article.content }}</div>
  </div>
  <div v-else>
    <el-empty description="文章不存在" />
  </div>
</template>

<style scoped>
.article-page {
  max-width: 800px;
  margin: 0 auto;
}

.article-meta {
  color: #909399;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.article-content {
  line-height: 1.8;
  white-space: pre-wrap;
}
</style>

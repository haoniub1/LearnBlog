<script setup lang="ts">
import { computed } from 'vue'
import { mockArticles } from '@/mock/articles'

// 把文章按月份分组
// 类比 Go：map[string][]Article{"2026-02": [{...}, {...}]}
const groupedArticles = computed(() => {
  const groups: Record<string, typeof mockArticles> = {}
  for (const article of mockArticles) {
    // 取日期前 7 位作为月份 key，如 "2026-02"
    const month = article.date.slice(0, 7)
    if (!groups[month]) {
      groups[month] = []
    }
    groups[month].push(article)
  }
  return groups
})
</script>

<template>
  <div class="archive">
    <h2>归档</h2>
    <div v-for="(articles, month) in groupedArticles" :key="month" class="archive-group">
      <h3 class="archive-month">{{ month }}</h3>
      <el-timeline>
        <el-timeline-item
          v-for="article in articles"
          :key="article.id"
          :timestamp="article.date"
          placement="top"
        >
          <RouterLink :to="`/article/${article.id}`" class="archive-link">
            {{ article.title }}
          </RouterLink>
          <el-tag
            v-for="tag in article.tags"
            :key="tag"
            size="small"
            class="archive-tag"
          >
            {{ tag }}
          </el-tag>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<style scoped>
.archive {
  max-width: 800px;
  margin: 0 auto;
}

.archive-month {
  color: #303133;
  margin-bottom: 8px;
}

.archive-link {
  text-decoration: none;
  color: #409eff;
  font-size: 16px;
  margin-right: 8px;
}

.archive-link:hover {
  text-decoration: underline;
}

.archive-tag {
  margin-left: 4px;
}
</style>

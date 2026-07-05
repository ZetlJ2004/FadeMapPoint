<script setup lang="ts">
// 📄 文章卡片组件 — 展示在首页列表中
// 修改这个文件可以改变文章卡片的样式

defineProps<{
  article: {
    _path: string
    title?: string
    description?: string
    date?: string
    tags?: string[]
  }
}>()

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <NuxtLink :to="article._path" class="card">
    <div class="card-body">
      <h3 class="card-title">{{ article.title || '未命名文章' }}</h3>
      <p v-if="article.description" class="card-desc">{{ article.description }}</p>
      <div class="card-meta">
        <span v-if="article.date" class="card-date">{{ formatDate(article.date) }}</span>
        <span v-if="article.tags && article.tags.length > 0" class="card-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </span>
      </div>
    </div>
    <div class="card-arrow">→</div>
  </NuxtLink>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: var(--color-bg);
}

.card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.35rem;
  color: var(--color-text);
}

.card-desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  margin: 0 0 0.5rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.card-date {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.card-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.72rem;
  padding: 0.15em 0.55em;
  background: var(--color-card-bg);
  border-radius: 100px;
  color: var(--color-muted);
}

.card-arrow {
  font-size: 1.2rem;
  color: var(--color-muted);
  margin-left: 1rem;
  transition: transform 0.2s, color 0.2s;
  flex-shrink: 0;
}

.card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--color-primary);
}
</style>

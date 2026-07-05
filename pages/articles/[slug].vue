<script setup lang="ts">
// 📖 文章详情页 — 渲染单篇 Markdown 文章

const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useAsyncData(`article-${slug}`, () => {
  return queryContent('articles')
    .where({ _path: `/articles/${slug}` })
    .findOne()
})

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到',
    fatal: true,
  })
}

// SEO
useSeoMeta({
  title: article.value.title || '文章',
  description: article.value.description || '',
})
</script>

<template>
  <article class="article-page">
    <!-- 文章头部信息 -->
    <header class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
      <div v-if="article.description" class="article-desc">{{ article.description }}</div>
      <div class="article-meta">
        <span v-if="article.date" class="meta-date">
          {{ new Date(article.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </span>
        <span v-if="article.tags && article.tags.length" class="meta-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </span>
      </div>
    </header>

    <!-- 文章正文 -->
    <div class="article-content">
      <ContentRenderer
        v-if="article"
        :value="article"
      />
    </div>

    <!-- 返回链接 -->
    <div class="article-back">
      <NuxtLink to="/">← 返回首页</NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.article-page {
  padding-top: 1rem;
}

/* --- 文章头部 --- */
.article-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.article-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.3;
  margin: 0 0 0.5rem;
}

.article-desc {
  font-size: 1.1rem;
  color: var(--color-muted);
  line-height: 1.6;
  margin: 0.5rem 0 1rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: var(--color-muted);
}

.meta-tags {
  display: flex;
  gap: 0.4rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.15em 0.6em;
  background: var(--color-card-bg);
  border-radius: 100px;
}

/* --- 文章正文排版 --- */
</style>

<style>
/* 📝 文章内容排版 — 在这里 DIY 你的文章样式！ */
/* 所有变量在 assets/css/main.css 中定义 */

.article-content {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--color-text);
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4 {
  margin-top: 2em;
  margin-bottom: 0.6em;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.article-content h1 { font-size: 1.8rem; }
.article-content h2 { font-size: 1.45rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.3em; }
.article-content h3 { font-size: 1.2rem; }

.article-content p {
  margin: 1em 0;
}

.article-content a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-content ul,
.article-content ol {
  padding-left: 1.5em;
  margin: 1em 0;
}

.article-content li {
  margin: 0.35em 0;
}

.article-content blockquote {
  margin: 1.5em 0;
  padding: 0.5em 1.2em;
  border-left: 3px solid var(--color-primary);
  background: var(--color-card-bg);
  border-radius: 0 var(--radius) var(--radius) 0;
  color: var(--color-muted);
}

.article-content img {
  max-width: 100%;
  border-radius: var(--radius);
  margin: 1.5em 0;
}

.article-content pre {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 1.2em 1.5em;
  border-radius: var(--radius);
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 1.5em 0;
}

.article-content :not(pre) > code {
  background: var(--color-card-bg);
  padding: 0.15em 0.45em;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--color-primary);
}

.article-content hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2.5em 0;
}

.article-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
}

.article-content th,
.article-content td {
  padding: 0.6em 1em;
  border: 1px solid var(--color-border);
  text-align: left;
}

.article-content th {
  background: var(--color-card-bg);
  font-weight: 600;
}

/* --- 返回链接 --- */
.article-back {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.article-back a {
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.article-back a:hover {
  color: var(--color-primary);
}
</style>

<script setup lang="ts">
const { data: articles } = await useAsyncData('articles-list', () => {
  return queryContent('articles')
    .sort({ date: -1 })
    .find()
})

useSeoMeta({
  title: 'VA — 个人主页',
  description: '代码、思考与生活的私人角落。',
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-avatar">V</div>
      <h1 class="hero-title">VA</h1>
      <p class="hero-desc">
        一个写代码、记笔记、偶尔思考人生的个人空间。
      </p>
      <div class="hero-links">
        <a href="https://github.com" target="_blank" class="hero-link">GitHub</a>
        <a href="/about" class="hero-link">关于我</a>
      </div>
    </section>

    <section class="articles-section">
      <h2 class="section-title">
        文章
        <span v-if="articles" class="section-count">{{ articles.length }}</span>
      </h2>

      <div v-if="articles && articles.length > 0" class="articles-grid">
        <ArticleCard
          v-for="article in articles"
          :key="article._path"
          :article="article"
        />
      </div>

      <p v-else class="empty-hint">
        还没有文章，在 <code>content/articles/</code> 下写点东西吧。
      </p>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-top: 3rem;
}

/* --- 个人介绍 --- */
.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #8b5cf6);
  color: #fff;
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin: 0 0 0.75rem;
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--color-muted);
  line-height: 1.7;
  margin: 0 auto 1.5rem;
  max-width: 460px;
}

.hero-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.hero-link:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(59, 130, 246, 0.04);
}

/* --- 文章区块 --- */
.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-count {
  font-size: 0.8rem;
  color: var(--color-muted);
  background: var(--color-card-bg);
  padding: 0.1em 0.55em;
  border-radius: 100px;
  font-weight: 500;
}

.articles-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-hint {
  color: var(--color-muted);
  font-size: 0.95rem;
  padding: 3rem 2rem;
  text-align: center;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
}

.empty-hint code {
  background: var(--color-card-bg);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}
</style>

<script setup lang="ts">
import { MAPS, type MapCategory, type MapSection } from '~/data/maps'

const route = useRoute()
const mapId = route.params.map as string
const mapInfo = MAPS.find(m => m.id === mapId)

if (!mapInfo) {
  throw createError({ statusCode: 404, statusMessage: '地图未找到', fatal: true })
}

// 当前选中的分类和点位
const activeCategory = ref(mapInfo.categories[0].key)
const activeSection = ref(mapInfo.categories[0].sections[0].key)

const currentCategory = computed(() =>
  mapInfo.categories.find(c => c.key === activeCategory.value)!
)

const currentSection = computed(() =>
  currentCategory.value.sections.find(s => s.key === activeSection.value)!
)

// 加载当前点位内容
const contentPath = computed(() =>
  `/maps/${mapId}/${activeCategory.value}/${activeSection.value}`
)

const { data: page } = await useAsyncData(
  `map-${mapId}-${activeCategory.value}-${activeSection.value}`,
  () => queryContent().where({ _path: contentPath.value }).findOne(),
  { watch: [activeCategory, activeSection] }
)

function selectCategory(cat: MapCategory) {
  activeCategory.value = cat.key
  activeSection.value = cat.sections[0].key
}

useSeoMeta({
  title: `${mapInfo.name} — 黑梦点位`,
  description: `${mapInfo.name}(${mapInfo.nameEn}) 无畏契约点位图，包含进攻方、防守方、回防点位。`,
})
</script>

<template>
  <div class="map-page">
    <!-- 地图标题 -->
    <header class="map-header">
      <NuxtLink to="/" class="back-link">← 返回</NuxtLink>
      <h1 class="map-title">{{ mapInfo.name }} <span class="map-title-en">{{ mapInfo.nameEn }}</span></h1>
    </header>

    <div class="map-body">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div
          v-for="cat in mapInfo.categories"
          :key="cat.key"
          class="sidebar-group"
        >
          <button
            class="sidebar-cat"
            :class="{ active: activeCategory === cat.key }"
            @click="selectCategory(cat)"
          >
            <span class="cat-icon">{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
          </button>
          <div v-if="activeCategory === cat.key" class="sidebar-subs">
            <button
              v-for="sec in cat.sections"
              :key="sec.key"
              class="sidebar-sub"
              :class="{ active: activeSection === sec.key }"
              @click="activeSection = sec.key"
            >
              {{ sec.label }}
            </button>
          </div>
        </div>
      </aside>

      <!-- 内容区 -->
      <main class="map-content">
        <div class="content-bar">
          <span class="content-label">{{ currentCategory.label }} · {{ currentSection.label }}</span>
        </div>
        <div v-if="page" class="content-body">
          <ContentRenderer :value="page" />
        </div>
        <div v-else class="content-empty">
          <p>点位图待补充</p>
          <p class="hint">在 <code>content{{ contentPath }}.md</code> 中添加内容</p>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  padding-top: 1.5rem;
}

/* --- 标题 --- */
.map-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  color: var(--color-muted);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.back-link:hover { color: var(--color-primary); }

.map-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0;
}

.map-title-en {
  color: var(--color-muted);
  font-weight: 400;
  font-size: 1.1rem;
}

/* --- 主体布局 --- */
.map-body {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

/* --- 侧边栏 --- */
.sidebar {
  width: 180px;
  flex-shrink: 0;
  position: sticky;
  top: 4.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-group {
  display: flex;
  flex-direction: column;
}

.sidebar-cat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.sidebar-cat:hover { background: var(--color-card-bg); }
.sidebar-cat.active { background: var(--color-card-bg); color: var(--color-primary); }

.cat-icon { font-size: 1rem; }

.sidebar-subs {
  padding: 0.25rem 0 0.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.sidebar-sub {
  display: block;
  width: 100%;
  padding: 0.4rem 0.6rem;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--color-muted);
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}

.sidebar-sub:hover { color: var(--color-text); background: var(--color-card-bg); }
.sidebar-sub.active { color: var(--color-primary); font-weight: 600; background: var(--color-card-bg); }

/* --- 内容区 --- */
.map-content {
  flex: 1;
  min-width: 0;
}

.content-bar {
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.content-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary);
}

.content-empty {
  padding: 3rem 2rem;
  text-align: center;
  color: var(--color-muted);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
}

.content-empty code {
  background: var(--color-card-bg);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}

.hint {
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
</style>

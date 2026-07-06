<script setup lang="ts">
import { MAPS, type MapCategory, type MapSection } from '~/data/maps'
import { breezeSpots, type SpotItem, type SpotSection, type SpotCategory } from '~/data/spots/breeze'
import { neonSpots } from '~/data/spots/neon'
import { skyhubSpots } from '~/data/spots/skyhub'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const baseURL = (runtimeConfig.app.baseURL ?? '/').replace(/\/$/, '')

const mapId = route.params.map as string
const mapInfo = MAPS.find(m => m.id === mapId)

if (!mapInfo) {
  throw createError({ statusCode: 404, statusMessage: '地图未找到', fatal: true })
}

// 各地图的点位数据
const spotDataMap: Record<string, Record<string, SpotCategory>> = {
  breeze: breezeSpots,
  neon: neonSpots,
  skyhub: skyhubSpots,
}

// 是否使用点位数据
const hasSpotData = mapId in spotDataMap

// 当前选中的分类和点位
const activeCategory = ref(mapInfo.categories[0].key)
const activeSection = ref(mapInfo.categories[0].sections[0].key)
// 三级导航：当前展开的点位
const expandedSpots = ref<Set<string>>(new Set())

// 图片弹窗
const modalSrc = ref('')
const modalVisible = ref(false)

function openModal(src: string) {
  modalSrc.value = src
  modalVisible.value = true
}

const currentCategory = computed(() =>
  mapInfo.categories.find(c => c.key === activeCategory.value)!
)

const currentSection = computed(() =>
  currentCategory.value.sections.find(s => s.key === activeSection.value)!
)

// 加载当前点位内容（仅非 spot data 模式）
const contentPath = computed(() =>
  `/maps/${mapId}/${activeCategory.value}/${activeSection.value}`
)

// 非 spot data 模式才加载 content
const { data: page } = hasSpotData
  ? { data: ref(null) }
  : await useAsyncData(
      `map-${mapId}-${activeCategory.value}-${activeSection.value}`,
      () => queryContent().where({ _path: contentPath.value }).findOne(),
      { watch: [activeCategory, activeSection] }
    )

// 获取当前分类的点位数据
const currentSpotCategory = computed(() => {
  if (!hasSpotData) return null
  return spotDataMap[mapId]?.[activeCategory.value] ?? null
})

const currentSpotSection = computed(() => {
  if (!currentSpotCategory.value) return null
  return currentSpotCategory.value.sections.find(s => s.key === activeSection.value) ?? null
})

function selectCategory(cat: MapCategory) {
  activeCategory.value = cat.key
  activeSection.value = cat.sections[0].key
  expandedSpots.value = new Set()
}

function selectSection(sec: MapSection) {
  activeSection.value = sec.key
  expandedSpots.value = new Set()
}

function toggleSpot(spotId: string) {
  const next = new Set(expandedSpots.value)
  if (next.has(spotId)) {
    next.delete(spotId)
  } else {
    next.add(spotId)
  }
  expandedSpots.value = next
}

function spotNumber(index: number): string {
  const nums = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']
  return nums[index] ?? `${index + 1}`
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
              @click="selectSection(sec)"
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
          <span v-if="currentSpotSection?.header" class="content-subheader">{{ currentSpotSection.header }}</span>
        </div>

        <!-- 点位列表（仅微风岛屿） -->
        <div v-if="hasSpotData && currentSpotSection" class="spots-list">
          <div
            v-for="(spot, idx) in currentSpotSection.spots"
            :key="spot.id"
            class="spot-item"
          >
            <button
              class="spot-label-btn"
              :class="{ expanded: expandedSpots.has(spot.id) }"
              @click="toggleSpot(spot.id)"
            >
              <span class="spot-arrow">{{ expandedSpots.has(spot.id) ? '▾' : '▸' }}</span>
              <span class="spot-text">{{ spotNumber(idx) }} {{ spot.label }}</span>
            </button>
            <div v-if="expandedSpots.has(spot.id)" class="spot-images">
              <template v-if="spot.images.length > 0">
                <div v-for="(img, i) in spot.images" :key="i" class="spot-image-wrap">
                  <img
                    :src="baseURL + img"
                    :alt="`${spot.label} 点位图 ${i + 1}`"
                    class="spot-image"
                    loading="lazy"
                    @click="openModal(baseURL + img)"
                  />
                  <span v-if="spot.images.length > 1" class="image-index">{{ i + 1 }}</span>
                </div>
              </template>
              <div v-else class="spot-no-image">
                <p>暂无图片，待补充</p>
              </div>
            </div>
          </div>
          <div v-if="currentSpotSection.spots.length === 0" class="spots-empty">
            <p>该点位暂无内容</p>
          </div>
        </div>

        <!-- 通用内容区（其他地图） -->
        <div v-else-if="!hasSpotData">
          <div v-if="page" class="content-body">
            <ContentRenderer :value="page" />
          </div>
          <div v-else class="content-empty">
            <p>点位图待补充</p>
            <p class="hint">在 <code>content{{ contentPath }}.md</code> 中添加内容</p>
          </div>
        </div>
      </main>
    </div>

    <ImageModal v-model="modalVisible" :src="modalSrc" />
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
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.content-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary);
}

.content-subheader {
  font-size: 0.85rem;
  color: var(--color-muted);
  background: var(--color-card-bg);
  padding: 0.15em 0.6em;
  border-radius: 4px;
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

/* --- 点位列表 --- */
.spots-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.spot-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--color-bg);
}

.spot-label-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: var(--color-text);
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}

.spot-label-btn:hover {
  background: var(--color-card-bg);
}

.spot-label-btn.expanded {
  background: var(--color-card-bg);
  border-bottom: 1px solid var(--color-border);
}

.spot-arrow {
  font-size: 0.8rem;
  color: var(--color-muted);
  flex-shrink: 0;
  width: 1em;
}

.spot-text {
  flex: 1;
  line-height: 1.5;
}

/* --- 点位图片 --- */
.spot-images {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.spot-image-wrap {
  position: relative;
  flex: 1;
  min-width: 280px;
  max-width: 100%;
}

.spot-image {
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  display: block;
  cursor: pointer;
  transition: opacity 0.15s;
}

.spot-image:hover {
  opacity: 0.9;
}

.image-index {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 0.75rem;
  padding: 0.15em 0.5em;
  border-radius: 4px;
}

.spot-no-image {
  padding: 1.5rem 1rem;
  text-align: center;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.spots-empty {
  padding: 3rem 2rem;
  text-align: center;
  color: var(--color-muted);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
}

/* ============ 移动端适配 ============ */
@media (max-width: 768px) {
  .map-page {
    padding-top: 0.75rem;
  }

  .map-header {
    margin-bottom: 1rem;
  }

  .map-title {
    font-size: 1.4rem;
  }

  .map-title-en {
    font-size: 0.9rem;
  }

  /* 主体：垂直堆叠 */
  .map-body {
    flex-direction: column;
    gap: 0.75rem;
  }

  /* 侧边栏：水平折叠式 */
  .sidebar {
    width: 100%;
    flex-shrink: 1;
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .sidebar-group {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
  }

  .sidebar-cat {
    width: auto;
    padding: 0.35rem 0.6rem;
    font-size: 0.8rem;
    border-radius: 4px;
    white-space: nowrap;
  }

  .cat-icon {
    font-size: 0.85rem;
  }

  .sidebar-subs {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    gap: 0.2rem;
  }

  .sidebar-sub {
    width: auto;
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }

  /* 内容区 */
  .map-content {
    width: 100%;
  }

  .content-bar {
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .content-label {
    font-size: 0.85rem;
  }

  .content-subheader {
    font-size: 0.75rem;
  }

  /* 点位列表 */
  .spots-list {
    gap: 0.35rem;
  }

  .spot-label-btn {
    padding: 0.6rem 0.75rem;
    font-size: 0.85rem;
  }

  /* 图片：单列全宽 */
  .spot-images {
    padding: 0.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .spot-image-wrap {
    min-width: 100%;
    max-width: 100%;
  }

  .image-index {
    font-size: 0.7rem;
    top: 0.35rem;
    right: 0.35rem;
  }

  .content-empty,
  .spots-empty {
    padding: 2rem 1rem;
    font-size: 0.85rem;
  }
}

/* 小屏手机 (< 400px) */
@media (max-width: 400px) {
  .sidebar-cat {
    padding: 0.3rem 0.45rem;
    font-size: 0.72rem;
  }

  .sidebar-sub {
    padding: 0.25rem 0.4rem;
    font-size: 0.7rem;
  }

  .spot-label-btn {
    padding: 0.5rem 0.6rem;
    font-size: 0.8rem;
  }

  .spot-images {
    padding: 0.35rem;
    gap: 0.35rem;
  }
}
</style>

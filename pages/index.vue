<script setup lang="ts">
import { MAPS } from '~/data/maps'

const runtimeConfig = useRuntimeConfig()
const baseURL = (runtimeConfig.app.baseURL ?? '/').replace(/\/$/, '')

// 图片弹窗
const modalSrc = ref('')
const modalVisible = ref(false)

function openModal(src: string) {
  modalSrc.value = src
  modalVisible.value = true
}

useSeoMeta({
  title: '黑梦点位 — 无畏契约地图点位图',
  description: '无畏契约各地图进攻、防守、回防点位图。',
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">黑梦点位</h1>
      <p class="hero-desc">无畏契约 · 地图点位图鉴 — 进攻 / 防守 / 回防，一图搞定。</p>
    </section>

    <section class="maps-section">
      <div class="maps-grid">
        <NuxtLink
          v-for="map in MAPS"
          :key="map.id"
          :to="`/maps/${map.id}`"
          class="map-card"
          :style="{ '--splash': map.splash }"
        >
          <div
            class="map-banner"
            :class="{ 'has-image': map.splashImage }"
          >
            <img
              v-if="map.splashImage"
              :src="baseURL + map.splashImage"
              :alt="map.name"
              class="map-banner-img"
              @click.prevent="openModal(baseURL + map.splashImage)"
            />
          </div>
          <div class="map-info">
            <h3 class="map-name">{{ map.name }}</h3>
            <span class="map-name-en">{{ map.nameEn }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <ImageModal v-model="modalVisible" :src="modalSrc" />
  </div>
</template>

<style scoped>
.home { padding-top: 2rem; }

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin: 0 0 0.75rem;
  color: var(--color-text);
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--color-muted);
  margin: 0;
}

.maps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.map-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  border: 1px solid var(--color-border);
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--color-bg);
}

.map-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.map-banner {
  height: 100px;
  background: var(--splash);
  opacity: 0.85;
  position: relative;
  overflow: hidden;
}

.map-banner.has-image {
  background: transparent;
  opacity: 1;
}

.map-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
  transition: opacity 0.15s;
}

.map-banner-img:hover {
  opacity: 0.85;
}

.map-info {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.map-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.map-name-en {
  font-size: 0.8rem;
  color: var(--color-muted);
}

/* ============ 移动端适配 ============ */
@media (max-width: 768px) {
  .home {
    padding-top: 1rem;
  }

  .hero {
    margin-bottom: 1.5rem;
  }

  .hero-title {
    font-size: 1.6rem;
  }

  .hero-desc {
    font-size: 0.9rem;
  }

  .maps-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.65rem;
  }

  .map-banner {
    height: 72px;
  }

  .map-info {
    padding: 0.6rem 0.75rem;
  }

  .map-name {
    font-size: 0.9rem;
  }

  .map-name-en {
    font-size: 0.7rem;
  }
}

@media (max-width: 400px) {
  .maps-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .hero-title {
    font-size: 1.3rem;
  }

  .map-banner {
    height: 60px;
  }

  .map-info {
    padding: 0.5rem 0.6rem;
  }

  .map-name {
    font-size: 0.8rem;
  }
}
</style>

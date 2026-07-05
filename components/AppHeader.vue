<script setup lang="ts">
const navLinks = [
  { to: '/', label: '地图' },
]
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo">
        <span class="logo-icon">◈</span>
        ZetlJ
      </NuxtLink>
      <nav class="nav">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
        </NuxtLink>
        <a href="https://github.com/ZetlJ2004" target="_blank" class="nav-link">GitHub</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
}

.header-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.logo-icon { color: var(--color-primary); font-size: 1.1rem; }

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--color-muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary);
}
</style>

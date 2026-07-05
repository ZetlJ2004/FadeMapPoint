<script setup lang="ts">
const navLinks = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于' },
]
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo">VA</NuxtLink>
      <nav class="nav">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
        </NuxtLink>
        <a href="https://github.com" target="_blank" class="nav-link">GitHub</a>
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
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: -0.04em;
}

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

<script setup lang="ts">
// 布局组件 — 所有页面都会包裹在这个布局中
// 修改这个文件可以改变整个网站的框架结构
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>

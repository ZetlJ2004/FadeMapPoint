<template>
  <footer class="footer">
    <div class="footer-inner">
      <p>© {{ new Date().getFullYear() }} ZetlJ · 黑梦点位 — 无畏契约地图点位图鉴</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: 2rem 1.5rem;
  margin-top: 3rem;
}

.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
}

.footer p {
  color: var(--color-muted);
  font-size: 0.85rem;
  margin: 0;
}
</style>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()

const show = defineModel<boolean>({ default: false })
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="image-modal-overlay" @click="show = false">
      <img :src="src" :alt="alt ?? ''" class="image-modal-img" @click.stop />
    </div>
  </Teleport>
</template>

<style scoped>
.image-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* 移动端触摸反馈 */
  -webkit-tap-highlight-color: transparent;
}

.image-modal-img {
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  cursor: default;
  /* 禁止移动端长按弹出菜单 */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>

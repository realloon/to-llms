<script setup lang="ts">
const { direction = 'column', gap = 8 } = defineProps<{
  direction?: 'column' | 'row'
  gap?: number
}>()
</script>

<template>
  <div
    class="stack"
    :style="`flex-direction: ${
      direction === 'column' ? 'column' : 'row'
    }; gap: ${gap}px;`"
  >
    <slot />
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  align-items: flex-start;
}
</style>

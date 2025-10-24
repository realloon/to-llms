<script setup lang="ts">
import { onOpenDir } from '../utils'
import { useDocument, useOnWindowDrag } from '../hooks'
import { onMounted, onUnmounted } from 'vue'

const { isLoading, update } = useDocument()
const { isHovering } = useOnWindowDrag(update)

onMounted(() => document.body.addEventListener('click', open))

onUnmounted(() => document.body.removeEventListener('click', open))

function open(event: any) {
  const target = event.target as HTMLElement
  if (target.tagName === 'HEADER') return
  if (isLoading.value) return

  onOpenDir(update)
}
</script>

<template>
  <button
    v-if="!isLoading"
    class="picker-button"
    :class="isHovering && 'is-hover'"
  >
    Drop a folder
  </button>
</template>

<style scoped>
.picker-button {
  font-size: 1rem;

  color: var(--color-font);
  background-color: transparent;

  flex-grow: 1;
  padding: 0;
  border: none;

  user-select: none;
  -webkit-user-select: none;

  &.is-hover {
    color: skyblue;
  }
}
</style>

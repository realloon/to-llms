<script setup lang="ts">
import { useDocument } from '../hooks/useDocument'
import { useOnWindowDrag } from '../hooks/useWindowDrag'

const { isLoading, update } = useDocument()
const { isHovering } = useOnWindowDrag(update)
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
  font-size: inherit;

  background-color: transparent;

  flex-grow: 1;
  padding: 0 0 1em;
  border: none;

  user-select: none;
  -webkit-user-select: none;

  &.is-hover {
    color: skyblue;
  }
}
</style>

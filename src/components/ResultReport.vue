<script setup lang="ts">
import { computed } from 'vue'
import { useDocument } from '../hooks'

const { document, names } = useDocument()

const files = computed(() => names.value?.length)
const lines = computed(() => document.value?.split('\n').length)
</script>

<template>
  <p>Extraction completed.</p>
  <ul>
    <li>files: {{ files }}</li>
    <li>lines: {{ lines }}</li>
  </ul>
</template>

<style scoped>
p,
ul {
  font-family: var(--mono);
}

ul {
  list-style-type: none;
  padding-inline-start: unset;
}
</style>

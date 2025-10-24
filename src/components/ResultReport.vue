<script setup lang="ts">
import { useDocument } from '../hooks'

const { fileCount, lineCount } = useDocument()
</script>

<template>
  <p>Extraction completed.</p>
  <ul>
    <li>files: {{ fileCount }}</li>
    <li>lines: {{ lineCount }}</li>
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

<script setup lang="ts">
defineProps<{
  label: string
  is?: boolean
}>()
</script>

<template>
  <button>
    {{ label }}
  </button>
</template>

<style scoped></style>

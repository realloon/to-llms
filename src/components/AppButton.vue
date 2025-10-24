<script setup lang="ts">
defineProps<{
  label: string
  isS: boolean
}>()
</script>

<template>
  <button>
    {{ label }}
  </button>
</template>

<style scoped></style>

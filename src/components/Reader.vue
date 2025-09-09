<script setup lang="ts">
import { useCollect } from '@/hooks/useCollect'
import Button from './ui/Button.vue'
import Stack from './ui/Stack.vue'

const { collect, readCollect } = useCollect()
</script>

<template>
  <Stack>
    <p class="hint">Please select the root directory of your C# project.</p>
    <Stack direction="row" style="align-items: baseline">
      <Button @click="readCollect">Load Directory</Button>
      <p v-show="collect">Processing completed.</p>
    </Stack>
  </Stack>
</template>

<style scoped>
.hint {
  opacity: 0.8;
  margin-block-end: 0.5rem;
}
</style>

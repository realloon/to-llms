<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import Reader from './components/Reader.vue'
import Stack from './components/ui/Stack.vue'
import Button from './components/ui/Button.vue'

import { useCollect } from './hooks/useCollect'
import { useClipboard } from './hooks/useClipboard'
import { useSaveFile } from './hooks/useSaveFile'

const { collect } = useCollect()
const { isCopied, copyText } = useClipboard()
const { isSaved, saveFile } = useSaveFile()

async function handleCopy() {
  if (!collect.value) return
  await copyText(collect.value)
}

async function handleSave() {
  if (!collect.value) return
  await saveFile(collect.value)
}
</script>

<template>
  <AppHeader />

  <main>
    <Reader />

    <Stack direction="row" style="align-items: baseline" v-show="collect">
      <Button @click="handleCopy">Copy</Button>
      <p v-show="isCopied">Successfully Copied.</p>
    </Stack>

    <Stack direction="row" style="align-items: baseline" v-show="collect">
      <Button @click="handleSave">Save File</Button>
      <p v-show="isSaved">Successfully Saved.</p>
    </Stack>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

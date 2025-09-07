<script setup lang="ts">
import { useCollect } from './hooks/useCollect'
import { useClipboard } from './hooks/useClipboard'
import { useSaveFile } from './hooks/useSaveFile'

const { collect, readCollect } = useCollect()
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
  <h1>to LLMs</h1>

  <div>
    <p>Please select the root directory of your C# project.</p>
    <button @click="readCollect">Load Directory</button>
  </div>

  <div v-show="collect">
    <p>Processing completed.</p>

    <button @click="handleCopy">Copy</button>
    <p v-show="isCopied">Successfully Copied.</p>

    <button @click="handleSave">Save File</button>
    <p v-show="isSaved">Successfully Saved.</p>
  </div>
</template>

<style scoped></style>

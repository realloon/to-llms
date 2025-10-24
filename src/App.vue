<script setup lang="ts">
import { useDocument, useCopyText, useSaveText } from './hooks'
import AppButton from './components/AppButton.vue'
import UploadStat from './components/UploadStat.vue'
import PickerButton from './components/PickerButton.vue'
import ResultReport from './components/ResultReport.vue'

const { document, isLoading } = useDocument()
const { isCopied, copyText } = useCopyText()
const { isSaved, saveText } = useSaveText()

function copy() {
  copyText(document.value!)
}

function save() {
  saveText('LLMs.txt', document.value!)
}

function clean() {
  document.value = null
}
</script>

<template>
  <header data-tauri-drag-region></header>

  <main>
    <PickerButton v-if="!document" />
    <UploadStat v-if="isLoading" />
    <ResultReport v-if="document" />
  </main>

  <footer>
    <template v-if="document">
      <button @click.stop="clean">Clean</button>
      <AppButton @click="copy" label="Copy" :is-s="isCopied" />
      <AppButton @click="save" label="Save" :is-s="isSaved" />
    </template>
  </footer>
</template>

<style scoped>
header {
  width: 100%;
  height: 30px;
}

main {
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  margin-inline: 10px;
}

footer {
  display: flex;
  justify-content: end;
  gap: 4px;

  flex-basis: 20px;
  margin-inline: 10px;
  margin-block-end: 10px;
}
</style>

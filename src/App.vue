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
  <main>
    <PickerButton v-if="!document" />
    <UploadStat v-if="isLoading" />
    <ResultReport v-if="document" />
  </main>

  <footer>
    <template v-if="document">
      <AppButton @click.stop="clean" label="Clear" />
      <AppButton @click="copy" label="Copy" :is="isCopied" />
      <AppButton @click="save" label="Save" :is="isSaved" />
    </template>
  </footer>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;

  flex-grow: 1;
}

footer {
  display: flex;
  justify-content: end;
  gap: 4px;

  flex-basis: 20px;
}
</style>

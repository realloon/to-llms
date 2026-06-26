<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog'
// Hooks
import { useDocument } from './hooks/useDocument.ts'
import { useCopyText } from './hooks/useCopyText.ts'
import { useSaveText } from './hooks/useSaveText.ts'
// Components
import UploadStat from './components/UploadStat.vue'
import PickerButton from './components/PickerButton.vue'
import ResultReport from './components/ResultReport.vue'

const { document, isLoading, update } = useDocument()
const { copyText } = useCopyText()
const { saveText } = useSaveText()

async function openProject() {
  if (isLoading.value) return

  const root = await open({
    multiple: false,
    directory: true,
  })

  if (!root) return

  update(root, ['.cs'], ['obj', 'bin'])
}

function copy() {
  copyText(document.value!)
}

function save() {
  saveText('LLMs.txt', document.value!)
}

function clean() {
  document.value = undefined
}
</script>

<template>
  <main @click="openProject()">
    <PickerButton v-if="!document" />
    <UploadStat v-if="isLoading" />
    <ResultReport v-if="document" />
  </main>

  <footer v-if="document">
    <button @click.stop="clean">Clear</button>
    <button @click="copy">Copy</button>
    <button @click="save">Save</button>
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
  gap: 8px;
}
</style>

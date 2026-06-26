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
</script>

<template>
  <main @click="openProject()">
    <PickerButton v-if="!document" />
    <ResultReport v-else />
    <UploadStat v-if="isLoading" />
  </main>

  <footer v-if="document">
    <button @click.stop="document = undefined">Clear</button>
    <button @click="copyText(document)">Copy</button>
    <button @click="saveText('LLMs.txt', document)">Save</button>
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

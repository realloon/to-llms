<script setup lang="ts">
import { onOpenDir } from './utils'
import { useDocument, useCopyText, useSaveText, useOnWindowDrag } from './hooks'
import AppButton from './components/AppButton.vue'
import { computed } from 'vue'

const { document, update } = useDocument()
const { isHovering } = useOnWindowDrag(update)
const { isCopied, copyText } = useCopyText()
const { isSaved, saveText } = useSaveText()

const style = computed(() => ({
  opacity: isHovering.value ? '1' : '0.6',
}))

function open() {
  onOpenDir(update)
}

function copy() {
  copyText(document.value!)
}

function save() {
  saveText('LLMs.txt', document.value!)
}
</script>

<template>
  <main>
    <button class="open" :style="style" @click="open">Drop a folder</button>
  </main>

  <footer>
    <template v-if="document">
      <AppButton @click="copy" label="Copy" :is-s="isCopied" />
      <AppButton @click="save" label="Save" :is-s="isSaved" />
    </template>
  </footer>
</template>

<style scoped>
main {
  display: flex;

  flex-grow: 1;
}

footer {
  display: flex;
  justify-content: end;
  gap: 4px;

  height: 20px;
}

.open {
  font-size: 1rem;

  background-color: transparent;

  flex-grow: 1;
  padding: 0;
  border: none;

  user-select: none;
  -webkit-user-select: none;
}
</style>

<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog'
import { ref } from 'vue'
import { useDocument, useCopyText, useSaveText } from './hooks'
import AppButton from './components/AppButton.vue'
import UploadStat from './components/UploadStat.vue'
import PickerButton from './components/PickerButton.vue'
import ResultReport from './components/ResultReport.vue'

const { document, isLoading, update } = useDocument()
const { copyText } = useCopyText()
const { saveText } = useSaveText()

const projects = {
  'C#': {
    extensions: ['.cs'],
    exclusions: ['obj', 'bin'],
  },
  TypeScript: {
    extensions: ['.ts'],
    exclusions: ['node_modules'],
  },
  XML: {
    extensions: ['.xml'],
    exclusions: [],
  },
}

const projectType = ref<ProjectType>('C#')
type ProjectType = keyof typeof projects

async function openProject(projectType: ProjectType) {
  if (isLoading.value) return

  const root = await open({
    multiple: false,
    directory: true,
  })

  if (!root) return

  const { extensions, exclusions } = projects[projectType]

  update(root, extensions, exclusions)
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
  <main @click="openProject(projectType)">
    <PickerButton v-if="!document" />
    <UploadStat v-if="isLoading" />
    <ResultReport v-if="document" />
  </main>

  <footer>
    <select v-show="!document" v-model="projectType" name="project">
      <option v-for="value in Object.keys(projects)" :value="value">
        {{ value }}
      </option>
    </select>

    <div style="flex-grow: 1"></div>

    <template v-if="document">
      <AppButton @click.stop="clean" label="Clear" />
      <AppButton @click="copy" label="Copy" />
      <AppButton @click="save" label="Save" />
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
  align-items: center;
  gap: 4px;

  flex-basis: 20px;

  select {
    opacity: 0;
    transition: 0.2s;
  }
  &:hover select {
    opacity: 1;
  }
}
</style>

import { ref } from 'vue'

const isSaved = ref(false)

async function saveFile(content: string) {
  isSaved.value = false

  const handle = await showSaveFilePicker({
    suggestedName: 'LLMs.txt',
    startIn: 'downloads',
  })

  const writable = await handle.createWritable()
  await writable.write(content)
  await writable.close()

  isSaved.value = true
}

export function useSaveFile() {
  return { isSaved, saveFile }
}

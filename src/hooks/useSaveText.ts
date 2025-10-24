import { downloadDir, join } from '@tauri-apps/api/path'
import { save } from '@tauri-apps/plugin-dialog'
import { writeTextFile } from '@tauri-apps/plugin-fs'
import { ref } from 'vue'

export function useSaveText() {
  const isSaved = ref(false)

  async function saveText(name: string, text: string) {
    isSaved.value = false

    const downloadPath = await downloadDir()
    const defaultPath = await join(downloadPath, name)

    const path = await save({
      defaultPath,
      filters: [
        {
          name: 'Document',
          extensions: ['txt'],
        },
      ],
    })

    if (!path) return

    await writeTextFile(path, text)
    isSaved.value = true
  }

  return { isSaved, saveText }
}

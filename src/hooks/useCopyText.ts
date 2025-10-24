import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { ref } from 'vue'

export function useCopyText() {
  const isCopied = ref(false)

  async function copyText(text: string) {
    isCopied.value = false
    await writeText(text)
    isCopied.value = true
  }

  return { isCopied, copyText }
}

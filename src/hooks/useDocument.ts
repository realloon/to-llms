import { invoke } from '@tauri-apps/api/core'
import { ref } from 'vue'

interface ProcessingResult {
  markdown_content: string
  processed_files_count: number
  total_lines_count: number
}

const document = ref<string>()
const fileCount = ref<number>()
const lineCount = ref<number>()
const isLoading = ref(false)

export function useDocument() {
  async function update(root: string) {
    document.value = undefined
    fileCount.value = undefined
    lineCount.value = undefined
    isLoading.value = true

    try {
      const result = await invoke<ProcessingResult>('process_files', { root })
      document.value = result.markdown_content
      fileCount.value = result.processed_files_count
      lineCount.value = result.total_lines_count
    } catch (error) {
      console.error('Error processing files in Rust:', error)
    } finally {
      isLoading.value = false
    }
  }

  return { document, isLoading, fileCount, lineCount, update }
}

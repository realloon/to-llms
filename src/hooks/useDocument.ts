import { invoke } from '@tauri-apps/api/core'
import { ref } from 'vue'

interface ProcessingResult {
  markdown_content: string
  processed_files_count: number
  total_lines_count: number
}

const document = ref<string | null>(null)
const fileCount = ref<number | null>(null)
const lineCount = ref<number | null>(null)
const isLoading = ref(false)

export function useDocument() {
  async function update(root: string) {
    document.value = null
    fileCount.value = null
    lineCount.value = null
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

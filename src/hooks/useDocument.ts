import { ref } from 'vue'
import { codeTemplate, getFilePaths, readFile } from '../utils'

const document = ref<string | null>(null)
const names = ref<string[] | null>(null)
const isLoading = ref(false)

async function update(root: string) {
  document.value = null
  names.value = null
  isLoading.value = true

  const paths = await getFilePaths(root, 'csharp')

  names.value = paths

  const files = paths.map(path => readFile(path))
  const contents = await Promise.all(
    files.map(file => codeTemplate(file, root))
  )
  const markdown = contents.join('\n\n')

  document.value = markdown
  isLoading.value = false
}

export function useDocument() {
  return { document, names, isLoading, update }
}

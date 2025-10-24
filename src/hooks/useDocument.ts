import { ref } from 'vue'
import { codeTemplate, getFilePaths, readFile } from '../utils'

export function useDocument() {
  const document = ref<string | null>(null)

  async function update(root: string) {
    document.value = null

    const paths = await getFilePaths(root, 'csharp')
    const files = paths.map(path => readFile(path))
    const contents = await Promise.all(
      files.map(file => codeTemplate(file, root))
    )
    const markdown = contents.join('\n\n')

    document.value = markdown
  }

  return { document, update }
}

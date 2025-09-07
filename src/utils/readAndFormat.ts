import type { FileWrapper } from '@/types'

export async function readAndFormat(fileWrapper: FileWrapper) {
  const { type, path } = fileWrapper
  const content = (await readFileAsText(fileWrapper.file)).trim()

  return `\`\`\`${type}\n// ${path}\n\n${content}\n\`\`\``
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = () => {
      reject(reader.error)
    }

    reader.readAsText(file)
  })
}

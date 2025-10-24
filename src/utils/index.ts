import { readDir } from '@tauri-apps/plugin-fs'
import { join } from '@tauri-apps/api/path'
import { readTextFile } from '@tauri-apps/plugin-fs'

export { onOpenDir } from './onOpenDir'

type Option = (typeof options)[number]
const options = [
  {
    type: 'csharp',
    suffix: '.cs',
    filterFiles: [],
    filterDirs: ['obj'],
  } as const,
]

export async function getFilePaths(root: string, type: Option['type']) {
  const { suffix, filterDirs } = options.find(option => option.type === type)!
  const filterPaths = await Promise.all(filterDirs.map(dir => join(root, dir)))
  let paths: string[] = []

  try {
    const entries = await readDir(root)

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue

      const fullPath = await join(root, entry.name)

      if (entry.isFile) {
        if (!entry.name.endsWith(suffix)) continue

        paths.push(fullPath)
      } else if (entry.isDirectory) {
        if (filterPaths.some(path => path === fullPath)) continue

        const subDirFiles = await getFilePaths(fullPath, type)
        paths = paths.concat(subDirFiles)
      }
    }
  } catch (error) {
    console.error(error)
  }

  return paths
}

export async function codeTemplate(
  file: { path: string; content: Promise<string> },
  root: string
) {
  const path = purePath(root, file.path)
  const content = await file.content
  return `\`\`\`csharp\n// ${path}\n${content}\n\`\`\``
}

export function purePath(root: string, path: string) {
  return path.slice(root.length)
}

export function readFile(path: string) {
  try {
    const content = readTextFile(path)
    return { path, content }
  } catch (error) {
    throw console.error(error)
  }
}

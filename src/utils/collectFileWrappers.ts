import type { FileWrapper } from '@/types'

export async function collectFileWrappers(
  dirHandle: FileSystemDirectoryHandle,
  root: string = ''
) {
  const results: Array<FileWrapper> = []

  for await (const handle of dirHandle.values()) {
    const entryPath = root ? `${root}/${handle.name}` : handle.name

    if (handle.kind === 'file') {
      results.push({
        name: handle.name,
        type: handle.name.split('.').at(-1) ?? '',
        path: entryPath,
        file: await handle.getFile(),
      })
    } else if (handle.kind === 'directory') {
      const subResults = await collectFileWrappers(handle, entryPath)
      results.push(...subResults)
    }
  }

  return results
}

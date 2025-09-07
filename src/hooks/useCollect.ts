import { ref } from 'vue'
import { collectFileWrappers } from '@/utils/collectFileWrappers'
import { isCSharp } from '@/utils/isCSharp'
import { readAndFormat } from '@/utils/readAndFormat'

const collect = ref<string | null>(null)

export function useCollect() {
  async function readCollect() {
    const dirHandle = await showDirectoryPicker()
    const fileWrappers = await collectFileWrappers(dirHandle)

    const results = await Promise.all(
      fileWrappers.filter(isCSharp).map(readAndFormat)
    )

    collect.value = results.join('\n\n')
  }

  return { readCollect, collect }
}

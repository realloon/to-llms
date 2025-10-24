import { getCurrentWindow } from '@tauri-apps/api/window'
import { ref, onMounted, onUnmounted } from 'vue'

export function useOnWindowDrag(callback: Function) {
  const isHovering = ref(false)
  let unlisten: (() => void) | null

  onMounted(async () => {
    unlisten = await getCurrentWindow().onDragDropEvent(event => {
      if (event.payload.type === 'over') {
        isHovering.value = true
      } else if (event.payload.type === 'drop') {
        isHovering.value = false
        callback(event.payload.paths[0])
      }
    })
  })

  onUnmounted(() => unlisten!())

  return { isHovering }
}

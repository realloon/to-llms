import { getCurrentWindow } from '@tauri-apps/api/window'
import { ref, onMounted, onUnmounted } from 'vue'

const isHovering = ref(false)
let unlisten: (() => void) | null

export function useOnWindowDrag(callback: Function) {
  onMounted(async () => {
    unlisten = await getCurrentWindow().onDragDropEvent(event => {
      console.log(event)

      if (event.payload.type === 'over') {
        isHovering.value = true
      } else if (event.payload.type === 'drop') {
        isHovering.value = false
        callback(event.payload.paths[0])
      } else if (event.payload.type === 'leave') {
        isHovering.value = false
      }
    })
  })

  onUnmounted(() => unlisten!())

  return { isHovering }
}

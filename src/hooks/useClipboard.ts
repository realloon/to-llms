import { ref } from 'vue'

const isCopied = ref(false)

async function copyText(content: string) {
  isCopied.value = false

  await navigator.clipboard.writeText(content)

  isCopied.value = true
}

export function useClipboard() {
  return { isCopied, copyText }
}

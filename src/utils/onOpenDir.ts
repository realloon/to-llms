import { open } from '@tauri-apps/plugin-dialog'

export async function onOpenDir(callback: (arg: string) => void) {
  const root = await open({
    multiple: false,
    directory: true,
  })

  if (!root) return

  callback(root)
}

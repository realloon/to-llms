import type { FileWrapper } from '@/types'

export function isCSharp(fileWrapper: FileWrapper) {
  const { name, path } = fileWrapper
  return (
    !name.startsWith('.') && name.endsWith('.cs') && !path.startsWith('obj/')
  )
}
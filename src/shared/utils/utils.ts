import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmptyFields = <T extends Record<any, any>>(data: T) => {
  const copy = { ...data }
  Object.keys(copy).forEach((key) => {
    if (copy[key] === '' || copy[key] == null) {
      delete copy[key]
    }
  })
  return copy
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface IObjectKeys {
  [key: string]: string 
}
export const removeEmptyFields = <T extends Record<any, any>>(data: T) =>{
  const copy = {...data}
  Object.keys(copy).forEach(key => {
    if (copy[key] === '' || copy[key] == null) {
      delete copy[key];
    }
  });
  return copy
}
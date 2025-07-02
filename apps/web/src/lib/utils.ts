import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toastStyle = {
  backgroundColor : "#242424",
  color : "#fff",
  border : "1px solid #333",
  borderRadius : "10px",
  padding : "10px",
  fontSize : "16px",
  fontWeight : "bold",
  textAlign : "center",
}

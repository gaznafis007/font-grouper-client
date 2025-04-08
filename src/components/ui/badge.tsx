import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
  className?: string
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  let variantStyles = ""

  switch (variant) {
    case "default":
      variantStyles = "bg-gray-900 text-white hover:bg-gray-800"
      break
    case "secondary":
      variantStyles = "bg-gray-100 text-gray-900 hover:bg-gray-200"
      break
    case "destructive":
      variantStyles = "bg-red-100 text-red-800 hover:bg-red-200"
      break
    case "outline":
      variantStyles = "bg-transparent border border-gray-200 text-gray-900 hover:bg-gray-100"
      break
    case "success":
      variantStyles = "bg-green-100 text-green-800 hover:bg-green-200"
      break
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${variantStyles} ${className}`}
    >
      {children}
    </span>
  )
}

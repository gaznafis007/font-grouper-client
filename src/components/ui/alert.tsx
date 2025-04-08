

import type { ReactNode } from "react"
import { FiAlertCircle, FiAlertTriangle, FiInfo, FiCheckCircle, FiX } from "react-icons/fi"

interface AlertProps {
  children: ReactNode
  variant?: "default" | "destructive" | "warning" | "success"
  title?: string
  icon?: ReactNode
  onDismiss?: () => void
  className?: string
}

export function Alert({ children, variant = "default", title, icon, onDismiss, className = "" }: AlertProps) {
  let variantStyles = ""
  let Icon = icon ? null : FiInfo

  switch (variant) {
    case "destructive":
      variantStyles = "bg-red-50 border-red-200 text-red-800"
      if (!icon) Icon = FiAlertCircle
      break
    case "warning":
      variantStyles = "bg-yellow-50 border-yellow-200 text-yellow-800"
      if (!icon) Icon = FiAlertTriangle
      break
    case "success":
      variantStyles = "bg-green-50 border-green-200 text-green-800"
      if (!icon) Icon = FiCheckCircle
      break
    default:
      variantStyles = "bg-blue-50 border-blue-200 text-blue-800"
      if (!icon) Icon = FiInfo
  }

  return (
    <div className={`rounded-md border p-4 ${variantStyles} ${className}`}>
      <div className="flex">
        {(icon || Icon) && <div className="flex-shrink-0">{icon || (Icon && <Icon className="h-5 w-5" />)}</div>}
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={`text-sm ${title ? "mt-2" : ""}`}>{children}</div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex rounded-md p-1.5 hover:bg-black hover:bg-opacity-10"
            >
              <span className="sr-only">Dismiss</span>
              <FiX className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

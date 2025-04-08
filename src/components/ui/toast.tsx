"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { FiX, FiAlertCircle, FiCheckCircle, FiInfo, FiAlertTriangle } from "react-icons/fi"

// Toast Types
export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success" | "warning"
  duration?: number
  onDismiss?: () => void
}

// Toast Context
type ToastContextType = {
  toasts: ToastProps[]
  toast: (props: Omit<ToastProps, "id">) => void
  dismissToast: (id: string) => void
}

export const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  toast: () => {},
  dismissToast: () => {},
})

// Toast Provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, ...toast }])
  }, [])

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const contextValue = React.useMemo(
    () => ({
      toasts,
      toast: addToast,
      dismissToast,
    }),
    [toasts, addToast, dismissToast],
  )

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
}

// Toast Component
function Toast({ toast }: { toast: ToastProps }) {
  const { dismissToast } = React.useContext(ToastContext)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dismissToast(toast.id)
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [dismissToast, toast.id, toast.duration])

  // Variant styles
  let variantStyles = ""
  let Icon = FiInfo

  switch (toast.variant) {
    case "destructive":
      variantStyles = "bg-red-50 border-red-200 text-red-800"
      Icon = FiAlertCircle
      break
    case "success":
      variantStyles = "bg-green-50 border-green-200 text-green-800"
      Icon = FiCheckCircle
      break
    case "warning":
      variantStyles = "bg-yellow-50 border-yellow-200 text-yellow-800"
      Icon = FiAlertTriangle
      break
    default:
      variantStyles = "bg-white border-gray-200 text-gray-800"
      Icon = FiInfo
  }

  return (
    <div className={`rounded-lg border shadow-lg p-4 flex items-start gap-3 w-full max-w-sm ${variantStyles}`}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />

      <div className="flex-1">
        {toast.title && <h3 className="font-medium text-sm">{toast.title}</h3>}
        {toast.description && <p className="text-sm mt-1 opacity-90">{toast.description}</p>}
        {toast.action && <div className="mt-2">{toast.action}</div>}
      </div>

      <button
        onClick={() => dismissToast(toast.id)}
        className="flex-shrink-0 rounded-md p-1 hover:bg-black hover:bg-opacity-10"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  )
}

// Toaster Component
export function Toaster() {
  const { toasts } = React.useContext(ToastContext)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div className="fixed top-0 right-0 p-4 z-50 flex flex-col gap-2 max-h-screen overflow-hidden">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body,
  )
}

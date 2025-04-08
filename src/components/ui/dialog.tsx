"use client"

import * as React from "react"
import { createPortal } from "react-dom"

// Dialog Root
interface DialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ children, open = false, onOpenChange }: DialogProps) {
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    if (onOpenChange) onOpenChange(newOpen)
  }

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>{children}</DialogContext.Provider>
  )
}

// Dialog Context
type DialogContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType>({
  open: false,
  onOpenChange: () => {},
})

export const useDialogContext = () => React.useContext(DialogContext)

// Dialog Content
interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
  const { open, onOpenChange } = useDialogContext()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)

    // Add overflow hidden to body when dialog is open
    if (open) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onOpenChange])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  if (!isMounted) return null

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-full max-w-md max-h-[85vh] overflow-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

// Dialog Header
interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
  return <div className={`px-6 py-4 border-b ${className}`}>{children}</div>
}

// Dialog Title
interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
  return <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>
}

// Dialog Description
interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function DialogDescription({ children, className = "" }: DialogDescriptionProps) {
  return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
}

// Dialog Footer
interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

export function DialogFooter({ children, className = "" }: DialogFooterProps) {
  return <div className={`px-6 py-4 border-t flex flex-row-reverse gap-2 ${className}`}>{children}</div>
}

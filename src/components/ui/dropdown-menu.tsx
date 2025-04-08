"use client"

import * as React from "react"
import { createPortal } from "react-dom"

// DropdownMenu Context
type DropdownMenuContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
  contentRef: { current: null },
})

// DropdownMenu Root
interface DropdownMenuProps {
  children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

// DropdownMenu Trigger
interface DropdownMenuTriggerProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuTrigger({ children, className = "" }: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef } = React.useContext(DropdownMenuContext)

  return (
    <button
      type="button"
      ref={triggerRef}
      onClick={() => setOpen(!open)}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      aria-expanded={open}
    >
      {children}
    </button>
  )
}

// DropdownMenu Content
interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
  align?: "start" | "center" | "end"
}

export function DropdownMenuContent({ children, className = "", align = "end" }: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef, contentRef } = React.useContext(DropdownMenuContext)
  const [isMounted, setIsMounted] = React.useState(false)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)

      // Calculate position
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        let left = 0

        if (align === "start") {
          left = rect.left
        } else if (align === "center") {
          left = rect.left + rect.width / 2
        } else {
          left = rect.right
        }

        setPosition({
          top: rect.bottom + window.scrollY,
          left: left + window.scrollX,
        })
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, setOpen, align])

  if (!isMounted || !open) return null

  const alignStyles = {
    start: "origin-top-left left-0",
    center: "origin-top -translate-x-1/2",
    end: "origin-top-right right-0",
  }

  return createPortal(
    <div
      ref={contentRef}
      className={`z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${alignStyles[align]} ${className}`}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: align === "center" ? `${position.left}px` : undefined,
        right: align === "end" ? `calc(100% - ${position.left}px)` : undefined,
      }}
    >
      {children}
    </div>,
    document.body,
  )
}

// DropdownMenu Item
interface DropdownMenuItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function DropdownMenuItem({ children, className = "", onClick, disabled = false }: DropdownMenuItemProps) {
  const { setOpen } = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    if (disabled) return
    if (onClick) onClick()
    setOpen(false)
  }

  return (
    <button
      type="button"
      className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// DropdownMenu Separator
interface DropdownMenuSeparatorProps {
  className?: string
}

export function DropdownMenuSeparator({ className = "" }: DropdownMenuSeparatorProps) {
  return <div className={`-mx-1 my-1 h-px bg-gray-200 ${className}`} />
}

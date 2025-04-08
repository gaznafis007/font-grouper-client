import type { ReactNode } from "react"

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

export function SectionContainer({ children, className = "" }: SectionContainerProps) {
  return <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>{children}</div>
}

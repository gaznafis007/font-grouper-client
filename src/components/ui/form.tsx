import type React from "react"
import type { ReactNode } from "react"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export function Form({ children, className = "", ...props }: FormProps) {
  return (
    <form className={`space-y-6 ${className}`} {...props}>
      {children}
    </form>
  )
}

interface FormFieldProps {
  children: ReactNode
  className?: string
}

export function FormField({ children, className = "" }: FormFieldProps) {
  return <div className={`space-y-1 ${className}`}>{children}</div>
}

interface FormItemProps {
  children: ReactNode
  className?: string
}

export function FormItem({ children, className = "" }: FormItemProps) {
  return <div className={className}>{children}</div>
}

interface FormLabelProps {
  children: ReactNode
  className?: string
  required?: boolean
}

export function FormLabel({ children, className = "", required }: FormLabelProps) {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

interface FormControlProps {
  children: ReactNode
  className?: string
}

export function FormControl({ children, className = "" }: FormControlProps) {
  return <div className={`mt-1 ${className}`}>{children}</div>
}

interface FormDescriptionProps {
  children: ReactNode
  className?: string
}

export function FormDescription({ children, className = "" }: FormDescriptionProps) {
  return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
}

interface FormMessageProps {
  children?: ReactNode
  className?: string
}

export function FormMessage({ children, className = "" }: FormMessageProps) {
  if (!children) return null

  return <p className={`text-sm text-red-600 mt-1 ${className}`}>{children}</p>
}

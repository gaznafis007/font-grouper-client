import type React from "react"
import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, helperText, ...props }, ref) => {
  const baseStyles = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0"
  const errorStyles = error
    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"

  const allStyles = `${baseStyles} ${errorStyles} ${className || ""}`

  return (
    <div>
      <input className={allStyles} ref={ref} {...props} />
      {helperText && <p className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-500"}`}>{helperText}</p>}
    </div>
  )
})

Input.displayName = "Input"

export { Input }

import type React from "react"
import { forwardRef } from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, children, required, ...props }, ref) => {
  return (
    <label ref={ref} className={`block text-sm font-medium text-gray-700 mb-1 ${className || ""}`} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
})

Label.displayName = "Label"

export { Label }

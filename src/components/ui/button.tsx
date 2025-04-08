import type React from "react"
import { forwardRef } from "react"
import { Link } from "react-router-dom"


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, variant = "default", size = "default", asChild = false, href, ...props }, ref) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    // Variant styles
    let variantStyles = ""
    switch (variant) {
      case "default":
        variantStyles = "bg-gray-900 text-white hover:bg-gray-800"
        break
      case "destructive":
        variantStyles = "bg-red-500 text-white hover:bg-red-600"
        break
      case "outline":
        variantStyles = "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900"
        break
      case "secondary":
        variantStyles = "bg-gray-100 text-gray-900 hover:bg-gray-200"
        break
      case "ghost":
        variantStyles = "bg-transparent hover:bg-gray-100 text-gray-900"
        break
      case "link":
        variantStyles = "bg-transparent underline-offset-4 hover:underline text-gray-900 p-0 h-auto"
        break
    }

    // Size styles
    let sizeStyles = ""
    switch (size) {
      case "default":
        sizeStyles = "h-10 py-2 px-4 text-sm"
        break
      case "sm":
        sizeStyles = "h-9 px-3 text-xs"
        break
      case "lg":
        sizeStyles = "h-11 px-8 text-base"
        break
      case "icon":
        sizeStyles = "h-10 w-10"
        break
    }

    const allStyles = `${baseStyles} ${variantStyles} ${sizeStyles} ${className || ""}`

    if (href) {
      return (
        <Link to={href} className={allStyles}>
          {props.children}
        </Link>
      )
    }

    return <button className={allStyles} ref={ref} {...props} />
  },
)

Button.displayName = "Button"

export { Button }

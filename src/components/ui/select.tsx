

import * as React from "react"
import { forwardRef } from "react"
import { FiCheck, FiChevronDown } from "react-icons/fi"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  helperText?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, error, helperText, ...props }, ref) => {
    const baseStyles =
      "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 appearance-none bg-white"
    const errorStyles = error
      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"

    const allStyles = `${baseStyles} ${errorStyles} ${className}`

    return (
      <div className="relative">
        <select className={allStyles} ref={ref} {...props}>
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FiChevronDown className="h-5 w-5 text-gray-400" />
        </div>
        {helperText && <p className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-500"}`}>{helperText}</p>}
      </div>
    )
  },
)

Select.displayName = "Select"

// Custom select components for more advanced usage
interface CustomSelectProps {
  children: React.ReactNode
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function CustomSelect({
  children,
  value,
  onChange,
  placeholder,
  className = "",
  disabled = false,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || "")
  const selectRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    setOpen(false)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={`flex items-center justify-between w-full px-3 py-2 text-left bg-white border rounded-md shadow-sm ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"
        }`}
        disabled={disabled}
      >
        <span className={`block truncate ${!selectedValue ? "text-gray-400" : ""}`}>
          {selectedValue || placeholder || "Select an option"}
        </span>
        <FiChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<SelectOptionProps>, {
                  onSelect: handleSelect,
                  isSelected: (child.props as SelectOptionProps).value === selectedValue,
                })
              }
              return child
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

interface SelectOptionProps {
  children: React.ReactNode
  value: string
  onSelect?: (value: string) => void
  isSelected?: boolean
  disabled?: boolean
}

export function SelectOption({ children, value, onSelect, isSelected, disabled = false }: SelectOptionProps) {
  return (
    <li
      className={`px-3 py-2 flex items-center ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100"
      } ${isSelected ? "bg-gray-100" : ""}`}
      onClick={() => !disabled && onSelect && onSelect(value)}
    >
      <span className="flex-grow truncate">{children}</span>
      {isSelected && <FiCheck className="w-4 h-4 text-gray-600" />}
    </li>
  )
}

export { Select }

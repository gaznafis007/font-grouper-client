type StatusType = "success" | "warning" | "error" | "info" | "default"

interface StatusBadgeProps {
  status: StatusType
  text: string
  className?: string
}

export function StatusBadge({ status, text, className = "" }: StatusBadgeProps) {
  let statusClasses = ""

  switch (status) {
    case "success":
      statusClasses = "bg-green-100 text-green-800"
      break
    case "warning":
      statusClasses = "bg-yellow-100 text-yellow-800"
      break
    case "error":
      statusClasses = "bg-red-100 text-red-800"
      break
    case "info":
      statusClasses = "bg-blue-100 text-blue-800"
      break
    default:
      statusClasses = "bg-gray-100 text-gray-800"
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses} ${className}`}
    >
      {text}
    </span>
  )
}

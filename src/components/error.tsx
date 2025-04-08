"use client"

import { useEffect } from "react"
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi"
import { Link } from "react-router-dom"


interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-red-50 mb-5">
            <FiAlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Something went wrong</h1>
          <p className="text-gray-600 mb-5">We're sorry, but we encountered an unexpected error.</p>

          {error.message && (
            <div className="p-4 bg-gray-100 rounded-lg mb-6 text-left">
              <p className="text-sm font-mono text-gray-700 break-words">{error.message}</p>
              {error.digest && <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <FiRefreshCw className="mr-2" />
              Try Again
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

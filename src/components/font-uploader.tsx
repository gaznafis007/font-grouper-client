import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { FiUpload, FiCheck } from "react-icons/fi"
import { uploadFont } from "../services/api"
import { useToast } from "../hooks/use-toast"

export default function FontUploader() {
  const {
    register,
    formState: { errors },
    reset,
  } = useForm()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Validate file type
    if (!file.name.toLowerCase().endsWith(".ttf")) {
      toast({
        title: "Invalid file type",
        description: "Only TTF files are allowed",
        variant: "destructive",
      })
      reset()
      return
    }

    setSelectedFile(file)
    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("font", file)

      await uploadFont(formData, (progress) => {
        setUploadProgress(progress)
      })

      toast({
        title: "Font uploaded successfully",
        description: `${file.name} has been uploaded`,
        variant: "success",
      })

      // Reset form after successful upload
      setSelectedFile(null)
      reset()
    } catch (error) {
        console.log(error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your font",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Upload Font</h2>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">
          Upload TTF font files. Files will be uploaded automatically upon selection.
        </p>

        <input
          type="file"
          id="fontFile"
          className="hidden"
          accept=".ttf"
          {...register("fontFile", { required: true })}
          onChange={handleFileChange}
        />

        <label
          htmlFor="fontFile"
          className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            uploading || selectedFile
              ? "border-gray-300 bg-gray-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          {!uploading && !selectedFile ? (
            <>
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-900">Click to upload a TTF file</p>
              <p className="mt-1 text-xs text-gray-500">or drag and drop</p>
              <p className="mt-2 text-xs text-gray-500">TTF files only</p>
            </>
          ) : (
            <div>
              {uploading ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-6 w-6 text-gray-800"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{selectedFile?.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gray-800 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Uploading... {uploadProgress}%</p>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <FiCheck className="h-6 w-6 text-green-500" />
                  <p className="text-sm font-medium text-gray-700">Upload complete</p>
                </div>
              )}
            </div>
          )}

          {errors.fontFile && <p className="mt-2 text-sm text-red-600">Please select a TTF file</p>}
        </label>
      </div>
    </div>
  )
}

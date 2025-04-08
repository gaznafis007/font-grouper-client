/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi"
import { createFontGroup, updateFontGroup } from "../services/api"
import { useToast } from "../hooks/use-toast"
import { useFonts } from "../hooks/use-fonts"

interface FontGroupFormProps {
  editMode?: boolean
  groupId?: string
  initialData?: {
    name: string
    fonts: { id: string }[]
  }
  onSuccess?: () => void
}

export default function FontGroupForm({ editMode = false, groupId, initialData, onSuccess }: FontGroupFormProps) {
  const { fonts, loading: fontsLoading } = useFonts()
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      name: "",
      fonts: [{ id: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fonts",
  })

  const onSubmit = async (data: any) => {
    // Validate at least two fonts are selected
    const selectedFonts = data.fonts.filter((f: any) => f.id)
    if (selectedFonts.length < 2) {
      toast({
        title: "Validation Error",
        description: "Please select at least two fonts for the group",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      if (editMode && groupId) {
        await updateFontGroup(groupId, data)
        toast({
          title: "Font group updated",
          description: "The font group has been updated successfully",
        })
      } else {
        await createFontGroup(data)
        toast({
          title: "Font group created",
          description: "The font group has been created successfully",
        })
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
        console.log(error)
      toast({
        title: "Error",
        description: editMode ? "Failed to update font group" : "Failed to create font group",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl text-zinc-800 font-semibold mb-4">{editMode ? "Edit Font Group" : "Create Font Group"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Group Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            placeholder="Enter group name"
            {...register("name", { required: "Group name is required" })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Select Fonts</label>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
              onClick={() => append({ id: "" })}
            >
              <FiPlus className="mr-1" />
              Add Font
            </button>
          </div>

          {fontsLoading ? (
            <div className="py-4 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
              <p className="mt-2 text-sm text-gray-500">Loading fonts...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-grow">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                      {...register(`fonts.${index}.id`, { required: "Please select a font" })}
                    >
                      <option value="">Select a font</option>
                      {fonts.map((font) => (
                        <option key={font.id} value={font.id}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                    {errors.fonts?.[index]?.id && (
                      <p className="mt-1 text-sm text-red-600">{errors.fonts[index]?.id?.message as string}</p>
                    )}
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-red-500"
                      onClick={() => remove(index)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {fields.length < 2 && (
            <p className="mt-2 text-sm text-amber-600">Please add at least two fonts to create a group</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || fontsLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {editMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                {editMode ? "Update Group" : "Create Group"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

import { useState, useEffect } from "react"
import { getFonts } from "../services/api"
import { useToast } from "../hooks/use-toast"
import FontPreview from "./font-preview"
import { FiLoader } from "react-icons/fi"

interface Font {
  id: string
  name: string
  url: string
  uploadDate: string
}

export default function FontList() {
  const [fonts, setFonts] = useState<Font[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadFonts = async () => {
      try {
        setLoading(true)
        const data = await getFonts()
        setFonts(data)
      } catch (error) {
        console.log(error)
        toast({
          title: "Error loading fonts",
          description: "There was a problem fetching the font list",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadFonts()
  }, [toast])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (fonts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Font List</h2>
        <p className="text-gray-500">No fonts uploaded yet. Upload some fonts to see them here.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Font List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fonts.map((font) => (
          <div key={font.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2">{font.name}</h3>
            <FontPreview fontUrl={font.url} fontName={font.name} />
            <p className="text-xs text-gray-500 mt-2">Uploaded on {new Date(font.uploadDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

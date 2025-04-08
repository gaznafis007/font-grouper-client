import { useState, useEffect } from "react"
import { getFonts } from "../services/api"
import { useToast } from "../hooks/use-toast"

interface Font {
  id: string
  name: string
  url: string
  uploadDate: string
}

export function useFonts() {
  const [fonts, setFonts] = useState<Font[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadFonts = async () => {
      try {
        setLoading(true)
        const data = await getFonts()
        setFonts(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load fonts"))
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

  return { fonts, loading, error, refetch: () => {} }
}

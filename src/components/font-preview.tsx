"use client"

import { useEffect, useState } from "react"

interface FontPreviewProps {
  fontUrl: string
  fontName: string
  previewText?: string
}

export default function FontPreview({
  fontUrl,
  fontName,
  previewText = "The quick brown fox jumps over the lazy dog",
}: FontPreviewProps) {
  const [fontLoaded, setFontLoaded] = useState(false)
  const fontFamilyName = `font-${fontName.replace(/\s+/g, "-").toLowerCase()}`

  useEffect(() => {
    // Create a style element to load the font
    const style = document.createElement("style")
    style.textContent = `
      @font-face {
        font-family: "${fontFamilyName}";
        src: url("${fontUrl}") format("truetype");
        font-weight: normal;
        font-style: normal;
      }
    `
    document.head.appendChild(style)

    // Create a font face observer to check when the font is loaded
    const font = new FontFace(fontFamilyName, `url(${fontUrl})`)
    font
      .load()
      .then(() => {
        document.fonts.add(font)
        setFontLoaded(true)
      })
      .catch((err) => {
        console.error("Font loading error:", err)
      })

    return () => {
      document.head.removeChild(style)
    }
  }, [fontUrl, fontFamilyName])

  return (
    <div className="mt-2">
      {!fontLoaded ? (
        <div className="h-16 bg-gray-100 animate-pulse rounded"></div>
      ) : (
        <div className="border-t border-b py-2">
          <p className="text-lg break-words" style={{ fontFamily: fontFamilyName }}>
            {previewText}
          </p>
          <p className="text-2xl mt-1 break-words" style={{ fontFamily: fontFamilyName }}>
            ABCDEFGHIJKLM
          </p>
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'

export function useDerivedImagesForVehicle(params: {
  brand?: string
  model?: string
  version?: string
  year?: number
}) {
  const { brand = '', model = '', version = '', year } = params
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const baseName = `${brand} ${model}`.trim()
      const candidates = [
        baseName,
        version ? `${baseName} ${version}` : '',
        year ? `${baseName} (${year})` : ''
      ].filter(Boolean)

      setLoading(true)
      try {
        for (const name of candidates) {
          try {
            const res = await fetch(`/api/images?name=${encodeURIComponent(name)}`)
            if (!res.ok) continue
            const json = await res.json()
            const imgs: string[] = Array.isArray(json.images) ? json.images : []
            if (imgs.length) {
              if (!cancelled) setImages(imgs)
              return
            }
          } catch {}
        }
        if (!cancelled) setImages([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [brand, model, version, year])

  return { images, loading }
}
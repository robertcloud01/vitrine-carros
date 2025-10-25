import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

function isImageFile(fileName: string) {
  const ext = path.extname(fileName).toLowerCase()
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
}

function normalizeName(s: string) {
  const noDiacritics = s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  return noDiacritics
    .toLowerCase()
    .replace(/[\-_]+/g, ' ')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function GET(req: NextRequest) {
  try {
    const imagesRoot = path.join(process.cwd(), 'public', 'images')
    const entries = fs.readdirSync(imagesRoot, { withFileTypes: true })
    const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name)

    const priorityTerms = ['destaque', 'highlight', 'principal', 'capa']

    const result = folders.map((name) => {
      const absDir = path.join(imagesRoot, name)
      const children = fs.readdirSync(absDir, { withFileTypes: true })
      const files = children.filter((c) => c.isFile() && isImageFile(c.name)).map((c) => c.name)
      const images = files.map((f) => `/images/${encodeURIComponent(name)}/${encodeURIComponent(f)}`)
      const hasPriority = files.some((f) => priorityTerms.some((t) => f.toLowerCase().includes(t)))
      return {
        name,
        normalizedName: normalizeName(name),
        imageCount: images.length,
        hasDestaque: hasPriority,
        images,
      }
    })

    return NextResponse.json({ folders: result })
  } catch (error: any) {
    console.error('Error listing image folders:', error?.message || error)
    return NextResponse.json({ folders: [] }, { status: 500 })
  }
}
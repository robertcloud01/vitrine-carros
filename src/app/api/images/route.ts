import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

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

function expandTokens(str: string) {
  const base = normalizeName(str)
  const rawTokens = base.split(' ').filter(Boolean)
  const tokens = new Set<string>()
  rawTokens.forEach((t) => {
    tokens.add(t)
    // expand alpha-numeric combos like x6m -> x6, m ; gt500 -> gt, 500
    const re = /^([a-z]+)?(\d+)?([a-z]+)?$/
    const m = t.match(re)
    if (m) {
      const a = m[1] || ''
      const n = m[2] || ''
      const b = m[3] || ''
      if (a) tokens.add(a)
      if (n) tokens.add(n)
      if (b) tokens.add(b)
      if (a && n) tokens.add(`${a}${n}`)
      if (n && b) tokens.add(`${n}${b}`)
      if (a && b) tokens.add(`${a}${b}`)
    }
  })
  return tokens
}

function isImageFile(fileName: string) {
  const ext = path.extname(fileName).toLowerCase()
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
}

function listImagesInDir(absDir: string, urlPrefix: string) {
  const entries = fs.readdirSync(absDir, { withFileTypes: true })
  const files = entries
    .filter((e) => e.isFile() && isImageFile(e.name))
    .map((e) => e.name)

  // Ordenar para priorizar arquivos com "destaque" (ou termos equivalentes) primeiro
  const priorityTerms = ['destaque', 'highlight', 'principal', 'capa']
  const sorted = files.sort((a, b) => {
    const al = a.toLowerCase()
    const bl = b.toLowerCase()
    const aHas = priorityTerms.some(t => al.includes(t))
    const bHas = priorityTerms.some(t => bl.includes(t))
    if (aHas && !bHas) return -1
    if (!aHas && bHas) return 1

    // Se ambos/nenhum têm prioridade, usar ordenação natural por prefixo numérico se existir (ex.: 01, 02)
    const aNum = al.match(/^(\d{1,3})/)
    const bNum = bl.match(/^(\d{1,3})/)
    if (aNum || bNum) {
      if (!aNum) return 1
      if (!bNum) return -1
      return parseInt(aNum[1], 10) - parseInt(bNum[1], 10)
    }
    return al.localeCompare(bl)
  })

  return sorted.map((name) => `${urlPrefix}/${encodeURIComponent(name)}`)
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const folder = searchParams.get('folder') || ''
    const name = searchParams.get('name') || ''

    const imagesRoot = path.join(process.cwd(), 'public', 'images')

    // Direct folder mode
    if (folder) {
      // avoid path traversal
      if (folder.includes('..')) {
        return NextResponse.json({ images: [] }, { status: 400 })
      }
      const absDir = path.join(imagesRoot, folder)
      if (fs.existsSync(absDir) && fs.statSync(absDir).isDirectory()) {
        const images = listImagesInDir(absDir, `/images/${encodeURIComponent(folder)}`)
        return NextResponse.json({ images, folder })
      }
      return NextResponse.json({ images: [] })
    }

    // Helpers
    const priorityTerms = ['destaque', 'highlight', 'principal', 'capa']
    const hasPriorityFile = (absDir: string) => {
      try {
        const entries = fs.readdirSync(absDir, { withFileTypes: true })
        return entries.some(e => e.isFile() && isImageFile(e.name) && priorityTerms.some(t => e.name.toLowerCase().includes(t)))
      } catch {
        return false
      }
    }

    // Search by vehicle name across folders
    if (name) {
      const nameNorm = normalizeName(name)
      const nameTokens = expandTokens(nameNorm)
      const entries = fs.readdirSync(imagesRoot, { withFileTypes: true })
      const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name)

      const candidates = dirs.map((d) => {
        const dn = normalizeName(d)
        const folderTokens = expandTokens(dn)
        const exact = dn === nameNorm ? 1 : 0
        const includes = dn.includes(nameNorm) || nameNorm.includes(dn) ? 1 : 0
        let hits = 0
        nameTokens.forEach((t) => { if (folderTokens.has(t)) hits++ })
        const absDir = path.join(imagesRoot, d)
        const images = listImagesInDir(absDir, `/images/${encodeURIComponent(d)}`)
        const priority = hasPriorityFile(absDir) ? 1 : 0
        const imageCount = images.length
        // score: exact > includes > token hits > prioridade de arquivo > quantidade de imagens
        const score = exact * 1000 + includes * 500 + hits * 50 + priority * 10 + imageCount
        return { d, dn, score, images }
      })

      candidates.sort((a, b) => b.score - a.score)

      if (candidates.length && candidates[0].score > 0) {
        const best = candidates[0]
        return NextResponse.json({ images: best.images, folder: best.d })
      }

      // Fallback: match files in root by name
      const files = entries.filter((e) => e.isFile() && isImageFile(e.name)).map((e) => e.name)
      const filesMatched = files.filter((f) => {
        const fn = normalizeName(f)
        const fileTokens = expandTokens(fn)
        if (fn.includes(nameNorm) || nameNorm.includes(fn)) return true
        let hits = 0
        nameTokens.forEach((t) => { if (fileTokens.has(t)) hits++ })
        return hits >= 2
      })
      const images = filesMatched.map((f) => `/images/${encodeURIComponent(f)}`)
      return NextResponse.json({ images, folder: '' })
    }

    return NextResponse.json({ images: [] })
  } catch (error: any) {
    console.error('Error listing images:', error?.message || error)
    return NextResponse.json({ images: [] }, { status: 500 })
  }
}
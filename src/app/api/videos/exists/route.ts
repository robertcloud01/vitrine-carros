import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const p = searchParams.get('path') || ''

    if (!p || !p.startsWith('/videos/')) {
      return NextResponse.json({ error: 'Parâmetro inválido' }, { status: 400 })
    }

    // Normalizar e garantir que não haja path traversal
    const rel = p.replace(/^\/+/, '') // remove leading slash
    const abs = path.join(process.cwd(), 'public', rel)

    // Bloquear tentativas com '..'
    const normalized = path.normalize(abs)
    const publicRoot = path.join(process.cwd(), 'public')
    if (!normalized.startsWith(publicRoot)) {
      return NextResponse.json({ error: 'Caminho não permitido' }, { status: 400 })
    }

    const exists = fs.existsSync(normalized)
    return NextResponse.json({ exists })
  } catch (e) {
    return NextResponse.json({ error: 'Falha ao verificar vídeo' }, { status: 500 })
  }
}
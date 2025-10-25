"use client"
import React, { useEffect, useMemo, useState } from 'react'

type Vehicle = {
  id: string
  brand: string
  model: string
  version?: string
  year?: number
}

type Paginated<T> = { data: T[] } | T[]

type FolderInfo = {
  name: string
  normalizedName: string
  imageCount: number
  hasDestaque: boolean
  images: string[]
}

function normalize(s: string) {
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

function vehicleNorm(v: Vehicle) {
  const base = [v.brand, v.model, v.version || '', v.year ? String(v.year) : '']
    .filter(Boolean)
    .join(' ')
  return normalize(base)
}

function tokenSet(str: string) {
  const base = normalize(str)
  const raw = base.split(' ').filter(Boolean)
  const set = new Set<string>()
  raw.forEach((t) => {
    set.add(t)
    const re = /^([a-z]+)?(\d+)?([a-z]+)?$/
    const m = t.match(re)
    if (m) {
      const a = m[1] || ''
      const n = m[2] || ''
      const b = m[3] || ''
      if (a) set.add(a)
      if (n) set.add(n)
      if (b) set.add(b)
      if (a && n) set.add(`${a}${n}`)
      if (n && b) set.add(`${n}${b}`)
      if (a && b) set.add(`${a}${b}`)
    }
  })
  return set
}

function overlapScore(a: string, b: string) {
  if (!a || !b) return 0
  const an = normalize(a)
  const bn = normalize(b)
  if (an.includes(bn) || bn.includes(an)) return 100
  const A = tokenSet(a)
  const B = tokenSet(b)
  let shared = 0
  A.forEach((t) => {
    if (B.has(t)) shared++
  })
  return shared
}

export default function MediaDebugPage() {
  const [folders, setFolders] = useState<FolderInfo[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [fRes, vRes] = await Promise.all([
          fetch('/api/images/folders').then((r) => r.json()),
          fetch('/api/vehicles?limit=1000').then((r) => r.json()),
        ])
        const folderList: FolderInfo[] = fRes?.folders || []
        const vData: Paginated<Vehicle> = vRes
        const vList: Vehicle[] = Array.isArray(vData) ? vData : (vData?.data || [])
        setFolders(folderList)
        setVehicles(vList)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const mappings = useMemo(() => {
    const vehicleByNorm = new Map<string, Vehicle>()
    vehicles.forEach((v) => vehicleByNorm.set(vehicleNorm(v), v))

    const folderMatches: Record<string, { folder: FolderInfo; matches: Vehicle[] }> = {}
    folders.forEach((f) => {
      const fn = normalize(f.normalizedName || f.name)
      let best: Vehicle[] = []
      let bestScore = 0
      vehicles.forEach((v) => {
        const vn = vehicleNorm(v)
        const score = overlapScore(fn, vn)
        if (score > 1 && score >= bestScore) {
          if (score > bestScore) best = []
          bestScore = score
          best.push(v)
        }
      })
      folderMatches[f.name] = { folder: f, matches: best }
    })

    const matchedFolderNames = new Set<string>()
    const vehicleToFolders: Record<string, FolderInfo[]> = {}
    Object.values(folderMatches).forEach(({ folder, matches }) => {
      if (matches.length > 0) matchedFolderNames.add(folder.name)
      matches.forEach((v) => {
        const key = v.id
        vehicleToFolders[key] = vehicleToFolders[key] || []
        vehicleToFolders[key].push(folder)
      })
    })

    const vehiclesMissing = vehicles.filter((v) => !(v.id in vehicleToFolders))
    const foldersOrphan = folders.filter((f) => !matchedFolderNames.has(f.name))
    const vehiclesDuplicated = Object.entries(vehicleToFolders)
      .filter(([_, arr]) => arr.length > 1)
      .map(([id, arr]) => ({ vehicle: vehicles.find((x) => x.id === id)!, folders: arr }))
    const foldersAmbiguous = Object.values(folderMatches).filter((m) => m.matches.length > 1)

    return {
      vehiclesMissing,
      foldersOrphan,
      vehiclesDuplicated,
      foldersAmbiguous,
      folderMatches,
    }
  }, [folders, vehicles])

  if (loading) return <div style={{ padding: 24 }}>Carregando…</div>

  return (
    <div style={{ padding: 24, color: '#fff' }}>
      <h1>Diagnóstico de Mídia</h1>
      <p>
        Esta página ajuda a encontrar carros sem pasta de imagens, pastas
        órfãs e correspondências duplicadas.
      </p>
      <section>
        <h2>Resumo</h2>
        <ul>
          <li>Pastas: {folders.length}</li>
          <li>Veículos: {vehicles.length}</li>
          <li>Sem imagens: {mappings.vehiclesMissing.length}</li>
          <li>Pastas órfãs: {mappings.foldersOrphan.length}</li>
          <li>Veículos duplicados: {mappings.vehiclesDuplicated.length}</li>
          <li>Pastas ambíguas: {mappings.foldersAmbiguous.length}</li>
        </ul>
      </section>
      <section>
        <h3>Veículos sem pasta de imagens</h3>
        {mappings.vehiclesMissing.length === 0 ? (
          <p>Nenhum.</p>
        ) : (
          <ul>
            {mappings.vehiclesMissing.map((v) => (
              <li key={v.id}>
                {v.brand} {v.model} {v.version} {v.year}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3>Pastas órfãs (sem veículo correspondente)</h3>
        {mappings.foldersOrphan.length === 0 ? (
          <p>Nenhuma.</p>
        ) : (
          <ul>
            {mappings.foldersOrphan.map((f) => (
              <li key={f.name}>
                {f.name} ({f.imageCount} imagens{f.hasDestaque ? ', tem destaque' : ''})
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3>Veículos com múltiplas pastas</h3>
        {mappings.vehiclesDuplicated.length === 0 ? (
          <p>Nenhum.</p>
        ) : (
          <ul>
            {mappings.vehiclesDuplicated.map(({ vehicle, folders }) => (
              <li key={vehicle.id}>
                {vehicle.brand} {vehicle.model} {vehicle.version} {vehicle.year} →{' '}
                {folders.map((f) => f.name).join(', ')}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3>Pastas ambíguas (casam mais de um veículo)</h3>
        {mappings.foldersAmbiguous.length === 0 ? (
          <p>Nenhuma.</p>
        ) : (
          <ul>
            {mappings.foldersAmbiguous.map(({ folder, matches }) => (
              <li key={folder.name}>
                {folder.name} → {matches.map((v) => `${v.brand} ${v.model} ${v.version || ''} ${v.year || ''}`).join(' | ')}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
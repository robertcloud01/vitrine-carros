import { NextRequest, NextResponse } from 'next/server'
import { VehicleService } from '@/lib/services/vehicleService'
import { VehicleStatus, FuelType, TransmissionType } from '@prisma/client'
import { getVehicles as getVehiclesMock, addVehicle as addVehicleMock } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      search: searchParams.get('search') || undefined,
      brand: searchParams.get('brand') || undefined,
      model: searchParams.get('model') || undefined,
      yearMin: searchParams.get('yearMin') ? parseInt(searchParams.get('yearMin')!) : undefined,
      yearMax: searchParams.get('yearMax') ? parseInt(searchParams.get('yearMax')!) : undefined,
      priceMin: searchParams.get('priceMin') ? parseFloat(searchParams.get('priceMin')!) : undefined,
      priceMax: searchParams.get('priceMax') ? parseFloat(searchParams.get('priceMax')!) : undefined,
      mileageMax: searchParams.get('mileageMax') ? parseInt(searchParams.get('mileageMax')!) : undefined,
      fuel: (searchParams.get('fuel') || undefined) as FuelType | undefined,
      transmission: (searchParams.get('transmission') || undefined) as TransmissionType | undefined,
      status: (searchParams.get('status') || undefined) as VehicleStatus | undefined,
      featured: searchParams.get('featured') === null ? undefined : searchParams.get('featured') === 'true'
    }

    const pagination = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'
    }

    const result = await VehicleService.getVehicles(filters, pagination)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error fetching vehicles (db):', error?.message || error)
    try {
      const { searchParams } = new URL(request.url)
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '12')
      const search = searchParams.get('search') || ''
      const brand = searchParams.get('brand') || ''

      const vehicles = getVehiclesMock({ search, brand })
      const total = vehicles.length
      const totalPages = Math.ceil(total / limit)
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedVehicles = vehicles.slice(startIndex, endIndex)

      return NextResponse.json({
        data: paginatedVehicles,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      })
    } catch (fallbackError) {
      console.error('Error fetching vehicles (mock fallback):', fallbackError)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const payload = {
      brand: body.brand,
      model: body.model,
      version: body.version || undefined,
      year: Number(body.year),
      price: Number(body.price),
      mileage: Number(body.mileage),
      fuel: body.fuel as FuelType,
      transmission: body.transmission as TransmissionType,
      color: body.color || undefined,
      location: body.location,
      description: body.description || undefined,
      videoUrl: body.videoUrl || undefined,
      gifUrl: body.gifUrl || undefined,
      featured: !!body.featured,
      images: Array.isArray(body.images) ? body.images : [],
      features: Array.isArray(body.features) ? body.features : [],
      highlights: Array.isArray(body.highlights) ? body.highlights : []
    }

    const newVehicle = await VehicleService.createVehicle(payload)
    return NextResponse.json(newVehicle, { status: 201 })
  } catch (error: any) {
    console.error('Error creating vehicle (db):', error?.message || error)
    try {
      const body = await request.json().catch(() => ({}))
      const newVehicle = addVehicleMock({
        brand: body.brand || '',
        model: body.model || '',
        version: body.version || '',
        year: body.year ? Number(body.year) : 0,
        price: body.price ? Number(body.price) : 0,
        mileage: body.mileage ? Number(body.mileage) : 0,
        fuel: body.fuel || '',
        transmission: body.transmission || '',
        color: body.color || '',
        location: body.location || '',
        description: body.description || '',
        videoUrl: body.videoUrl || '',
        gifUrl: body.gifUrl || '',
        images: body.images || [],
        features: body.features || [],
        highlights: body.highlights || []
      })
      return NextResponse.json(newVehicle, { status: 201 })
    } catch (fallbackError) {
      console.error('Error creating vehicle (mock fallback):', fallbackError)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }
  }
}
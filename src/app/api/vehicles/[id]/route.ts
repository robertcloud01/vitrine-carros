import { NextRequest, NextResponse } from 'next/server'
import { VehicleService } from '@/lib/services/vehicleService'
import { getVehicleById as getVehicleByIdMock, updateVehicle as updateVehicleMock, deleteVehicle as deleteVehicleMock } from '@/lib/mockData'
import { VehicleStatus, FuelType, TransmissionType } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vehicle = await VehicleService.getVehicleById(params.id)
    if (!vehicle) {
      return NextResponse.json({ error: 'Veículo não encontrado' }, { status: 404 })
    }
    return NextResponse.json(vehicle)
  } catch (error: any) {
    console.error('Error fetching vehicle (db):', error?.message || error)
    try {
      const vehicle = getVehicleByIdMock(params.id)
      if (!vehicle) {
        return NextResponse.json({ error: 'Veículo não encontrado' }, { status: 404 })
      }
      return NextResponse.json(vehicle)
    } catch (fallbackError) {
      console.error('Error fetching vehicle (mock fallback):', fallbackError)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const payload: any = {
      id: params.id,
      brand: body.brand,
      model: body.model,
      version: body.version,
      year: body.year !== undefined ? Number(body.year) : undefined,
      price: body.price !== undefined ? Number(body.price) : undefined,
      mileage: body.mileage !== undefined ? Number(body.mileage) : undefined,
      fuel: body.fuel as FuelType | undefined,
      transmission: body.transmission as TransmissionType | undefined,
      color: body.color,
      location: body.location,
      description: body.description,
      videoUrl: body.videoUrl,
      gifUrl: body.gifUrl,
      featured: body.featured,
      images: Array.isArray(body.images) ? body.images : undefined,
      features: Array.isArray(body.features) ? body.features : undefined,
      highlights: Array.isArray(body.highlights) ? body.highlights : undefined,
      status: body.status as VehicleStatus | undefined
    }

    const updated = await VehicleService.updateVehicle(payload)
    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Error updating vehicle (db):', error?.message || error)
    try {
      const body = await request.json().catch(() => ({}))
      const updated = updateVehicleMock(params.id, body)
      if (!updated) {
        return NextResponse.json({ error: 'Veículo não encontrado' }, { status: 404 })
      }
      return NextResponse.json(updated)
    } catch (fallbackError) {
      console.error('Error updating vehicle (mock fallback):', fallbackError)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await VehicleService.deleteVehicle(params.id)
    return NextResponse.json({ message: 'Veículo deletado com sucesso' })
  } catch (error: any) {
    console.error('Error deleting vehicle (db):', error?.message || error)
    try {
      const ok = deleteVehicleMock(params.id)
      if (!ok) {
        return NextResponse.json({ error: 'Veículo não encontrado' }, { status: 404 })
      }
      return NextResponse.json({ message: 'Veículo deletado com sucesso' })
    } catch (fallbackError) {
      console.error('Error deleting vehicle (mock fallback):', fallbackError)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }
  }
}
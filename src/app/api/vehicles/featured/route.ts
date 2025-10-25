import { NextRequest, NextResponse } from 'next/server'
import { VehicleService } from '@/lib/services/vehicleService'
import { getFeaturedVehicles as getFeaturedVehiclesMock } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20

    const vehicles = await VehicleService.getFeaturedVehicles(limit)
    return NextResponse.json(vehicles)
  } catch (error: any) {
    console.error('Error fetching featured vehicles (db):', error?.message || error)
    try {
      const { searchParams } = new URL(request.url)
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
      const vehicles = getFeaturedVehiclesMock(limit)
      return NextResponse.json(vehicles)
    } catch (fallbackError) {
      console.error('Error fetching featured vehicles (mock fallback):', fallbackError)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }
  }
}
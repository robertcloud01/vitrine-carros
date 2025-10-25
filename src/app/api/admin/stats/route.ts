import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Em produção, buscar estatísticas reais do banco de dados
    console.log('Buscando estatísticas do dashboard');
    
    // Mock data para desenvolvimento
    const stats = {
      vehicles: {
        total: 45,
        available: 38,
        sold: 7,
        featured: 12,
        thisMonth: 5,
        lastMonth: 3,
        growth: 66.7, // percentual de crescimento
      },
      inquiries: {
        total: 128,
        pending: 15,
        inProgress: 8,
        resolved: 105,
        thisMonth: 23,
        lastMonth: 18,
        growth: 27.8,
      },
      testDrives: {
        total: 67,
        pending: 5,
        confirmed: 12,
        completed: 45,
        cancelled: 5,
        thisMonth: 12,
        lastMonth: 8,
        growth: 50.0,
      },
      newsletter: {
        total: 1250,
        active: 1180,
        thisMonth: 85,
        lastMonth: 62,
        growth: 37.1,
      },
      users: {
        total: 234,
        active: 198,
        thisMonth: 28,
        lastMonth: 21,
        growth: 33.3,
      },
      revenue: {
        thisMonth: 450000,
        lastMonth: 380000,
        growth: 18.4,
        avgTicket: 35000,
      },
    };
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
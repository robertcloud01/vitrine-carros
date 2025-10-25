import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  type: z.enum(['GENERAL', 'VEHICLE_INFO', 'FINANCING', 'TRADE_IN', 'SERVICE']).optional(),
  vehicleId: z.string().optional(),
  subject: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validatedData = inquirySchema.parse(body);
    
    // Em produção, aqui salvaria no banco de dados usando InquiryService
    console.log('Nova consulta recebida:', validatedData);
    
    // Simular salvamento no banco
    const inquiry = {
      id: `inquiry_${Date.now()}`,
      ...validatedData,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    
    // Em produção, enviar email de notificação para a equipe
    // await EmailService.sendInquiryNotification(inquiry);
    
    return NextResponse.json(
      { 
        message: 'Consulta enviada com sucesso! Entraremos em contato em breve.',
        inquiry: {
          id: inquiry.id,
          status: inquiry.status,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error('Inquiry error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    
    // Em produção, buscar do banco de dados
    console.log('Buscando consultas:', { page, limit, status, type });
    
    // Dados mock para desenvolvimento
    const mockInquiries = [
      {
        id: 'inquiry_1',
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '(11) 99999-9999',
        message: 'Gostaria de mais informações sobre o Honda Civic.',
        type: 'VEHICLE_INFO',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      }
    ];
    
    return NextResponse.json({
      data: mockInquiries,
      pagination: {
        page,
        limit,
        total: mockInquiries.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
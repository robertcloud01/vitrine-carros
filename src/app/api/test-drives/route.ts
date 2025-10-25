import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const testDriveSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone é obrigatório'),
  preferredDate: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Data deve ser hoje ou no futuro'),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  vehicleId: z.string().min(1, 'Veículo é obrigatório'),
  hasDriverLicense: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validatedData = testDriveSchema.parse(body);
    
    // Verificar se a data não é um domingo ou feriado (exemplo de validação de negócio)
    const selectedDate = new Date(validatedData.preferredDate);
    if (selectedDate.getDay() === 0) {
      return NextResponse.json(
        { error: 'Test drives não estão disponíveis aos domingos' },
        { status: 400 }
      );
    }
    
    // Em produção, aqui salvaria no banco de dados usando TestDriveService
    console.log('Novo test drive agendado:', validatedData);
    
    // Simular salvamento no banco
    const testDrive = {
      id: `testdrive_${Date.now()}`,
      ...validatedData,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    
    // Em produção, enviar emails de confirmação
    // await EmailService.sendTestDriveConfirmation(testDrive);
    // await EmailService.sendTestDriveNotificationToTeam(testDrive);
    
    return NextResponse.json(
      { 
        message: 'Test drive agendado com sucesso! Entraremos em contato para confirmar.',
        testDrive: {
          id: testDrive.id,
          status: testDrive.status,
          preferredDate: testDrive.preferredDate,
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
    
    console.error('Test drive error:', error);
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
    const vehicleId = searchParams.get('vehicleId');
    const date = searchParams.get('date');
    
    // Em produção, buscar do banco de dados
    console.log('Buscando test drives:', { page, limit, status, vehicleId, date });
    
    // Dados mock para desenvolvimento
    const mockTestDrives = [
      {
        id: 'testdrive_1',
        name: 'Maria Santos',
        email: 'maria@email.com',
        phone: '(11) 88888-8888',
        preferredDate: '2024-01-20',
        preferredTime: '14:00',
        vehicleId: 'vehicle_1',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
      }
    ];
    
    return NextResponse.json({
      data: mockTestDrives,
      pagination: {
        page,
        limit,
        total: mockTestDrives.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    });
  } catch (error) {
    console.error('Error fetching test drives:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
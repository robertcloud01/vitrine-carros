import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateTestDriveSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']).optional(),
  confirmedDate: z.string().optional(),
  confirmedTime: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testDriveId = params.id;
    
    // Em produção, buscar do banco de dados
    console.log('Buscando test drive:', testDriveId);
    
    // Mock data
    const mockTestDrive = {
      id: testDriveId,
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(11) 88888-8888',
      preferredDate: '2024-01-20',
      preferredTime: '14:00',
      vehicleId: 'vehicle_1',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockTestDrive);
  } catch (error) {
    console.error('Error fetching test drive:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testDriveId = params.id;
    const body = await request.json();
    
    // Validar dados
    const validatedData = updateTestDriveSchema.parse(body);
    
    // Em produção, atualizar no banco de dados
    console.log('Atualizando test drive:', testDriveId, validatedData);
    
    // Se status mudou para CONFIRMED, enviar email de confirmação
    if (validatedData.status === 'CONFIRMED') {
      // await EmailService.sendTestDriveConfirmed(testDriveId);
    }
    
    return NextResponse.json({
      message: 'Test drive atualizado com sucesso',
      id: testDriveId,
      ...validatedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error('Error updating test drive:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testDriveId = params.id;
    
    // Em produção, deletar do banco de dados
    console.log('Deletando test drive:', testDriveId);
    
    return NextResponse.json({
      message: 'Test drive deletado com sucesso',
    });
  } catch (error) {
    console.error('Error deleting test drive:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
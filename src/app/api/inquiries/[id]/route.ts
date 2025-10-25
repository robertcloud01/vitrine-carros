import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateInquirySchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
  response: z.string().optional(),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const inquiryId = params.id;
    
    // Em produção, buscar do banco de dados
    console.log('Buscando consulta:', inquiryId);
    
    // Mock data
    const mockInquiry = {
      id: inquiryId,
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      message: 'Gostaria de mais informações sobre o Honda Civic.',
      type: 'VEHICLE_INFO',
      status: 'PENDING',
      vehicleId: 'vehicle_1',
      createdAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockInquiry);
  } catch (error) {
    console.error('Error fetching inquiry:', error);
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
    const inquiryId = params.id;
    const body = await request.json();
    
    // Validar dados
    const validatedData = updateInquirySchema.parse(body);
    
    // Em produção, atualizar no banco de dados
    console.log('Atualizando consulta:', inquiryId, validatedData);
    
    // Se uma resposta foi adicionada, enviar email para o cliente
    if (validatedData.response) {
      // await EmailService.sendInquiryResponse(inquiryId, validatedData.response);
    }
    
    return NextResponse.json({
      message: 'Consulta atualizada com sucesso',
      id: inquiryId,
      ...validatedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error('Error updating inquiry:', error);
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
    const inquiryId = params.id;
    
    // Em produção, deletar do banco de dados
    console.log('Deletando consulta:', inquiryId);
    
    return NextResponse.json({
      message: 'Consulta deletada com sucesso',
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
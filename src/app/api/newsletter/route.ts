import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validatedData = newsletterSchema.parse(body);
    
    // Em produção, verificar se email já está cadastrado
    // const existingSubscription = await NewsletterService.getByEmail(validatedData.email);
    
    // Simular verificação
    const isExistingEmail = false; // Em produção, verificar no banco
    
    if (isExistingEmail) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado na nossa newsletter' },
        { status: 400 }
      );
    }
    
    // Em produção, aqui salvaria no banco de dados usando NewsletterService
    console.log('Nova inscrição na newsletter:', validatedData);
    
    // Simular salvamento no banco
    const subscription = {
      id: `newsletter_${Date.now()}`,
      ...validatedData,
      active: true,
      createdAt: new Date().toISOString(),
    };
    
    // Em produção, enviar email de boas-vindas
    // await EmailService.sendNewsletterWelcome(subscription);
    
    return NextResponse.json(
      { 
        message: 'Inscrição realizada com sucesso! Obrigado por se juntar à nossa newsletter.',
        subscription: {
          id: subscription.id,
          email: subscription.email,
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
    
    console.error('Newsletter error:', error);
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
    const active = searchParams.get('active');
    
    // Em produção, buscar do banco de dados
    console.log('Buscando inscrições da newsletter:', { page, limit, active });
    
    // Dados mock para desenvolvimento
    const mockSubscriptions = [
      {
        id: 'newsletter_1',
        email: 'usuario@email.com',
        name: 'Usuário Teste',
        active: true,
        createdAt: new Date().toISOString(),
      }
    ];
    
    return NextResponse.json({
      data: mockSubscriptions,
      pagination: {
        page,
        limit,
        total: mockSubscriptions.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Endpoint para cancelar inscrição
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      );
    }
    
    // Em produção, desativar inscrição no banco
    console.log('Cancelando inscrição:', email);
    
    return NextResponse.json(
      { message: 'Inscrição cancelada com sucesso' }
    );
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
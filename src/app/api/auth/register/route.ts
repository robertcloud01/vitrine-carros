import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/userService';
import { EmailService } from '@/lib/services/emailService';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validatedData = registerSchema.parse(body);
    
    // Verificar se usuário já existe
    const existingUser = await UserService.getUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 400 }
      );
    }
    
    // Criar usuário
    const user = await UserService.createUser({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: 'USER',
    });
    
    // Enviar email de boas-vindas
    try {
      await EmailService.sendWelcomeEmail(user.email, user.name || 'Usuário');
      console.log('✅ Email de boas-vindas enviado para:', user.email);
    } catch (emailError) {
      console.error('❌ Erro ao enviar email de boas-vindas:', emailError);
      // Não falhar o registro se o email não for enviado
    }
    
    return NextResponse.json(
      { 
        message: 'Usuário criado com sucesso! Verifique seu email.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
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
    
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
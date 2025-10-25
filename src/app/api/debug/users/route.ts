import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/userService';

export async function GET(request: NextRequest) {
  try {
    // Apenas em desenvolvimento
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Endpoint disponível apenas em desenvolvimento' },
        { status: 403 }
      );
    }

    const users = await UserService.getAllUsers();
    
    // Remover senhas dos dados retornados
    const safeUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));
    
    return NextResponse.json({
      users: safeUsers,
      count: users.length,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
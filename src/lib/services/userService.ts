import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, CreateUserData, UserRole } from '@/types/database';

// Função para inicializar o usuário admin
const initializeAdminUser = async (): Promise<User> => {
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  return {
    id: '1',
    name: 'Administrador',
    email: 'admin@vitrinelux.com', // Corrigido para coincidir com o seed
    phone: '(11) 99999-9999',
    password: adminPassword,
    role: 'ADMIN' as UserRole,
    createdAt: new Date(),
    updatedAt: new Date(),
    favorites: [],
    inquiries: [],
    testDrives: [],
  };
};

// Mock data para desenvolvimento
let mockUsers: User[] = [];

// Inicializar dados mock
const initializeMockData = async () => {
  if (mockUsers.length === 0) {
    const adminUser = await initializeAdminUser();
    mockUsers = [adminUser];
    console.log('✅ Usuário admin inicializado com sucesso');
    console.log('📧 Email:', adminUser.email);
    console.log('🔑 Senha: admin123');
  }
};

// Inicializar dados na primeira execução
initializeMockData();

export class UserService {
  static async createUser(data: CreateUserData): Promise<User> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      // Hash da senha
      const hashedPassword = await bcrypt.hash(data.password, 12);
      
      // Criar novo usuário
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role || 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        favorites: [],
        inquiries: [],
        testDrives: [],
      };
      
      mockUsers.push(newUser);
      
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Erro ao criar usuário');
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      const user = mockUsers.find(u => u.email === email);
      return user || null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Erro ao buscar usuário');
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      const user = mockUsers.find(u => u.id === id);
      return user || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Erro ao buscar usuário');
    }
  }

  static async authenticateUser(email: string, password: string): Promise<User | null> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      console.log('🔍 Tentativa de autenticação:', { email });
      console.log('👥 Usuários disponíveis:', mockUsers.map(u => ({ id: u.id, email: u.email, role: u.role })));
      
      const user = await this.getUserByEmail(email);
      
      if (!user) {
        console.log('❌ Usuário não encontrado:', email);
        return null;
      }
      
      console.log('✅ Usuário encontrado:', { id: user.id, email: user.email, role: user.role });
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        console.log('❌ Senha inválida para:', email);
        return null;
      }
      
      console.log('✅ Autenticação bem-sucedida:', { id: user.id, email: user.email, role: user.role });
      
      return user;
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw new Error('Erro na autenticação');
    }
  }

  static generateJWT(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '30d',
    });
  }

  static verifyJWT(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  static async updateUser(id: string, data: Partial<CreateUserData>): Promise<User | null> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      const userIndex = mockUsers.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return null;
      }
      
      // Atualizar dados
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 12);
      }
      
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...data,
        updatedAt: new Date(),
      };
      
      return mockUsers[userIndex];
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Erro ao atualizar usuário');
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      const userIndex = mockUsers.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return false;
      }
      
      mockUsers.splice(userIndex, 1);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Erro ao deletar usuário');
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      return mockUsers;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Erro ao buscar usuários');
    }
  }

  static async getUsersByRole(role: UserRole): Promise<User[]> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      return mockUsers.filter(u => u.role === role);
    } catch (error) {
      console.error('Error fetching users by role:', error);
      throw new Error('Erro ao buscar usuários por role');
    }
  }

  static async changePassword(id: string, currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      // Garantir que os dados mock estão inicializados
      await initializeMockData();
      
      const user = await this.getUserById(id);
      
      if (!user) {
        return false;
      }
      
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isCurrentPasswordValid) {
        return false;
      }
      
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      await this.updateUser(id, { password: hashedNewPassword });
      
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      throw new Error('Erro ao alterar senha');
    }
  }
}
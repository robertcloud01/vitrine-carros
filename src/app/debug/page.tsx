'use client';

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function DebugPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/debug/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setTestLoading(true);
    setTestResult(null);

    try {
      console.log('🔍 Iniciando teste de login...');
      
      // Primeiro, vamos testar a API de usuários
      const usersResponse = await fetch('/api/debug/users');
      const usersData = await usersResponse.json();
      console.log('👥 Usuários disponíveis:', usersData);

      // Agora vamos testar o login
      const loginResult = await signIn('credentials', {
        email: 'admin@vitrinelux.com',
        password: 'admin123',
        redirect: false,
      });

      console.log('📝 Resultado do login:', loginResult);

      // Verificar a sessão
      const session = await getSession();
      console.log('🔐 Sessão atual:', session);

      setTestResult({
        users: usersData,
        login: loginResult,
        session: session,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Erro no teste:', error);
      const err = error as Error;
      setTestResult({
        error: err.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Debug - Sistema de Usuários</h1>
        
        {/* Teste de Login */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Teste de Autenticação</h2>
          <button
            onClick={testLogin}
            disabled={testLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 mb-4"
          >
            {testLoading ? 'Testando...' : 'Testar Login Admin'}
          </button>

          {testResult && (
            <div className="bg-slate-700 rounded p-4 mt-4">
              <h3 className="font-semibold mb-2">Resultado do Teste:</h3>
              <pre className="text-sm overflow-auto whitespace-pre-wrap">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Lista de Usuários */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Usuários no Sistema</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="bg-slate-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <span className="text-slate-400 text-sm">ID:</span>
                      <p className="font-mono">{user.id}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Nome:</span>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Email:</span>
                      <p className="font-mono">{user.email}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Role:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === 'ADMIN' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-slate-400 text-sm">Criado em:</span>
                    <p className="text-sm">{new Date(user.createdAt).toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">Nenhum usuário encontrado</p>
          )}
        </div>

        {/* Credenciais de Teste */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Credenciais de Teste</h2>
          <div className="bg-slate-700 rounded p-4">
            <h3 className="font-semibold text-yellow-400 mb-2">Administrador:</h3>
            <p><strong>Email:</strong> admin@vitrinelux.com</p>
            <p><strong>Senha:</strong> admin123</p>
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600 rounded">
              <p className="text-sm text-blue-300">
                ℹ️ Use essas credenciais para testar autenticação. Área administrativa foi removida.
              </p>
            </div>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="bg-slate-800 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Informações do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">NextAuth URL:</span>
              <p className="font-mono">{process.env.NEXTAUTH_URL || 'http://localhost:3000'}</p>
            </div>
            <div>
              <span className="text-slate-400">Ambiente:</span>
              <p className="font-mono">{process.env.NODE_ENV || 'development'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
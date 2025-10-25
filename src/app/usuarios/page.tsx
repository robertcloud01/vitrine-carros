'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }
  }, [session, status, router]);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800 rounded-lg p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-blue-600 rounded-full p-4 mr-6">
                <UserIcon className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Meu Perfil
                </h1>
                <p className="text-slate-400 mt-1">
                  Bem-vindo, {session.user?.name}!
                </p>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>

          {/* Informações do Usuário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Informações Pessoais
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Nome
                  </label>
                  <p className="text-white">{session.user?.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Email
                  </label>
                  <p className="text-white">{session.user?.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Tipo de Conta
                  </label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    session.user?.role === 'ADMIN' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {session.user?.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Ações Rápidas
              </h3>
              
              <div className="space-y-3">
                <a
                  href="/estoque"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
                >
                  Ver Estoque
                </a>
                
                <a
                  href="/contato"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
                >
                  Entrar em Contato
                </a>
                
                {session.user?.role === 'ADMIN' && (
                  <div className="text-slate-400 text-center text-sm">
                    Área administrativa desativada.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Teste de Funcionalidade */}
          <div className="mt-8 bg-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Status da Sessão
            </h3>
            <div className="text-sm text-slate-300">
              <p><strong>Status:</strong> {status}</p>
              <p><strong>ID:</strong> {session.user?.id}</p>
              <p><strong>Role:</strong> {session.user?.role}</p>
              <p><strong>Sessão ativa:</strong> ✅</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
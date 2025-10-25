'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function TestNavigation() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
      <h3 className="font-bold mb-2">🔧 TESTE DE NAVEGAÇÃO</h3>
      <div className="space-y-2">
        <button
          onClick={() => {
            console.log('Teste: Navegando para /usuarios');
            router.push('/usuarios');
          }}
          className="block w-full bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
        >
          Ir para Perfil
        </button>
        
        <button
          onClick={() => {
            console.log('Teste: Fazendo logout');
            signOut({ callbackUrl: '/' });
          }}
          className="block w-full bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
        >
          Fazer Logout
        </button>
        
        <a
          href="/usuarios"
          className="block w-full bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm text-center"
          onClick={() => console.log('Teste: Link direto para /usuarios')}
        >
          Link Direto
        </a>
      </div>
      <p className="text-xs mt-2">Usuário: {session.user?.name}</p>
    </div>
  );
}
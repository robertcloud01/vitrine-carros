'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function TestLoginPage() {
  const [email, setEmail] = useState('admin@vitrinelux.com');
  const [password, setPassword] = useState('admin123');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log('🔍 Testando login com:', { email, password });
      
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('📝 Resposta do signIn:', response);
      setResult(response);
    } catch (error) {
      console.error('❌ Erro no teste de login:', error);
      setResult({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    } finally {
      setLoading(false);
    }
  };

  const testAPI = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log('🔍 Testando API diretamente');
      
      const response = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log('📝 Resposta da API:', data);
      setResult({ api: data, status: response.status });
    } catch (error) {
      console.error('❌ Erro no teste da API:', error);
      setResult({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste de Login</h1>
        
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Credenciais</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              />
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={testLogin}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
            >
              {loading ? 'Testando...' : 'Testar NextAuth'}
            </button>
            
            <button
              onClick={testAPI}
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
            >
              {loading ? 'Testando...' : 'Testar API Direta'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Resultado:</h2>
            <pre className="bg-slate-700 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-yellow-400 mb-2">Credenciais Corretas:</h3>
          <p><strong>Email:</strong> admin@vitrinelux.com</p>
          <p><strong>Senha:</strong> admin123</p>
        </div>
      </div>
    </div>
  );
}
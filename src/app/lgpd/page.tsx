'use client';

import Link from 'next/link';

export default function LGPDPage() {
  return (
    <main className="min-h-screen bg-primary-black">
      <section className="py-20">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-6">
            <span className="text-primary-gold">LGPD</span> - Lei Geral de Proteção de Dados
          </h1>
          <p className="text-body-lg text-primary-gray max-w-3xl mx-auto">
            Esta página está em atualização para garantir a melhor experiência e informações completas sobre nossa política de proteção de dados.
          </p>
          <div className="mt-10">
            <Link href="/" className="btn-primary inline-block">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
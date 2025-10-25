'use client';

import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  ClockIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  BanknotesIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';
import { useState } from 'react';

const benefits = [
  {
    icon: CurrencyDollarIcon,
    title: 'Taxas Competitivas',
    description: 'As melhores taxas do mercado com nossos parceiros financeiros.'
  },
  {
    icon: ClockIcon,
    title: 'Aprovação Rápida',
    description: 'Análise de crédito em até 2 horas úteis.'
  },
  {
    icon: BanknotesIcon,
    title: 'Sem Entrada',
    description: 'Financie 100% do valor do veículo.'
  },
  {
    icon: DocumentTextIcon,
    title: 'Documentação Simples',
    description: 'Processo simplificado com poucos documentos.'
  }
];

const partners = [
  'Banco do Brasil',
  'Itaú Unibanco',
  'Bradesco',
  'Santander',
  'Caixa Econômica',
  'BV Financeira'
];

const requirements = [
  'CPF regularizado',
  'Comprovante de renda',
  'Comprovante de residência',
  'RG ou CNH',
  'Extrato bancário (3 meses)',
  'Declaração de Imposto de Renda'
];

export default function FinanciamentoPage() {
  const [simulationData, setSimulationData] = useState({
    vehicleValue: '',
    downPayment: '',
    installments: '48'
  });

  const [simulationResult, setSimulationResult] = useState<{
    vehicleValue: number;
    downPayment: number;
    financedAmount: number;
    installments: number;
    monthlyPayment: number;
    totalAmount: number;
  } | null>(null);

  const handleSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const vehicleValue = parseFloat(simulationData.vehicleValue.replace(/\D/g, ''));
    const downPayment = parseFloat(simulationData.downPayment.replace(/\D/g, ''));
    const installments = parseInt(simulationData.installments);
    
    if (vehicleValue && installments) {
      const financedAmount = vehicleValue - (downPayment || 0);
      const monthlyRate = 0.015; // 1.5% ao mês (exemplo)
      const monthlyPayment = (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, installments)) / 
                            (Math.pow(1 + monthlyRate, installments) - 1);
      
      setSimulationResult({
        vehicleValue,
        downPayment: downPayment || 0,
        financedAmount,
        installments,
        monthlyPayment,
        totalAmount: monthlyPayment * installments + (downPayment || 0)
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="💳 Financiamento de Veículos"
            className="w-full h-full"
          />
          <div className="gradient-overlay" />
        </div>

        <div className="relative z-10 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="heading-xl mb-6">
              <span className="text-primary-gold">Financiamento</span> de Veículos
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Realize o sonho do seu carro novo com as melhores condições de financiamento. 
              Parceiros de confiança e taxas competitivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#simulador" className="btn-primary">
                Simular Financiamento
              </Link>
              <Link href="/contato" className="btn-secondary">
                Falar com Especialista
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">
              Vantagens do nosso <span className="text-primary-gold">Financiamento</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Condições especiais para você realizar o sonho do carro novo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-primary-gold" />
                </div>
                <h3 className="text-xl font-semibold text-primary-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulador */}
      <section id="simulador" className="py-20 bg-primary-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-6">
                <CalculatorIcon className="h-8 w-8 inline mr-3 text-primary-gold" />
                Simulador de <span className="text-primary-gold">Financiamento</span>
              </h2>
              <p className="text-xl text-gray-400">
                Calcule suas parcelas e veja como fica o financiamento do seu veículo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulário */}
              <div className="card-premium p-8">
                <h3 className="text-xl font-semibold text-primary-white mb-6">
                  Dados do Financiamento
                </h3>
                
                <form onSubmit={handleSimulation} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Valor do Veículo
                    </label>
                    <input
                      type="text"
                      value={simulationData.vehicleValue}
                      onChange={(e) => setSimulationData({...simulationData, vehicleValue: e.target.value})}
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="R$ 100.000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Entrada (opcional)
                    </label>
                    <input
                      type="text"
                      value={simulationData.downPayment}
                      onChange={(e) => setSimulationData({...simulationData, downPayment: e.target.value})}
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="R$ 20.000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Número de Parcelas
                    </label>
                    <select
                      value={simulationData.installments}
                      onChange={(e) => setSimulationData({...simulationData, installments: e.target.value})}
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    >
                      <option value="12">12x</option>
                      <option value="24">24x</option>
                      <option value="36">36x</option>
                      <option value="48">48x</option>
                      <option value="60">60x</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full"
                  >
                    <CalculatorIcon className="h-5 w-5 mr-2" />
                    Calcular Parcelas
                  </button>
                </form>
              </div>

              {/* Resultado */}
              <div className="card-premium p-8">
                <h3 className="text-xl font-semibold text-primary-white mb-6">
                  Resultado da Simulação
                </h3>
                
                {simulationResult ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-primary-gray">
                      <span className="text-gray-400">Valor do Veículo:</span>
                      <span className="text-primary-white font-semibold">
                        {formatCurrency(simulationResult.vehicleValue)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-primary-gray">
                      <span className="text-gray-400">Entrada:</span>
                      <span className="text-primary-white font-semibold">
                        {formatCurrency(simulationResult.downPayment)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-primary-gray">
                      <span className="text-gray-400">Valor Financiado:</span>
                      <span className="text-primary-white font-semibold">
                        {formatCurrency(simulationResult.financedAmount)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-primary-gray">
                      <span className="text-gray-400">Parcelas:</span>
                      <span className="text-primary-white font-semibold">
                        {simulationResult.installments}x
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-primary-gray">
                      <span className="text-gray-400">Valor da Parcela:</span>
                      <span className="text-primary-gold font-bold text-xl">
                        {formatCurrency(simulationResult.monthlyPayment)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400">Total a Pagar:</span>
                      <span className="text-primary-white font-semibold">
                        {formatCurrency(simulationResult.totalAmount)}
                      </span>
                    </div>

                    <div className="mt-6 p-4 bg-primary-gold/10 rounded-lg">
                      <p className="text-sm text-gray-400 text-center">
                        * Simulação com taxa de 1,5% a.m. Valores sujeitos à aprovação de crédito.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-12">
                    <CalculatorIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados ao lado para ver o resultado da simulação.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">
              Nossos <span className="text-primary-gold">Parceiros</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Trabalhamos com as principais instituições financeiras do país.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center"
              >
                <div className="text-2xl mb-2">🏦</div>
                <div className="text-sm text-primary-white font-medium">
                  {partner}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentos */}
      <section className="py-20 bg-primary-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">
                Documentos <span className="text-primary-gold">Necessários</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Tenha estes documentos em mãos para agilizar sua aprovação.
              </p>

              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={requirement}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <DocumentTextIcon className="h-5 w-5 text-primary-gold flex-shrink-0" />
                    <span className="text-gray-400">{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ImagePlaceholder 
                text="📄 Documentação Simplificada"
                className="w-full h-96 rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-lg mb-6">
              Pronto para <span className="text-primary-gold">Financiar?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para encontrar as melhores condições para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                Solicitar Financiamento
              </Link>
              <Link href="/estoque" className="btn-secondary">
                Ver Veículos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
'use client';

import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  ClockIcon,
  TruckIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';

const coverageTypes = [
  {
    icon: ShieldCheckIcon,
    title: 'Cobertura Completa',
    description: 'Proteção total contra roubo, furto, colisão e incêndio.',
    features: [
      'Cobertura para terceiros',
      'Danos materiais e corporais',
      'Proteção contra fenômenos naturais',
      'Cobertura para vidros'
    ]
  },
  {
    icon: TruckIcon,
    title: 'Carro Reserva',
    description: 'Veículo substituto enquanto o seu está em reparo.',
    features: [
      'Disponível 24h',
      'Categoria similar',
      'Sem custo adicional',
      'Entrega no local'
    ]
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Assistência 24h',
    description: 'Socorro completo em qualquer lugar do Brasil.',
    features: [
      'Guincho especializado',
      'Chaveiro 24h',
      'Troca de pneus',
      'Pane seca e elétrica'
    ]
  },
  {
    icon: UserGroupIcon,
    title: 'Proteção Familiar',
    description: 'Cobertura estendida para toda a família.',
    features: [
      'Acidentes pessoais',
      'Despesas médicas',
      'Invalidez permanente',
      'Morte acidental'
    ]
  }
];

const insuranceCompanies = [
  'Porto Seguro',
  'Bradesco Seguros',
  'SulAmérica',
  'Allianz',
  'Azul Seguros',
  'HDI Seguros',
  'Tokio Marine',
  'Mapfre'
];

const benefits = [
  {
    icon: CurrencyDollarIcon,
    title: 'Desconto Especial',
    description: 'Até 30% de desconto para clientes VitrineLux.'
  },
  {
    icon: ClockIcon,
    title: 'Cotação Rápida',
    description: 'Cotação em até 15 minutos com as melhores seguradoras.'
  },
  {
    icon: DocumentTextIcon,
    title: 'Processo Simples',
    description: 'Contratação 100% digital sem burocracia.'
  },
  {
    icon: PhoneIcon,
    title: 'Suporte Dedicado',
    description: 'Atendimento especializado para nossos clientes.'
  }
];

const process = [
  {
    step: '01',
    title: 'Cotação',
    description: 'Informe os dados do veículo e receba cotações personalizadas.'
  },
  {
    step: '02',
    title: 'Comparação',
    description: 'Compare coberturas e preços das melhores seguradoras.'
  },
  {
    step: '03',
    title: 'Contratação',
    description: 'Escolha a melhor opção e contrate de forma digital.'
  },
  {
    step: '04',
    title: 'Proteção',
    description: 'Seu veículo protegido com cobertura imediata.'
  }
];

export default function SeguroPage() {
  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="🛡️ Seguro Auto Premium"
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
              <span className="text-primary-gold">Seguro Auto</span> Premium
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Proteja seu investimento com as melhores coberturas do mercado. 
              Parceria com as principais seguradoras do país.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#cotacao" className="btn-primary">
                Fazer Cotação
              </Link>
              <Link href="/contato" className="btn-secondary">
                Falar com Especialista
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tipos de Cobertura */}
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
              Tipos de <span className="text-primary-gold">Cobertura</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Proteção completa para seu veículo e sua família.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coverageTypes.map((coverage, index) => (
              <motion.div
                key={coverage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <coverage.icon className="h-6 w-6 text-primary-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary-white mb-3">
                      {coverage.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {coverage.description}
                    </p>
                    <ul className="space-y-2">
                      {coverage.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-400">
                          <div className="w-2 h-2 bg-primary-gold rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-primary-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">
              Vantagens <span className="text-primary-gold">Exclusivas</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Benefícios especiais para clientes VitrineLux.
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
                className="text-center"
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

      {/* Processo */}
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
              Como <span className="text-primary-gold">Funciona</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Processo simples e rápido para contratar seu seguro.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-gold/20 transform translate-x-4"></div>
                )}

                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="text-xl font-bold text-primary-black">
                    {step.step}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-primary-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seguradoras Parceiras */}
      <section className="py-20 bg-primary-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">
              Seguradoras <span className="text-primary-gold">Parceiras</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Trabalhamos com as principais seguradoras do mercado.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {insuranceCompanies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="text-primary-gold text-2xl mb-3">🏢</div>
                <h3 className="text-primary-white font-semibold">
                  {company}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cotacao" className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="heading-lg mb-6">
              Pronto para <span className="text-primary-gold">Proteger</span> seu Veículo?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Faça uma cotação gratuita e descubra as melhores opções de seguro para seu veículo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                Fazer Cotação Gratuita
              </Link>
              <Link href="/servicos" className="btn-secondary">
                Ver Outros Serviços
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
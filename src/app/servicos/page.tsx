'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  TruckIcon,
  PhoneIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';

const services = [
  {
    icon: ShoppingCartIcon,
    title: 'Compra de Veículos',
    description: 'Curadoria especializada em veículos premium com inspeção técnica completa.',
    features: [
      'Inspeção de 150 pontos',
      'Histórico completo do veículo',
      'Garantia de 2 anos',
      'Documentação regularizada'
    ],
    href: '/servicos/compra',
    color: 'bg-blue-600'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Venda de Veículos',
    description: 'Avaliação justa e venda rápida do seu veículo com toda segurança.',
    features: [
      'Avaliação gratuita',
      'Melhor preço do mercado',
      'Processo simplificado',
      'Pagamento à vista'
    ],
    href: '/servicos/venda',
    color: 'bg-green-600'
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Financiamento',
    description: 'Parcerias com as melhores instituições financeiras do país.',
    features: [
      'Taxas competitivas',
      'Aprovação rápida',
      'Até 60x para pagar',
      'Sem entrada'
    ],
    href: '/servicos/financiamento',
    color: 'bg-purple-600'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Seguro Auto',
    description: 'Proteção completa para seu veículo com as melhores seguradoras.',
    features: [
      'Cobertura total',
      'Assistência 24h',
      'Carro reserva',
      'Desconto especial'
    ],
    href: '/servicos/seguro',
    color: 'bg-red-600'
  },
  {
    icon: CalendarDaysIcon,
    title: 'Test Drive',
    description: 'Experimente o veículo dos seus sonhos antes de decidir.',
    features: [
      'Agendamento flexível',
      'Percurso personalizado',
      'Acompanhamento especializado',
      'Sem compromisso'
    ],
    href: '/servicos/test-drive',
    color: 'bg-yellow-600'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Inspeção Técnica',
    description: 'Análise completa e detalhada do estado do veículo.',
    features: [
      'Relatório completo',
      'Fotos detalhadas',
      'Avaliação de peças',
      'Certificado técnico'
    ],
    href: '/servicos/inspecao',
    color: 'bg-indigo-600'
  }
];

const process = [
  {
    step: '01',
    title: 'Consulta Inicial',
    description: 'Entre em contato conosco e conte suas necessidades.'
  },
  {
    step: '02',
    title: 'Avaliação',
    description: 'Nossa equipe analisa seu perfil e oferece as melhores opções.'
  },
  {
    step: '03',
    title: 'Proposta',
    description: 'Apresentamos uma proposta personalizada para você.'
  },
  {
    step: '04',
    title: 'Finalização',
    description: 'Concluímos o processo com total segurança e transparência.'
  }
];

const benefits = [
  {
    icon: ShieldCheckIcon,
    title: 'Garantia Estendida',
    description: '2 anos de garantia em todos os veículos vendidos.'
  },
  {
    icon: PhoneIcon,
    title: 'Suporte 24/7',
    description: 'Atendimento especializado sempre que precisar.'
  },
  {
    icon: TruckIcon,
    title: 'Entrega Grátis',
    description: 'Entregamos seu veículo onde você estiver.'
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Documentação',
    description: 'Cuidamos de toda a burocracia para você.'
  }
];

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="🔧 Serviços Premium VitrineLux"
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
              Nossos <span className="text-primary-gold">Serviços</span>
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Soluções completas para todas as suas necessidades automotivas. 
              Da compra à manutenção, cuidamos de cada detalhe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serviços Grid */}
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
              Serviços <span className="text-primary-gold">Completos</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tudo que você precisa para uma experiência automotiva excepcional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-primary-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-400">
                      <div className="w-2 h-2 bg-primary-gold rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={service.href}
                  className="btn-outline w-full text-center"
                >
                  Saiba Mais
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
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
              Como <span className="text-primary-gold">Funciona</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Processo simples e transparente para garantir sua satisfação.
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
                {/* Connector Line */}
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
              Benefícios <span className="text-primary-gold">Exclusivos</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Vantagens que só a VitrineLux oferece.
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

      {/* CTA Section */}
      <section className="py-20 bg-primary-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-lg mb-6">
              Pronto para <span className="text-primary-gold">Começar?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudar você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                Falar com Especialista
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
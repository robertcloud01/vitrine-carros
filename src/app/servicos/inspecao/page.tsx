'use client';

import { motion } from 'framer-motion';
import { 
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  CameraIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';

const inspectionPoints = [
  {
    category: 'Motor e Transmissão',
    icon: WrenchScrewdriverIcon,
    points: [
      'Estado do motor e componentes',
      'Sistema de transmissão',
      'Níveis de fluidos',
      'Sistema de arrefecimento',
      'Sistema de escape'
    ]
  },
  {
    category: 'Segurança e Freios',
    icon: ShieldCheckIcon,
    points: [
      'Sistema de freios completo',
      'Pneus e rodas',
      'Suspensão e amortecedores',
      'Direção e alinhamento',
      'Cintos de segurança'
    ]
  },
  {
    category: 'Elétrica e Eletrônica',
    icon: ClipboardDocumentCheckIcon,
    points: [
      'Sistema elétrico geral',
      'Bateria e alternador',
      'Luzes e sinalização',
      'Sistema de ignição',
      'Equipamentos eletrônicos'
    ]
  },
  {
    category: 'Carroceria e Interior',
    icon: CameraIcon,
    points: [
      'Estado da pintura',
      'Estrutura da carroceria',
      'Vidros e espelhos',
      'Interior e estofados',
      'Ar condicionado'
    ]
  }
];

const benefits = [
  {
    icon: DocumentTextIcon,
    title: 'Relatório Completo',
    description: 'Documento detalhado com todos os pontos verificados e fotos.'
  },
  {
    icon: CameraIcon,
    title: 'Fotos Detalhadas',
    description: 'Registro fotográfico de todos os componentes inspecionados.'
  },
  {
    icon: ClockIcon,
    title: 'Entrega Rápida',
    description: 'Relatório pronto em até 24 horas após a inspeção.'
  },
  {
    icon: UserIcon,
    title: 'Técnicos Certificados',
    description: 'Profissionais especializados e certificados pelo mercado.'
  }
];

const process = [
  {
    step: '01',
    title: 'Agendamento',
    description: 'Agende a inspeção online ou por telefone no horário de sua preferência.'
  },
  {
    step: '02',
    title: 'Inspeção',
    description: 'Técnico especializado realiza análise completa de 150 pontos do veículo.'
  },
  {
    step: '03',
    title: 'Documentação',
    description: 'Registro fotográfico e anotações detalhadas de todos os itens verificados.'
  },
  {
    step: '04',
    title: 'Relatório',
    description: 'Entrega do relatório completo com avaliação e recomendações.'
  }
];

const inspectionTypes = [
  {
    title: 'Inspeção Básica',
    price: 'R$ 299',
    duration: '2 horas',
    points: '80 pontos',
    features: [
      'Verificação de motor e transmissão',
      'Sistema de freios e suspensão',
      'Elétrica básica',
      'Estado geral da carroceria',
      'Relatório digital'
    ]
  },
  {
    title: 'Inspeção Completa',
    price: 'R$ 499',
    duration: '4 horas',
    points: '150 pontos',
    features: [
      'Todos os itens da inspeção básica',
      'Teste de estrada completo',
      'Análise eletrônica avançada',
      'Verificação de histórico',
      'Relatório impresso + digital',
      'Certificado de qualidade'
    ],
    popular: true
  },
  {
    title: 'Inspeção Premium',
    price: 'R$ 799',
    duration: '6 horas',
    points: '200+ pontos',
    features: [
      'Todos os itens da inspeção completa',
      'Análise de pintura profissional',
      'Teste de performance',
      'Avaliação de mercado',
      'Consultoria personalizada',
      'Garantia de 30 dias'
    ]
  }
];

export default function InspecaoPage() {
  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="🔍 Inspeção Técnica Profissional"
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
              <span className="text-primary-gold">Inspeção Técnica</span> Profissional
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Análise completa e detalhada do estado do seu veículo. 
              Relatório técnico com mais de 150 pontos de verificação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#tipos" className="btn-primary">
                Ver Tipos de Inspeção
              </Link>
              <Link href="/contato" className="btn-secondary">
                Agendar Inspeção
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pontos de Inspeção */}
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
              Pontos de <span className="text-primary-gold">Verificação</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Nossa inspeção técnica abrange todos os sistemas críticos do veículo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inspectionPoints.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center mr-4">
                    <category.icon className="h-6 w-6 text-primary-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-white">
                    {category.category}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {category.points.map((point, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <CheckCircleIcon className="h-5 w-5 text-primary-gold mr-3 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
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
              Por que escolher nossa <span className="text-primary-gold">Inspeção</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tecnologia avançada e profissionais certificados para uma análise precisa.
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

      {/* Como Funciona */}
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
              Processo profissional e transparente para sua tranquilidade.
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

      {/* Tipos de Inspeção */}
      <section id="tipos" className="py-20 bg-primary-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">
              Tipos de <span className="text-primary-gold">Inspeção</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Escolha o nível de inspeção ideal para suas necessidades.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inspectionTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`card-premium p-8 relative ${type.popular ? 'ring-2 ring-primary-gold' : ''}`}
              >
                {type.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-gold text-primary-black px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-primary-white mb-2">
                    {type.title}
                  </h3>
                  <div className="text-3xl font-bold text-primary-gold mb-4">
                    {type.price}
                  </div>
                  <div className="flex justify-center space-x-4 text-sm text-gray-400">
                    <span>⏱️ {type.duration}</span>
                    <span>📋 {type.points}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <CheckCircleIcon className="h-5 w-5 text-primary-gold mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contato" 
                  className={`w-full ${type.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Agendar {type.title}
                </Link>
              </motion.div>
            ))}
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
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="heading-lg mb-6">
              Pronto para <span className="text-primary-gold">Inspecionar</span> seu Veículo?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Agende sua inspeção técnica e tenha a tranquilidade de conhecer o real estado do seu veículo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                Agendar Inspeção
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
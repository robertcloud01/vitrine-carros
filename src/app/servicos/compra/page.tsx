'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  TruckIcon,
  PhoneIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';

const inspectionPoints = [
  'Motor e sistema de transmissão',
  'Sistema de freios e suspensão',
  'Elétrica e eletrônicos',
  'Carroceria e pintura',
  'Interior e acabamentos',
  'Pneus e rodas',
  'Sistema de ar condicionado',
  'Documentação e histórico'
];

const guarantees = [
  {
    icon: ShieldCheckIcon,
    title: 'Garantia de 2 Anos',
    description: 'Cobertura completa para motor, câmbio e principais componentes.'
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Documentação Garantida',
    description: 'Todos os documentos verificados e regularizados.'
  },
  {
    icon: TruckIcon,
    title: 'Entrega Gratuita',
    description: 'Levamos seu veículo até você, sem custo adicional.'
  },
  {
    icon: PhoneIcon,
    title: 'Suporte Pós-Venda',
    description: 'Atendimento especializado sempre que precisar.'
  }
];

const steps = [
  {
    number: '01',
    title: 'Escolha seu Veículo',
    description: 'Navegue por nosso estoque curado de veículos premium.'
  },
  {
    number: '02',
    title: 'Agende um Test Drive',
    description: 'Experimente o veículo e tire todas as suas dúvidas.'
  },
  {
    number: '03',
    title: 'Análise de Crédito',
    description: 'Verificamos as melhores condições de financiamento.'
  },
  {
    number: '04',
    title: 'Finalização',
    description: 'Assinatura dos documentos e entrega do veículo.'
  }
];

export default function CompraPage() {
  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="🚗 Compra de Veículos Premium"
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
              Compra de <span className="text-primary-gold">Veículos</span>
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Encontre o veículo dos seus sonhos com total segurança e transparência. 
              Cada carro passa por nossa rigorosa inspeção de 150 pontos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estoque" className="btn-primary">
                Ver Estoque
              </Link>
              <Link href="/contato" className="btn-secondary">
                Falar com Consultor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inspeção Técnica */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">
                Inspeção <span className="text-primary-gold">Rigorosa</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Nosso processo de inspeção técnica garante que você está adquirindo 
                um veículo em perfeitas condições.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inspectionPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-primary-gold flex-shrink-0" />
                    <span className="text-gray-400">{point}</span>
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
                text="🔍 Inspeção Técnica Detalhada"
                className="w-full h-96 rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Garantias */}
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
              Suas <span className="text-primary-gold">Garantias</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Compre com total tranquilidade. Oferecemos as melhores garantias do mercado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <guarantee.icon className="h-8 w-8 text-primary-gold" />
                </div>
                <h3 className="text-xl font-semibold text-primary-white mb-4">
                  {guarantee.title}
                </h3>
                <p className="text-gray-400">
                  {guarantee.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo de Compra */}
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
              Processo de <span className="text-primary-gold">Compra</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Simples, rápido e transparente. Veja como é fácil adquirir seu veículo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-gold/20 transform translate-x-4"></div>
                )}

                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="text-xl font-bold text-primary-black">
                    {step.number}
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
              Encontre seu <span className="text-primary-gold">Próximo Carro</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Explore nosso estoque de veículos premium ou fale com nossos consultores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estoque" className="btn-primary">
                Ver Estoque Completo
              </Link>
              <Link href="/contato" className="btn-secondary">
                Agendar Consulta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
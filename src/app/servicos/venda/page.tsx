'use client';

import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  TruckIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';

const benefits = [
  {
    icon: CurrencyDollarIcon,
    title: 'Melhor Preço',
    description: 'Avaliação justa baseada no mercado atual e condições do veículo.'
  },
  {
    icon: ClockIcon,
    title: 'Processo Rápido',
    description: 'Avaliação em até 24h e pagamento à vista na aprovação.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Segurança Total',
    description: 'Transação 100% segura com toda documentação regularizada.'
  },
  {
    icon: TruckIcon,
    title: 'Retirada Gratuita',
    description: 'Buscamos seu veículo onde você estiver, sem custo adicional.'
  }
];

const requirements = [
  'Documento do veículo em dia',
  'Chaves originais (preferencialmente)',
  'Manual do proprietário',
  'Histórico de manutenção',
  'Documentos pessoais do proprietário',
  'Comprovante de residência'
];

const steps = [
  {
    number: '01',
    title: 'Avaliação Online',
    description: 'Preencha nosso formulário com os dados do seu veículo.'
  },
  {
    number: '02',
    title: 'Inspeção Presencial',
    description: 'Nossa equipe faz uma avaliação técnica completa.'
  },
  {
    number: '03',
    title: 'Proposta',
    description: 'Apresentamos uma oferta justa e competitiva.'
  },
  {
    number: '04',
    title: 'Finalização',
    description: 'Documentação e pagamento à vista na aprovação.'
  }
];

export default function VendaPage() {
  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="💰 Venda seu Veículo"
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
              Venda seu <span className="text-primary-gold">Veículo</span>
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Transforme seu veículo em dinheiro de forma rápida e segura. 
              Oferecemos o melhor preço do mercado com total transparência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                Solicitar Avaliação
              </Link>
              <a href="tel:+5511999999999" className="btn-secondary">
                Ligar Agora
              </a>
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
              Por que vender <span className="text-primary-gold">conosco?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Oferecemos as melhores condições do mercado para a venda do seu veículo.
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
              Processo simples e transparente em apenas 4 passos.
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

      {/* Documentos Necessários */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ImagePlaceholder 
                text="📋 Documentação Necessária"
                className="w-full h-96 rounded-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">
                Documentos <span className="text-primary-gold">Necessários</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Tenha estes documentos em mãos para agilizar o processo de avaliação.
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
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-primary-gold flex-shrink-0" />
                    <span className="text-gray-400">{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulário de Avaliação */}
      <section className="py-20 bg-primary-black">
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
                Solicite sua <span className="text-primary-gold">Avaliação</span>
              </h2>
              <p className="text-xl text-gray-400">
                Preencha os dados do seu veículo e receba uma proposta em até 24h.
              </p>
            </div>

            <div className="card-premium p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Marca
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="Ex: BMW, Mercedes, Audi..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Modelo
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="Ex: X5, C-Class, A4..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Ano
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="2020"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Quilometragem
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="50000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Combustível
                    </label>
                    <select className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white focus:ring-2 focus:ring-primary-gold focus:border-transparent">
                      <option value="">Selecione</option>
                      <option value="gasolina">Gasolina</option>
                      <option value="flex">Flex</option>
                      <option value="diesel">Diesel</option>
                      <option value="eletrico">Elétrico</option>
                      <option value="hibrido">Híbrido</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-white mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    Observações
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-none"
                    placeholder="Conte-nos mais sobre o estado do veículo, histórico de manutenção, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Solicitar Avaliação Gratuita
                </button>
              </form>
            </div>
          </motion.div>
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
              Tem <span className="text-primary-gold">Dúvidas?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para esclarecer todas as suas questões.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+5511999999999" className="btn-primary">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Ligar Agora
              </a>
              <Link href="/contato" className="btn-secondary">
                Enviar Mensagem
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
'use client';

import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const sections = [
  {
    id: 'aceitacao',
    title: 'Aceitação dos Termos',
    icon: CheckCircleIcon,
    content: [
      'Ao acessar e utilizar o site da VitrineLux, você concorda em cumprir e estar vinculado a estes Termos de Uso.',
      'Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.',
      'Reservamo-nos o direito de modificar estes termos a qualquer momento, sendo sua responsabilidade verificar periodicamente as atualizações.'
    ]
  },
  {
    id: 'servicos',
    title: 'Descrição dos Serviços',
    icon: DocumentTextIcon,
    content: [
      'A VitrineLux oferece serviços de compra, venda e intermediação de veículos premium, além de serviços relacionados como financiamento, seguro e inspeção técnica.',
      'Nossos serviços incluem: curadoria de veículos, avaliação técnica, intermediação de vendas, consultoria automotiva e serviços pós-venda.',
      'Todos os veículos passam por rigorosa inspeção técnica antes de serem disponibilizados em nosso estoque.',
      'Não garantimos a disponibilidade contínua de veículos específicos, pois nosso estoque está sujeito a alterações.'
    ]
  },
  {
    id: 'responsabilidades',
    title: 'Responsabilidades do Usuário',
    icon: ScaleIcon,
    content: [
      'Você é responsável por fornecer informações precisas e atualizadas ao utilizar nossos serviços.',
      'Deve utilizar nossos serviços apenas para fins legais e de acordo com estes termos.',
      'É proibido utilizar nosso site para atividades fraudulentas, ilegais ou que violem direitos de terceiros.',
      'Você é responsável por manter a confidencialidade de suas credenciais de acesso.'
    ]
  },
  {
    id: 'limitacoes',
    title: 'Limitações de Responsabilidade',
    icon: ExclamationTriangleIcon,
    content: [
      'A VitrineLux não se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso de nossos serviços.',
      'Nossa responsabilidade está limitada ao valor pago pelos serviços contratados.',
      'Não garantimos que nosso site estará sempre disponível ou livre de erros.',
      'Informações sobre veículos são baseadas em inspeções técnicas, mas não substituem avaliação independente.'
    ]
  }
];

const prohibitions = [
  'Utilizar o site para fins ilegais ou não autorizados',
  'Tentar acessar áreas restritas do sistema',
  'Interferir no funcionamento do site ou servidores',
  'Copiar, reproduzir ou distribuir conteúdo sem autorização',
  'Enviar spam ou comunicações não solicitadas',
  'Utilizar informações de outros usuários indevidamente'
];

const warranties = [
  'Garantia de 2 anos para veículos adquiridos através da VitrineLux',
  'Cobertura para defeitos mecânicos e elétricos identificados na inspeção',
  'Suporte técnico especializado durante o período de garantia',
  'Assistência 24h para emergências relacionadas aos veículos vendidos'
];

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-black via-primary-graphite to-primary-black"></div>

        <div className="relative z-10 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <ScaleIcon className="h-16 w-16 text-primary-gold mx-auto mb-6" />
            <h1 className="heading-xl mb-6">
              Termos de <span className="text-primary-gold">Uso</span>
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Estes termos estabelecem as regras e condições para o uso dos serviços da VitrineLux. 
              Leia atentamente antes de utilizar nossos serviços.
            </p>
            <p className="text-gray-400">
              Última atualização: Janeiro de 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-premium p-8">
              <h2 className="text-2xl font-semibold text-primary-white mb-6">
                Bem-vindo à VitrineLux
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Estes Termos de Uso ("Termos") regem o uso do site e serviços da VitrineLux 
                  ("nós", "nosso" ou "Empresa"). Ao acessar ou usar nossos serviços, você 
                  ("usuário" ou "você") concorda em estar vinculado a estes Termos.
                </p>
                <p>
                  A VitrineLux é uma empresa especializada em curadoria e comercialização de 
                  veículos premium, oferecendo serviços completos para compra, venda e 
                  manutenção de automóveis de alta qualidade.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-20 bg-primary-black">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center mr-4">
                    <section.icon className="h-6 w-6 text-primary-gold" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-white">
                    {section.title}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-400 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibitions */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-premium p-8">
              <h2 className="text-2xl font-semibold text-primary-white mb-6">
                Atividades Proibidas
              </h2>
              <p className="text-gray-400 mb-6">
                As seguintes atividades são expressamente proibidas ao utilizar nossos serviços:
              </p>
              
              <div className="space-y-3">
                {prohibitions.map((prohibition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-400">{prohibition}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Warranties */}
      <section className="py-20 bg-primary-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-premium p-8">
              <h2 className="text-2xl font-semibold text-primary-white mb-6">
                Garantias e Suporte
              </h2>
              <p className="text-gray-400 mb-6">
                A VitrineLux oferece as seguintes garantias e suporte para nossos clientes:
              </p>
              
              <div className="space-y-3">
                {warranties.map((warranty, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-primary-gold mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-400">{warranty}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-premium p-8">
              <h2 className="text-2xl font-semibold text-primary-white mb-6">
                Informações Legais
              </h2>
              
              <div className="space-y-6 text-gray-400">
                <div>
                  <h3 className="text-lg font-semibold text-primary-white mb-2">Lei Aplicável</h3>
                  <p>
                    Estes Termos são regidos pelas leis da República Federativa do Brasil. 
                    Qualquer disputa será resolvida nos tribunais competentes de São Paulo, SP.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary-white mb-2">Modificações</h3>
                  <p>
                    Reservamo-nos o direito de modificar estes Termos a qualquer momento. 
                    As alterações entrarão em vigor imediatamente após a publicação no site.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary-white mb-2">Contato</h3>
                  <p>
                    Para dúvidas sobre estes Termos, entre em contato através do e-mail: 
                    <a href="mailto:legal@vitrinelux.com.br" className="text-primary-gold hover:underline ml-1">
                      legal@vitrinelux.com.br
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl font-semibold text-primary-white mb-6">
              Dúvidas sobre os Termos?
            </h2>
            <p className="text-gray-400 mb-8">
              Nossa equipe jurídica está disponível para esclarecer qualquer dúvida sobre estes termos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                Entrar em Contato
              </Link>
              <Link href="/privacidade" className="btn-secondary">
                Ver Política de Privacidade
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
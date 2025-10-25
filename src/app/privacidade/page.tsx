'use client';

import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  DocumentTextIcon,
  UserIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const sections = [
  {
    id: 'coleta',
    title: 'Coleta de Informações',
    icon: UserIcon,
    content: [
      'Coletamos informações pessoais quando você se cadastra em nosso site, faz uma consulta, agenda um test drive ou utiliza nossos serviços.',
      'As informações coletadas podem incluir: nome, e-mail, telefone, CPF, endereço, dados do veículo de interesse e preferências.',
      'Também coletamos informações automaticamente através de cookies e tecnologias similares para melhorar sua experiência.'
    ]
  },
  {
    id: 'uso',
    title: 'Uso das Informações',
    icon: DocumentTextIcon,
    content: [
      'Utilizamos suas informações para fornecer nossos serviços, processar consultas e melhorar sua experiência.',
      'Enviamos comunicações sobre veículos, ofertas especiais e atualizações de serviços (com sua permissão).',
      'Analisamos dados para melhorar nossos serviços e desenvolver novos produtos.',
      'Cumprimos obrigações legais e regulamentares do setor automotivo.'
    ]
  },
  {
    id: 'compartilhamento',
    title: 'Compartilhamento de Dados',
    icon: LockClosedIcon,
    content: [
      'Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins comerciais.',
      'Podemos compartilhar dados com parceiros de confiança (seguradoras, financeiras) apenas para prestação de serviços solicitados.',
      'Compartilhamos informações quando exigido por lei ou para proteger nossos direitos legais.',
      'Todos os parceiros são obrigados a manter a confidencialidade de suas informações.'
    ]
  },
  {
    id: 'seguranca',
    title: 'Segurança dos Dados',
    icon: ShieldCheckIcon,
    content: [
      'Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações.',
      'Utilizamos criptografia SSL para transmissão de dados sensíveis.',
      'Acesso às informações é restrito apenas a funcionários autorizados.',
      'Realizamos auditorias regulares de segurança e atualizamos nossos sistemas.'
    ]
  }
];

const rights = [
  'Acesso: Solicitar cópia de suas informações pessoais',
  'Retificação: Corrigir informações incorretas ou incompletas',
  'Exclusão: Solicitar a remoção de suas informações',
  'Portabilidade: Receber suas informações em formato estruturado',
  'Oposição: Opor-se ao processamento de suas informações',
  'Limitação: Solicitar a limitação do processamento'
];

export default function PrivacidadePage() {
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
            <ShieldCheckIcon className="h-16 w-16 text-primary-gold mx-auto mb-6" />
            <h1 className="heading-xl mb-6">
              Política de <span className="text-primary-gold">Privacidade</span>
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Sua privacidade é fundamental para nós. Esta política explica como coletamos, 
              usamos e protegemos suas informações pessoais.
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
                Compromisso com sua Privacidade
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  A VitrineLux está comprometida em proteger e respeitar sua privacidade. 
                  Esta Política de Privacidade explica como coletamos, usamos, armazenamos 
                  e protegemos suas informações pessoais quando você utiliza nossos serviços.
                </p>
                <p>
                  Ao utilizar nosso site e serviços, você concorda com as práticas descritas 
                  nesta política. Recomendamos que leia este documento com atenção.
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

      {/* Rights Section */}
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
                Seus Direitos
              </h2>
              <p className="text-gray-400 mb-6">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes direitos:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rights.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-primary-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-400">{right}</span>
                  </motion.div>
                ))}
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
            className="max-w-4xl mx-auto"
          >
            <div className="card-premium p-8 text-center">
              <h2 className="text-2xl font-semibold text-primary-white mb-6">
                Dúvidas sobre Privacidade?
              </h2>
              <p className="text-gray-400 mb-8">
                Se você tiver dúvidas sobre esta política ou quiser exercer seus direitos, 
                entre em contato conosco através dos canais abaixo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato" className="btn-primary">
                  Entrar em Contato
                </Link>
                <a 
                  href="mailto:privacidade@vitrinelux.com.br" 
                  className="btn-secondary"
                >
                  E-mail: privacidade@vitrinelux.com.br
                </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-primary-gray">
                <p className="text-sm text-gray-400">
                  Esta política pode ser atualizada periodicamente. 
                  Recomendamos que verifique regularmente para se manter informado sobre nossas práticas de privacidade.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
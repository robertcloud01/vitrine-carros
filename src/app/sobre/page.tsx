'use client';

import { motion } from 'framer-motion';
import { Metadata } from 'next';
import { 
  CheckCircleIcon,
  ShieldCheckIcon,
  TrophyIcon,
  HeartIcon,
  UsersIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

const values = [
  {
    icon: ShieldCheckIcon,
    title: 'Transparência Total',
    description: 'Histórico completo de cada veículo, sem surpresas ou custos ocultos.',
  },
  {
    icon: TrophyIcon,
    title: 'Excelência',
    description: 'Padrão premium em cada detalhe, do atendimento à entrega.',
  },
  {
    icon: HeartIcon,
    title: 'Paixão Automotiva',
    description: 'Amor genuíno por carros e pela experiência de dirigir.',
  },
  {
    icon: UsersIcon,
    title: 'Relacionamento',
    description: 'Construímos parcerias duradouras com nossos clientes.',
  },
];

const timeline = [
  {
    year: '2008',
    title: 'Fundação',
    description: 'Início da VitrineLux com foco em veículos premium.',
  },
  {
    year: '2012',
    title: 'Expansão',
    description: 'Abertura do showroom na Av. Paulista.',
  },
  {
    year: '2016',
    title: 'Certificação',
    description: 'Primeira concessionária certificada em inspeção técnica.',
  },
  {
    year: '2020',
    title: 'Digital',
    description: 'Lançamento da plataforma digital completa.',
  },
  {
    year: '2024',
    title: 'Liderança',
    description: 'Referência nacional em veículos premium.',
  },
];

const stats = [
  { number: '15+', label: 'Anos de Experiência' },
  { number: '2.500+', label: 'Veículos Vendidos' },
  { number: '98%', label: 'Satisfação dos Clientes' },
  { number: '150', label: 'Pontos de Inspeção' },
];

const team = [
  {
    name: 'Roberto Silva',
    role: 'CEO & Fundador',
    description: 'Especialista em veículos premium com 20 anos de experiência.',
    image: '👨‍💼',
  },
  {
    name: 'Marina Costa',
    role: 'Diretora Comercial',
    description: 'Responsável pela curadoria e relacionamento com clientes.',
    image: '👩‍💼',
  },
  {
    name: 'Carlos Mendes',
    role: 'Inspetor Técnico Chefe',
    description: 'Certificado internacional em inspeção automotiva.',
    image: '👨‍🔧',
  },
];

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="🏢 VitrineLux Showroom Premium"
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
              Sobre a <span className="text-primary-gold">VitrineLux</span>
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Há mais de 15 anos redefinindo o padrão de excelência no mercado automotivo premium. 
              Nossa paixão por carros excepcionais nos move a oferecer uma experiência única.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nossa História */}
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
                Nossa <span className="text-primary-gold">História</span>
              </h2>
              <div className="space-y-6 text-gray-400">
                <p className="text-lg">
                  A VitrineLux nasceu da paixão por veículos excepcionais e do desejo de 
                  transformar a experiência de compra de carros premium no Brasil.
                </p>
                <p>
                  Fundada em 2008 por Roberto Silva, começamos como uma pequena loja 
                  especializada em carros importados. Nossa dedicação à qualidade e 
                  transparência rapidamente nos destacou no mercado.
                </p>
                <p>
                  Hoje, somos reconhecidos como referência nacional em curadoria de 
                  veículos premium, com um processo de inspeção técnica rigoroso e 
                  atendimento personalizado que supera expectativas.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ImagePlaceholder 
                text="📈 Crescimento VitrineLux"
                className="w-full h-96 rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
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
              Nossos <span className="text-primary-gold">Valores</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Princípios que guiam cada decisão e definem nossa cultura empresarial.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-gold" />
                </div>
                <h3 className="text-xl font-semibold text-primary-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Nossa <span className="text-primary-gold">Jornada</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Marcos importantes que moldaram nossa trajetória de sucesso.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-gold/20"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="card-premium p-6">
                      <div className="text-2xl font-bold text-primary-gold mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-primary-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 w-4 h-4 bg-primary-gold rounded-full border-4 border-primary-graphite"></div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
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
              Números que <span className="text-primary-gold">Impressionam</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
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
              Nossa <span className="text-primary-gold">Equipe</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Profissionais apaixonados por carros e dedicados à excelência.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8 text-center"
              >
                <div className="text-6xl mb-6">{member.image}</div>
                <h3 className="text-xl font-semibold text-primary-white mb-2">
                  {member.name}
                </h3>
                <div className="text-primary-gold font-medium mb-4">
                  {member.role}
                </div>
                <p className="text-gray-400">
                  {member.description}
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
              Pronto para <span className="text-primary-gold">Conhecer Mais?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Visite nosso showroom e descubra por que somos a escolha de quem busca excelência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contato" className="btn-primary">
                Agendar Visita
              </a>
              <a href="/estoque" className="btn-secondary">
                Ver Estoque
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
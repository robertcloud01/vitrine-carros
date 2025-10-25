'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '🔍',
    title: 'Inspeção Técnica Rigorosa',
    description: 'Cada veículo passa por uma inspeção de 150 pontos realizada por especialistas certificados.',
  },
  {
    icon: '🏆',
    title: 'Curadoria Premium',
    description: 'Selecionamos apenas veículos de alto padrão com histórico comprovado e documentação completa.',
  },
  {
    icon: '🤝',
    title: 'Atendimento Boutique',
    description: 'Experiência personalizada com consultores especializados em veículos de luxo.',
  },
  {
    icon: '🛡️',
    title: 'Garantia Estendida',
    description: 'Todos os veículos incluem garantia de 2 anos e suporte técnico especializado.',
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-primary-black">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">
              Excelência em <span className="text-primary-gold">Cada Detalhe</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Na VitrineLux, redefinimos o padrão de qualidade no mercado automotivo premium. 
              Nossa missão é conectar você ao veículo dos seus sonhos com total transparência e confiança.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-primary-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Substitui o placeholder pelo arquivo real */}
              <div className="w-full rounded-xl overflow-hidden aspect-[16/9] bg-primary-black flex items-center justify-center">
                <img
                  src="/images/IMAGEM-VITRINELUX.jpg"
                  alt="Showroom VitrineLux"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 card-glass p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-gold">15+</div>
                  <div className="text-sm text-primary-white/80">Anos de Experiência</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 card-glass p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-gold">98%</div>
                  <div className="text-sm text-primary-white/80">Satisfação dos Clientes</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
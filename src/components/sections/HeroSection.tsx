'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import VideoBackground from '@/components/ui/VideoBackground';

const stats = [
  { label: 'Clientes Satisfeitos', value: '500+' },
  { label: 'Veículos Inspecionados', value: '1.200+' },
  { label: 'Anos de Garantia', value: '2' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Video Background */}
      <VideoBackground
        src="/videos/hero-car"
        poster="/images/widescreen_holder.jpeg"
        className="absolute inset-0"
        onError={() => console.error('❌ Erro ao carregar vídeo de fundo')}
        onLoad={() => console.log('✅ Vídeo de fundo carregado com sucesso!')}
      >
        {/* Overlay para melhor legibilidade do texto */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        
        {/* Gradient overlay para efeito premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-20" />
        
        {/* Content */}
        <div className="relative z-30 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Headline */}
            <h1 className="heading-xl mb-6 text-shadow-lg">
              Dirija o futuro.{' '}
              <span className="text-primary-gold">
                Seu próximo carro está aqui.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg mb-8 max-w-2xl mx-auto text-shadow text-primary-white/95">
              Curadoria de veículos premium. Inspeção técnica. Atendimento boutique.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/estoque">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Ver Estoque Premium
                </motion.button>
              </Link>
              
              <Link href="/sobre">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Nossa História
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-playfair font-bold text-primary-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-primary-white/80 font-poppins">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </VideoBackground>
    </section>
  );
}
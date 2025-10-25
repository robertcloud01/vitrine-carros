'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Eduardo Silva',
    role: 'Empresário',
    content: 'Experiência excepcional! A VitrineLux superou todas as minhas expectativas. O atendimento foi impecável e o veículo estava em perfeitas condições.',
    rating: 5,
    vehicle: 'BMW X6 M Competition',
  },
  {
    id: 2,
    name: 'Marina Oliveira',
    role: 'Médica',
    content: 'Profissionalismo e transparência em cada etapa. A inspeção técnica detalhada me deu total confiança na compra. Recomendo sem hesitar!',
    rating: 5,
    vehicle: 'Mercedes-Benz AMG GT',
  },
  {
    id: 3,
    name: 'Roberto Mendes',
    role: 'Advogado',
    content: 'Atendimento boutique de verdade. Desde o primeiro contato até a entrega, tudo foi perfeito. Meu Audi RS6 é simplesmente incrível!',
    rating: 5,
    vehicle: 'Audi RS6 Avant',
  },
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-primary-graphite">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            O Que Nossos <span className="text-primary-gold">Clientes Dizem</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Histórias reais de clientes que encontraram seus veículos dos sonhos conosco.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="card-premium text-center p-8 md:p-12"
          >
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <span key={i} className="text-primary-gold text-2xl">★</span>
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-xl md:text-2xl text-primary-white mb-8 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>

            {/* Author */}
            <div className="space-y-2">
              <div className="text-lg font-semibold text-primary-gold">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-gray-400">
                {testimonials[currentTestimonial].role}
              </div>
              <div className="text-sm text-primary-white/80">
                Proprietário: {testimonials[currentTestimonial].vehicle}
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-primary-black border border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-black transition-colors"
              aria-label="Depoimento anterior"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? 'bg-primary-gold'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-primary-black border border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-black transition-colors"
              aria-label="Próximo depoimento"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'Telefone',
    content: '(11) 99999-9999',
    link: 'tel:+5511999999999',
  },
  {
    icon: EnvelopeIcon,
    title: 'E-mail',
    content: 'contato@vitrinelux.com.br',
    link: 'mailto:contato@vitrinelux.com.br',
  },
  {
    icon: MapPinIcon,
    title: 'Endereço',
    content: 'Av. Paulista, 1000 - São Paulo, SP',
    link: 'https://maps.google.com',
  },
  {
    icon: ClockIcon,
    title: 'Horário',
    content: 'Seg-Sex: 9h-18h | Sáb: 9h-15h',
    link: null,
  },
];

export default function ContactSection() {
  // Removido: URL do WhatsApp. Utilize o botão flutuante global.

  return (
    <section className="py-20 bg-primary-black">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">
              Entre em <span className="text-primary-gold">Contato</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Pronto para encontrar seu próximo veículo? Nossa equipe está aqui para ajudar 
              você a realizar o sonho de dirigir um carro premium.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-white mb-1">
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-400 hover:text-primary-gold transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-gray-400">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            {/* Removido: CTA de WhatsApp, utilizar botão flutuante global */}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="card-premium p-8"
          >
            <h3 className="text-2xl font-bold text-primary-white mb-6">
              Solicite uma Consulta
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary-white mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary-white mb-2">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    placeholder="Seu sobrenome"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-white mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary-white mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-primary-white mb-2">
                  Interesse
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                >
                  <option value="">Selecione seu interesse</option>
                  <option value="compra">Compra de Veículo</option>
                  <option value="venda">Venda de Veículo</option>
                  <option value="test-drive">Test Drive</option>
                  <option value="financiamento">Financiamento</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-white mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-none"
                  placeholder="Conte-nos mais sobre o que você está procurando..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                Enviar Mensagem
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
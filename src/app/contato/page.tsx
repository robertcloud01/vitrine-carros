'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Metadata } from 'next';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import ContactSection from '@/components/sections/ContactSection';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'Telefone',
    content: '(11) 99999-9999',
    description: 'Ligue para nós durante o horário comercial',
    href: 'tel:+5511999999999',
  },
  {
    icon: EnvelopeIcon,
    title: 'E-mail',
    content: 'contato@vitrinelux.com.br',
    description: 'Envie sua mensagem que responderemos em até 2h',
    href: 'mailto:contato@vitrinelux.com.br',
  },
  {
    icon: MapPinIcon,
    title: 'Endereço',
    content: 'Av. Paulista, 1000 - São Paulo, SP',
    description: 'Visite nosso showroom premium',
    href: 'https://maps.google.com',
  },
  {
    icon: ClockIcon,
    title: 'Horário de Funcionamento',
    content: 'Seg-Sex: 9h-18h | Sáb: 9h-15h',
    description: 'Domingo: Fechado',
    href: null,
  },
];

const subjectOptions = [
  { value: '', label: 'Selecione o assunto' },
  { value: 'compra', label: 'Interesse em Compra' },
  { value: 'venda', label: 'Quero Vender meu Veículo' },
  { value: 'financiamento', label: 'Financiamento' },
  { value: 'test-drive', label: 'Agendar Test Drive' },
  { value: 'inspecao', label: 'Inspeção Técnica' },
  { value: 'suporte', label: 'Suporte Pós-Venda' },
  { value: 'outros', label: 'Outros' },
];

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  // Removido: CTA específico de WhatsApp. Utilize o botão flutuante global.

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary-black to-primary-graphite">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl mb-6">
              Entre em <span className="text-primary-gold">Contato</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Estamos aqui para ajudá-lo a encontrar o veículo perfeito. 
              Entre em contato conosco através dos canais abaixo.
            </p>
            {/* Removido botão de WhatsApp direto, usar botão flutuante global */}
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8 text-center group hover:scale-105 transition-transform"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-gold bg-opacity-20 rounded-full mb-6 group-hover:bg-opacity-30 transition-colors">
                  <info.icon className="h-8 w-8 text-primary-gold" />
                </div>
                <h3 className="text-lg font-semibold text-primary-white mb-2">
                  {info.title}
                </h3>
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-primary-gold font-medium hover:text-gold-400 transition-colors block mb-2"
                  >
                    {info.content}
                  </a>
                ) : (
                  <div className="text-primary-gold font-medium mb-2">
                    {info.content}
                  </div>
                )}
                <p className="text-gray-400 text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card-premium p-8">
                <h2 className="text-2xl font-bold text-primary-white mb-6">
                  Envie sua Mensagem
                </h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary-white mb-2">
                      Mensagem Enviada!
                    </h3>
                    <p className="text-gray-400">
                      Obrigado pelo contato. Responderemos em breve.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Nome Completo"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                      <Input
                        label="E-mail"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Telefone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                      <Select
                        label="Assunto"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', (e.target as HTMLSelectElement).value)}
                        options={subjectOptions}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mensagem
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 bg-primary-graphite border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-none"
                        placeholder="Descreva como podemos ajudá-lo..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      loading={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="card-premium p-8">
                <h3 className="text-xl font-semibold text-primary-white mb-4">
                  Nossa Localização
                </h3>
                <div className="bg-primary-graphite rounded-lg h-64 flex items-center justify-center border border-primary-gray">
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-primary-gold mx-auto mb-4" />
                    <p className="text-gray-400">Mapa Interativo</p>
                    <p className="text-sm text-gray-500">
                      Av. Paulista, 1000 - São Paulo, SP
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full mt-4"
                >
                  Ver no Google Maps
                </a>
              </div>

              {/* FAQ */}
              <div className="card-premium p-8">
                <h3 className="text-xl font-semibold text-primary-white mb-6">
                  Perguntas Frequentes
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-primary-white mb-2">
                      Qual o horário de funcionamento?
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Segunda a sexta: 9h às 18h | Sábado: 9h às 15h
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-white mb-2">
                      Posso agendar um test drive?
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Sim! Entre em contato conosco para agendar seu test drive.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-white mb-2">
                      Vocês oferecem financiamento?
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Sim, trabalhamos com as melhores instituições financeiras.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section Component */}
      <ContactSection />
    </main>
  );
}
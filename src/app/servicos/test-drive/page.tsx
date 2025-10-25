'use client';

import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  PhoneIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';
import { useState } from 'react';

const benefits = [
  {
    icon: CalendarDaysIcon,
    title: 'Agendamento Flexível',
    description: 'Escolha o melhor horário para você, incluindo finais de semana.'
  },
  {
    icon: MapPinIcon,
    title: 'Percurso Personalizado',
    description: 'Rota adaptada ao seu perfil de condução e preferências.'
  },
  {
    icon: UserIcon,
    title: 'Acompanhamento Especializado',
    description: 'Consultor especializado para esclarecer todas as dúvidas.'
  },
  {
    icon: CheckCircleIcon,
    title: 'Sem Compromisso',
    description: 'Experimente sem pressão de compra ou obrigação.'
  }
];

const process = [
  {
    step: '01',
    title: 'Agendamento',
    description: 'Escolha o veículo e agende seu test drive online ou por telefone.'
  },
  {
    step: '02',
    title: 'Documentação',
    description: 'Apresente CNH válida e documento de identidade.'
  },
  {
    step: '03',
    title: 'Briefing',
    description: 'Receba orientações sobre o veículo e o percurso.'
  },
  {
    step: '04',
    title: 'Experiência',
    description: 'Dirija o veículo dos seus sonhos com total segurança.'
  }
];

const requirements = [
  'CNH válida (categoria B ou superior)',
  'Documento de identidade (RG ou CPF)',
  'Idade mínima de 21 anos',
  'Experiência mínima de 2 anos de habilitação'
];

const availableTimes = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
];

export default function TestDrivePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    date: '',
    time: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica de envio do formulário
    console.log('Agendamento de test drive:', formData);
    alert('Test drive agendado com sucesso! Entraremos em contato para confirmar.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="🚗 Test Drive Premium"
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
              <span className="text-primary-gold">Test Drive</span> Premium
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Experimente o veículo dos seus sonhos antes de decidir. 
              Agendamento flexível e acompanhamento especializado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#agendamento" className="btn-primary">
                Agendar Test Drive
              </Link>
              <Link href="/estoque" className="btn-secondary">
                Ver Veículos Disponíveis
              </Link>
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
              Por que fazer um <span className="text-primary-gold">Test Drive</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A melhor forma de conhecer um veículo é dirigindo. Oferecemos uma experiência completa e sem pressão.
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

      {/* Como Funciona */}
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
              Processo simples e rápido para agendar seu test drive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-gold/20 transform translate-x-4"></div>
                )}

                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="text-xl font-bold text-primary-black">
                    {step.step}
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

      {/* Requisitos */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">
                <DocumentTextIcon className="h-8 w-8 inline mr-3 text-primary-gold" />
                Requisitos para <span className="text-primary-gold">Test Drive</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Para garantir a segurança de todos, é necessário atender aos seguintes requisitos:
              </p>
              
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-primary-white"
                  >
                    <CheckCircleIcon className="h-6 w-6 text-primary-gold mr-4 flex-shrink-0" />
                    {requirement}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-premium p-8"
            >
              <div className="text-center mb-6">
                <StarIcon className="h-12 w-12 text-primary-gold mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-primary-white mb-2">
                  Experiência Premium
                </h3>
                <p className="text-gray-400">
                  Nossos test drives são mais que uma simples volta de carro.
                </p>
              </div>
              
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-gold rounded-full mr-3"></div>
                  Veículo sempre limpo e abastecido
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-gold rounded-full mr-3"></div>
                  Consultor especializado acompanha
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-gold rounded-full mr-3"></div>
                  Percurso que inclui cidade e estrada
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-gold rounded-full mr-3"></div>
                  Tempo suficiente para conhecer o veículo
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulário de Agendamento */}
      <section id="agendamento" className="py-20 bg-primary-black">
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
                Agendar <span className="text-primary-gold">Test Drive</span>
              </h2>
              <p className="text-xl text-gray-400">
                Preencha o formulário abaixo e entraremos em contato para confirmar seu agendamento.
              </p>
            </div>

            <div className="card-premium p-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    Veículo de Interesse
                  </label>
                  <input
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    placeholder="Ex: BMW X5 2023"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    Data Preferida *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    Horário Preferido *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-white mb-2">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    placeholder="Alguma observação ou preferência especial..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    Agendar Test Drive
                  </button>
                </div>
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
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="heading-lg mb-6">
              Dúvidas sobre o <span className="text-primary-gold">Test Drive</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Nossa equipe está pronta para esclarecer todas as suas dúvidas e ajudar no agendamento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Falar com Especialista
              </Link>
              <Link href="/servicos" className="btn-secondary">
                Ver Outros Serviços
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Início', href: '/' },
    { name: 'Estoque', href: '/estoque' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contato' },
  ],
  services: [
    { name: 'Compra de Veículos', href: '/servicos/compra' },
    { name: 'Venda de Veículos', href: '/servicos/venda' },
    { name: 'Financiamento', href: '/servicos/financiamento' },
    { name: 'Seguro Auto', href: '/servicos/seguro' },
    { name: 'Test Drive', href: '/servicos/test-drive' },
    { name: 'Inspeção Técnica', href: '/servicos/inspecao' },
  ],
  legal: [
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Termos de Uso', href: '/termos' },
    { name: 'Política de Cookies', href: '/cookies' },
    { name: 'LGPD', href: '/lgpd' },
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com/vitrinelux', icon: Instagram },
    { name: 'Facebook', href: 'https://facebook.com/vitrinelux', icon: Facebook },
    { name: 'YouTube', href: 'https://youtube.com/vitrinelux', icon: Youtube },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/vitrinelux', icon: Linkedin },
  ],
};

const contactInfo = [
  {
    icon: PhoneIcon,
    label: 'Telefone',
    value: '(11) 99999-9999',
    href: 'tel:+5511999999999'
  },
  {
    icon: EnvelopeIcon,
    label: 'E-mail',
    value: 'contato@vitrinelux.com',
    href: 'mailto:contato@vitrinelux.com'
  },
  {
    icon: MapPinIcon,
    label: 'Endereço',
    value: 'Av. Paulista, 1000 - São Paulo, SP',
    href: 'https://maps.google.com/?q=Av.+Paulista,+1000+-+São+Paulo,+SP'
  },
  {
    icon: ClockIcon,
    label: 'Horário',
    value: 'Seg-Sex: 8h-18h | Sáb: 8h-14h',
    href: null
  },
];

export default function Footer() {
  const whatsappUrl = "https://wa.me/5511999999999?text=Olá! Gostaria de mais informações sobre os veículos.";

  // Link secreto: clique 5x para abrir login
  const handleSecretClick = () => {
    (window as any).__secretAdminClicks = ((window as any).__secretAdminClicks || 0) + 1;
    if ((window as any).__secretAdminClicks >= 5) {
      (window as any).__secretAdminClicks = 0;
      window.location.href = '/auth/signin';
    }
  };

  return (
    <footer className="bg-primary-graphite border-t border-primary-gray">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <div className="logo-md mb-6">
              VitrineLux
            </div>
            
            <p className="text-body-md text-gray-400 mb-6 leading-relaxed">
              Curadoria de veículos premium com inspeção técnica e atendimento boutique. 
              Sua próxima experiência automotiva começa aqui.
            </p>

            {/* Seção de contato removida para evitar duplicação com /contato */}
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-xs text-primary-white mb-6">
              Navegação
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-gray-400 hover:text-primary-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-xs text-primary-white mb-6">
              Serviços
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-gray-400 hover:text-primary-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-xs text-primary-white mb-6">
              Newsletter
            </h3>
            <p className="text-body-sm text-gray-400 mb-4">
              Receba ofertas exclusivas e novidades do mundo automotivo.
            </p>
            
            {/* Newsletter Form */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="px-4 py-2 bg-primary-graphite border border-primary-gray rounded-l-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent font-poppins"
                />
                <button className="px-6 py-2 bg-primary-gold text-primary-black font-poppins font-semibold rounded-r-lg hover:bg-gold-400 transition-colors">
                  Assinar
                </button>
              </div>
            </motion.div>

            {/* Social Links */}
            <div>
              <h4 className="text-body-md font-medium text-primary-white mb-3">
                Redes Sociais
              </h4>
              <div className="flex space-x-4">
                {navigation.social.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-white hover:text-primary-gold transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={item.name}
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-gray mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-body-sm text-gray-400 cursor-pointer"
              onClick={handleSecretClick}
              title="© Clique 5x para abrir o painel admin"
            >
              © {new Date().getFullYear()} VitrineLux. Todos os direitos reservados.
            </motion.div>

            {/* Legal Links + Entrada Administrador */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center space-x-6"
            >
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-body-sm text-gray-400 hover:text-primary-gold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/auth/signin"
                className="text-body-sm text-gray-400 hover:text-primary-gold transition-colors"
                title="Área Administrativa"
              >
                Administrador
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
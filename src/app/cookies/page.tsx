'use client';

import { motion } from 'framer-motion';
import { 
  CogIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

const cookieTypes = [
  {
    id: 'essenciais',
    title: 'Cookies Essenciais',
    icon: CogIcon,
    description: 'Necessários para o funcionamento básico do site',
    required: true,
    examples: [
      'Cookies de sessão para manter você logado',
      'Cookies de segurança para proteção contra fraudes',
      'Cookies de preferências de idioma e região',
      'Cookies de carrinho de compras'
    ]
  },
  {
    id: 'analiticos',
    title: 'Cookies Analíticos',
    icon: ChartBarIcon,
    description: 'Ajudam a entender como os visitantes usam o site',
    required: false,
    examples: [
      'Google Analytics para análise de tráfego',
      'Cookies de tempo de permanência nas páginas',
      'Análise de comportamento de navegação',
      'Métricas de performance do site'
    ]
  },
  {
    id: 'marketing',
    title: 'Cookies de Marketing',
    icon: AdjustmentsHorizontalIcon,
    description: 'Utilizados para personalizar anúncios e conteúdo',
    required: false,
    examples: [
      'Cookies do Facebook Pixel',
      'Cookies do Google Ads',
      'Remarketing e retargeting',
      'Personalização de conteúdo'
    ]
  },
  {
    id: 'funcionais',
    title: 'Cookies Funcionais',
    icon: ShieldCheckIcon,
    description: 'Melhoram a funcionalidade e personalização',
    required: false,
    examples: [
      'Lembrar preferências de filtros',
      'Histórico de veículos visualizados',
      'Configurações de interface',
      'Chat e suporte online'
    ]
  }
];

export default function CookiesPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essenciais: true,
    analiticos: true,
    marketing: false,
    funcionais: true
  });

  const handlePreferenceChange = (type: string) => {
    if (type === 'essenciais') return; // Essenciais não podem ser desabilitados
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const savePreferences = () => {
    // Aqui seria implementada a lógica para salvar as preferências
    console.log('Preferências salvas:', cookiePreferences);
    alert('Preferências de cookies salvas com sucesso!');
  };

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
            <CogIcon className="h-16 w-16 text-primary-gold mx-auto mb-6" />
            <h1 className="heading-xl mb-6">
              Política de <span className="text-primary-gold">Cookies</span>
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Utilizamos cookies para melhorar sua experiência em nosso site. 
              Saiba como usamos essas tecnologias e como você pode controlá-las.
            </p>
            <p className="text-gray-400">
              Última atualização: Janeiro de 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* What are Cookies */}
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
                O que são Cookies?
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Cookies são pequenos arquivos de texto que são armazenados em seu dispositivo 
                  quando você visita um site. Eles são amplamente utilizados para fazer os sites 
                  funcionarem de forma mais eficiente e fornecer informações aos proprietários do site.
                </p>
                <p>
                  Na VitrineLux, utilizamos cookies para melhorar sua experiência de navegação, 
                  personalizar conteúdo, analisar o tráfego do site e fornecer recursos de mídia social.
                </p>
                <p>
                  Você tem controle total sobre os cookies e pode gerenciar suas preferências 
                  a qualquer momento através desta página ou das configurações do seu navegador.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types */}
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
              Tipos de <span className="text-primary-gold">Cookies</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Utilizamos diferentes tipos de cookies para diferentes finalidades.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center mr-4">
                      <type.icon className="h-6 w-6 text-primary-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-white mb-2">
                        {type.title}
                      </h3>
                      <p className="text-gray-400">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {type.required ? (
                      <span className="bg-primary-gold text-primary-black px-3 py-1 rounded-full text-sm font-semibold">
                        Obrigatório
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences[type.id as keyof typeof cookiePreferences]}
                          onChange={() => handlePreferenceChange(type.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-gold"></div>
                      </label>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-primary-white mb-3">Exemplos:</h4>
                  <ul className="space-y-2">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <div className="w-2 h-2 bg-primary-gold rounded-full mr-3"></div>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
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
                Como Gerenciar Cookies
              </h2>
              
              <div className="space-y-6 text-gray-400">
                <div>
                  <h3 className="text-lg font-semibold text-primary-white mb-3">
                    Através do Navegador
                  </h3>
                  <p className="mb-3">
                    Você pode controlar e/ou excluir cookies conforme desejar através das 
                    configurações do seu navegador:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Chrome:</strong> Configurações → Privacidade e segurança → Cookies</li>
                    <li>• <strong>Firefox:</strong> Opções → Privacidade e Segurança → Cookies</li>
                    <li>• <strong>Safari:</strong> Preferências → Privacidade → Cookies</li>
                    <li>• <strong>Edge:</strong> Configurações → Cookies e permissões do site</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary-white mb-3">
                    Através desta Página
                  </h3>
                  <p>
                    Use os controles acima para ativar ou desativar categorias específicas de cookies. 
                    Suas preferências serão salvas e aplicadas em futuras visitas.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-primary-gray">
                <button
                  onClick={savePreferences}
                  className="btn-primary mr-4"
                >
                  Salvar Preferências
                </button>
                <Link href="/contato" className="btn-secondary">
                  Dúvidas sobre Cookies
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Third Party Cookies */}
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
                Cookies de Terceiros
              </h2>
              
              <div className="space-y-4 text-gray-400">
                <p>
                  Nosso site pode conter cookies de terceiros, incluindo:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-white mb-3">
                      Google Analytics
                    </h3>
                    <p className="text-sm">
                      Para análise de tráfego e comportamento dos usuários. 
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline ml-1">
                        Política de Privacidade
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-primary-white mb-3">
                      Facebook Pixel
                    </h3>
                    <p className="text-sm">
                      Para remarketing e análise de conversões. 
                      <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline ml-1">
                        Política de Privacidade
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-primary-white mb-3">
                      Google Ads
                    </h3>
                    <p className="text-sm">
                      Para publicidade direcionada e medição de performance. 
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline ml-1">
                        Política de Privacidade
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-primary-white mb-3">
                      Hotjar
                    </h3>
                    <p className="text-sm">
                      Para análise de experiência do usuário e mapas de calor. 
                      <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline ml-1">
                        Política de Privacidade
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl font-semibold text-primary-white mb-6">
              Dúvidas sobre Cookies?
            </h2>
            <p className="text-gray-400 mb-8">
              Se você tiver dúvidas sobre nossa política de cookies ou como gerenciar suas preferências, 
              entre em contato conosco.
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
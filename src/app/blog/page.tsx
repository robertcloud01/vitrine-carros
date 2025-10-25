'use client';

import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  UserIcon,
  ClockIcon,
  TagIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  'Todos',
  'Dicas de Compra',
  'Manutenção',
  'Mercado Automotivo',
  'Tecnologia',
  'Sustentabilidade'
];

const blogPosts = [
  {
    id: 1,
    title: 'Como Escolher o Carro Ideal para Sua Família',
    excerpt: 'Guia completo com dicas essenciais para fazer a escolha certa na hora de comprar um veículo familiar.',
    category: 'Dicas de Compra',
    author: 'Carlos Silva',
    date: '2024-01-15',
    readTime: '8 min',
    image: '🚗 Família no Carro',
    featured: true,
    url: 'https://autoesporte.globo.com/servicos/noticia/2023/05/o-que-muda-na-escolha-do-carro-da-familia-quando-os-filhos-chegam.ghtml'
  },
  {
    id: 2,
    title: 'Manutenção Preventiva: O que Verificar Todo Mês',
    excerpt: 'Lista de verificações mensais que podem evitar problemas maiores e economizar dinheiro.',
    category: 'Manutenção',
    author: 'Ana Santos',
    date: '2024-01-12',
    readTime: '6 min',
    image: '🔧 Manutenção de Carro',
    url: 'https://quatrorodas.abril.com.br/auto-servico/tudo-que-voce-realmente-precisa-verificar-para-seu-carro-nao-quebrar/'
  },
  {
    id: 3,
    title: 'Carros Elétricos: O Futuro Chegou ao Brasil',
    excerpt: 'Análise do crescimento dos veículos elétricos no mercado brasileiro e suas vantagens.',
    category: 'Tecnologia',
    author: 'Roberto Lima',
    date: '2024-01-10',
    readTime: '10 min',
    image: '⚡ Carro Elétrico',
    url: 'https://motor1.uol.com.br/news/715386/vendas-producao-anfavea-2024-marco/'
  },
  {
    id: 4,
    title: 'Financiamento vs Consórcio: Qual a Melhor Opção?',
    excerpt: 'Comparativo detalhado entre as principais formas de financiar seu veículo novo.',
    category: 'Dicas de Compra',
    author: 'Marina Costa',
    date: '2024-01-08',
    readTime: '7 min',
    image: '💰 Financiamento',
    url: 'https://www.uol.com.br/carros/noticias/redacao/2022/10/12/financiamento-e-caro-saiba-se-consorcio-e-boa-opcao-para-comprar-um-carro.htm'
  },
  {
    id: 5,
    title: 'Tendências do Mercado Automotivo em 2024',
    excerpt: 'As principais tendências que vão moldar o mercado de veículos neste ano.',
    category: 'Mercado Automotivo',
    author: 'João Pereira',
    date: '2024-01-05',
    readTime: '12 min',
    image: '📈 Mercado Automotivo',
    url: 'https://motor1.uol.com.br/news/701254/estudo-vendas-mundiais-carros-2024/'
  },
  {
    id: 6,
    title: 'Sustentabilidade: Como Reduzir o Impacto do seu Carro',
    excerpt: 'Dicas práticas para tornar o uso do seu veículo mais sustentável e econômico.',
    category: 'Sustentabilidade',
    author: 'Fernanda Oliveira',
    date: '2024-01-03',
    readTime: '9 min',
    image: '🌱 Sustentabilidade',
    url: 'https://autoesporte.globo.com/carros/noticia/2019/08/voce-esta-preocupado-com-poluicao-que-seu-carro-gera-veja-como-reduzir-o-impacto-ambiental.ghtml'
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder 
            text="📝 Blog VitrineLux"
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
              <span className="text-primary-gold">Blog</span> VitrineLux
            </h1>
            <p className="text-xl text-primary-white/90 mb-8 max-w-3xl mx-auto">
              Dicas, novidades e insights sobre o mundo automotivo. 
              Conteúdo especializado para você fazer as melhores escolhas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-primary-graphite">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-primary-black border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-gold text-primary-black'
                      : 'bg-primary-black text-gray-400 hover:text-primary-white border border-primary-gray'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'Todos' && !searchTerm && (
        <section className="py-16 bg-primary-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="heading-lg mb-8">
                Artigo em <span className="text-primary-gold">Destaque</span>
              </h2>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-premium overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <ImagePlaceholder 
                    text={featuredPost.image}
                    className="w-full h-full"
                  />
                </div>
                
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-primary-gold text-primary-black px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-400 text-sm">Destaque</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-primary-white mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(featuredPost.date)}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    
                    <Link 
                      href={featuredPost.url}
                      className="btn-primary inline-flex items-center"
                    >
                      Ler Artigo
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-primary-graphite">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="heading-lg mb-4">
              {selectedCategory === 'Todos' ? 'Todos os' : selectedCategory} <span className="text-primary-gold">Artigos</span>
            </h2>
            <p className="text-gray-400">
              {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-premium overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative h-48">
                    <ImagePlaceholder 
                      text={post.image}
                      className="w-full h-full"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-gold text-primary-black px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(post.date)}
                      </div>
                      
                      <Link 
                        href={post.url}
                        className="text-primary-gold hover:text-primary-gold/80 font-semibold inline-flex items-center"
                      >
                        Ler mais
                        <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-primary-white mb-4">
                Nenhum artigo encontrado
              </h3>
              <p className="text-gray-400 mb-8">
                Tente ajustar os filtros ou termo de busca.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchTerm('');
                }}
                className="btn-primary"
              >
                Limpar Filtros
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-primary-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="heading-lg mb-6">
              Receba nossos <span className="text-primary-gold">Artigos</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Assine nossa newsletter e receba os melhores conteúdos sobre o mundo automotivo diretamente no seu e-mail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-primary-graphite border border-primary-gray rounded-lg text-primary-white placeholder-gray-400 focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
              <button className="btn-primary whitespace-nowrap">
                Assinar Newsletter
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              Sem spam. Cancele quando quiser.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
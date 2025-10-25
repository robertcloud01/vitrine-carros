'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useFeaturedVehicles } from '@/hooks/useVehicles';
import { formatPrice } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, PlayCircle, CheckCircle2, Eye, MessageCircle } from 'lucide-react';
import { useDerivedImagesForVehicle } from '@/hooks/useImages';
import { VehicleWithDetails } from '@/types/database';

function FeaturedSlide({
  v,
  videoRefs,
  handleVideoPlay,
  handleVideoPause,
}: {
  v: VehicleWithDetails;
  videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
  handleVideoPlay: (id: string) => void;
  handleVideoPause: (id: string) => void;
}) {
  const { images: derivedImages } = useDerivedImagesForVehicle({
    brand: v.brand,
    model: v.model,
    version: (typeof v.version === 'string' ? v.version : undefined) as any,
    year: (typeof v.year === 'number' ? v.year : undefined) as any,
  });
  const mainImage = (derivedImages && derivedImages.length > 0)
    ? derivedImages[0]
    : (Array.isArray(v.images) && v.images.length > 0 ? (v.images as any)[0] : '/images/widescreen_holder.jpeg');

  // Verificação de vídeo sem disparar erros de rede para assets inexistentes
  const [validVideoUrl, setValidVideoUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;

    const slugify = (s: string) => s
      .toLowerCase()
      .replace(/[()]/g, ' ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const base = `${v.brand} ${v.model}`;
    const candidatesRaw = [
      base,
      typeof v.version === 'string' && v.version ? `${base} ${v.version}` : '',
      typeof v.year === 'number' && v.year ? `${base} ${v.year}` : '',
      typeof v.version === 'string' && v.version && typeof v.year === 'number' && v.year ? `${base} ${v.version} ${v.year}` : ''
    ].filter(Boolean);
    const candidates = candidatesRaw.map((n) => `/videos/${slugify(n)}-video.mp4`);

    const checkExists = async (url: string) => {
      try {
        const res = await fetch(`/api/videos/exists?path=${encodeURIComponent(url)}`);
        if (!res.ok) return false;
        const data = await res.json();
        return Boolean(data?.exists);
      } catch {
        return false;
      }
    };

    const resolveVideo = async () => {
      // Primeiro, validar o videoUrl explícito
      if (v.videoUrl) {
        const ok = await checkExists(v.videoUrl);
        if (ok) {
          if (!cancelled) setValidVideoUrl(v.videoUrl);
          return;
        }
      }
      // Em seguida, tentar pelos candidatos
      for (const url of candidates) {
        const ok = await checkExists(url);
        if (ok) {
          if (!cancelled) setValidVideoUrl(url);
          return;
        }
      }
      if (!cancelled) setValidVideoUrl(null);
    };

    resolveVideo();
    return () => { cancelled = true; };
  }, [v.videoUrl, v.brand, v.model, v.version, v.year]);

  const chosenVideoUrl = validVideoUrl;

  return (
    <div className="w-full flex-shrink-0">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-primary-gold/20 mx-4">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Imagem */}
          <div className="relative h-80 md:h-96 overflow-hidden group bg-black">
            <img
              src={mainImage}
              alt={`${v.brand} ${v.model}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/widescreen_holder.jpeg';
              }}
            />

            {/* Vídeo no hover (ou fallback por nome) */}
            {chosenVideoUrl && (
              <div
                className="absolute inset-0 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                onMouseEnter={() => handleVideoPlay(v.id as any)}
                onMouseLeave={() => handleVideoPause(v.id as any)}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[v.id as any] = el;
                  }}
                  src={chosenVideoUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
              </div>
            )}

            {/* Indicador de vídeo */}
            {chosenVideoUrl && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-primary-gold px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                <PlayCircle className="w-4 h-4" />
                <span>Vídeo</span>
              </div>
            )}

            {/* Badges de destaque */}
            {v.highlights && v.highlights.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {(v.highlights as any).slice(0, 2).map((h: any) => (
                  <span key={h} className="bg-primary-gold text-black px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    {h}
                  </span>
                ))}
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Conteúdo */}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block h-1 w-8 bg-gradient-to-r from-primary-gold to-yellow-300 rounded" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary-gray">Destaque</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
              {v.brand} <span className="text-white/80">{v.model}</span>
            </h3>

            {v.version && (
              <p className="text-primary-gray mb-6 text-lg">
                {v.version as any}
              </p>
            )}

            {/* Preço destacado */}
            <div className="mb-8">
              <div className="text-primary-gray text-sm uppercase tracking-wider mb-1">Preço</div>
              <div className="text-4xl font-extrabold text-primary-gold mb-2">
                {formatPrice((v as any).price)}
              </div>
            </div>

            {/* Features principais (máximo 3) */}
            {v.features && (v.features as any).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {(v.features as any).slice(0, 3).map((f: any) => (
                  <span key={f} className="inline-flex items-center gap-1 text-xs bg-black/40 text-primary-gray border border-primary-gold/20 rounded-full px-3 py-1">
                    <CheckCircle2 className="w-3 h-3 text-primary-gold" />
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/estoque/${v.id}`} className="flex-1">
                <button className="w-full group bg-primary-gold hover:bg-primary-gold/90 text-black font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-primary-gold/30">
                  <span className="inline-flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Ver Detalhes
                  </span>
                </button>
              </Link>
              <a href={`https://wa.me/5511999999999?text=${encodeURIComponent(`Olá! Tenho interesse no ${v.brand} ${v.model}${v.version ? ` ${v.version}` : ''} (${(v as any).year || ''}). Poderia me passar mais detalhes?`)}`} target="_blank" rel="noopener noreferrer">
                <button className="bg-transparent border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-black font-semibold py-4 px-6 rounded-lg transition-all duration-200">
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </span>
                </button>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedVehicles() {
  const { data: vehicles, loading, error } = useFeaturedVehicles(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Usar diretamente os veículos retornados pelo hook (já são "featured")
  const featuredVehicles = useMemo(() => {
    return vehicles || [];
  }, [vehicles]);

  // Auto-play do carrossel
  useEffect(() => {
    if (!isAutoPlaying || featuredVehicles.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredVehicles.length);
    }, 4000); // Reduzido para 4 segundos

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, featuredVehicles.length]);

  // Pausar auto-play quando hover no carrossel
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Controle de vídeo
  const handleVideoPlay = async (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      try {
        video.currentTime = 0;
        await video.play();
      } catch (error) {
        console.log('Autoplay bloqueado:', error);
      }
    }
  };

  const handleVideoPause = (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredVehicles.length) % featuredVehicles.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredVehicles.length);
    setIsAutoPlaying(false);
  };

  if (loading) {
    return (
      <section className="py-20 bg-primary-dark">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto"></div>
            <p className="text-primary-gray mt-4">Carregando veículos em destaque...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredVehicles.length === 0) {
    return (
      <section className="py-20 bg-primary-dark">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-primary-gray">Nenhum veículo em destaque encontrado.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-primary-dark relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-gray-900 to-primary-dark opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-gold/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary-gold" />
            <span className="text-primary-gold text-sm uppercase tracking-[0.3em] font-semibold">Destaques</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Veículos em <span className="text-primary-gold">Destaque</span>
          </h2>
          <p className="text-primary-gray text-lg max-w-2xl mx-auto">
            Descubra nossa seleção exclusiva dos melhores veículos premium disponíveis
          </p>
        </motion.div>

        {/* Carrossel */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navegação (sempre visível) */}
          <>
            <button
              aria-label="Anterior"
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              aria-label="Próximo"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </>

          {/* Cards Container */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredVehicles.map((v) => (
                <FeaturedSlide
                  key={v.id as any}
                  v={v as any}
                  videoRefs={videoRefs}
                  handleVideoPlay={handleVideoPlay}
                  handleVideoPause={handleVideoPause}
                />
              ))}
            </motion.div>
          </div>

          {/* Indicadores */}
          {featuredVehicles.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {featuredVehicles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary-gold scale-125'
                      : 'bg-primary-gold/30 hover:bg-primary-gold/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Botão Ver Mais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/estoque">
            <button className="bg-transparent border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105">
              Ver Todo o Estoque
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
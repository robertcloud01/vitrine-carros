'use client';

import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  ShareIcon,
  EyeIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Vehicle } from '@/types';
import Badge from '@/components/ui/Badge';
import React, { useEffect, useRef, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useDerivedImagesForVehicle } from '@/hooks/useImages';

interface VehicleCardProps {
  vehicle: Vehicle;
  onFavorite?: (id: string) => void;
  onShare?: (vehicle: Vehicle) => void;
  onContact?: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ 
  vehicle, 
  onFavorite, 
  onShare, 
  onContact 
}: VehicleCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHoveringMedia, setIsHoveringMedia] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Estado para modal de vídeo expandido
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const { images: derivedImages } = useDerivedImagesForVehicle({
    brand: vehicle.brand,
    model: vehicle.model,
    version: vehicle.version,
    year: vehicle.year,
  });
  const mainImage = (derivedImages && derivedImages.length > 0)
    ? derivedImages[0]
    : (vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : '/file.svg');

  // Handlers restaurados
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.(vehicle.id);
  };

  const handleShare = () => {
    onShare?.(vehicle);
  };

  const handleContact = () => {
    onContact?.(vehicle);
  };

  // Validar existência do vídeo antes de renderizar para evitar erros de rede
  const [validVideoUrl, setValidVideoUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      if (!vehicle.videoUrl) { setValidVideoUrl(null); return; }
      try {
        const res = await fetch(`/api/videos/exists?path=${encodeURIComponent(vehicle.videoUrl)}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setValidVideoUrl(data?.exists ? vehicle.videoUrl : null);
        } else {
          if (!cancelled) setValidVideoUrl(null);
        }
      } catch {
        if (!cancelled) setValidVideoUrl(null);
      }
    };
    check();
    return () => { cancelled = true; };
  }, [vehicle.videoUrl]);

  // Abrir/fechar modal de vídeo
  const openVideoModal = () => {
    if (!validVideoUrl) return;
    // Pausar vídeo de hover antes de abrir
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch {}
    }
    setIsVideoOpen(true);
  };
  const closeVideoModal = () => setIsVideoOpen(false);

  // Fechar com tecla Escape
  useEffect(() => {
    if (!isVideoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideoModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isVideoOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-primary-black rounded-2xl overflow-hidden shadow-2xl border border-primary-gold/20 hover:border-primary-gold/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary-gold/20"
    >
      {/* Image Container */}
      <div 
        className={`relative h-64 overflow-hidden bg-black ${validVideoUrl ? 'cursor-zoom-in' : ''}`}
        onMouseEnter={() => {
          setIsHoveringMedia(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
        onMouseLeave={() => {
          setIsHoveringMedia(false);
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
        onClick={() => {
          if (validVideoUrl) openVideoModal();
        }}
      >
        {/* Main Image */}
        {mainImage ? (
          <img
            src={mainImage}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              console.error('Erro ao carregar imagem:', mainImage);
              (e.currentTarget as HTMLImageElement).src = '/file.svg'
            }}
          />
        ) : null}

        {/* Video overlay on hover */}
        {vehicle.videoUrl && (
          <video
            ref={videoRef}
            src={validVideoUrl || undefined}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHoveringMedia ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            muted
            playsInline
            loop
            poster={mainImage}
            onError={(e) => {
              console.error('Erro ao carregar vídeo:', vehicle.videoUrl);
              (e.currentTarget as HTMLVideoElement).style.display = 'none';
            }}
          />
        )}
        
        {/* Fallback quando não há mídia */}
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 ${mainImage ? 'hidden' : ''}`}>
          <div className="text-center text-white">
            <div className="text-4xl mb-2">🏎️</div>
            <p className="text-sm font-medium">{vehicle.brand} {vehicle.model}</p>
            <p className="text-xs text-gray-300">{vehicle.year}</p>
          </div>
        </div>

        {/* Play indicator for video */}
        {validVideoUrl && !isHoveringMedia && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 opacity-80 group-hover:opacity-0 transition-opacity">
              <PlayIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Action buttons on hover */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => { e.stopPropagation(); handleFavorite(); }}
            className="p-3 bg-black/60 backdrop-blur-md rounded-full hover:bg-primary-gold/20 hover:border-primary-gold/50 border border-white/20 transition-all duration-300 hover:scale-110"
          >
            {isFavorited ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-white" />
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleShare(); }}
            className="p-3 bg-black/60 backdrop-blur-md rounded-full hover:bg-primary-gold/20 hover:border-primary-gold/50 border border-white/20 transition-all duration-300 hover:scale-110"
          >
            <ShareIcon className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Premium highlights badges */}
        {vehicle.highlights && vehicle.highlights.length > 0 && (
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {vehicle.highlights.slice(0, 2).map((highlight, index) => (
              <Badge 
                key={index} 
                variant="success" 
                size="sm" 
                className="bg-gradient-to-r from-primary-gold to-yellow-400 text-black font-bold px-3 py-1 shadow-lg border border-primary-gold/30 backdrop-blur-sm"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        )}

        {/* Luxury price badge */}
        <div className="absolute bottom-6 right-6">
          <div className="bg-gradient-to-r from-primary-gold via-yellow-400 to-primary-gold text-black px-6 py-3 rounded-2xl font-bold text-xl shadow-2xl border border-primary-gold/50 backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300">
            {formatPrice(vehicle.price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Highlights */}
        {vehicle.highlights && vehicle.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {vehicle.highlights.slice(0, 2).map((highlight, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-gold/20 text-primary-gold text-xs font-medium rounded-full border border-primary-gold/30"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Price Badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-gradient-to-r from-primary-gold to-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
            {formatPrice(vehicle.price)}
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-primary-gold transition-colors duration-300">
            {vehicle.brand} {vehicle.model}
          </h3>
          
          {vehicle.version && (
            <p className="text-gray-300 text-sm font-medium">
              {vehicle.version}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Link href={`/estoque/${vehicle.id}`} className="block">
            <button className="w-full bg-primary-gold hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Ver Detalhes
            </button>
          </Link>
        </div>
      </div>

      {/* Modal de vídeo expandido */}
      {isVideoOpen && validVideoUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeVideoModal}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Fechar"
              onClick={closeVideoModal}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 border border-white/20"
            >
              ✕
            </button>
            <video
              src={validVideoUrl}
              className="w-full h-auto max-h-[80vh] rounded-xl shadow-2xl"
              controls
              playsInline
              autoPlay
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
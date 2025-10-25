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
            className="w-full h-full object-cover"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Action buttons on hover */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); handleFavorite(); }}
            className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
          >
            {isFavorited ? (
              <HeartSolidIcon className="h-4 w-4 text-red-500" />
            ) : (
              <HeartIcon className="h-4 w-4 text-white" />
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleShare(); }}
            className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
          >
            <ShareIcon className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Highlights badges */}
        {vehicle.highlights && vehicle.highlights.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {vehicle.highlights.slice(0, 2).map((highlight, index) => (
              <Badge key={index} variant="success" size="sm" className="bg-primary-gold/90 text-black font-semibold">
                {highlight}
              </Badge>
            ))}
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-primary-gold text-black px-4 py-2 rounded-full font-bold text-lg shadow-lg">
            {formatPrice(vehicle.price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Vehicle Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary-white mb-1 group-hover:text-primary-gold transition-colors">
            {vehicle.brand} {vehicle.model}
          </h3>
          {vehicle.version && (
            <p className="text-primary-gray text-sm">{vehicle.version}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link href={`/estoque/${vehicle.id}`} className="flex-1">
            <button className="w-full bg-primary-gold hover:bg-primary-gold/90 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-primary-gold/30 group/btn">
              <span className="inline-flex items-center justify-center gap-2">
                <EyeIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                Ver Detalhes
              </span>
            </button>
          </Link>
          
          <button
            onClick={handleContact}
            className="bg-transparent border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            💬
          </button>
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
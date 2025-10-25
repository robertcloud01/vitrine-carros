'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  children?: React.ReactNode;
}

export default function VideoBackground({
  src,
  poster,
  className = '',
  onLoad,
  onError,
  children
}: VideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const enableVideo = process.env.NEXT_PUBLIC_ENABLE_VIDEO === 'true';

  useEffect(() => {
    if (!enableVideo) return;

    const video = videoRef.current;
    if (!video) return;

    // Força o uso do arquivo local - sem cache
    const localVideoPath = `/videos/hero-car.mp4?v=${Date.now()}`;
    console.log('🎬 Carregando vídeo LOCAL:', localVideoPath);

    const handleCanPlay = () => {
      console.log('✅ Vídeo LOCAL carregado com sucesso');
      setVideoLoaded(true);
      setVideoError(false);
      onLoad?.();
      
      // Tentar reproduzir automaticamente
      video.play().then(() => {
        console.log('▶️ Vídeo LOCAL reproduzindo');
        setIsPlaying(true);
      }).catch((error) => {
        console.log('⚠️ Autoplay bloqueado:', error);
      });
    };

    const handleError = (e: any) => {
      console.error('❌ Erro no vídeo LOCAL:', e);
      console.error('❌ Tentando carregar:', video.currentSrc);
      setVideoError(true);
      setVideoLoaded(false);
      onError?.();
    };

    const handleLoadStart = () => {
      console.log('🔄 Iniciando carregamento do vídeo LOCAL...');
    };

    const handleLoadedData = () => {
      console.log('📊 Dados do vídeo LOCAL carregados');
    };

    const handlePlay = () => {
      console.log('▶️ Vídeo LOCAL reproduzindo');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('⏸️ Vídeo LOCAL pausado');
      setIsPlaying(false);
    };

    // Event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Forçar carregamento do arquivo local
    video.src = localVideoPath;
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [enableVideo, src, onLoad, onError]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Video Element - FORÇANDO ARQUIVO LOCAL */}
      {enableVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="auto"
          style={{ 
            display: 'block',
            opacity: videoLoaded && !videoError ? 1 : 0.3,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          {/* REMOVENDO sources para forçar uso do src direto */}
          Seu navegador não suporta vídeos HTML5.
        </video>
      )}

      {/* Fallback Background - sempre presente */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${poster || '/images/BMW-X6-M.jpg'}')`,
          opacity: enableVideo ? (videoLoaded && !videoError ? 0 : 1) : 1,
          transition: 'opacity 1s ease-in-out'
        }}
      />

      {/* Loading Indicator */}

      {/* Error State */}

      {/* Success State */}
      {/* Overlays de status removidos para não exibir textos na UI */}

      {/* Video Controls */}
      {enableVideo && videoLoaded && !videoError && (
        <button
          onClick={togglePlayPause}
          className="absolute bottom-6 right-6 z-20 bg-black/50 backdrop-blur-sm border border-white/30 rounded-full p-3 text-white hover:bg-black/70 transition-all duration-300 shadow-lg"
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}

      {/* Debug overlay removido para evitar textos na tela */}

      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
}
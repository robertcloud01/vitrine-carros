'use client';

import { useEffect, useState } from 'react';

export default function VideoDebug() {
  const [videoExists, setVideoExists] = useState<boolean | null>(null);
  const [imageExists, setImageExists] = useState<boolean | null>(null);

  useEffect(() => {
    // Testar se o vídeo existe
    const video = document.createElement('video');
    video.src = '/videos/hero-car.mp4';
    video.onloadeddata = () => setVideoExists(true);
    video.onerror = () => setVideoExists(false);

    // Testar se a imagem existe
    const img = new Image();
    img.src = '/images/BMW-X6-M.jpg';
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
  }, []);

  return (
    <div className="fixed top-20 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <div>
        Vídeo: {videoExists === null ? '⏳ Testando...' : videoExists ? '✅ OK' : '❌ Erro'}
      </div>
      <div>
        Imagem: {imageExists === null ? '⏳ Testando...' : imageExists ? '✅ OK' : '❌ Erro'}
      </div>
    </div>
  );
}
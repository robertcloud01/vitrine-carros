import { useState, useEffect } from 'react';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Em um projeto real, isso seria uma chamada API
    // Simulando carregamento de dados
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        // Simulando uma chamada de API
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: [
                {
                  id: 1,
                  name: 'Porsche 911 GT3 RS',
                  specs: '520 HP • 0-100 km/h: 3.2s',
                  price: 'R$ 1.350.000',
                  category: 'Esportivo',
                  image: '/assets/images/porsche-911-gt3-rs.webp',
                  video: '/assets/videos/porsche-911-gt3rs-video.mp4'
                },
                {
                  id: 2,
                  name: 'BMW M3 Competition',
                  specs: '510 HP • 0-100 km/h: 3.9s',
                  price: 'R$ 750.000',
                  category: 'Esportivo',
                  image: '/assets/images/Bmw M3 Competition2024.webp',
                  video: '/assets/videos/bmw-m3-competition-video.mp4'
                },
                {
                  id: 3,
                  name: 'Lamborghini Huracán',
                  specs: '640 HP • 0-100 km/h: 2.9s',
                  price: 'R$ 3.200.000',
                  category: 'Exclusivo',
                  image: '/assets/images/Lamborghini-Huracán.webp',
                  video: '/assets/videos/lamborghini-huracan-video.mp4'
                },
                {
                  id: 4,
                  name: 'Ferrari F8',
                  specs: '720 HP • 0-100 km/h: 2.9s',
                  price: 'R$ 3.950.000',
                  category: 'Exclusivo',
                  image: '/assets/images/Ferrari-F8.webp',
                  video: '/assets/videos/ferrari-f8-video.mp4'
                },
                {
                  id: 5,
                  name: 'Audi RS7',
                  specs: '600 HP • 0-100 km/h: 3.6s',
                  price: 'R$ 950.000',
                  category: 'Esportivo',
                  image: '/assets/images/audi RS 7 sportback.webp',
                  video: '/assets/videos/audi-rs7-video.mp4'
                },
                {
                  id: 6,
                  name: 'Volvo XC90',
                  specs: '400 HP • 0-100 km/h: 5.6s',
                  price: 'R$ 580.000',
                  category: 'SUV',
                  image: '/assets/images/volvo XC90.webp',
                  video: '/assets/videos/volvo-xc90-video.mp4'
                },
                {
                  id: 7,
                  name: 'Ford Mustang',
                  specs: '460 HP • 0-100 km/h: 4.3s',
                  price: 'R$ 499.000',
                  category: 'Esportivo',
                  image: '/assets/images/Mustang.webp',
                  video: '/assets/videos/ford-mustang-video.mp4'
                },
                {
                  id: 8,
                  name: 'Chevrolet Camaro',
                  specs: '455 HP • 0-100 km/h: 4.0s',
                  price: 'R$ 550.000',
                  category: 'Esportivo',
                  image: '/assets/images/camaro.webp',
                  video: '/assets/videos/chevrolet-camaro-video.mp4'
                },
                {
                  id: 9,
                  name: 'Volkswagen Golf GTI',
                  specs: '245 HP • 0-100 km/h: 6.2s',
                  price: 'R$ 280.000',
                  category: 'Hatchback',
                  image: '/assets/images/volkswagen-golf-gti-mk8-5-2025.webp',
                  video: '/assets/videos/volkswagen-golf-gti-video.mp4'
                },
                {
                  id: 10,
                  name: 'RAM 1500',
                  specs: '395 HP • 0-100 km/h: 6.5s',
                  price: 'R$ 480.000',
                  category: 'Pickup',
                  image: '/assets/images/2025-ram-1500.webp',
                  video: null
                }
              ]
            });
          }, 800);
        });
        
        setVehicles(response.data);
      } catch (err) {
        setError('Falha ao carregar os veículos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicles();
  }, []);
  
  return { vehicles, loading, error };
};
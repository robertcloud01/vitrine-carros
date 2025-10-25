'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { 
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CogIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Gauge } from 'lucide-react';
import Link from 'next/link';
import { Vehicle } from '@/types';
import { VehicleWithDetails } from '@/types/database';
import { useVehicle } from '@/hooks/useVehicles';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

// Mock data - em produção viria de uma API
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'BMW',
    model: 'X6 M',
    version: 'Competition',
    year: 2023,
    price: 850000,
    mileage: 15000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Único Dono', 'Revisado'],
    images: [
      '/images/bmw x6m/BMW-X6_M_Competition-2024-1280-31758e643b384bd05d155d4a53f0617d50.jpg',
      '/images/bmw x6m/BMW-X6_M_Competition-2024-1280-704060ad0a4cd74c0896fac3f78320357f.jpg',
      '/images/bmw x6m/BMW-X6_M_Competition-2024-1280-913b540afeaf099be42ba8df4503359bfb.jpg',
      '/images/bmw x6m/BMW-X6_M_Competition-2024-1280-fe71e150036a41c9301124e201edeb6d73.jpg'
    ],
    videoUrl: '/videos/bmw-x6-m-video.mp4',
    description: 'BMW X6 M Competition em estado impecável. Este SUV esportivo combina o luxo característico da BMW com a performance de um verdadeiro carro esportivo. Motor V8 biturbo de 625 cv, aceleração de 0-100 km/h em apenas 3,8 segundos.',
    features: [
      'Teto Solar Panorâmico',
      'Bancos de Couro Merino',
      'Sistema de Som Harman Kardon',
      'Suspensão Adaptativa',
      'Freios M Sport',
      'Rodas 21 polegadas',
      'Head-up Display',
      'Assistente de Estacionamento',
      'Controle de Cruzeiro Adaptativo',
      'Sistema de Navegação Professional'
    ],
    bodyType: 'SUV Coupé',
    doors: 4,
    seats: 5,
    color: {
      exterior: 'Preto Carbono Metálico',
      interior: 'Couro Preto/Vermelho'
    },
    engine: {
      type: 'V8 Biturbo',
      displacement: 4.4,
      power: 625,
      torque: 750,
      fuelSystem: 'Injeção direta'
    },
    performance: {
      acceleration: '0-100 km/h em 3,8s',
      topSpeed: 290,
      fuelConsumption: {
        city: 6.8,
        highway: 9.2,
        combined: 7.8
      }
    },
    dimensions: {
      length: 4935,
      width: 2218,
      height: 1696,
      wheelbase: 2975,
      weight: 2245,
      trunkCapacity: 580
    },
    technical: {
      drivetrain: 'AWD xDrive',
      suspension: 'Suspensão adaptativa M',
      brakes: 'Freios M Sport com discos perfurados',
      wheels: 'Rodas M de 21 polegadas',
      tires: '295/35 R21 (traseira) / 275/40 R21 (dianteira)'
    },
    safety: [
      'Airbags frontais, laterais e de cortina',
      'Controle de estabilidade DSC',
      'Assistente de frenagem de emergência',
      'Alerta de colisão frontal',
      'Assistente de permanência em faixa',
      'Monitoramento de ponto cego',
      'Câmera 360°',
      'Sensores de estacionamento'
    ],
    comfort: [
      'Ar-condicionado automático de 4 zonas',
      'Bancos elétricos com memória',
      'Aquecimento e ventilação dos bancos',
      'Volante aquecido',
      'Teto solar panorâmico',
      'Iluminação ambiente LED',
      'Carregador wireless',
      'Porta-copos refrigerado'
    ],
    technology: [
      'iDrive 8.0 com tela de 12,3"',
      'BMW Live Cockpit Professional',
      'Head-up Display',
      'Sistema de som Harman Kardon',
      'Conectividade BMW ConnectedDrive',
      'Apple CarPlay / Android Auto',
      'Assistente pessoal BMW',
      'Atualizações over-the-air'
    ],
    owners: 1,
    accidents: false,
    maintenance: {
      lastService: '2024-01-15',
      nextService: '2024-07-15',
      serviceHistory: true
    },
    documentation: {
      ipva: true,
      licensing: true,
      inspection: true
    }
  },
  {
    id: '2',
    brand: 'Mercedes',
    model: 'AMG GT',
    version: '63 S',
    year: 2022,
    price: 1200000,
    mileage: 8500,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Rio de Janeiro, RJ',
    highlights: ['Baixa Quilometragem', 'Garantia Estendida'],
    images: ['/images/Mercedes-AMG-GT.jpg'],
    videoUrl: '/videos/mercedes-amg-gt-video.mp4',
    description: 'Mercedes AMG GT 63 S com performance excepcional. Este grand tourer de quatro portas oferece o melhor da engenharia alemã com motor V8 biturbo de 630 cv e tecnologia de ponta.',
    features: [
      'Performance Package',
      'Interior AMG Performance',
      'Suspensão Adaptativa AMG',
      'Escape AMG Performance',
      'Bancos AMG Performance',
      'Volante AMG Performance',
      'Sistema MBUX',
      'Teto Solar Panorâmico'
    ],
    bodyType: 'Gran Coupé',
    doors: 4,
    seats: 4,
    color: {
      exterior: 'Preto Obsidiana Metálico',
      interior: 'Couro Nappa Preto/Vermelho'
    },
    engine: {
      type: 'V8 Biturbo',
      displacement: 4.0,
      power: 630,
      torque: 900,
      fuelSystem: 'Injeção direta com turbo'
    },
    performance: {
      acceleration: '0-100 km/h em 3,2s',
      topSpeed: 315,
      fuelConsumption: {
        city: 7.2,
        highway: 10.1,
        combined: 8.4
      }
    },
    dimensions: {
      length: 5015,
      width: 1955,
      height: 1395,
      wheelbase: 2939,
      weight: 2045,
      trunkCapacity: 395
    },
    technical: {
      drivetrain: 'AWD 4MATIC+',
      suspension: 'Suspensão pneumática AMG',
      brakes: 'Freios AMG com discos cerâmicos',
      wheels: 'Rodas AMG de 20 polegadas',
      tires: '265/35 R20 (dianteira) / 295/30 R20 (traseira)'
    },
    safety: [
      'Sistema PRE-SAFE',
      'Assistente de frenagem ativo',
      'Alerta de colisão com pedestres',
      'Assistente de permanência em faixa',
      'Monitoramento de ponto cego',
      'Airbags adaptativos',
      'Controle eletrônico de estabilidade',
      'Sistema de proteção contra capotamento'
    ],
    comfort: [
      'Climatização automática de 3 zonas',
      'Bancos com aquecimento e ventilação',
      'Massagem nos bancos',
      'Volante aquecido',
      'Iluminação ambiente de 64 cores',
      'Carregamento por indução',
      'Refrigerador para bebidas',
      'Cortinas elétricas'
    ],
    technology: [
      'MBUX com tela de 12,3"',
      'Cockpit digital de 12,3"',
      'Sistema de som Burmester 3D',
      'Navegação com realidade aumentada',
      'Mercedes me connect',
      'Apple CarPlay / Android Auto',
      'Assistente de voz "Hey Mercedes"',
      'Atualizações over-the-air'
    ],
    owners: 1,
    accidents: false,
    maintenance: {
      lastService: '2024-02-10',
      nextService: '2024-08-10',
      serviceHistory: true
    },
    documentation: {
      ipva: true,
      licensing: true,
      inspection: true
    }
  },
  {
    id: '3',
    brand: 'Audi',
    model: 'RS6',
    version: 'Avant',
    year: 2023,
    price: 750000,
    mileage: 12000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Brasília, DF',
    highlights: ['Único Dono', 'Revisado'],
    images: [
      '/images/Audi-RS6.jpg',
      '/images/Audi RS6/13-12-798x466.jpg',
      '/images/Audi RS6/2-13-798x466.jpg',
      '/images/Audi RS6/3-11-798x466.jpg',
      '/images/Audi RS6/35-798x466.jpg'
    ],
    videoUrl: '/videos/audi-rs7-video.mp4',
    description: 'Audi RS6 Avant - perfeita combinação de performance e praticidade. Esta station wagon esportiva oferece 600 cv de potência com a versatilidade de um veículo familiar.',
    features: [
      'Quattro AWD',
      'Virtual Cockpit Plus',
      'Bang & Olufsen 3D',
      'Suspensão a ar adaptativa',
      'Escape RS esportivo',
      'Bancos RS Sport',
      'Matrix LED',
      'Teto solar panorâmico'
    ],
    bodyType: 'Station Wagon',
    doors: 5,
    seats: 5,
    color: {
      exterior: 'Azul Nogaro Pérola',
      interior: 'Couro Valcona Preto'
    },
    engine: {
      type: 'V8 Biturbo TFSI',
      displacement: 4.0,
      power: 600,
      torque: 800,
      fuelSystem: 'Injeção direta FSI'
    },
    performance: {
      acceleration: '0-100 km/h em 3,6s',
      topSpeed: 280,
      fuelConsumption: {
        city: 7.5,
        highway: 10.2,
        combined: 8.6
      }
    },
    dimensions: {
      length: 4995,
      width: 1950,
      height: 1460,
      wheelbase: 2928,
      weight: 2075,
      trunkCapacity: 565
    },
    technical: {
      drivetrain: 'AWD Quattro',
      suspension: 'Suspensão a ar adaptativa',
      brakes: 'Freios RS com discos ventilados',
      wheels: 'Rodas RS de 21 polegadas',
      tires: '275/30 R21'
    },
    safety: [
      'Audi pre sense city',
      'Assistente de frenagem de emergência',
      'Alerta de saída de faixa',
      'Assistente de mudança de faixa',
      'Monitoramento de ponto cego',
      'Airbags frontais e laterais',
      'Controle eletrônico de estabilidade',
      'Sistema de proteção de pedestres'
    ],
    comfort: [
      'Climatização automática de 4 zonas',
      'Bancos esportivos com aquecimento',
      'Ventilação dos bancos',
      'Volante multifuncional aquecido',
      'Iluminação ambiente',
      'Carregamento wireless',
      'Porta-copos aquecidos/refrigerados',
      'Controle de cruzeiro adaptativo'
    ],
    technology: [
      'MMI Navigation plus',
      'Virtual Cockpit Plus 12,3"',
      'Sistema de som Bang & Olufsen',
      'Audi connect',
      'Apple CarPlay / Android Auto',
      'Assistente de voz Audi',
      'Head-up Display',
      'Câmeras 360°'
    ],
    owners: 1,
    accidents: false,
    maintenance: {
      lastService: '2024-01-20',
      nextService: '2024-07-20',
      serviceHistory: true
    },
    documentation: {
      ipva: true,
      licensing: true,
      inspection: true
    }
  },
  {
    id: '4',
    brand: 'Porsche',
    model: '911',
    version: 'Turbo S',
    year: 2024,
    price: 1800000,
    mileage: 2500,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Zero KM', 'Garantia de Fábrica'],
    images: [
      '/images/Porsche-911-GT3.webp',
      '/images/porsche-911-gt3-rs.webp',
      '/images/Porsche 911 Carrera Cabriolet (2025)/Porsche-911_Carrera_Cabriolet-2025-1280-4ab1701f7154dadcbb2ecacff3b5faa1e8.jpg',
      '/images/Porsche 911 Carrera Cabriolet (2025)/Porsche-911_Carrera_Cabriolet-2025-1280-4dbd497e791c8433dc5745d7d4a3cb6756.jpg'
    ],
    videoUrl: '/videos/porsche-911-gt3rs-video.mp4',
    description: 'Porsche 911 Turbo S 2024 - o ápice da engenharia alemã. Este ícone esportivo oferece 650 cv de potência pura com a tradição e inovação que só a Porsche pode entregar.',
    features: [
      'PDK de 8 velocidades',
      'Sport Chrono Package',
      'PASM Adaptativo',
      'Escape esportivo',
      'Bancos esportivos adaptativos',
      'Volante GT multifuncional',
      'Sistema PCM',
      'Teto solar elétrico'
    ],
    bodyType: 'Coupé Esportivo',
    doors: 2,
    seats: 4,
    color: {
      exterior: 'Branco Carrara Metálico',
      interior: 'Couro Preto/Vermelho'
    },
    engine: {
      type: 'Boxer 6 Biturbo',
      displacement: 3.8,
      power: 650,
      torque: 800,
      fuelSystem: 'Injeção direta DFI'
    },
    performance: {
      acceleration: '0-100 km/h em 2,7s',
      topSpeed: 330,
      fuelConsumption: {
        city: 8.1,
        highway: 11.2,
        combined: 9.4
      }
    },
    dimensions: {
      length: 4519,
      width: 1900,
      height: 1303,
      wheelbase: 2450,
      weight: 1640,
      trunkCapacity: 132
    },
    technical: {
      drivetrain: 'AWD Tração Integral',
      suspension: 'PASM Adaptativo',
      brakes: 'PCCB Freios cerâmicos',
      wheels: 'Rodas Turbo de 20/21 polegadas',
      tires: '255/35 R20 (dianteira) / 315/30 R21 (traseira)'
    },
    safety: [
      'Airbags frontais e laterais',
      'Controle de estabilidade PSM',
      'Sistema de frenagem ABS',
      'Controle de tração ASR',
      'Assistente de partida em rampa',
      'Monitoramento de pressão dos pneus',
      'Estrutura de segurança reforçada',
      'Cintos de segurança adaptativos'
    ],
    comfort: [
      'Climatização automática de 2 zonas',
      'Bancos esportivos com aquecimento',
      'Ventilação dos bancos',
      'Volante aquecido',
      'Iluminação ambiente LED',
      'Sistema de som BOSE',
      'Controle de cruzeiro adaptativo',
      'Memória dos bancos'
    ],
    technology: [
      'PCM com tela de 10,9"',
      'Porsche Connect',
      'Apple CarPlay',
      'Sistema de navegação',
      'Assistente de voz',
      'Câmera de ré',
      'Sensores de estacionamento',
      'Cronômetro integrado'
    ],
    owners: 0,
    accidents: false,
    maintenance: {
      lastService: '2024-03-01',
      nextService: '2025-03-01',
      serviceHistory: true
    },
    documentation: {
      ipva: true,
      licensing: true,
      inspection: true
    }
  },
  {
    id: '5',
    brand: 'Tesla',
    model: 'Model S',
    version: 'Plaid',
    year: 2023,
    price: 650000,
    mileage: 18000,
    fuel: 'electric',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Autopilot', 'Carregamento Rápido'],
    images: [
      '/images/tesla/Tesla-Model_S-2021-1280-3ec3f3ac834c1ca44276d2475004d50a99.jpg',
      '/images/tesla/Tesla-Model_S-2021-1280-5e7e3f6717db8b29b30c16cdd19d2b5391.jpg',
      '/images/tesla/Tesla-Model_S-2021-1280-842f771a20e406344f231e7cd1a00aed0b.jpg',
      '/images/tesla/Tesla-Model_S-2021-1280-912b2c641e00ee771695eada0073a9416b.jpg'
    ],
    videoUrl: '/videos/tesla-model-s-video.mp4',
    description: 'Tesla Model S Plaid - futuro da mobilidade elétrica. Com três motores elétricos e mais de 1000 cv, este sedan redefine o conceito de performance sustentável.',
    features: [
      'Autopilot Avançado',
      'Supercharging V3',
      'Over-the-air Updates',
      'Tela touchscreen de 17"',
      'Sistema de som premium',
      'Vidros laminados',
      'Teto de vidro panorâmico',
      'Carregamento sem fio'
    ],
    bodyType: 'Sedan Elétrico',
    doors: 4,
    seats: 5,
    color: {
      exterior: 'Branco Pérola Multi-Coat',
      interior: 'Interior Preto Premium'
    },
    engine: {
      type: 'Tri-Motor Elétrico',
      displacement: 0,
      power: 1020,
      torque: 1420,
      fuelSystem: 'Bateria de íons de lítio'
    },
    performance: {
      acceleration: '0-100 km/h em 2,1s',
      topSpeed: 322,
      fuelConsumption: {
        city: 0,
        highway: 0,
        combined: 18.1 // kWh/100km
      }
    },
    dimensions: {
      length: 5021,
      width: 1987,
      height: 1431,
      wheelbase: 2960,
      weight: 2162,
      trunkCapacity: 804
    },
    technical: {
      drivetrain: 'AWD Tri-Motor',
      suspension: 'Suspensão a ar adaptativa',
      brakes: 'Freios regenerativos + Brembo',
      wheels: 'Rodas Arachnid de 21 polegadas',
      tires: '265/35 R21'
    },
    safety: [
      'Autopilot com 8 câmeras',
      'Frenagem automática de emergência',
      'Alerta de colisão frontal',
      'Assistente de permanência em faixa',
      'Monitoramento de ponto cego',
      'Airbags frontais e laterais',
      '5 estrelas no NHTSA',
      'Proteção contra capotamento'
    ],
    comfort: [
      'Climatização automática tri-zona',
      'Bancos aquecidos e ventilados',
      'Volante aquecido',
      'Iluminação ambiente LED',
      'Filtro HEPA',
      'Modo Biodefesa',
      'Controle de cruzeiro adaptativo',
      'Memória dos bancos'
    ],
    technology: [
      'Tela touchscreen de 17"',
      'Painel de instrumentos de 12,3"',
      'Sistema de entretenimento Tesla',
      'Netflix, YouTube, Spotify',
      'Jogos integrados',
      'Navegação com Superchargers',
      'Atualizações over-the-air',
      'Conectividade LTE'
    ],
    owners: 1,
    accidents: false,
    maintenance: {
      lastService: '2024-01-10',
      nextService: '2025-01-10',
      serviceHistory: true
    },
    documentation: {
      ipva: true,
      licensing: true,
      inspection: true
    }
  },
  {
    id: '6',
    brand: 'Lexus',
    model: 'LC',
    version: '500h',
    year: 2022,
    price: 580000,
    mileage: 22000,
    fuel: 'hybrid',
    transmission: 'automatic',
    location: 'Curitiba, PR',
    highlights: ['Híbrido', 'Baixo Consumo'],
    images: [
      '/images/lexus/Lexus-LS-2021-1280-055472518cc17749486db52440956d677c.jpg',
      '/images/lexus/Lexus-LS-2021-1280-14d15c2e9cf4322f6d5f9a5d6117bfb1b9.jpg',
      '/images/lexus/Lexus-LS-2021-1280-20446ffd73f116a1537df48211b41b456a.jpg',
      '/images/lexus/Lexus-LS-2021-1280-2694174eafced40785170b4841c568f1e6.jpg'
    ],
    videoUrl: '/videos/ferrari-f8-video.mp4',
    description: 'Lexus LC 500h - luxo e eficiência em perfeita harmonia. Este grand tourer híbrido combina um motor V6 com sistema elétrico para entregar performance e economia.',
    features: [
      'Hybrid System+',
      'Mark Levinson Audio',
      'Safety System+ 2.0',
      'Suspensão adaptativa',
      'Bancos semi-anilina',
      'Teto de fibra de carbono',
      'Sistema multimídia',
      'Iluminação LED adaptativa'
    ],
    bodyType: 'Gran Turismo',
    doors: 2,
    seats: 4,
    color: {
      exterior: 'Azul Structural Blue',
      interior: 'Couro Semi-Anilina Bege'
    },
    engine: {
      type: 'V6 Híbrido',
      displacement: 3.5,
      power: 359,
      torque: 348,
      fuelSystem: 'Híbrido com motor elétrico'
    },
    performance: {
      acceleration: '0-100 km/h em 5,0s',
      topSpeed: 250,
      fuelConsumption: {
        city: 12.5,
        highway: 14.2,
        combined: 13.1
      }
    },
    dimensions: {
      length: 4770,
      width: 1920,
      height: 1345,
      wheelbase: 2870,
      weight: 1935,
      trunkCapacity: 197
    },
    technical: {
      drivetrain: 'RWD Tração Traseira',
      suspension: 'Suspensão adaptativa variável',
      brakes: 'Freios Brembo ventilados',
      wheels: 'Rodas forjadas de 20 polegadas',
      tires: '245/40 R20 (dianteira) / 275/35 R20 (traseira)'
    },
    safety: [
      'Lexus Safety System+ 2.0',
      'Pré-colisão com detecção de pedestres',
      'Controle de cruzeiro radar dinâmico',
      'Assistente de permanência em faixa',
      'Alerta de mudança de faixa',
      'Farol alto automático',
      'Airbags de joelho',
      'Monitoramento de ponto cego'
    ],
    comfort: [
      'Climatização automática dual-zone',
      'Bancos com aquecimento e ventilação',
      'Volante aquecido',
      'Iluminação ambiente de 14 cores',
      'Controle de cruzeiro adaptativo',
      'Memória dos bancos',
      'Espelhos externos aquecidos',
      'Vidros com proteção UV'
    ],
    technology: [
      'Sistema multimídia de 10,3"',
      'Mark Levinson com 13 alto-falantes',
      'Navegação com mapas 3D',
      'Lexus Enform',
      'Apple CarPlay / Android Auto',
      'Head-up Display',
      'Câmera de visão panorâmica',
      'Sensores de estacionamento'
    ],
    owners: 2,
    accidents: false,
    maintenance: {
      lastService: '2024-02-05',
      nextService: '2024-08-05',
      serviceHistory: true
    },
    documentation: {
      ipva: true,
      licensing: true,
      inspection: true
    }
  }
];

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicleId = params.id as string;
  const { data: apiVehicle, loading, error } = useVehicle(vehicleId);
  const [vehicle, setVehicle] = useState<(Vehicle | VehicleWithDetails) | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [derivedImages, setDerivedImages] = useState<string[]>([]);

  useEffect(() => {
    // Buscar dados da API com fallback para mockData em caso de falha
    if (apiVehicle) {
      setVehicle(apiVehicle as VehicleWithDetails);
      return;
    }
    if (!loading) {
      const foundVehicle = mockVehicles.find(v => v.id === vehicleId);
      setVehicle(foundVehicle || null);
    }
  }, [apiVehicle, loading, vehicleId]);

  useEffect(() => {
    // Carregar imagens automaticamente da pasta de public/images pelo nome do carro
    const loadImages = async () => {
      if (!vehicle) return;
      const baseName = `${vehicle.brand} ${vehicle.model}`.trim();
      const candidates = [
        baseName,
        vehicle.version ? `${baseName} ${vehicle.version}` : '',
        vehicle.year ? `${baseName} (${vehicle.year})` : ''
      ].filter(Boolean);
      for (const name of candidates) {
        try {
          const res = await fetch(`/api/images?name=${encodeURIComponent(name)}`);
          if (!res.ok) continue;
          const json = await res.json();
          const imgs: string[] = Array.isArray(json.images) ? json.images : [];
          if (imgs.length) {
            setDerivedImages(imgs);
            setCurrentImageIndex(0);
            return;
          }
        } catch (err) {
          // silencioso; cairá no próximo candidato
        }
      }
      // se nada encontrado, manter o que vier do vehicle.images
      setDerivedImages([]);
    }
    loadImages();
  }, [vehicle]);

  if (loading) {
    return (
      <main className="pt-20">
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold text-primary-white mb-4">
            Carregando veículo...
          </h1>
        </div>
      </main>
    );
  }

  if (error && !vehicle) {
    return (
      <main className="pt-20">
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold text-primary-white mb-4">
            Erro ao carregar veículo
          </h1>
          <p className="text-primary-gray mb-4">{error}</p>
          <Link href="/estoque" className="btn-primary">
            Voltar ao Estoque
          </Link>
        </div>
      </main>
    );
  }

  if (!vehicle) {
    return (
      <main className="pt-20">
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold text-primary-white mb-4">
            Veículo não encontrado
          </h1>
          <Link href="/estoque" className="btn-primary">
            Voltar ao Estoque
          </Link>
        </div>
      </main>
    );
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
        text: `Confira este ${vehicle.brand} ${vehicle.model} na VitrineLux`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  // WhatsApp removido desta página; use o botão flutuante global.
  const phoneUrl = 'tel:+5511999999999';

  // Type guard to narrow union Vehicle | VehicleWithDetails
  const isVehicle = (v: Vehicle | VehicleWithDetails): v is Vehicle => (
    'engine' in v || 'dimensions' in v || 'technical' in v || 'safety' in v || 'comfort' in v || 'technology' in v
  );
  return (
    <main className="pt-20">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-sm text-gray-400 mb-8"
        >
          <Link href="/estoque" className="hover:text-primary-gold transition-colors">
            Estoque
          </Link>
          <span>/</span>
          <span className="text-primary-white">
            {vehicle.brand} {vehicle.model}
          </span>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href="/estoque"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary-gold transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Voltar ao Estoque</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Main Image */}
            <div className="relative mb-4 rounded-lg overflow-hidden h-96 bg-black">
              {(() => {
                const imagesList = derivedImages.length > 0
                  ? derivedImages
                  : (Array.isArray((vehicle as any).images) ? (vehicle as any).images : []);
                const src = imagesList[currentImageIndex] || '/images/widescreen_holder.jpeg';
                return (
                  <img
                    src={src}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/widescreen_holder.jpeg'; }}
                  />
                );
              })()}
              
              {/* Image Overlay */}
              {Array.isArray(vehicle.highlights) && vehicle.highlights.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {vehicle.highlights
                    .filter((h: any) => typeof h === 'string')
                    .map((highlight, index) => (
                      <Badge key={index} variant="success" size="sm">
                        {highlight}
                      </Badge>
                    ))}
                </div>
              )}

              <div className="absolute top-4 right-4">
                <Badge variant="default" size="lg" className="bg-primary-gold text-primary-black font-bold">
                  {vehicle.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  })}
                </Badge>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {(() => {
                const imagesList = derivedImages.length > 0
                  ? derivedImages
                  : (Array.isArray((vehicle as any).images) ? (vehicle as any).images : []);
                const thumbs = imagesList.length > 0 ? imagesList.slice(0, 4) : ['/images/widescreen_holder.jpeg', '/images/widescreen_holder.jpeg', '/images/widescreen_holder.jpeg', '/images/widescreen_holder.jpeg'];
                return thumbs.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary-gold' : 'border-transparent hover:border-primary-gold'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-20 object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/widescreen_holder.jpeg'; }}
                    />
                  </button>
                ))
              })()}
            </div>
          </motion.div>

          {/* Vehicle Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary-white mb-2">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-xl text-primary-gold font-medium mb-4">
                {vehicle.year} • {vehicle.version}
              </p>
              
              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleFavorite}
                  className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  {isFavorited ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                  <span>Favoritar</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-gray-400 hover:text-primary-gold transition-colors"
                >
                  <ShareIcon className="h-6 w-6" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-6 w-6 text-primary-gold" />
                <div>
                  <div className="text-sm text-gray-400">Ano</div>
                  <div className="text-primary-white font-medium">{vehicle.year}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Gauge className="h-6 w-6 text-primary-gold" />
                <div>
                  <div className="text-sm text-gray-400">Quilometragem</div>
                  <div className="text-primary-white font-medium">
                    {vehicle.mileage.toLocaleString()} km
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <BoltIcon className="h-6 w-6 text-primary-gold" />
                <div>
                  <div className="text-sm text-gray-400">Combustível</div>
                  <div className="text-primary-white font-medium">
                    {vehicle.fuel === 'gasoline' ? 'Gasolina' :
                     vehicle.fuel === 'hybrid' ? 'Híbrido' :
                     vehicle.fuel === 'electric' ? 'Elétrico' : 'Diesel'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CogIcon className="h-6 w-6 text-primary-gold" />
                <div>
                  <div className="text-sm text-gray-400">Transmissão</div>
                  <div className="text-primary-white font-medium">
                    {vehicle.transmission === 'automatic' ? 'Automático' :
                     vehicle.transmission === 'manual' ? 'Manual' : 'CVT'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 col-span-2">
                <MapPinIcon className="h-6 w-6 text-primary-gold" />
                <div>
                  <div className="text-sm text-gray-400">Localização</div>
                  <div className="text-primary-white font-medium">{vehicle.location}</div>
                </div>
              </div>
            </div>

            {/* Engine & Performance */}
            {(() => {
              if (!('engine' in vehicle)) return null;
              const v = vehicle as Vehicle;
              if (!v.engine) return null;
              return (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-primary-white mb-4">
                    Motor e Performance
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Motor</div>
                      <div className="text-primary-white font-medium">{v.engine.type}</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Cilindrada</div>
                      <div className="text-primary-white font-medium">{v.engine.displacement}L</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Potência</div>
                      <div className="text-primary-white font-medium">{v.engine.power} cv</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Torque</div>
                      <div className="text-primary-white font-medium">{v.engine.torque} Nm</div>
                    </div>
                  </div>
                  {v.performance && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Aceleração</div>
                        <div className="text-primary-white font-medium">{v.performance.acceleration}</div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Velocidade Máxima</div>
                        <div className="text-primary-white font-medium">{v.performance.topSpeed} km/h</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
            {/* Dimensions */}
            {isVehicle(vehicle) && vehicle.dimensions && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-white mb-4">
                  Dimensões
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Comprimento</div>
                    <div className="text-primary-white font-medium">{vehicle.dimensions.length} mm</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Largura</div>
                    <div className="text-primary-white font-medium">{vehicle.dimensions.width} mm</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Altura</div>
                    <div className="text-primary-white font-medium">{vehicle.dimensions.height} mm</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Peso</div>
                    <div className="text-primary-white font-medium">{vehicle.dimensions.weight} kg</div>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {vehicle && 'technical' in vehicle && vehicle.technical && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-white mb-4">
                  Especificações Técnicas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Tração</span>
                    <span className="text-primary-white">{vehicle.technical.drivetrain}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Suspensão</span>
                    <span className="text-primary-white">{vehicle.technical.suspension}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Freios</span>
                    <span className="text-primary-white">{vehicle.technical.brakes}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Rodas</span>
                    <span className="text-primary-white">{vehicle.technical.wheels}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Pneus</span>
                    <span className="text-primary-white">{vehicle.technical.tires}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Vehicle Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-white mb-4">
                Informações do Veículo
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {isVehicle(vehicle) && vehicle.bodyType && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Tipo</div>
                    <div className="text-primary-white font-medium">{vehicle.bodyType}</div>
                  </div>
                )}
                {isVehicle(vehicle) && typeof vehicle.doors === 'number' && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Portas</div>
                    <div className="text-primary-white font-medium">{vehicle.doors}</div>
                  </div>
                )}
                {isVehicle(vehicle) && typeof vehicle.seats === 'number' && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Lugares</div>
                    <div className="text-primary-white font-medium">{vehicle.seats}</div>
                  </div>
                )}
                {isVehicle(vehicle) && vehicle.color && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Cor Externa</div>
                    <div className="text-primary-white font-medium">
                      {typeof vehicle.color === 'string' ? vehicle.color : vehicle.color.exterior}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-white mb-4">
                Descrição
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            {/* Safety Features */}
            {isVehicle(vehicle) && vehicle.safety && vehicle.safety.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-white mb-4">
                  Segurança
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.safety.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comfort Features */}
            {isVehicle(vehicle) && vehicle.comfort && vehicle.comfort.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-white mb-4">
                  Conforto
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.comfort.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Features */}
            {isVehicle(vehicle) && vehicle.technology && vehicle.technology.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-white mb-4">
                  Tecnologia
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.technology.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-white mb-4">
                Equipamentos Adicionais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
                    <span className="text-gray-400">
                      {typeof feature === 'string' ? feature : feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle History */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-white mb-4">
                Histórico do Veículo
              </h3>
              <div className="space-y-3">
                {isVehicle(vehicle) && vehicle.owners && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Proprietários</span>
                    <span className="text-primary-white">{vehicle.owners}</span>
                  </div>
                )}
                {isVehicle(vehicle) && vehicle.accidents !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Acidentes</span>
                    <span className={vehicle.accidents ? "text-red-400" : "text-green-400"}>
                      {vehicle.accidents ? "Sim" : "Não"}
                    </span>
                  </div>
                )}
                {isVehicle(vehicle) && vehicle.maintenance?.serviceHistory !== undefined && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Histórico de Revisões</span>
                    <span className={vehicle.maintenance.serviceHistory ? "text-green-400" : "text-red-400"}>
                      {vehicle.maintenance.serviceHistory ? "Completo" : "Incompleto"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Documentation */}
            {isVehicle(vehicle) && vehicle.documentation && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-white mb-4">
                  Documentação
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-400 mb-2">IPVA</div>
                    <div className={`font-medium ${vehicle.documentation.ipva ? 'text-green-400' : 'text-red-400'}`}>
                      {vehicle.documentation.ipva ? 'Em dia' : 'Pendente'}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-400 mb-2">Licenciamento</div>
                    <div className={`font-medium ${vehicle.documentation.licensing ? 'text-green-400' : 'text-red-400'}`}>
                      {vehicle.documentation.licensing ? 'Em dia' : 'Pendente'}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-400 mb-2">Vistoria</div>
                    <div className={`font-medium ${vehicle.documentation.inspection ? 'text-green-400' : 'text-red-400'}`}>
                      {vehicle.documentation.inspection ? 'Em dia' : 'Pendente'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Actions */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={phoneUrl}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span>Ligar</span>
                </a>
                <Button variant="outline">
                  Agendar Test Drive
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Vehicles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-primary-white mb-8">
            Veículos Relacionados
          </h2>
          <div className="text-center py-8 text-gray-400">
            <p>Outros veículos similares em breve...</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
import { Vehicle } from '@/types';

// Lista de nomes a serem excluídos do estoque (comparação exata após normalização de espaços)
const bannedNamesExact = new Set<string>([
  'Lamborghini Huracán Tecnica 60 Years',
  'Porsche 911 Turbo S',
  'Mercedes AMG GT',
  'Lexus LC',
  'Ford Mustang Shelby GT500',
]);

const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
const vehicleName = (v: Vehicle) => normalize(`${v.brand} ${v.model}`);
const vehicleNameWithVersion = (v: Vehicle) => normalize(v.version ? `${v.brand} ${v.model} ${v.version}` : `${v.brand} ${v.model}`);
const isBanned = (v: Vehicle) => bannedNamesExact.has(vehicleName(v)) || bannedNamesExact.has(vehicleNameWithVersion(v));

export const mockVehicles: Vehicle[] = [
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
      '/images/BMW-X6-M.jpg',
      '/images/BMW-X6-M.jpg'
    ],
    description: 'BMW X6 M Competition em estado impecável. Veículo com histórico completo de revisões e único dono.',
    features: ['Teto Solar', 'Bancos de Couro', 'Sistema de Som Premium', 'Câmera 360°', 'Piloto Automático'],
    gifUrl: 'https://media.giphy.com/media/3o6Zt8MgUuvSbkZYWc/giphy.gif',
    videoUrl: '/videos/bmw-x6-competition-video.mp4',
    featured: false
  },
  // Novos carros com mídia da pasta public
  {
    id: '7',
    brand: 'Porsche',
    model: '911 GT3 RS',
    version: 'Weissach Package',
    year: 2024,
    price: 1350000,
    mileage: 8000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Esportivo'],
    images: [
      '/images/porsche-911-gt3-rs.webp',
      '/images/Porsche-911-GT3.webp'
    ],
    description: 'Porsche 911 GT3 RS com pacote Weissach e visual impressionante.',
    features: ['Pacote Weissach', 'Aerodinâmica ativa', 'Freios cerâmicos'],
    videoUrl: '/videos/porsche-911-gt3rs-video.mp4',
    featured: true
  },
  {
    id: '8',
    brand: 'BMW',
    model: 'M3',
    version: 'Competition 2024',
    year: 2024,
    price: 750000,
    mileage: 5000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Esportivo'],
    images: [
      '/images/Bmw M3 Competition2024.webp'
    ],
    description: 'BMW M3 Competition 2024 com performance de ponta.',
    features: ['Pacote M', 'Suspensão adaptativa', 'Escape esportivo'],
    videoUrl: '/videos/bmw-m3-competition-video.mp4',
    featured: true
  },
  {
    id: '9',
    brand: 'Audi',
    model: 'RS7',
    version: 'Sportback',
    year: 2024,
    price: 950000,
    mileage: 7000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Esportivo'],
    images: [
      '/images/audi RS 7 sportback.webp'
    ],
    description: 'Audi RS7 Sportback com visual agressivo e tecnologia avançada.',
    features: ['Quattro', 'Interior esportivo', 'Assistentes de condução'],
    videoUrl: '/videos/audi-rs7-video.mp4',
    featured: true
  },
  {
    id: '10',
    brand: 'Chevrolet',
    model: 'Camaro',
    version: 'SS',
    year: 2021,
    price: 420000,
    mileage: 22000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Rio de Janeiro, RJ',
    highlights: ['Esportivo'],
    images: [
      '/images/camaro.webp'
    ],
    description: 'Chevrolet Camaro SS musculoso e marcante.',
    features: ['Controle de lançamento', 'Bancos esportivos'],
    videoUrl: '/videos/chevrolet-camaro-video.mp4'
  },
  {
    id: '11',
    brand: 'Ferrari',
    model: 'F8',
    version: 'Tributo',
    year: 2022,
    price: 1750000,
    mileage: 9000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Exclusivo'],
    images: [
      '/images/Ferrari-F8.webp'
    ],
    description: 'Ferrari F8 Tributo com motor V8 e design icônico.',
    features: ['Modo Race', 'Freios cerâmicos'],
    videoUrl: '/videos/ferrari-f8-video.mp4',
    featured: true
  },
  {
    id: '12',
    brand: 'Ford',
    model: 'Mustang',
    version: 'GT',
    year: 2020,
    price: 360000,
    mileage: 30000,
    fuel: 'gasoline',
    transmission: 'manual',
    location: 'Curitiba, PR',
    highlights: ['Esportivo'],
    images: [
      '/images/Mustang.webp'
    ],
    description: 'Ford Mustang GT clássico com visual marcante.',
    features: ['Pacote Performance', 'Escape esportivo'],
    videoUrl: '/videos/ford-mustang-video.mp4'
  },
  {
    id: '13',
    brand: 'Lamborghini',
    model: 'Huracán',
    version: 'EVO',
    year: 2021,
    price: 2200000,
    mileage: 15000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Florianópolis, SC',
    highlights: ['Exclusivo'],
    images: [
      '/images/Lamborghini-Huracán.webp'
    ],
    description: 'Lamborghini Huracán EVO com presença inconfundível.',
    features: ['Aerodinâmica avançada', 'Modo Corsa'],
    videoUrl: '/videos/lamborghini-huracan-video.mp4',
    featured: true
  },
  {
    id: '14',
    brand: 'Volkswagen',
    model: 'Golf GTI',
    version: 'MK8.5 2025',
    year: 2025,
    price: 250000,
    mileage: 1000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Porto Alegre, RS',
    highlights: ['Novo'],
    images: [
      '/images/volkswagen-golf-gti-mk8-5-2025.webp'
    ],
    description: 'Volkswagen Golf GTI MK8.5 2025 recém-lançado.',
    features: ['Pacote GTI', 'Tela multimídia'],
    videoUrl: '/videos/volkswagen-golf-gti-video.mp4',
    featured: false
  },
  {
    id: '15',
    brand: 'Volvo',
    model: 'XC90',
    version: 'Recharge',
    year: 2023,
    price: 480000,
    mileage: 12000,
    fuel: 'hybrid',
    transmission: 'automatic',
    location: 'Curitiba, PR',
    highlights: ['Híbrido'],
    images: [
      '/images/volvo XC90.webp'
    ],
    description: 'Volvo XC90 Recharge com segurança e tecnologia de ponta.',
    features: ['Pilot Assist', 'Sistema de som premium'],
    videoUrl: '/videos/volvo-xc90-video.mp4'
  },
  {
    id: '16',
    brand: 'Ram',
    model: '1500',
    version: '2025',
    year: 2025,
    price: 390000,
    mileage: 500,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Novo'],
    images: [
      '/images/2025-ram-1500.webp'
    ],
    description: 'Ram 1500 2025 robusta e confortável.',
    features: ['Pacote Off-road', 'Interior luxuoso'],
    videoUrl: '/videos/ram-1500-video.mp4'
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
    images: [
      '/images/Mercedes-AMG-GT.jpg',
      '/images/Mercedes-AMG-GT.jpg'
    ],
    description: 'Mercedes AMG GT 63 S com performance excepcional. Garantia estendida até 2025.',
    features: ['Performance Package', 'Interior AMG', 'Suspensão Adaptativa', 'Escape Esportivo', 'Freios Cerâmicos'],
    videoUrl: '/videos/mercedes-amg-gt-video.mp4'
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
      '/images/Audi-RS6.jpg'
    ],
    description: 'Audi RS6 Avant - perfeita combinação de performance e praticidade.',
    features: ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen', 'Matrix LED', 'Assistente de Estacionamento'],
    videoUrl: '/videos/audi-rs6-avant-video.mp4'
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
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
    ],
    description: 'Porsche 911 Turbo S 2024 - o ápice da engenharia alemã.',
    features: ['PDK', 'Sport Chrono', 'PASM', 'Ceramic Brakes', 'Sport Exhaust']
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
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
    ],
    description: 'Tesla Model S Plaid - futuro da mobilidade elétrica.',
    features: ['Autopilot', 'Supercharging', 'Over-the-air Updates', 'Glass Roof', 'Premium Audio'],
    videoUrl: '/videos/tesla-model-s-video.mp4'
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
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
    ],
    description: 'Lexus LC 500h - luxo e eficiência em perfeita harmonia.',
    features: ['Hybrid System', 'Mark Levinson', 'Safety System+', 'Adaptive Cruise', 'Lane Keep Assist']
  },
  {
    id: '18',
    brand: 'Porsche',
    model: '911 Carrera Cabriolet',
    version: '2025',
    year: 2025,
    price: 1200000,
    mileage: 2000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Conversível', 'Zero KM'],
    images: [
      '/images/Porsche 911 Carrera Cabriolet (2025)/Porsche-911_Carrera_Cabriolet-2025-destaque.jpg',
      '/images/Porsche 911 Carrera Cabriolet (2025)/Porsche-911_Carrera_Cabriolet-2025-1280-4dbd497e791c8433dc5745d7d4a3cb6756.jpg'
    ],
    description: 'Porsche 911 Carrera Cabriolet 2025 com visual impecável e performance refinada.',
    features: ['Conversível', 'Pacote Sport', 'Infotenimento atualizado'],
    videoUrl: '/videos/carrera-cabriolet-video.mp4',
    featured: true
  },
  {
    id: '19',
    brand: 'Porsche',
    model: 'Panamera 4S E-Hybrid Sport Turismo',
    version: '2021',
    year: 2021,
    price: 650000,
    mileage: 18000,
    fuel: 'hybrid',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Híbrido', 'Tecnologia Avançada'],
    images: [
      '/images/Porsche Panamera 4S E-Hybrid Sport Turismo (2021)/panamera-destaque.webp',
      '/images/Porsche Panamera 4S E-Hybrid Sport Turismo (2021)/PANAMERAINTERIOR.webp'
    ],
    description: 'Panamera 4S E-Hybrid Sport Turismo 2021 com conforto e eficiência.',
    features: ['E-Hybrid', 'Assistentes de condução', 'Interior premium'],
    videoUrl: '/videos/porsche-panamera-4s-e-hybrid-sport-turismo-video.mp4',
    featured: true
  },
  {
    id: '20',
    brand: 'Jaguar',
    model: 'F-Type Convertible',
    version: '2021',
    year: 2021,
    price: 420000,
    mileage: 22000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Curitiba, PR',
    highlights: ['Esportivo', 'Conversível'],
    images: [
      '/images/jaguar/Jaguar-F-Type_Convertible-2021-destaque.jpg'
    ],
    description: 'Jaguar F-Type Convertible com estilo marcante e som agressivo.',
    features: ['Escape esportivo', 'Interior premium'],
    videoUrl: '/videos/jaguar-f-type-convertible-video.mp4'
  },
  {
    id: '21',
    brand: 'Land Rover',
    model: 'Range Rover Sport SV',
    version: '2024',
    year: 2024,
    price: 1100000,
    mileage: 5000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Brasília, DF',
    highlights: ['Luxo', 'Tecnologia'],
    images: [
      '/images/land/Land_Rover-Range_Rover_Sport_SV-2024-destaque.jpg'
    ],
    description: 'Range Rover Sport SV 2024 com performance e luxo.',
    features: ['Suspensão adaptativa', 'Interior luxuoso'],
    videoUrl: '/videos/land-rover-range-rover-sport-sv-video.mp4',
    featured: true
  },
  {
    id: '22',
    brand: 'Lexus',
    model: 'LS',
    version: '2021',
    year: 2021,
    price: 430000,
    mileage: 30000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Porto Alegre, RS',
    highlights: ['Luxo', 'Conforto'],
    images: [
      '/images/lexus/Lexus-LS-2021-destaque.jpg'
    ],
    description: 'Lexus LS 2021 com foco em conforto e tecnologia.',
    features: ['Assistentes de condução', 'Acabamento premium'],
    videoUrl: '/videos/lexus-ls-video.mp4'
  },
  {
    id: '23',
    brand: 'Maserati',
    model: 'MC20 Cielo',
    version: '2023',
    year: 2023,
    price: 1900000,
    mileage: 10000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'São Paulo, SP',
    highlights: ['Exclusivo', 'Conversível'],
    images: [
      '/images/maserati/Maserati-MC20_Cielo-2023-DESTAQUE.jpg'
    ],
    description: 'Maserati MC20 Cielo 2023 com design marcante e alto desempenho.',
    features: ['Carbono', 'Infotenimento moderno'],
    videoUrl: '/videos/maserati-mc20-cielo-video.mp4',
    featured: true
  },
  {
    id: '24',
    brand: 'Lamborghini',
    model: 'Huracán Tecnica 60 Years',
    year: 2023,
    price: 3000000,
    mileage: 6000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Florianópolis, SC',
    highlights: ['Exclusivo'],
    images: [
      '/images/lamborghini-huracan-tecnica-60-years/Lamborghini-Huracán-destaque.jpg'
    ],
    description: 'Edição comemorativa Huracán Tecnica 60 Years com visual único.',
    features: ['Aerodinâmica avançada', 'Modo Corsa']
  },
  {
    id: '25',
    brand: 'Mercedes',
    model: 'AMG GT Coupe',
    version: '2024',
    year: 2024,
    price: 1300000,
    mileage: 4000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Rio de Janeiro, RJ',
    highlights: ['Zero KM'],
    images: [
      '/images/mercedes-AMG-GT/Mercedes-Benz-AMG_GT_Coupe-2024-destaque.jpg'
    ],
    description: 'Mercedes-AMG GT Coupe 2024 com performance excepcional.',
    features: ['Performance AMG', 'Interior esportivo'],
    videoUrl: '/videos/mercedes-amg-gt-video.mp4'
  },
  {
    id: '26',
    brand: 'Ford',
    model: 'Mustang Shelby GT500',
    year: 2020,
    price: 480000,
    mileage: 25000,
    fuel: 'gasoline',
    transmission: 'automatic',
    location: 'Curitiba, PR',
    highlights: ['Esportivo'],
    images: [
      '/images/mustang-gt-500/Mustang-destaque.jpg'
    ],
    description: 'Ford Mustang Shelby GT500 2020 com visual agressivo.',
    features: ['Supercharger', 'Bancos esportivos']
  }
];

export const getFeaturedVehicles = (limit: number = 3): Vehicle[] => {
  // Filtrar por featured true se existir, senão retornar os primeiros
  const featuredList = mockVehicles.filter((v: any) => v.featured === true);
  const base = (featuredList.length > 0 ? featuredList : mockVehicles).filter((v) => !isBanned(v as Vehicle));
  return base.slice(0, limit);
};

export const getVehicleById = (id: string): Vehicle | undefined => {
  return mockVehicles.find(vehicle => vehicle.id === id);
};

export const getVehicles = (filters?: any): Vehicle[] => {
  let filtered = [...mockVehicles].filter((v) => !isBanned(v));
  
  if (filters?.brand) {
    filtered = filtered.filter(v => v.brand.toLowerCase().includes(filters.brand.toLowerCase()));
  }
  
  if (filters?.search) {
    filtered = filtered.filter(v => 
      v.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
      v.model.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  return filtered;
};

export const addVehicle = (vehicle: Omit<Vehicle, 'id'>): Vehicle => {
  // Gerar ID único baseado no timestamp
  const newId = Date.now().toString();
  const newVehicle: Vehicle = { 
    id: newId, 
    ...vehicle,
    // Garantir que campos obrigatórios tenham valores padrão
    description: vehicle.description || '',
    features: vehicle.features || [],
    highlights: vehicle.highlights || [],
    images: vehicle.images || []
  };
  
  console.log('Adicionando veículo ao mockData:', newVehicle);
  mockVehicles.push(newVehicle);
  console.log('Total de veículos após adição:', mockVehicles.length);
  
  return newVehicle;
};

export const updateVehicle = (id: string, data: Partial<Vehicle>): Vehicle | undefined => {
  const index = mockVehicles.findIndex(v => v.id === id);
  if (index === -1) return undefined;
  const updated = { ...mockVehicles[index], ...data };
  mockVehicles[index] = updated;
  return updated;
};

export const deleteVehicle = (id: string): boolean => {
  const index = mockVehicles.findIndex(v => v.id === id);
  if (index === -1) return false;
  mockVehicles.splice(index, 1);
  return true;
};
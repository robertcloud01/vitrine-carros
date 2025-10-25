// Re-exportar todos os tipos do database
export * from './database';

// Tipos existentes (manter compatibilidade)
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  price: number;
  mileage: number;
  fuel: 'gasoline' | 'ethanol' | 'flex' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic' | 'cvt';
  location: string;
  highlights: string[];
  images: string[];
  description: string;
  features: string[];
  // Novos campos de mídia opcionais
  videoUrl?: string;
  gifUrl?: string;
  
  // Destaque do veículo (usado em mocks e filtros)
  featured?: boolean;
  
  // Especificações técnicas detalhadas
  engine?: {
    type: string; // Ex: "V8 Biturbo", "V6", "4 cilindros"
    displacement: number; // Em litros
    power: number; // Em CV
    torque: number; // Em Nm
    fuelSystem?: string; // Ex: "Injeção direta"
  };
  
  performance?: {
    acceleration: string; // Ex: "0-100 km/h em 3.8s"
    topSpeed: number; // Em km/h
    fuelConsumption?: {
      city: number; // km/l na cidade
      highway: number; // km/l na estrada
      combined: number; // km/l combinado
    };
  };
  
  dimensions?: {
    length: number; // Em mm
    width: number; // Em mm
    height: number; // Em mm
    wheelbase: number; // Em mm
    weight: number; // Em kg
    trunkCapacity: number; // Em litros
  };
  
  technical?: {
    drivetrain: string; // Ex: "AWD", "FWD", "RWD"
    suspension: string; // Ex: "Suspensão adaptativa"
    brakes: string; // Ex: "Freios a disco ventilados"
    wheels: string; // Ex: "Rodas 20 polegadas"
    tires: string; // Ex: "275/40 R20"
  };
  
  safety?: string[]; // Itens de segurança
  comfort?: string[]; // Itens de conforto
  technology?: string[]; // Tecnologias embarcadas
  
  // Informações adicionais
  bodyType?: string; // Ex: "SUV", "Sedan", "Hatchback"
  doors?: number;
  seats?: number;
  color?: {
    exterior: string;
    interior: string;
  };
  
  // Histórico e condição
  owners?: number; // Número de proprietários
  accidents?: boolean; // Se teve acidentes
  maintenance?: {
    lastService?: string; // Data da última revisão
    nextService?: string; // Data da próxima revisão
    serviceHistory?: boolean; // Se tem histórico completo
  };
  
  // Documentação
  documentation?: {
    ipva: boolean; // IPVA em dia
    licensing: boolean; // Licenciamento em dia
    inspection: boolean; // Vistoria em dia
  };
}

// Tipos para formulários de compatibilidade (versão simplificada)
export interface VehicleFiltersLegacy {
  search: string;
  brand: string;
  year: string;
  priceRange: string;
  fuel: string;
  transmission: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface TestDriveFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message?: string;
  vehicleId: string;
}

// Tipos para componentes
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Tipos para API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
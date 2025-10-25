import { 
  User, 
  Vehicle, 
  VehicleImage, 
  VehicleFeature, 
  VehicleHighlight,
  Inquiry,
  TestDrive,
  Newsletter,
  Role,
  FuelType,
  TransmissionType,
  VehicleStatus,
  InquiryType,
  InquiryStatus,
  TestDriveStatus
} from '@prisma/client';

// Tipos completos com relacionamentos
export type VehicleWithDetails = Vehicle & {
  images: VehicleImage[];
  features: VehicleFeature[];
  highlights: VehicleHighlight[];
  _count?: {
    favoritedBy: number;
    inquiries: number;
    testDrives: number;
  };
};

export type UserWithRelations = User & {
  favorites: Vehicle[];
  inquiries: Inquiry[];
  testDrives: TestDrive[];
};

export type InquiryWithRelations = Inquiry & {
  user?: User;
  vehicle?: Vehicle;
};

export type TestDriveWithRelations = TestDrive & {
  user?: User;
  vehicle: Vehicle;
};

// Tipos para formulários
export interface CreateVehicleData {
  brand: string;
  model: string;
  version?: string;
  year: number;
  price: number;
  mileage: number;
  fuel: FuelType;
  transmission: TransmissionType;
  color?: string;
  location: string;
  description?: string;
  videoUrl?: string;
  gifUrl?: string;
  featured?: boolean;
  images: string[];
  features: string[];
  highlights: string[];
}

export interface UpdateVehicleData extends Partial<CreateVehicleData> {
  id: string;
  status?: VehicleStatus;
}

export interface CreateUserData {
  email: string;
  name?: string;
  password: string;
  role?: Role;
}

export interface CreateInquiryData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type?: InquiryType;
  vehicleId?: string;
  userId?: string;
}

export interface CreateTestDriveData {
  name: string;
  email: string;
  phone: string;
  preferredDate: Date;
  message?: string;
  vehicleId: string;
  userId?: string;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
}

// Filtros e paginação
export interface VehicleFilters {
  search?: string;
  brand?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMax?: number;
  fuel?: FuelType;
  transmission?: TransmissionType;
  status?: VehicleStatus;
  featured?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Re-exportar tipos do Prisma
export type {
  User,
  Vehicle,
  VehicleImage,
  VehicleFeature,
  VehicleHighlight,
  Inquiry,
  TestDrive,
  Newsletter,
  Role,
  FuelType,
  TransmissionType,
  VehicleStatus,
  InquiryType,
  InquiryStatus,
  TestDriveStatus,
};
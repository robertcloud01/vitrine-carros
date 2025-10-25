import { prisma } from '@/lib/prisma';
import { 
  VehicleWithDetails, 
  CreateVehicleData, 
  UpdateVehicleData,
  VehicleFilters,
  PaginationParams,
  PaginatedResponse
} from '@/types/database';
import { VehicleStatus } from '@prisma/client';

export class VehicleService {
  // Buscar todos os veículos com filtros e paginação
  static async getVehicles(
    filters: VehicleFilters = {},
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<VehicleWithDetails>> {
    const {
      search,
      brand,
      model,
      yearMin,
      yearMax,
      priceMin,
      priceMax,
      mileageMax,
      fuel,
      transmission,
      status,
      featured
    } = filters;

    const {
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = pagination;

    const skip = (page - 1) * limit;

    // Construir filtros do Prisma
    const where: any = {};

    if (status) where.status = status;

    if (search) {
      where.OR = [
        { brand: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { version: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (brand) where.brand = { equals: brand, mode: 'insensitive' };
    if (model) where.model = { equals: model, mode: 'insensitive' };
    if (yearMin || yearMax) {
      where.year = {};
      if (yearMin) where.year.gte = yearMin;
      if (yearMax) where.year.lte = yearMax;
    }
    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) where.price.gte = priceMin;
      if (priceMax) where.price.lte = priceMax;
    }
    if (mileageMax) where.mileage = { lte: mileageMax };
    if (fuel) where.fuel = fuel;
    if (transmission) where.transmission = transmission;
    if (featured !== undefined) where.featured = featured;

    // Executar consultas
    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        include: {
          images: { orderBy: { order: 'asc' } },
          features: true,
          highlights: true,
          _count: {
            select: {
              favoritedBy: true,
              inquiries: true,
              testDrives: true
            }
          }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.vehicle.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: vehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  // Buscar veículo por ID
  static async getVehicleById(id: string): Promise<VehicleWithDetails | null> {
    return prisma.vehicle.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: 'asc' } },
        features: true,
        highlights: true,
        _count: {
          select: {
            favoritedBy: true,
            inquiries: true,
            testDrives: true
          }
        }
      }
    });
  }

  // Buscar veículos em destaque
  static async getFeaturedVehicles(limit: number = 6): Promise<VehicleWithDetails[]> {
    return prisma.vehicle.findMany({
      where: {
        featured: true,
        status: VehicleStatus.AVAILABLE
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        features: true,
        highlights: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  // Criar novo veículo
  static async createVehicle(data: CreateVehicleData): Promise<VehicleWithDetails> {
    const { images, features, highlights, gifUrl, ...vehicleData } = data;

    return prisma.vehicle.create({
      data: {
        ...vehicleData,
        images: {
          create: images.map((url, index) => ({
            url,
            order: index
          }))
        },
        features: {
          create: features.map(name => ({ name }))
        },
        highlights: {
          create: highlights.map(name => ({ name }))
        }
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        features: true,
        highlights: true
      }
    });
  }

  // Atualizar veículo
  static async updateVehicle(data: UpdateVehicleData): Promise<VehicleWithDetails> {
    const { id, images, features, highlights, gifUrl, ...vehicleData } = data;

    // Atualizar dados básicos
    const updateData: any = { ...vehicleData };

    // Se imagens foram fornecidas, substituir todas
    if (images) {
      updateData.images = {
        deleteMany: {},
        create: images.map((url, index) => ({
          url,
          order: index
        }))
      };
    }

    // Se características foram fornecidas, substituir todas
    if (features) {
      updateData.features = {
        deleteMany: {},
        create: features.map(name => ({ name }))
      };
    }

    // Se destaques foram fornecidos, substituir todos
    if (highlights) {
      updateData.highlights = {
        deleteMany: {},
        create: highlights.map(name => ({ name }))
      };
    }

    return prisma.vehicle.update({
      where: { id },
      data: updateData,
      include: {
        images: { orderBy: { order: 'asc' } },
        features: true,
        highlights: true
      }
    });
  }

  // Deletar veículo
  static async deleteVehicle(id: string): Promise<void> {
    await prisma.vehicle.delete({
      where: { id }
    });
  }

  // Buscar marcas disponíveis
  static async getAvailableBrands(): Promise<string[]> {
    const brands = await prisma.vehicle.findMany({
      where: { status: VehicleStatus.AVAILABLE },
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' }
    });

    return brands.map(b => b.brand);
  }

  // Buscar modelos por marca
  static async getModelsByBrand(brand: string): Promise<string[]> {
    const models = await prisma.vehicle.findMany({
      where: { 
        brand: { equals: brand, mode: 'insensitive' },
        status: VehicleStatus.AVAILABLE 
      },
      select: { model: true },
      distinct: ['model'],
      orderBy: { model: 'asc' }
    });

    return models.map(m => m.model);
  }

  // Estatísticas do estoque
  static async getStockStats() {
    const [total, available, sold, featured] = await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { status: VehicleStatus.AVAILABLE } }),
      prisma.vehicle.count({ where: { status: VehicleStatus.SOLD } }),
      prisma.vehicle.count({ where: { featured: true } })
    ]);

    return { total, available, sold, featured };
  }
}
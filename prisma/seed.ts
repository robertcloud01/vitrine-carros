import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vitrinelux.com' },
    update: {},
    create: {
      email: 'admin@vitrinelux.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  console.log('👤 Usuário admin criado:', admin.email);

  // Criar veículos de exemplo
  const vehicles = [
    {
      brand: 'BMW',
      model: 'X6 M',
      version: 'Competition',
      year: 2023,
      price: 850000,
      mileage: 15000,
      fuel: 'gasoline',
      transmission: 'automatic',
      color: 'Preto Metálico',
      location: 'São Paulo, SP',
      description: 'BMW X6 M Competition em estado impecável. Único dono, todas as revisões em dia.',
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
      ],
      features: ['Teto Solar', 'Bancos de Couro', 'Sistema de Som Premium', 'GPS'],
      highlights: ['Único Dono', 'Revisado']
    },
    {
      brand: 'Mercedes',
      model: 'AMG GT',
      version: '63 S',
      year: 2022,
      price: 1200000,
      mileage: 8500,
      fuel: 'gasoline',
      transmission: 'automatic',
      color: 'Prata Metálico',
      location: 'Rio de Janeiro, RJ',
      description: 'Mercedes AMG GT 63 S com performance excepcional.',
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800'
      ],
      features: ['Performance Package', 'Interior AMG', 'Suspensão Adaptativa'],
      highlights: ['Baixa Quilometragem', 'Garantia Estendida']
    },
    {
      brand: 'Audi',
      model: 'RS6',
      version: 'Avant',
      year: 2023,
      price: 750000,
      mileage: 12000,
      fuel: 'gasoline',
      transmission: 'automatic',
      color: 'Azul Metálico',
      location: 'Brasília, DF',
      description: 'Audi RS6 Avant - perfeita combinação de performance e praticidade.',
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800'
      ],
      features: ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen'],
      highlights: ['Único Dono', 'Revisado']
    },
    {
      brand: 'Porsche',
      model: '911',
      version: 'Turbo S',
      year: 2024,
      price: 1800000,
      mileage: 2500,
      fuel: 'gasoline',
      transmission: 'automatic',
      color: 'Branco Pérola',
      location: 'São Paulo, SP',
      description: 'Porsche 911 Turbo S 2024 - o ápice da engenharia alemã.',
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'
      ],
      features: ['PDK', 'Sport Chrono', 'PASM'],
      highlights: ['Zero KM', 'Garantia de Fábrica']
    },
    {
      brand: 'Tesla',
      model: 'Model S',
      version: 'Plaid',
      year: 2023,
      price: 650000,
      mileage: 18000,
      fuel: 'electric',
      transmission: 'automatic',
      color: 'Vermelho Metálico',
      location: 'São Paulo, SP',
      description: 'Tesla Model S Plaid - futuro da mobilidade elétrica.',
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800'
      ],
      features: ['Autopilot', 'Supercharging', 'Over-the-air Updates'],
      highlights: ['Autopilot', 'Carregamento Rápido']
    }
  ];

  for (const vehicleData of vehicles) {
    const { images, features, highlights, ...vehicle } = vehicleData;
    
    const createdVehicle = await prisma.vehicle.create({
      data: {
        ...vehicle,
        fuel: vehicle.fuel as any,
        transmission: vehicle.transmission as any,
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
      }
    });

    console.log(`🚗 Veículo criado: ${createdVehicle.brand} ${createdVehicle.model}`);
  }

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';
import { Vehicle, VehicleFiltersLegacy } from '@/types';
import VehicleFiltersComponent from '@/components/sections/VehicleFilters';
import VehicleCard from '@/components/sections/VehicleCard';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
// Remover uso direto do mockVehicles e buscar da API
import { useVehicles } from '@/hooks/useVehicles';

const sortOptions = [
  { value: 'price-asc', label: 'Menor Preço' },
  { value: 'price-desc', label: 'Maior Preço' },
  { value: 'year-desc', label: 'Mais Novo' },
  { value: 'year-asc', label: 'Mais Antigo' },
  { value: 'mileage-asc', label: 'Menor Quilometragem' },
  { value: 'mileage-desc', label: 'Maior Quilometragem' },
];

export default function EstoquePage() {
  const [filters, setFilters] = useState<VehicleFiltersLegacy>({
    search: '',
    brand: '',
    year: '',
    priceRange: '',
    fuel: '',
    transmission: ''
  });
  
  const [sortBy, setSortBy] = useState('price-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Buscar veículos da API de acordo com os filtros
  const { data, loading, error } = useVehicles({
    filters: filters as any,
    pagination: { page: 1, limit: 100 },
  });

  // Normalizar veículos vindos da API (DB) para o formato UI esperado pelo VehicleCard
  const normalizeFuel = (fuel: any): Vehicle['fuel'] => {
    const raw = typeof fuel === 'string' ? fuel : '';
    const s = raw.toLowerCase();
    switch (s) {
      case 'gasoline':
      case 'gasolina':
        return 'gasoline';
      case 'diesel':
        return 'diesel';
      case 'electric':
      case 'elétrico':
        return 'electric';
      case 'hybrid':
      case 'híbrido':
        return 'hybrid';
      case 'ethanol':
        return 'ethanol';
      case 'flex':
        return 'flex';
      default: {
        const upper = raw.toUpperCase();
        if (upper === 'GASOLINE') return 'gasoline';
        if (upper === 'DIESEL') return 'diesel';
        if (upper === 'ELECTRIC') return 'electric';
        if (upper === 'HYBRID') return 'hybrid';
        if (upper === 'ETHANOL') return 'ethanol';
        if (upper === 'FLEX') return 'flex';
        return 'gasoline';
      }
    }
  };

  const normalizeTransmission = (t: any): Vehicle['transmission'] => {
    const raw = typeof t === 'string' ? t : '';
    const s = raw.toLowerCase();
    if (s === 'automatic' || s === 'automático') return 'automatic';
    if (s === 'manual') return 'manual';
    if (s === 'cvt') return 'cvt';
    const upper = raw.toUpperCase();
    if (upper === 'AUTOMATIC') return 'automatic';
    if (upper === 'MANUAL') return 'manual';
    if (upper === 'CVT') return 'cvt';
    return 'automatic';
  };

  const normalizeVehicle = (v: any): Vehicle => ({
    id: String(v.id),
    brand: v.brand,
    model: v.model,
    version: v.version ?? undefined,
    year: Number(v.year ?? 0),
    price: Number(v.price ?? 0),
    mileage: Number(v.mileage ?? 0),
    fuel: normalizeFuel(v.fuel),
    transmission: normalizeTransmission(v.transmission),
    location: v.location ?? '',
    highlights: Array.isArray(v.highlights)
      ? (typeof v.highlights[0] === 'string' ? v.highlights : v.highlights.map((h: any) => h?.name).filter(Boolean))
      : [],
    images: Array.isArray(v.images)
      ? (typeof v.images[0] === 'string' ? v.images : v.images.map((img: any) => img?.url).filter(Boolean))
      : [],
    description: v.description ?? '',
    features: Array.isArray(v.features)
      ? (typeof v.features[0] === 'string' ? v.features : v.features.map((f: any) => f?.name).filter(Boolean))
      : [],
    videoUrl: v.videoUrl ?? undefined,
    gifUrl: v.gifUrl ?? undefined,
    featured: !!v.featured,
  });

  // Filter and sort vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    const sourceRaw: any[] = (data?.data as any) || [];
    const source: Vehicle[] = sourceRaw.map(normalizeVehicle);

    let filtered = source.filter(vehicle => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = `${vehicle.brand} ${vehicle.model} ${vehicle.version || ''}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) return false;
      }

      // Brand filter
      if (filters.brand && vehicle.brand.toLowerCase() !== filters.brand) return false;

      // Year filter
      if (filters.year && vehicle.year?.toString() !== filters.year) return false;

      // Fuel filter
      if (filters.fuel && vehicle.fuel !== filters.fuel) return false;

      // Transmission filter
      if (filters.transmission && vehicle.transmission !== filters.transmission) return false;

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.includes('+') 
          ? [parseInt(filters.priceRange.replace('+', '')), Infinity]
          : filters.priceRange.split('-').map(Number);
        const price = Number(vehicle.price || 0);
        if (price < min || price > max) return false;
      }

      return true;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      const aPrice = Number(a.price || 0);
      const bPrice = Number(b.price || 0);
      const aYear = Number(a.year || 0);
      const bYear = Number(b.year || 0);
      const aMileage = Number(a.mileage || 0);
      const bMileage = Number(b.mileage || 0);

      switch (sortBy) {
        case 'price-asc':
          return aPrice - bPrice;
        case 'price-desc':
          return bPrice - aPrice;
        case 'year-asc':
          return aYear - bYear;
        case 'year-desc':
          return bYear - aYear;
        case 'mileage-asc':
          return aMileage - bMileage;
        case 'mileage-desc':
          return bMileage - aMileage;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy, data]);

  return (
    <main className="pt-20 min-h-screen bg-primary-dark">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary-white mb-4">
            Nosso Estoque Premium
          </h1>
          <p className="text-xl text-primary-gray max-w-2xl">
            Descubra nossa curadoria exclusiva de veículos de alto padrão, 
            selecionados com rigor e paixão pela excelência automotiva.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`lg:w-80 ${filtersOpen ? 'block' : 'hidden lg:block'}`}
          >
            <VehicleFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={() => setFilters({
                search: '',
                brand: '',
                year: '',
                priceRange: '',
                fuel: '',
                transmission: ''
              })}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-primary-black rounded-lg p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="lg:hidden"
                  >
                    <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                    Filtros
                  </Button>
                  
                  <span className="text-primary-gray">
                    {filteredAndSortedVehicles.length} veículo{filteredAndSortedVehicles.length !== 1 ? 's' : ''} encontrado{filteredAndSortedVehicles.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    className="w-48"
                  />

                  {/* View Mode */}
                  <div className="flex bg-gray-800 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${
                        viewMode === 'grid'
                          ? 'bg-primary-gold text-primary-black'
                          : 'text-primary-gray hover:text-primary-white'
                      }`}
                    >
                      <Squares2X2Icon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${
                        viewMode === 'list'
                          ? 'bg-primary-gold text-primary-black'
                          : 'text-primary-gray hover:text-primary-white'
                      }`}
                    >
                      <ListBulletIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vehicles Grid/List */}
            {filteredAndSortedVehicles.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={
                  viewMode === 'grid'
                    ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredAndSortedVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-primary-white mb-2">
                  Nenhum veículo encontrado
                </h3>
                <p className="text-primary-gray mb-6">
                  Tente ajustar os filtros para encontrar o veículo ideal.
                </p>
                <Button
                  onClick={() => setFilters({
                    search: '',
                    brand: '',
                    year: '',
                    priceRange: '',
                    fuel: '',
                    transmission: ''
                  })}
                >
                  Limpar Filtros
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
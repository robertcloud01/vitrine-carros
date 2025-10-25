'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { VehicleFiltersLegacy } from '@/types';
import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

interface VehicleFiltersProps {
  filters: VehicleFiltersLegacy;
  onFiltersChange: (filters: VehicleFiltersLegacy) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const brandOptions = [
  { value: '', label: 'Todas as marcas' },
  { value: 'audi', label: 'Audi' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'porsche', label: 'Porsche' },
  { value: 'lexus', label: 'Lexus' },
  { value: 'jaguar', label: 'Jaguar' },
  { value: 'tesla', label: 'Tesla' },
  { value: 'maserati', label: 'Maserati' },
];

// Normalizar valor de marca para case-insensitive
const normalizeBrand = (value: string) => value.trim().toLowerCase();

const yearOptions = [
  { value: '', label: 'Todos os anos' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
];

const fuelOptions = [
  { value: '', label: 'Todos os combustíveis' },
  { value: 'gasoline', label: 'Gasolina' },
  { value: 'hybrid', label: 'Híbrido' },
  { value: 'electric', label: 'Elétrico' },
  { value: 'diesel', label: 'Diesel' },
];

const transmissionOptions = [
  { value: '', label: 'Todas as transmissões' },
  { value: 'automatic', label: 'Automático' },
  { value: 'manual', label: 'Manual' },
  { value: 'cvt', label: 'CVT' },
];

const priceRanges = [
  { value: '', label: 'Todas as faixas' },
  { value: '0-100000', label: 'Até R$ 100.000' },
  { value: '100000-200000', label: 'R$ 100.000 - R$ 200.000' },
  { value: '200000-300000', label: 'R$ 200.000 - R$ 300.000' },
  { value: '300000-500000', label: 'R$ 300.000 - R$ 500.000' },
  { value: '500000-1000000', label: 'R$ 500.000 - R$ 1.000.000' },
  { value: '1000000+', label: 'Acima de R$ 1.000.000' },
];

export default function VehicleFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle
}: VehicleFiltersProps) {
  const updateFilter = (key: keyof VehicleFiltersLegacy, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-primary-graphite border border-primary-gray rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary-gray">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="h-5 w-5 text-primary-gold" />
          <h3 className="text-lg font-semibold text-primary-white">Filtros</h3>
          {hasActiveFilters && (
            <span className="bg-primary-gold text-primary-black text-xs px-2 py-1 rounded-full font-medium">
              Ativos
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-400 hover:text-primary-gold"
            >
              <XMarkIcon className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-400 hover:text-primary-gold lg:hidden"
          >
            {isOpen ? 'Fechar' : 'Abrir'}
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden lg:!h-auto"
      >
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Buscar
            </label>
            <SearchInput
              placeholder="Buscar por marca, modelo..."
              value={filters.search}
              onChange={(value) => updateFilter('search', value)}
            />
          </div>

          {/* Brand */}
          <div>
            <Select
              label="Marca"
              value={filters.brand}
              onChange={(e) => updateFilter('brand', normalizeBrand(e.target.value))}
              options={brandOptions}
            />
          </div>

          {/* Year */}
          <div>
            <Select
              label="Ano"
              value={filters.year}
              onChange={(e) => updateFilter('year', e.target.value)}
              options={yearOptions}
            />
          </div>

          {/* Price Range */}
          <div>
            <Select
              label="Faixa de Preço"
              value={filters.priceRange}
              onChange={(e) => updateFilter('priceRange', e.target.value)}
              options={priceRanges}
            />
          </div>

          {/* Fuel */}
          <div>
            <Select
              label="Combustível"
              value={filters.fuel}
              onChange={(e) => updateFilter('fuel', e.target.value)}
              options={fuelOptions}
            />
          </div>

          {/* Transmission */}
          <div>
            <Select
              label="Transmissão"
              value={filters.transmission}
              onChange={(e) => updateFilter('transmission', e.target.value)}
              options={transmissionOptions}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
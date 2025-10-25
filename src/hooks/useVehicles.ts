import { useState, useEffect } from 'react';
import { VehicleWithDetails, VehicleFilters, PaginationParams, PaginatedResponse } from '@/types/database';

// Adapta filtros legados (search, brand, year, priceRange, etc.) para query da API
function mapFiltersToQuery(filters: any): Record<string, string> {
  const params: Record<string, string> = {};
  if (!filters) return params;

  if (filters.search) params.search = String(filters.search);
  if (filters.brand) params.brand = String(filters.brand).toLowerCase();
  if (filters.model) params.model = String(filters.model);

  // year único => yearMin/yearMax
  if (filters.year) {
    const yearStr = String(filters.year);
    params.yearMin = yearStr;
    params.yearMax = yearStr;
  } else {
    if (filters.yearMin) params.yearMin = String(filters.yearMin);
    if (filters.yearMax) params.yearMax = String(filters.yearMax);
  }

  // priceRange => priceMin/priceMax
  if (filters.priceRange) {
    const pr = String(filters.priceRange);
    if (pr.includes('+')) {
      params.priceMin = pr.replace('+', '');
    } else {
      const [min, max] = pr.split('-');
      if (min) params.priceMin = min;
      if (max) params.priceMax = max;
    }
  } else {
    if (filters.priceMin) params.priceMin = String(filters.priceMin);
    if (filters.priceMax) params.priceMax = String(filters.priceMax);
  }

  if (filters.mileageMax) params.mileageMax = String(filters.mileageMax);
  if (filters.fuel) params.fuel = String(filters.fuel);
  if (filters.transmission) params.transmission = String(filters.transmission);
  if (filters.status) params.status = String(filters.status);
  if (typeof filters.featured !== 'undefined') params.featured = String(!!filters.featured);

  return params;
}

interface UseVehiclesOptions {
  filters?: VehicleFilters;
  pagination?: PaginationParams;
  enabled?: boolean;
}

export function useVehicles(options: UseVehiclesOptions = {}) {
  const { filters = {}, pagination = {}, enabled = true } = options;
  
  const [data, setData] = useState<PaginatedResponse<VehicleWithDetails> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      // Adicionar filtros (normalizados)
      const filterParams = mapFiltersToQuery(filters as any);
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });

      // Adicionar paginação
      Object.entries(pagination).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/vehicles?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar veículos');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [JSON.stringify(filters), JSON.stringify(pagination), enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchVehicles
  };
}

export function useVehicle(id: string) {
  const [data, setData] = useState<VehicleWithDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVehicle = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/vehicles/${id}`);
        
        if (!response.ok) {
          throw new Error('Veículo não encontrado');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  return { data, loading, error };
}

export function useFeaturedVehicles(limit: number = 6) {
  const [data, setData] = useState<VehicleWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/vehicles/featured?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Erro ao buscar veículos em destaque');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVehicles();
  }, [limit]);

  return { data, loading, error };
}
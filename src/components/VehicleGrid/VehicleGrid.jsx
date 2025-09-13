import React from 'react';
import VehicleCard from '../VehicleCard/VehicleCard';
import './VehicleGrid.css';
import { useVehicles } from '../../hooks/useVehicles';

const VehicleGrid = () => {
  const { vehicles, loading, error } = useVehicles();
  
  if (loading) return <div className="loading">Carregando veículos...</div>;
  if (error) return <div className="error">Erro ao carregar veículos: {error}</div>;
  
  return (
    <div className="vehicles-grid">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleGrid;
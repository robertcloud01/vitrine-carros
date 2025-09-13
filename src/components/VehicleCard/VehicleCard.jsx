import React, { useState, useRef } from 'react';
import './VehicleCard.css';

const VehicleCard = ({ vehicle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const videoRef = useRef(null);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Erro ao reproduzir vídeo:', error);
        // Não interrompe a execução do código
      });
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openDetailsModal = () => {
    setIsDetailsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Configurações específicas para cada veículo
  const getVehicleSettings = () => {
    const settings = {
      scale: '0.9',
      position: 'center 40%'
    };
    
    switch(vehicle.name) {
      case 'Porsche 911 GT3 RS':
        return { scale: '0.75', position: 'center 30%' };
      case 'BMW M3 Competition':
        return { scale: '1.60', position: 'center 50%' };
      case 'Volvo XC90':
        return { scale: '0.85', position: 'center 35%' };
      default:
        return settings;
    }
  };

  const settings = getVehicleSettings();
  
  return (
    <>
      <div 
        className="vehicle-card" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="vehicle-image">
          <img 
            src={vehicle.image} 
            alt={vehicle.name} 
            className={`hover-image ${isHovered ? 'hidden' : ''}`}
            onClick={openModal}
            style={{
              transform: `scale(${settings.scale})`,
              objectPosition: settings.position
            }}
          />
          <video 
            ref={videoRef} 
            className={`hover-video ${isHovered ? 'visible' : ''}`}
            muted={true} 
            loop
            playsInline
            style={{
              transform: `scale(${settings.scale})`,
              objectPosition: settings.position
            }}
          >
            <source src={vehicle.video} type="video/mp4" />
          </video>
          <div className="vehicle-badge">{vehicle.category}</div>
        </div>
        
        <div className="vehicle-details">
          <h3>{vehicle.name}</h3>
          <p className="vehicle-specs">{vehicle.specs}</p>
          <p className="vehicle-price">{vehicle.price}</p>
          <button className="action-button" onClick={openDetailsModal}>Ver detalhes</button>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="vehicle-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              className="modal-image"
            />
            <h2>{vehicle.name}</h2>
          </div>
        </div>
      )}

      {isDetailsModalOpen && (
        <div className="details-modal" onClick={closeDetailsModal}>
          <div className="details-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeDetailsModal}>×</button>
            
            <div className="details-header">
              <img src={vehicle.image} alt={vehicle.name} className="details-image" />
              <div className="details-info">
                <h2>{vehicle.name}</h2>
                <p className="details-category">{vehicle.category}</p>
                <p className="details-price">{vehicle.price}</p>
              </div>
            </div>

            <div className="details-tabs">
              <div className="tab-content">
                <h3>Especificações Técnicas</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <i className="fas fa-engine"></i>
                    <span className="spec-label">Motor:</span>
                    <span className="spec-value">{vehicle.engine || '3.0L V6 Turbo'}</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-horse-head"></i>
                    <span className="spec-label">Potência:</span>
                    <span className="spec-value">{vehicle.power || '400 HP'}</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-tachometer-alt"></i>
                    <span className="spec-label">0-100 km/h:</span>
                    <span className="spec-value">{vehicle.acceleration || '4.2s'}</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-speedometer"></i>
                    <span className="spec-label">Velocidade Máxima:</span>
                    <span className="spec-value">{vehicle.topSpeed || '280 km/h'}</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-gas-pump"></i>
                    <span className="spec-label">Consumo:</span>
                    <span className="spec-value">{vehicle.consumption || '12 km/l'}</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-cog"></i>
                    <span className="spec-label">Transmissão:</span>
                    <span className="spec-value">{vehicle.transmission || 'Automática 8 velocidades'}</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-users"></i>
                    <span className="spec-label">Lugares:</span>
                    <span className="spec-value">{vehicle.seats || '5 lugares'}</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span className="spec-label">Ano:</span>
                    <span className="spec-value">{vehicle.year || '2024'}</span>
                  </div>
                </div>

                <h3>Características</h3>
                <div className="features-list">
                  <div className="feature-item">
                    <i className="fas fa-check"></i>
                    <span>Sistema de navegação GPS</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check"></i>
                    <span>Ar condicionado automático</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check"></i>
                    <span>Bancos em couro premium</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check"></i>
                    <span>Sistema de som premium</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check"></i>
                    <span>Controle de estabilidade</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check"></i>
                    <span>Freios ABS</span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="btn-primary">Agendar Test Drive</button>
                  <button className="btn-secondary">Solicitar Proposta</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleCard;
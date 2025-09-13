import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useVehicles } from '../../hooks/useVehicles';
import './CircularCarousel.css';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  padding: 40px 0;
`;

const CarouselCenter = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const CenterContent = styled.div`
  text-align: center;
  color: white;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

const CarouselItem = styled(motion.div)`
  position: absolute;
  width: 280px;
  height: 180px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.1);
  transform-origin: center;
  z-index: ${props => (props.active ? 5 : 1)};
`;

const ItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ItemInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  backdrop-filter: blur(5px);
`;

const ItemName = styled.h3`
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;
`;

const ItemPrice = styled.p`
  margin: 0;
  font-size: 14px;
  color: #f8f8f8;
  font-weight: 500;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: 50px;' : 'right: 50px;'}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 24px;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
`;

const CircularCarousel = () => {
  const { vehicles, loading, error } = useVehicles();
  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState([]);
  
  useEffect(() => {
    if (vehicles.length > 0) {
      calculatePositions();
    }
  }, [vehicles]);
  
  const calculatePositions = () => {
    const numItems = vehicles.length;
    const radius = 400; // Raio do círculo
    const newPositions = [];
    
    for (let i = 0; i < numItems; i++) {
      const angle = (i * 2 * Math.PI / numItems) - (activeIndex * 2 * Math.PI / numItems);
      const x = radius * Math.sin(angle);
      const y = radius * Math.cos(angle);
      const scale = 0.8 + 0.4 * (1 - Math.abs(angle) / Math.PI); // Escala baseada na posição
      const zIndex = Math.round(scale * 10);
      
      newPositions.push({ x, y, scale, zIndex, rotation: angle * (180 / Math.PI) });
    }
    
    setPositions(newPositions);
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
    setTimeout(calculatePositions, 50);
  };
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
    setTimeout(calculatePositions, 50);
  };
  
  const handleItemClick = (index) => {
    setActiveIndex(index);
    setTimeout(calculatePositions, 50);
  };
  
  if (loading) return <div className="loading">Carregando veículos...</div>;
  if (error) return <div className="error">Erro ao carregar veículos: {error}</div>;
  
  return (
    <CarouselContainer>
      <CarouselCenter>
        <CenterContent>
          <h2>Veículos Premium</h2>
          <p>Explore nossa coleção exclusiva</p>
        </CenterContent>
      </CarouselCenter>
      
      {vehicles.map((vehicle, index) => (
        <CarouselItem
          key={vehicle.id}
          active={index === activeIndex}
          initial={false}
          animate={{
            x: positions[index]?.x || 0,
            y: positions[index]?.y || 0,
            scale: positions[index]?.scale || 1,
            zIndex: positions[index]?.zIndex || 1,
            rotate: positions[index]?.rotation || 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={() => handleItemClick(index)}
        >
          <ItemImage style={{ backgroundImage: `url(${vehicle.image})` }} />
          <ItemInfo>
            <ItemName>{vehicle.name}</ItemName>
            <ItemPrice>{vehicle.price}</ItemPrice>
          </ItemInfo>
        </CarouselItem>
      ))}
      
      <NavigationButton direction="left" onClick={handlePrev}>
        ‹
      </NavigationButton>
      <NavigationButton direction="right" onClick={handleNext}>
        ›
      </NavigationButton>
    </CarouselContainer>
  );
};

export default CircularCarousel;
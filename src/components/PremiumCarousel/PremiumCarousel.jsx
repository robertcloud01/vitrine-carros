import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useVehicles } from '../../hooks/useVehicles';
import './PremiumCarousel.css';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CarouselHeader = styled.div`
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;
`;

const CarouselTitle = styled.h2`
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin: 0;
  background: linear-gradient(90deg, #b78628, #fcc201, #b78628);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const CarouselSubtitle = styled.p`
  font-size: 1.2rem;
  color: #aaa;
  margin: 10px 0 0;
  font-weight: 300;
  letter-spacing: 2px;
`;

const CarouselTrack = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselSlide = styled(motion.div)`
  position: absolute;
  width: 800px;
  height: 450px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  background: #000;
  display: flex;
`;

const SlideImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

// Adicione esta função no componente PremiumCarousel
const handleImageError = (e) => {
  console.error('Erro ao carregar imagem:', e.target.src);
  e.target.src = '/assets/images/placeholder.jpg'; // Imagem de fallback
};

// E modifique o SlideImage para usar uma tag img em vez de background-image
const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// Remova este trecho inteiro que está fora de lugar
// Depois, na renderização:

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const VideoButton = styled.button`
  background: rgba(252, 194, 1, 0.8);
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #000;
  font-size: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(252, 194, 1, 1);
    transform: scale(1.1);
  }
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoPlayer = styled.video`
  max-width: 90%;
  max-height: 80vh;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  z-index: 1001;
`;

const SlideContent = styled.div`
  width: 300px;
  padding: 40px;
  background: rgba(10, 10, 10, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #b78628, #fcc201, #b78628);
  }
`;

const SlideName = styled.h3`
  font-size: 1.8rem;
  margin: 0 0 10px;
  font-weight: 600;
  color: #fff;
`;

const SlideSpecs = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin: 0 0 20px;
  font-weight: 400;
`;

const SlidePrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fcc201;
  margin: 20px 0;
`;

const SlideCategory = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 15px;
  background: rgba(252, 194, 1, 0.9);
  color: #000;
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SlideButton = styled.button`
  background: transparent;
  border: 2px solid #fcc201;
  color: #fcc201;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: #fcc201;
    color: #000;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: 50px;' : 'right: 50px;'}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 28px;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(252, 194, 1, 0.7);
    border-color: #fcc201;
    transform: translateY(-50%) scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ProgressDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#fcc201' : 'rgba(255, 255, 255, 0.2)'};
  margin: 0 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const PremiumCarousel = () => {
  const { vehicles, loading, error } = useVehicles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const slideInterval = useRef(null);
  
  useEffect(() => {
    startSlideTimer();
    return () => clearInterval(slideInterval.current);
  }, [currentIndex]);
  
  const startSlideTimer = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      handleNext();
    }, 5000);
  };
  
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
  };
  
  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };
  
  const openVideoModal = () => {
    clearInterval(slideInterval.current);
    setVideoModalOpen(true);
  };
  
  const closeVideoModal = () => {
    setVideoModalOpen(false);
    startSlideTimer();
  };
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  };
  
  if (loading) return <div className="loading">Carregando veículos...</div>;
  if (error) return <div className="error">Erro ao carregar veículos: {error}</div>;
  
  // Verificar se há veículos antes de tentar acessar
  if (!vehicles || vehicles.length === 0) {
    return <div className="error">Nenhum veículo encontrado</div>;
  }
  
  const vehicle = vehicles[currentIndex];
  
  return (
    <CarouselContainer>
      <CarouselHeader>
        <CarouselTitle>Coleção Exclusiva</CarouselTitle>
        <CarouselSubtitle>Descubra veículos de alto desempenho e design excepcional</CarouselSubtitle>
      </CarouselHeader>
      
      <CarouselTrack>
        <AnimatePresence initial={false} custom={direction}>
          {vehicle && (
            <CarouselSlide
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <SlideImageContainer>
                <SlideImage 
                  src={vehicle.image} 
                  onError={handleImageError} 
                  alt={vehicle.name} 
                />
                <SlideCategory>{vehicle.category}</SlideCategory>
                
                {vehicle.video && (
                  <VideoOverlay>
                    <VideoButton onClick={openVideoModal}>
                      ▶
                    </VideoButton>
                  </VideoOverlay>
                )}
              </SlideImageContainer>
              
              <SlideContent>
                <SlideName>{vehicle.name}</SlideName>
                <SlideSpecs>{vehicle.specs}</SlideSpecs>
                <SlidePrice>{vehicle.price}</SlidePrice>
                <SlideButton>Ver Detalhes</SlideButton>
              </SlideContent>
            </CarouselSlide>
          )}
        </AnimatePresence>
        
        <NavigationButton direction="left" onClick={handlePrev}>
          ‹
        </NavigationButton>
        <NavigationButton direction="right" onClick={handleNext}>
          ›
        </NavigationButton>
      </CarouselTrack>
      
      <ProgressBar>
        {vehicles.map((_, index) => (
          <ProgressDot 
            key={index} 
            active={index === currentIndex} 
            onClick={() => handleDotClick(index)}
          />
        ))}
      </ProgressBar>
      
      <VideoModal isOpen={videoModalOpen}>
        <CloseButton onClick={closeVideoModal}>×</CloseButton>
        {videoModalOpen && vehicle && vehicle.video && (
          <VideoPlayer 
            autoPlay 
            controls 
            src={vehicle.video}
          />
        )}
      </VideoModal>
    </CarouselContainer>
  );
};

export default PremiumCarousel;
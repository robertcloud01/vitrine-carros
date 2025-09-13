import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
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
  touch-action: pan-y;
  
  @media (max-width: 768px) {
    height: 100vh;
    padding: 5px;
    touch-action: manipulation;
  }
  
  @media (max-width: 480px) {
    padding: 0;
  }
  
  @media (max-width: 360px) {
    height: 100vh;
  }
`;

const CarouselHeader = styled.div`
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 15px 10px;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 5px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 360px) {
    padding: 8px 3px;
    margin-bottom: 8px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 360px) {
    font-size: 1.3rem;
    letter-spacing: 0.5px;
  }
`;

const CarouselSubtitle = styled.p`
  font-size: 1.2rem;
  color: #aaa;
  margin: 10px 0 0;
  font-weight: 300;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    margin: 5px 0 0;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
    letter-spacing: 0.3px;
  }
`;

const CarouselTrack = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 450px;
  }
  
  @media (max-width: 480px) {
    height: 400px;
  }
  
  @media (max-width: 360px) {
    height: 350px;
  }
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
  user-select: none;
  
  @media (max-width: 768px) {
    width: 95vw;
    height: 400px;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  }
  
  @media (max-width: 480px) {
    width: 98vw;
    height: 350px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  }
  
  @media (max-width: 360px) {
    width: 99vw;
    height: 300px;
    border-radius: 8px;
  }
`;

const SlideImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #000;
  
  @media (max-width: 768px) {
    height: 65%;
    flex: none;
  }
  
  @media (max-width: 480px) {
    height: 70%;
  }
  
  @media (max-width: 360px) {
    height: 75%;
  }
`;

const handleImageError = (e) => {
  console.error('Erro ao carregar imagem:', e.target.src);
  e.target.style.background = 'linear-gradient(45deg, #1a1a1a, #2a2a2a)';
  e.target.style.display = 'flex';
  e.target.style.alignItems = 'center';
  e.target.style.justifyContent = 'center';
  e.target.innerHTML = '<span style="color: #fcc201; font-size: 1rem; text-align: center;">Imagem não encontrada</span>';
};

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-out;
  background: #000;
  pointer-events: none;
  
  @media (hover: hover) {
    &:hover {
      transform: scale(1.02);
    }
  }
`;

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
  
  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    opacity: 0.8;
  }
`;

const VideoButton = styled.button`
  background: rgba(252, 194, 1, 0.9);
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #000;
  font-size: 20px;
  transition: all 0.3s ease;
  
  @media (hover: hover) {
    &:hover {
      background: rgba(252, 194, 1, 1);
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 14px;
  }
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.98);
  }
`;

const VideoPlayer = styled.video`
  max-width: 90%;
  max-height: 80vh;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 70vh;
  }
  
  @media (max-width: 480px) {
    max-width: 98%;
    max-height: 60vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(252, 194, 1, 0.8);
  border: none;
  color: #000;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(252, 194, 1, 1);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`;

const SlideContent = styled.div`
  width: 300px;
  padding: 40px;
  background: rgba(10, 10, 10, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    height: 35%;
    flex: none;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    height: 30%;
  }
  
  @media (max-width: 360px) {
    padding: 12px;
    height: 25%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #b78628, #fcc201, #b78628);
    
    @media (max-width: 768px) {
      width: 100%;
      height: 3px;
    }
    
    @media (max-width: 480px) {
      height: 2px;
    }
  }
`;

const SlideName = styled.h3`
  font-size: 1.8rem;
  margin: 0 0 10px;
  font-weight: 600;
  color: #fff;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 0 0 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 0 0 6px;
  }
  
  @media (max-width: 360px) {
    font-size: 1.1rem;
    margin: 0 0 5px;
  }
`;

const SlideSpecs = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin: 0 0 15px;
  font-weight: 400;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 0 0 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 0 0 8px;
    line-height: 1.2;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
    margin: 0 0 6px;
  }
`;

const SlidePrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fcc201;
  margin: 15px 0;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin: 10px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin: 8px 0;
  }
  
  @media (max-width: 360px) {
    font-size: 1rem;
    margin: 6px 0;
  }
`;

const SlideCategory = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 12px;
  background: rgba(252, 194, 1, 0.95);
  color: #000;
  font-weight: 600;
  font-size: 0.75rem;
  border-radius: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    font-size: 0.7rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    font-size: 0.65rem;
    border-radius: 10px;
  }
  
  @media (max-width: 360px) {
    top: 6px;
    right: 6px;
    padding: 3px 6px;
    font-size: 0.6rem;
    border-radius: 8px;
  }
`;

const SlideButton = styled.button`
  background: transparent;
  border: 2px solid #fcc201;
  color: #fcc201;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  touch-action: manipulation;

  &:hover {
    background: #fcc201;
    color: #000;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
    margin-top: 10px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.8rem;
    margin-top: 8px;
    border-radius: 18px;
    letter-spacing: 0.5px;
  }
  
  @media (max-width: 360px) {
    padding: 6px 12px;
    font-size: 0.75rem;
    margin-top: 6px;
    border-radius: 15px;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.4);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  z-index: 10;
  transition: all 0.3s ease;
  touch-action: manipulation;

  &:hover {
    background: rgba(252, 194, 1, 0.8);
    border-color: #fcc201;
    transform: translateY(-50%) scale(1.05);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:focus {
    outline: none;
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 18px;
    ${props => props.direction === 'left' ? 'left: 15px;' : 'right: 15px;'}
    background: rgba(0, 0, 0, 0.9);
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
    ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  }
  
  @media (max-width: 360px) {
    width: 35px;
    height: 35px;
    font-size: 14px;
    ${props => props.direction === 'left' ? 'left: 5px;' : 'right: 5px;'}
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    margin-top: 15px;
    padding: 0 10px;
  }
  
  @media (max-width: 360px) {
    margin-top: 12px;
    padding: 0 5px;
  }
`;

const ProgressDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#fcc201' : 'rgba(255, 255, 255, 0.4)'};
  margin: 0 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  touch-action: manipulation;

  &:hover {
    transform: scale(1.2);
    background: ${props => props.active ? '#fcc201' : 'rgba(255, 255, 255, 0.6)'};
  }
  
  &:active {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 9px;
    height: 9px;
    margin: 0 5px;
  }
  
  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
    margin: 0 4px;
  }
  
  @media (max-width: 360px) {
    width: 7px;
    height: 7px;
    margin: 0 3px;
  }
`;

const SwipeIndicator = styled.div`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  text-align: center;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  @media (min-width: 769px) {
    display: none;
  }
  
  @media (max-width: 480px) {
    bottom: 60px;
    font-size: 0.7rem;
  }
  
  @media (max-width: 360px) {
    bottom: 50px;
    font-size: 0.65rem;
  }
`;

const PremiumCarousel = () => {
  const { vehicles, loading, error } = useVehicles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const slideInterval = useRef(null);
  const dragX = useMotionValue(0);
  
  // Detectar se é dispositivo touch
  const isTouchDevice = useRef(false);
  
  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Esconder indicador de swipe após 3 segundos
    const timer = setTimeout(() => {
      setShowSwipeIndicator(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Preload das imagens com otimização
  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      vehicles.forEach((vehicle, index) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => new Set([...prev, index]));
        };
        img.onerror = () => {
          console.warn(`Falha ao carregar imagem: ${vehicle.image}`);
        };
        // Priorizar imagem atual e próximas
        if (index === currentIndex || index === (currentIndex + 1) % vehicles.length) {
          img.loading = 'eager';
        } else {
          img.loading = 'lazy';
        }
        img.src = vehicle.image;
      });
    }
  }, [vehicles, currentIndex]);
  
  useEffect(() => {
    if (vehicles && vehicles.length > 0 && !isDragging) {
      startSlideTimer();
    }
    return () => clearInterval(slideInterval.current);
  }, [currentIndex, vehicles, isDragging]);
  
  const startSlideTimer = useCallback(() => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      handleNext();
    }, 7000); // Aumentado para 7 segundos
  }, []);
  
  const handleNext = useCallback(() => {
    if (vehicles && vehicles.length > 0) {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
    }
  }, [vehicles]);
  
  const handlePrev = useCallback(() => {
    if (vehicles && vehicles.length > 0) {
      setDirection(-1);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
    }
  }, [vehicles]);
  
  const handleDotClick = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setShowSwipeIndicator(false);
  }, [currentIndex]);
  
  // Gestos de swipe otimizados
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    clearInterval(slideInterval.current);
    setShowSwipeIndicator(false);
  }, []);
  
  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      if (offset > 0 || velocity > 500) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    
    dragX.set(0);
    startSlideTimer();
  }, [handleNext, handlePrev, startSlideTimer, dragX]);
  
  const openVideoModal = useCallback(() => {
    clearInterval(slideInterval.current);
    setVideoModalOpen(true);
  }, []);
  
  const closeVideoModal = useCallback(() => {
    setVideoModalOpen(false);
    startSlideTimer();
  }, [startSlideTimer]);
  
  // Animações ultra suaves para mobile
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 120,
        damping: 25,
        opacity: { duration: 0.6 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.6,
        opacity: { duration: 0.4 },
      },
    }),
  };
  
  if (loading) return <div className="loading">Carregando veículos...</div>;
  if (error) return <div className="error">Erro ao carregar veículos: {error}</div>;
  
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
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {vehicle && (
            <CarouselSlide
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag={isTouchDevice.current ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
            >
              <SlideImageContainer>
                <SlideImage 
                  src={vehicle.image} 
                  onError={handleImageError} 
                  alt={vehicle.name}
                  loading={imagesLoaded.has(currentIndex) ? "eager" : "lazy"}
                  draggable={false}
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
        
        <SwipeIndicator show={showSwipeIndicator && isTouchDevice.current}>
          ← Deslize para navegar →
        </SwipeIndicator>
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
            playsInline
          />
        )}
      </VideoModal>
    </CarouselContainer>
  );
};

export default PremiumCarousel;
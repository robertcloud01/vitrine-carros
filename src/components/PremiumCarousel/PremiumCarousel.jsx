import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import styled from 'styled-components';
import { useVehicles } from '../../hooks/useVehicles';
import './PremiumCarousel.css';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  touch-action: pan-y;
  
  @media screen and (max-width: 480px) {
    height: 100vh;
    height: 100dvh;
    padding: 0;
    overflow-x: hidden;
  }
  
  @media screen and (min-width: 481px) and (max-width: 768px) {
    height: 100vh;
    padding: 0.5rem;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    height: 100vh;
    padding: 1rem;
  }
  
  @media screen and (min-width: 1025px) {
    height: 100vh;
    padding: 2rem;
  }
`;

const CarouselTitle = styled.h2`
  font-size: clamp(1.5rem, calc(1.2rem + 2vw), 3rem);
  font-weight: 300;
  letter-spacing: clamp(1px, calc(0.5px + 0.5vw), 4px);
  text-transform: uppercase;
  margin: 0;
  background: linear-gradient(90deg, #b78628, #fcc201, #b78628);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media screen and (max-width: 480px) {
    font-size: clamp(1.2rem, calc(1rem + 1.5vw), 1.8rem);
    letter-spacing: clamp(0.5px, calc(0.3px + 0.3vw), 1px);
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: clamp(10px, calc(5px + 1vw), 20px);' : 'right: clamp(10px, calc(5px + 1vw), 20px);'}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.4);
  width: clamp(40px, calc(35px + 1vw), 50px);
  height: clamp(40px, calc(35px + 1vw), 50px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: clamp(14px, calc(12px + 0.5vw), 20px);
  z-index: 10;
  transition: all 0.3s ease;
  touch-action: manipulation;

  &:hover, &:focus {
    background: rgba(252, 194, 1, 0.8);
    border-color: #fcc201;
    transform: translateY(-50%) scale(1.05);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media screen and (max-width: 480px) {
    width: clamp(35px, calc(30px + 1vw), 40px);
    height: clamp(35px, calc(30px + 1vw), 40px);
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(5px);
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
  border-radius: clamp(0.5rem, calc(0.4rem + 0.5vw), 1rem);
  overflow: hidden;
  box-shadow: 0 clamp(10px, calc(8px + 1vw), 25px) clamp(20px, calc(15px + 2vw), 50px) rgba(0, 0, 0, 0.5);
  cursor: pointer;
  background: #000;
  display: flex;
  user-select: none;
  width: clamp(280px, calc(90vw), 800px);
  height: clamp(200px, calc(40vh), 450px);
  
  @media screen and (max-width: 480px) {
    width: calc(100vw - 2rem);
    max-width: 95vw;
    height: clamp(320px, calc(50vh), 400px);
    flex-direction: column;
    position: relative;
    margin: 0 auto;
  }
  
  @media screen and (min-width: 481px) and (max-width: 768px) {
    width: calc(100vw - 2rem);
    max-width: 90vw;
    height: clamp(300px, calc(40vh), 350px);
    flex-direction: column;
    position: relative;
    margin: 0 auto;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: clamp(600px, calc(80vw), 700px);
    height: clamp(350px, calc(45vh), 400px);
  }
  
  @media screen and (min-width: 1025px) {
    width: 800px;
    height: 450px;
  }
`;

const SlideImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #000;
  
  @media (max-width: 768px) {
    height: 60%;
    flex: none;
    display: block;
  }
  
  @media (max-width: 480px) {
    height: 65%;
    display: block;
    width: 100%;
  }
  
  @media (max-width: 360px) {
    height: 70%;
  }
`;

const handleImageError = (e) => {
  e.target.style.display = 'none';
  const parent = e.target.parentElement;
  if (parent) {
    parent.style.background = '#333';
  }
};

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transition: transform 0.3s ease-out;
  background: #000;
  pointer-events: none;
  display: block;
  
  @media (max-width: 768px) {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  }
  
  @media (max-width: 480px) {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
    transform: none;
  }
  
  @media (hover: hover) {
    &:hover {
      transform: scale(1.02);
    }
  }
  
  @media (max-width: 480px) {
    &:hover {
      transform: none;
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
  display: flex;
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
    height: 40%;
    flex: none;
    justify-content: flex-start;
  }
  
  @media (max-width: 480px) {
    padding: 18px;
    height: 35%;
    gap: 4px;
  }
  
  @media (max-width: 360px) {
    padding: 15px;
    height: 30%;
    gap: 3px;
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
    font-size: 1.1rem;
    margin: 0 0 4px;
    line-height: 1.1;
  }
  
  @media (max-width: 360px) {
    font-size: 1rem;
    margin: 0 0 3px;
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
    font-size: 0.75rem;
    margin: 0 0 6px;
    line-height: 1.2;
  }
  
  @media (max-width: 360px) {
    font-size: 0.7rem;
    margin: 0 0 4px;
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
    font-size: 1rem;
    margin: 6px 0;
  }
  
  @media (max-width: 360px) {
    font-size: 0.9rem;
    margin: 4px 0;
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
    padding: 6px 14px;
    font-size: 0.7rem;
    margin-top: 6px;
    border-radius: 16px;
    letter-spacing: 0.5px;
  }
  
  @media (max-width: 360px) {
    padding: 5px 12px;
    font-size: 0.65rem;
    margin-top: 4px;
    border-radius: 14px;
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
  background: ${props => props.active ? '#fcc201' : 'rgba(255, 255, 255, 0.3)'};
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
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);
  const [videoModal, setVideoModal] = useState({ show: false, url: '' });
  const [isDragging, setIsDragging] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-200, 0, 200], [-1, 0, 1]);
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection) => {
    if (!vehicles.length) return;
    
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex >= vehicles.length) return 0;
      if (nextIndex < 0) return vehicles.length - 1;
      return nextIndex;
    });
    setShowSwipeIndicator(false);
  }, [vehicles.length]);

  const handleDragEnd = useCallback((e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
    
    setIsDragging(false);
    dragX.set(0);
  }, [paginate, dragX]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setAutoPlay(false);
  }, []);

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return;
    
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
    setShowSwipeIndicator(false);
  }, [currentIndex]);

  const openVideoModal = useCallback((videoUrl) => {
    setVideoModal({ show: true, url: videoUrl });
  }, []);

  const closeVideoModal = useCallback(() => {
    setVideoModal({ show: false, url: '' });
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || vehicles.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, paginate, vehicles.length]);

  // Resume auto-play after user interaction
  useEffect(() => {
    if (!autoPlay) {
      const timer = setTimeout(() => {
        setAutoPlay(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  // Hide swipe indicator after some time
  useEffect(() => {
    if (showSwipeIndicator) {
      const timer = setTimeout(() => {
        setShowSwipeIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSwipeIndicator]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'Escape' && videoModal.show) {
        closeVideoModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, videoModal.show, closeVideoModal]);

  if (loading) {
    return (
      <CarouselContainer>
        <CarouselHeader>
          <CarouselTitle>Carregando...</CarouselTitle>
        </CarouselHeader>
      </CarouselContainer>
    );
  }

  if (error) {
    return (
      <CarouselContainer>
        <CarouselHeader>
          <CarouselTitle>Erro ao carregar veículos</CarouselTitle>
          <CarouselSubtitle>{error}</CarouselSubtitle>
        </CarouselHeader>
      </CarouselContainer>
    );
  }

  if (!vehicles.length) {
    return (
      <CarouselContainer>
        <CarouselHeader>
          <CarouselTitle>Nenhum veículo encontrado</CarouselTitle>
          <CarouselSubtitle>Verifique sua conexão ou tente novamente mais tarde</CarouselSubtitle>
        </CarouselHeader>
      </CarouselContainer>
    );
  }

  const currentVehicle = vehicles[currentIndex];

  return (
    <CarouselContainer ref={containerRef}>
      <CarouselHeader>
        <CarouselTitle>Coleção Exclusiva</CarouselTitle>
        <CarouselSubtitle>Veículos Premium Selecionados</CarouselSubtitle>
      </CarouselHeader>

      <CarouselTrack>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <CarouselSlide
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              rotateY: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ x: dragX }}
          >
            <SlideImageContainer>
              <SlideImage
                src={currentVehicle.image}
                alt={currentVehicle.name}
                onError={handleImageError}
                loading="lazy"
              />
              {currentVehicle.video && (
                <VideoOverlay>
                  <VideoButton
                    onClick={() => openVideoModal(currentVehicle.video)}
                    aria-label="Reproduzir vídeo"
                  >
                    ▶
                  </VideoButton>
                </VideoOverlay>
              )}
              <SlideCategory>{currentVehicle.category}</SlideCategory>
            </SlideImageContainer>

            <SlideContent>
              <SlideName>{currentVehicle.name}</SlideName>
              <SlideSpecs>{currentVehicle.specs}</SlideSpecs>
              <SlidePrice>
                {currentVehicle.price || 'Consulte'}
              </SlidePrice>
              <SlideButton
                onClick={() => window.open(`/vehicle/${currentVehicle.id}`, '_blank')}
              >
                Ver Detalhes
              </SlideButton>
            </SlideContent>
          </CarouselSlide>
        </AnimatePresence>

        {vehicles.length > 1 && (
          <>
            <NavigationButton
              direction="left"
              onClick={() => paginate(-1)}
              aria-label="Slide anterior"
            >
              ‹
            </NavigationButton>
            <NavigationButton
              direction="right"
              onClick={() => paginate(1)}
              aria-label="Próximo slide"
            >
              ›
            </NavigationButton>
          </>
        )}

        <SwipeIndicator show={showSwipeIndicator}>
          ← Deslize para navegar →
        </SwipeIndicator>
      </CarouselTrack>

      {vehicles.length > 1 && (
        <ProgressBar>
          {vehicles.map((_, index) => (
            <ProgressDot
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </ProgressBar>
      )}

      {videoModal.show && (
        <VideoModal onClick={closeVideoModal}>
          <CloseButton onClick={closeVideoModal} aria-label="Fechar vídeo">
            ×
          </CloseButton>
          <VideoPlayer
            src={videoModal.url}
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        </VideoModal>
      )}
    </CarouselContainer>
  );
};

export default PremiumCarousel;
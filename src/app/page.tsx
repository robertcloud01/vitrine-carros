import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedVehicles from '@/components/sections/FeaturedVehicles';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'VitrineLux - Dirija o Futuro. Seu Próximo Carro Está Aqui.',
  description: 'Curadoria de veículos premium com inspeção técnica e atendimento boutique. Descubra nossa seleção exclusiva de carros de alto padrão.',
  openGraph: {
    title: 'VitrineLux - Dirija o Futuro. Seu Próximo Carro Está Aqui.',
    description: 'Curadoria de veículos premium com inspeção técnica e atendimento boutique.',
    images: ['/og-home.jpg'],
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedVehicles />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}

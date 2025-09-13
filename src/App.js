import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header/Header';
import PremiumCarousel from './components/PremiumCarousel/PremiumCarousel';
import ContactForm, { ContactButton } from './components/ContactForm/ContactForm';
import SalesTeam from './components/SalesTeam/SalesTeam';

function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  // Efeito para animação de carregamento inicial
  useEffect(() => {
    // Adiciona classe ao body quando o componente monta
    document.body.classList.add('loaded');
    
    return () => {
      // Remove classe quando o componente desmonta
      document.body.classList.remove('loaded');
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        className="App"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <PremiumCarousel />
          
          {/* Seção da Equipe de Vendas */}
          <SalesTeam />
          
          {/* Botão de contato flutuante */}
          <motion.div 
            className="contact-button-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <ContactButton 
              onClick={() => setContactModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-envelope"></i> Entre em Contato
            </ContactButton>
          </motion.div>
        </motion.main>
        
        {/* Modal de contato */}
        <ContactForm 
          isOpen={contactModalOpen} 
          onClose={() => setContactModalOpen(false)} 
        />
        
        <motion.footer 
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p>&copy; 2023 Vitrine de Carros. Todos os direitos reservados.</p>
        </motion.footer>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;

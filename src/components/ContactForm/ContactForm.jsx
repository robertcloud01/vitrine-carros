import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import './ContactForm.css';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const ModalContainer = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 10;
  
  &:hover {
    color: #fcc201;
  }
`;

const ContactTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin: 0 0 20px;
  text-align: center;
  background: linear-gradient(90deg, #b78628, #fcc201, #b78628);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ContactSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #aaa;
  margin: 0 0 40px;
  font-weight: 300;
  letter-spacing: 2px;
  text-align: center;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #ddd;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #fcc201;
    box-shadow: 0 0 10px rgba(252, 194, 1, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #fcc201;
    box-shadow: 0 0 10px rgba(252, 194, 1, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(90deg, #b78628, #fcc201, #b78628);
  color: #000;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 30px auto 0;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(0, 128, 0, 0.2);
  border: 1px solid rgba(0, 128, 0, 0.5);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  color: #4caf50;
  text-align: center;
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(255, 0, 0, 0.2);
  border: 1px solid rgba(255, 0, 0, 0.5);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  color: #f44336;
  text-align: center;
`;

// Botão para abrir o modal
export const ContactButton = styled(motion.button)`
  background: linear-gradient(90deg, #b78628, #fcc201, #b78628);
  color: #000;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  i {
    font-size: 1.2rem;
  }
`;

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: false,
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Fechar o modal com a tecla ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  // Impedir o scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulando envio para um servidor
      setTimeout(() => {
        setFormStatus({
          submitted: true,
          success: true,
          error: false,
          message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
        });
        
        // Limpar o formulário após envio bem-sucedido
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Fechar o modal após 3 segundos
        setTimeout(() => {
          onClose();
          // Resetar o status após fechar
          setTimeout(() => {
            setFormStatus(prev => ({ 
              ...prev, 
              submitted: false, 
              success: false 
            }));
          }, 500);
        }, 3000);
      }, 1500);
    }
  };
  
  // Variantes de animação
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={onClose}
        >
          <ModalContainer
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              &times;
            </CloseButton>
            
            <ContactTitle variants={itemVariants}>
              Entre em Contato
            </ContactTitle>
            
            <ContactSubtitle variants={itemVariants}>
              Estamos à disposição para atender suas necessidades e responder a todas as suas dúvidas sobre nossos veículos e serviços.
            </ContactSubtitle>
            
            {formStatus.success && (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {formStatus.message}
              </SuccessMessage>
            )}
            
            {formStatus.error && (
              <ErrorMessage
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {formStatus.message}
              </ErrorMessage>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormGroup variants={itemVariants}>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Seu email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Seu telefone"
                />
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Assunto da mensagem"
                />
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="message">Mensagem</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Digite sua mensagem aqui..."
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </FormGroup>
              
              <SubmitButton
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
              >
                Enviar Mensagem
              </SubmitButton>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
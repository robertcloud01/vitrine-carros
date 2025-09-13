import React, { useState } from 'react';
import './Header.css';
// import logoImage from '../../assets/images/logo-valhallas.png'; // Remova esta linha

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src="/assets/images/logo-valhallas.png" alt="Logo Valhallas" className="logo-image" />
          <div className="logo">
            <h1>Vitrine de Carros</h1>
          </div>
        </div>
        
        {/* Botão hamburger para mobile */}
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#esportivos" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-car-side"></i>
                <span>Esportivos</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#exclusivos" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-crown"></i>
                <span>Exclusivos</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#suvs" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-truck"></i>
                <span>SUVs</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#sales-team" onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll('sales-team');
              }}>
                <i className="fas fa-envelope"></i>
                <span>Contato</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
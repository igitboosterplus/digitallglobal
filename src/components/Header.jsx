import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import './Header.css';

const Header = ({ onReserveClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    if (onNavigate) onNavigate();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header-custom ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'open-menu' : ''}`}>
      <div className="container header-container">
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="logo-custom" onClick={handleNavClick} style={{ cursor: 'pointer' }}>
          Digitall<span>global</span>
        </div>

        <div
          className={`nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <nav className={`nav-custom ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#solution" className="nav-link-custom" onClick={handleNavClick}>La solution</a>
          <a href="#tarifs" className="nav-link-custom" onClick={handleNavClick}>Tarifs</a>
          <a href="#avis" className="nav-link-custom" onClick={handleNavClick}>Avis clients</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onReserveClick(); handleNavClick(); }} className="nav-link-custom">Contact</a>
          <a href="#member-area" className="nav-link-custom" onClick={handleNavClick}>Espace membre</a>
        </nav>

        <div className="header-actions">
          <button
            className="btn btn-orange-header"
            onClick={() => { onReserveClick(); handleNavClick(); }}
          >
            Réserver un appel
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

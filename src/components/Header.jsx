import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
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
          <img
            src="/logo-digitall.png"
            alt="Digitall Global Logo"
            className="logo-img"
          />
        </div>

        <div
          className={`nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <nav className={`nav-custom ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="/#solution" className="nav-link-custom" onClick={handleNavClick}>La solution</a>
          <a href="/#tarifs" className="nav-link-custom" onClick={handleNavClick}>Tarifs</a>
          <a href="/#avis" className="nav-link-custom" onClick={handleNavClick}>Avis clients</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onReserveClick(); handleNavClick(); }} className="nav-link-custom">Contact</a>
          <Link to="/member-area" className="nav-link-custom" onClick={handleNavClick}>Espace membre</Link>
        </nav>

        <div className="header-actions">
          <button
            className="btn btn-orange-header"
            onClick={() => { onReserveClick(); handleNavClick(); }}
          >
            <span className="btn-text-desktop">Réserver un appel</span>
            <span className="btn-text-mobile">Réserver</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

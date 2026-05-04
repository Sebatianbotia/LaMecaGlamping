import React, { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <div className="logo">
          <Cloud className="logo-icon" size={24} color="#E8B849" />
          <div className="logo-text">
            <span className="logo-title">LA MECA</span>
            <span className="logo-subtitle">GLAMPING</span>
          </div>
        </div>
        
        <ul className="nav-links">
          <li><a href="#experiencia">EXPERIENCIA</a></li>
          <li><a href="#gastronomia">GASTRONOMÍA</a></li>
          <li><a href="#domos">DOMOS</a></li>
          <li><a href="#contacto">CONTACTO</a></li>
        </ul>

        <div className="nav-action">
          <button className="btn-primary">RESERVAR AHORA</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

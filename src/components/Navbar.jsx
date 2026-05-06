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

        <ul className="nav-links">
          <li><a href="#experiencia">EXPERIENCIA</a></li>
          <li><a href="#gastronomia">GASTRONOMÍA</a></li>
          <li><a href="#domos">DOMOS</a></li>
          <li><a href="#contacto">CONTACTO</a></li>
        </ul>

        <div className="nav-action">
          <a className="btn-primary"
            href={`https://wa.me/573112340584?text=${encodeURIComponent(`Hola, estoy interesado en reservar `)}`}
            target="_blank"
            rel="noopener noreferrer"
          >RESERVAR AHORA</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

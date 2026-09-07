import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#espacios', label: 'Espacios' },
  { href: '#domos', label: 'Alojamiento' },
  { href: '#gastronomia', label: 'Restaurante' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#resenas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#inicio" className="logo" onClick={closeMenu} aria-label="La Meca Glamping — Inicio">
          <h1 className="logo-text">
            <span className="logo-title">LA MECA</span>
            <span className="logo-subtitle">GLAMPING</span>
          </h1>
        </a>

        {/* Desktop Links */}
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          <a href="https://drive.google.com/file/d/1jmcfrNGzRlVaJ8MIxAe_VE4kE7oOLneI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="nav-menu-btn" style={{color: 'var(--color-accent)', fontWeight: 'bold'}}>VER MENÚ</a>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="mobile-nav-link">
              {link.label}
            </a>
          ))}
          <a href="https://drive.google.com/file/d/1jmcfrNGzRlVaJ8MIxAe_VE4kE7oOLneI/view?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="mobile-nav-link" style={{color: 'var(--color-accent)', fontWeight: 'bold'}}>
            VER MENÚ DIGITAL
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

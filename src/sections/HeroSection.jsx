import React from 'react';
import Reveal from '../components/Reveal';
import './HeroSection.css';

// Visually hidden style — invisible to users, readable by bots & screen readers
const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const HeroSection = () => {
  return (
    <section className="hero-section" id="inicio">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/suite.png"
      >
        <source src="/fondo.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {/* SEO: h1 visually hidden — crawlers and screen readers see it, users don't */}
        <h1 style={srOnly}>
          La Meca Glamping — Glamping &amp; Restaurante Campestre en Guasca, Cundinamarca. Domos geodésicos con jacuzzi panorámico a 1 hora de Bogotá.
        </h1>
        <Reveal variant="fade-up" delay="100ms" duration="1000ms">
          <img
            src="/LOGO.png"
            alt="La Meca Glamping — Glamping y Restaurante Campestre en Guasca, Cundinamarca"
            className="hero-logo"
          />
        </Reveal>

        <Reveal variant="fade-up" delay="580ms" duration="900ms">
          <div className="hero-buttons">
            <a href="#domos" className="btn-primary hero-btn">SOLICITAR RESERVA ALOJAMIENTO</a>
            <a href="#reserva-mesa" className="btn-secondary hero-btn">SOLICITAR RESERVA RESTAURANTE</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;

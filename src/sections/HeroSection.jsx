import React from 'react';
import Reveal from '../components/Reveal';
import './HeroSection.css';

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
        <Reveal variant="fade-up" delay="100ms" duration="1000ms">
          <h1>Tu historia merece este lugar</h1>
        </Reveal>
        <Reveal variant="fade-up" delay="350ms" duration="900ms">
          <p>El escenario perfecto en Guasca para vivir emociones reales.</p>
        </Reveal>
        <Reveal variant="fade-up" delay="580ms" duration="900ms">
          <div className="hero-buttons">
            <a href="#domos" className="btn-primary hero-btn">SOLICITAR RESERVA ALOJAMIENTO</a>
            <a href="#contacto" className="btn-secondary hero-btn">SOLICITAR RESERVA RESTAURANTE</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;

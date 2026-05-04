import React from 'react';
import Reveal from '../components/Reveal';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <Reveal variant="fade-up" delay="100ms" duration="1000ms">
          <h1>Tu historia merece este lugar</h1>
        </Reveal>
        <Reveal variant="fade-up" delay="350ms" duration="900ms">
          <p>El escenario perfecto en Guasca para vivir emociones reales.</p>
        </Reveal>
        <Reveal variant="fade-up" delay="580ms" duration="900ms">
          <button className="btn-primary hero-btn">SOLICITA TU RESERVA</button>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;

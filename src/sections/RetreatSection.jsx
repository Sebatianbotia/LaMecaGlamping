import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Gem, MapPin } from 'lucide-react';
import Reveal from '../components/Reveal';
import './RetreatSection.css';

const features = [
  { Icon: Sparkles, label: 'CIELOS ESTRELLADOS' },
  { Icon: Flame, label: 'FOGATAS PRIVADAS' },
  { Icon: Gem, label: 'EXCLUSIVIDAD' },
  { Icon: MapPin, label: 'A 1 HORA DE BOGOTÁ' },
];

const carouselImages = [
  '/fogata.png',
  '/Comunidad/meca9.PNG',
  '/Comunidad/meca10.PNG',
  '/Comunidad/meca12.PNG',
  '/Comunidad/meca13.jpg',
  '/Comunidad/meca11.PNG'
];


const RetreatSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(carouselImages.length - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => {
        setPrevImageIndex(prev);
        return prev === carouselImages.length - 1 ? 0 : prev + 1;
      });
    }, 2500); // slightly longer interval to appreciate the photos
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="retreat-section" id="experiencia">
      <div className="container retreat-container">
        <div className="retreat-content">
          <Reveal variant="fade-left" delay="0ms">
            <span className="section-title-tag">QUIENES SOMOS</span>
          </Reveal>
          <Reveal variant="fade-left" delay="120ms">
            <h2>Un refugio para desconectar y volver a conectar</h2>
          </Reveal>
          <Reveal variant="fade-left" delay="240ms">
            <p>
              En La Meca Glamping, el tiempo se detiene. Hemos diseñado un espacio
              donde el silencio de la montaña se convierte en la banda sonora de tus
              momentos más significativos. Un santuario para el alma diseñado para
              vivir emociones reales.
            </p>
          </Reveal>

          <div className="features-grid">
            {features.map(({ Icon, label }, i) => (
              <Reveal key={label} variant="fade-up" delay={`${300 + i * 100}ms`}>
                <div className="feature-item">
                  <Icon className="feature-icon" size={20} />
                  <span>{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="fade-right" delay="200ms" className="retreat-image-wrapper">
          {carouselImages.map((src, index) => {
            let className = 'retreat-image carousel-image';
            if (index === currentImageIndex) className += ' active';
            else if (index === prevImageIndex) className += ' prev';

            return (
              <img
                key={src}
                src={src}
                alt={`Experiencia La Meca ${index + 1}`}
                className={className}
              />
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

export default RetreatSection;

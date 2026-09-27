import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Gem, MapPin, PawPrint } from 'lucide-react';
import Reveal from '../components/Reveal';
import './RetreatSection.css';

const features = [
  { Icon: Sparkles, label: 'CIELOS ESTRELLADOS' },
  { Icon: Flame, label: 'FOGATAS PRIVADAS' },
  { Icon: Gem, label: 'EXCLUSIVIDAD' },
  { Icon: MapPin, label: 'A 1 HORA DE BOGOTÁ' },
  { Icon: PawPrint, label: 'PET FRIENDLY' },
];

const carouselImages = [
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523516/meca6.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523516/meca7.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523516/meca5.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523516/meca4.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523515/meca1.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523515/meca3.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523515/meca2.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523514/meca12.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523514/meca13.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523514/meca8.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523514/meca16.jpg',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523514/meca15.jpg',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523514/meca11.png',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523514/meca14.jpg',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523513/meca10.jpg',
  'https://res.cloudinary.com/kne5vgk7/image/upload/q_auto,f_auto/v1790523513/meca9.jpg'
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
    }, 2500);
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
            <h2>Un refugio para desconectar en Guasca, Cundinamarca</h2>
          </Reveal>
          <Reveal variant="fade-left" delay="240ms">
            <p>
              La Meca Glamping es un destino creado para vivir experiencias memorables en medio de la naturaleza. Somos glamping y restaurante abierto al público, un espacio donde la gastronomía, la música, el arte y las increíbles vistas a las montañas se unen para crear momentos únicos. Creemos que cada visita debe sentirse diferente. Por eso diseñamos espacios cálidos y llenos de personalidad, donde cada detalle: la iluminación, la decoración, la música y el ambiente, transmite una energía especial. Nuestros domos ofrecen comodidad y conexión con la naturaleza, mientras que el restaurante invita a disfrutar buena comida en un entorno auténtico y acogedor.
            </p>
          </Reveal>
          <Reveal variant="fade-left" delay="360ms">
            <p>
              La experiencia gastronómica es parte esencial de La Meca. Nos apasiona crear platos para compartir, cenas especiales y momentos que se disfrutan no solo por el sabor, sino también por el ambiente que los rodea: una conversación junto a la fogata, música acompañando la noche y una vista inolvidable de las montañas de Guasca.
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
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

export default RetreatSection;

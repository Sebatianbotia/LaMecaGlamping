import React from 'react';
import { Flame, Leaf, Wine } from 'lucide-react';
import Reveal from '../components/Reveal';
import './GastronomySection.css';

/* All food images flat — used by mobile carousel */
const carouselImages = [
  { src: '/restaurante/local2.jpg', alt: 'Interior del Restaurante' },
  { src: '/restaurante/burguer.png', alt: 'Hamburguesa' },
  { src: '/restaurante/vino.png', alt: 'Selección de vinos' },
  { src: '/restaurante/steak1.png', alt: 'Corte de carne' },
  { src: '/restaurante/plato.png', alt: 'Plato especial' },
  { src: '/restaurante/local.png', alt: 'Ambiente del lugar' },
  { src: '/restaurante/copa.png', alt: 'Postre en copa' },
  { src: '/restaurante/steak2.png', alt: 'Carne a la parrilla' },
  { src: '/restaurante/burguer2.png', alt: 'Hamburguesa especial' },
  { src: '/restaurante/pollo.png', alt: 'Plato con pollo' },
  { src: '/restaurante/steak3.png', alt: 'Carne en plato' },
];

const GastronomySection = () => {
  return (
    <section className="gastronomy-section" id="gastronomia">
      <div className="container">
        <div className="gastronomy-intro">
          <div className="gastronomy-intro-left">
            <Reveal variant="fade-up" delay="0ms">
              <span className="section-title-tag">ABIERTO AL PÚBLICO | RESTAURANTE CAMPESTRE, EXCLUSIVO</span>
            </Reveal>
            <Reveal variant="fade-up" delay="120ms">
              <h2>Una experiencia culinaria salvaje y refinada</h2>
            </Reveal>
          </div>
          <div className="gastronomy-intro-right">
            <Reveal variant="fade-left" delay="240ms">
              <p>El restaurante de La Meca Glamping ofrece una experiencia gastronómica única, liderada por la Chef Clau, quien durante más de 20 años ha perfeccionado una propuesta de cocina de autor donde cada plato refleja creatividad, técnica y pasión por la buena comida. Nuestra especialidad son las carnes, acompañadas de mantequillas compuestas y preparaciones creadas para resaltar sabores auténticos y memorables. Más que un restaurante, somos un espacio donde la gastronomía, la música, el arte y la naturaleza se unen para convertir cada visita en una experiencia inolvidable.</p>
            </Reveal>
            <Reveal variant="fade-left" delay="360ms">
              <div className="gastronomy-features">
                <div className="g-feature"><Flame size={18} /> <span>Carnes Maduradas</span></div>
                <div className="g-feature"><Leaf size={18} /> <span>Angus Certificado</span></div>
                <div className="g-feature"><Wine size={18} /> <span>Cocina de Autor</span></div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Infinite Loop Carousel ──────────────────────────────────── */}
        <div className="gastronomy-marquees">
          <div className="marquee-container">
            <div className="marquee-content left">
              {[...carouselImages.slice(0, 6), ...carouselImages.slice(0, 6)].map((img, i) => (
                <div key={i} className="marquee-img-wrapper">
                  <img src={img.src} alt={img.alt} className="marquee-img" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className="marquee-container">
            <div className="marquee-content right">
              {[...carouselImages.slice(6), ...carouselImages.slice(6), ...carouselImages.slice(6)].map((img, i) => (
                <div key={i} className="marquee-img-wrapper">
                  <img src={img.src} alt={img.alt} className="marquee-img" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal variant="fade-up" delay="100ms">
          <div className="gastronomy-action-card">
            <div className="action-text">
              <h3>¿Listo para vivir la experiencia?</h3>
              <p>Asegura tu lugar en nuestra mesa. Capacidad limitada para garantizar exclusividad.</p>
            </div>
            <div className="action-buttons">
              <a className="btn-primary"
                href={`https://wa.me/573112340584?text=${encodeURIComponent(`Hola, quisiera reservar una mesa`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >RESERVAR MESA</a>
              <a href="/MENU.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">VER MENÚ DIGITAL</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GastronomySection;

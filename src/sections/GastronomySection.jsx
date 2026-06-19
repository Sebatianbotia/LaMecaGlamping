import React, { useState, useEffect } from 'react';
import { Flame, Leaf, Wine, X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';
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

const Lightbox = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div className="lightbox-overlay" onClick={handleClose}>
      <button className="lightbox-close" onClick={handleClose} aria-label="Cerrar"><X size={24} /></button>
      <button className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Anterior"><ChevronLeft size={32} /></button>
      <button className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Siguiente"><ChevronRight size={32} /></button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={images[currentIndex]} alt="Fullscreen view" className="lightbox-img" />
        <div className="lightbox-counter">{currentIndex + 1} / {images.length}</div>
      </div>
    </div>
  );
};

const GastronomySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const openGallery = (index) => {
    setActiveImg(index);
    setLightboxOpen(true);
  };

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
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
                <button className="btn-outline" onClick={() => openGallery(0)}>
                  <Maximize size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                  VER GALERÍA COMPLETA
                </button>
                <a href="/MENU.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  VER MENÚ DIGITAL
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="gastronomy-marquees">
          <div className="marquee-container">
            <div className="marquee-content left">
              {[...carouselImages.slice(0, 6), ...carouselImages.slice(0, 6)].map((img, i) => {
                const realIndex = i % 6;
                return (
                  <div key={i} className="marquee-img-wrapper" onClick={() => openGallery(realIndex)} style={{ cursor: 'pointer' }}>
                    <img src={img.src} alt={img.alt} className="marquee-img" loading="lazy" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="marquee-container">
            <div className="marquee-content right">
              {[...carouselImages.slice(6), ...carouselImages.slice(6), ...carouselImages.slice(6)].map((img, i) => {
                const realIndex = 6 + (i % 5);
                return (
                  <div key={i} className="marquee-img-wrapper" onClick={() => openGallery(realIndex)} style={{ cursor: 'pointer' }}>
                    <img src={img.src} alt={img.alt} className="marquee-img" loading="lazy" />
                  </div>
                );
              })}
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
                href="#reserva-mesa"
              >RESERVAR MESA</a>
            </div>
          </div>
        </Reveal>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={carouselImages.map(img => img.src)}
          initialIndex={activeImg}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
};

export default GastronomySection;

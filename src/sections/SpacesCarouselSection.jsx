import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';
import Reveal from '../components/Reveal';
import './SpacesCarouselSection.css';

const espaciosImages = [
  { src: '/Comunidad/meca1.png', alt: 'Espacio La Meca 1' },
  { src: '/Comunidad/meca2.png', alt: 'Espacio La Meca 2' },
  { src: '/Comunidad/meca3.png', alt: 'Espacio La Meca 3' },
  { src: '/Comunidad/meca4.png', alt: 'Espacio La Meca 4' },
  { src: '/Comunidad/meca5.png', alt: 'Espacio La Meca 5' },
  { src: '/Comunidad/meca6.PNG', alt: 'Espacio La Meca 6' },
  { src: '/Comunidad/meca7.PNG', alt: 'Espacio La Meca 7' },
  { src: '/Comunidad/meca8.PNG', alt: 'Espacio La Meca 8' },
  { src: '/Comunidad/meca9.jpeg', alt: 'Espacio La Meca 9' },
  { src: '/Comunidad/meca10.jpeg', alt: 'Espacio La Meca 10' },
  { src: '/Comunidad/meca11.PNG', alt: 'Espacio La Meca 11' },
  { src: '/Comunidad/meca12.PNG', alt: 'Espacio La Meca 12' },
  { src: '/Comunidad/meca13.PNG', alt: 'Espacio La Meca 13' },
  { src: '/Comunidad/meca14.jpg', alt: 'Espacio La Meca 14' },
  { src: '/Comunidad/meca15.jpg', alt: 'Espacio La Meca 15' },
  { src: '/Comunidad/meca16.jpg', alt: 'Espacio La Meca 16' }
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

const SpacesCarouselSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const openGallery = (index) => {
    setActiveImg(index);
    setLightboxOpen(true);
  };

  return (
    <section className="spaces-carousel-section" id="espacios">
      <div className="container">
        <Reveal variant="fade-up">
          <div className="section-header text-center">
            <span className="section-title-tag">NUESTROS ESPACIOS</span>
            <h2>Vive la experiencia</h2>
            <p>Descubre cada rincón diseñado para tu descanso y conexión con la naturaleza.</p>
            <button className="btn-outline" style={{ marginTop: '20px' }} onClick={() => openGallery(0)}>
              <Maximize size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              VER GALERÍA COMPLETA
            </button>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay="200ms">
          <div className="spaces-marquees">
            <div className="marquee-container">
              <div className="marquee-content left">
                {[...espaciosImages.slice(0, 8), ...espaciosImages.slice(0, 8)].map((img, i) => {
                  const realIndex = i % 8;
                  return (
                    <div key={i} className="marquee-img-wrapper spaces-marquee-img" onClick={() => openGallery(realIndex)} style={{ cursor: 'pointer' }}>
                      <img src={img.src} alt={img.alt} className="marquee-img" loading="lazy" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="marquee-container">
              <div className="marquee-content right">
                {[...espaciosImages.slice(8), ...espaciosImages.slice(8), ...espaciosImages.slice(8)].map((img, i) => {
                  const realIndex = 8 + (i % 8);
                  return (
                    <div key={i} className="marquee-img-wrapper spaces-marquee-img" onClick={() => openGallery(realIndex)} style={{ cursor: 'pointer' }}>
                      <img src={img.src} alt={img.alt} className="marquee-img" loading="lazy" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={espaciosImages.map(img => img.src)}
          initialIndex={activeImg}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
};

export default SpacesCarouselSection;

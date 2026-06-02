import React from 'react';
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

const SpacesCarouselSection = () => {
  return (
    <section className="spaces-carousel-section" id="espacios">
      <div className="container">
        <Reveal variant="fade-up">
          <div className="section-header text-center">
            <span className="section-title-tag">NUESTROS ESPACIOS</span>
            <h2>Vive la experiencia</h2>
            <p>Descubre cada rincón diseñado para tu descanso y conexión con la naturaleza.</p>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay="200ms">
          <div className="spaces-marquees">
            <div className="marquee-container">
              <div className="marquee-content left">
                {[...espaciosImages.slice(0, 8), ...espaciosImages.slice(0, 8)].map((img, i) => (
                  <div key={i} className="marquee-img-wrapper spaces-marquee-img">
                    <img src={img.src} alt={img.alt} className="marquee-img" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            <div className="marquee-container">
              <div className="marquee-content right">
                {[...espaciosImages.slice(8), ...espaciosImages.slice(8), ...espaciosImages.slice(8)].map((img, i) => (
                  <div key={i} className="marquee-img-wrapper spaces-marquee-img">
                    <img src={img.src} alt={img.alt} className="marquee-img" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SpacesCarouselSection;

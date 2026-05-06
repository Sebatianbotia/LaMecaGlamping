import React from 'react';
import { Flame, Leaf, Wine } from 'lucide-react';
import Reveal from '../components/Reveal';
import ImageCarousel from '../components/ImageCarousel';
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
              <span className="section-title-tag">ABIERTO AL PÚBLICO</span>
            </Reveal>
            <Reveal variant="fade-up" delay="120ms">
              <h2>Una experiencia culinaria salvaje y refinada</h2>
            </Reveal>
          </div>
          <div className="gastronomy-intro-right">
            <Reveal variant="fade-left" delay="240ms">
              <p>No necesitas estar hospedado para disfrutar de nuestra mesa. Combinamos la fuerza del fuego con la delicadeza de ingredientes locales para crear cortes premium y coctelería de autor en el corazón de la montaña.</p>
            </Reveal>
            <Reveal variant="fade-left" delay="360ms">
              <div className="gastronomy-features">
                <div className="g-feature"><Flame size={18} /> <span>Parrilla & Fuego</span></div>
                <div className="g-feature"><Leaf size={18} /> <span>Origen Local</span></div>
                <div className="g-feature"><Wine size={18} /> <span>Mixología</span></div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Desktop masonry grid ──────────────────────────────────── */}
        <div className="food-grid">
          {/* Column 1 */}
          <div className="food-col food-col-1">
            <Reveal variant="fade-up" delay="0ms">
              <img src="/restaurante/local2.jpg" alt="Restaurante principal" className="food-img col1-img1" />
            </Reveal>
            <Reveal variant="fade-up" delay="150ms">
              <img src="/restaurante/burguer.png" alt="Hamburguesa" className="food-img col1-img2" />
            </Reveal>
            <Reveal variant="fade-up" delay="300ms">
              <img src="/restaurante/copa.png" alt="Postre en copa" className="food-img col1-img3" />
            </Reveal>
            <Reveal variant="fade-up" delay="450ms">
              <img src="/restaurante/pollo.png" alt="Plato con pollo" className="food-img col1-img4" />
            </Reveal>
          </div>

          {/* Column 2 */}
          <div className="food-col food-col-2">
            <Reveal variant="fade-up" delay="80ms">
              <img src="/restaurante/steak1.png" alt="Corte de carne" className="food-img col2-img1" />
            </Reveal>
            <Reveal variant="fade-up" delay="200ms">
              <img src="/restaurante/vino.png" alt="Vino" className="food-img col2-img2" />
            </Reveal>
            <Reveal variant="fade-up" delay="350ms">
              <img src="/restaurante/steak2.png" alt="Carne a la parrilla" className="food-img col2-img3" />
            </Reveal>
            <Reveal variant="fade-up" delay="500ms">
              <img src="/restaurante/steak3.png" alt="Carne en plato" className="food-img col2-img4" />
            </Reveal>
          </div>

          {/* Column 3 */}
          <div className="food-col food-col-3">
            <Reveal variant="fade-up" delay="160ms">
              <img src="/restaurante/plato.png" alt="Plato especial" className="food-img col3-img1" />
            </Reveal>
            <Reveal variant="fade-up" delay="280ms">
              <img src="/restaurante/local.png" alt="Ambiente local" className="food-img col3-img2" />
            </Reveal>
            <Reveal variant="fade-up" delay="400ms">
              <img src="/restaurante/burguer2.png" alt="Hamburguesa especial" className="food-img col3-img3" />
            </Reveal>
          </div>
        </div>

        <ImageCarousel images={carouselImages} aspectRatio="4/3" />

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

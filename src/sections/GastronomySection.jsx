import React from 'react';
import Reveal from '../components/Reveal';
import './GastronomySection.css';

const GastronomySection = () => {
  return (
    <section className="gastronomy-section" id="gastronomia">
      <div className="container">
        <div className="section-title">
          <Reveal variant="fade-up" delay="0ms">
            <span className="section-title-tag">PLACERES CULINARIOS</span>
          </Reveal>
          <Reveal variant="fade-up" delay="120ms">
            <h2>Sabores que cuentan historias</h2>
          </Reveal>
          <Reveal variant="fade-up" delay="240ms">
            <p>Nuestra propuesta combina lo artesanal con lo emocional, creando una danza entre ingredientes locales y técnicas vanguardistas.</p>
          </Reveal>
        </div>

        <div className="food-grid">
          {/* Column 1 */}
          <div className="food-col food-col-1">
            <Reveal variant="fade-up" delay="0ms">
              <img src="/restaurante/burguer.png" alt="Hamburguesa" className="food-img food-tall" />
            </Reveal>
            <Reveal variant="fade-up" delay="150ms">
              <img src="/restaurante/copa.png" alt="Postre en copa" className="food-img" />
            </Reveal>
            <Reveal variant="fade-up" delay="300ms">
              <img src="/restaurante/pollo.png" alt="Plato con pollo" className="food-img" />
            </Reveal>
          </div>

          {/* Column 2 */}
          <div className="food-col food-col-2">
            <Reveal variant="fade-up" delay="80ms">
              <img src="/restaurante/steak1.png" alt="Corte de carne" className="food-img food-wide" />
            </Reveal>
            <Reveal variant="fade-up" delay="200ms">
              <div className="food-row">
                <img src="/restaurante/steak2.png" alt="Carne a la parrilla" className="food-img food-tall" />
                <img src="/restaurante/burguer2.png" alt="Hamburguesa especial" className="food-img" />
              </div>
            </Reveal>
            <Reveal variant="fade-up" delay="350ms">
              <img src="/restaurante/steak3.png" alt="Carne en plato" className="food-img food-wide-small" />
            </Reveal>
          </div>

          {/* Column 3 */}
          <div className="food-col food-col-3">
            <Reveal variant="fade-up" delay="160ms">
              <img src="/restaurante/plato.png" alt="Plato especial" className="food-img food-extra-tall" />
            </Reveal>
          </div>
        </div>

        <Reveal variant="fade-up" delay="100ms">
          <div className="gastronomy-action">
            <button className="btn-primary">CONOCE NUESTRO MENÚ</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GastronomySection;

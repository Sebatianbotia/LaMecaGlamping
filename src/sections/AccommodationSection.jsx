import React from 'react';
import { Bath, ThermometerSun, Tent, Waves } from 'lucide-react';
import Reveal from '../components/Reveal';
import './AccommodationSection.css';

const features = [
  { Icon: Bath, label: 'BAÑO PRIVADO' },
  { Icon: ThermometerSun, label: 'CALEFACCIÓN' },
  { Icon: Tent, label: 'MALLA CATAMARÁN' },
  { Icon: Waves, label: 'JACUZZI' },
];

const AccommodationSection = () => {
  return (
    <section className="accommodation-section" id="domos">
      <div className="container">
        <Reveal variant="fade-up" delay="0ms">
          <div className="accommodation-header">
            <span className="section-title-tag">ALOJAMIENTO</span>
            <h2>Refugios de Cristal y Lujo</h2>
          </div>
        </Reveal>

        <div className="accommodation-grid">
          {/* Main card */}
          <Reveal variant="fade-left" delay="100ms" className="accommodation-main">
            <div className="accommodation-card">
              <img src="/suite.png" alt="Domo Suite Celestial" className="suite-img" />
              <div className="suite-info">
                <h3>Habitación Doble</h3>
                <div className="suite-features">
                  {features.map(({ Icon, label }) => (
                    <div key={label} className="s-feature">
                      <Icon size={16} /> {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Side */}
          <div className="accommodation-side">
            <Reveal variant="fade-right" delay="200ms">
              <div className="details-card">
                <h4>TU SANTUARIO PRIVADO</h4>
                <p>Más que un alojamiento, un refugio para el alma. Relájate en tu jacuzzi al aire libre o descansa en la malla catamarán mientras te fundes con la inmensidad de la montaña.</p>
                <button className="btn-outline">DESCUBRIR MÁS</button>
              </div>
            </Reveal>
            <Reveal variant="fade-right" delay="350ms">
              <img src="/suite2.png" alt="Exterior del domo en la noche" className="suite-side-img" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;

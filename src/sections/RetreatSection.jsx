import React from 'react';
import { Sparkles, Flame, Gem, MapPin } from 'lucide-react';
import Reveal from '../components/Reveal';
import './RetreatSection.css';

const features = [
  { Icon: Sparkles, label: 'CIELOS ESTRELLADOS' },
  { Icon: Flame,    label: 'FOGATAS PRIVADAS'   },
  { Icon: Gem,      label: 'EXCLUSIVIDAD'        },
  { Icon: MapPin,   label: 'A 1 HORA DE BOGOTÁ'  },
];

const RetreatSection = () => {
  return (
    <section className="retreat-section" id="experiencia">
      <div className="container retreat-container">
        <div className="retreat-content">
          <Reveal variant="fade-left" delay="0ms">
            <span className="section-title-tag">EL RETIRO</span>
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
          <img src="/fogata.jpg" alt="Fogata bajo las estrellas" className="retreat-image" />
        </Reveal>
      </div>
    </section>
  );
};

export default RetreatSection;

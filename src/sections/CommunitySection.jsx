import React from 'react';
import { ExternalLink } from 'lucide-react';
import Reveal from '../components/Reveal';
import './CommunitySection.css';

const images = [
  { src: '/Comunidad/meca.png',  alt: 'Glamping noche',      cls: 'h-small' },
  { src: '/Comunidad/meca2.png', alt: 'Fogata',              cls: 'h-large' },
  { src: '/Comunidad/meca3.png', alt: 'Restaurante interior', cls: 'h-full c-span-large' },
  { src: '/Comunidad/meca4.png', alt: 'Domo atardecer',      cls: 'h-medium' },
  { src: '/Comunidad/meca5.png', alt: 'Vista montañas',      cls: 'h-medium' },
  { src: '/Comunidad/meca6.png', alt: 'Fogata noche',        cls: 'h-full' },
];

const CommunitySection = () => {
  return (
    <section className="community-section">
      <div className="container">
        <div className="community-header">
          <Reveal variant="fade-left">
            <div>
              <span className="section-title-tag">SOCIAL</span>
              <h2>Comunidad La Meca</h2>
            </div>
          </Reveal>
          <Reveal variant="fade-right" delay="150ms">
            <button className="btn-outline community-btn">
              SÍGUENOS EN INSTAGRAM @LAMEAGLAMPING
              <ExternalLink size={14} className="icon-ml" />
            </button>
          </Reveal>
        </div>

        <div className="community-grid">
          <div className="c-col">
            <Reveal variant="fade-up" delay="0ms">
              <img src="/Comunidad/meca.png" alt="Glamping noche" className="c-img h-small" />
            </Reveal>
            <Reveal variant="fade-up" delay="150ms">
              <img src="/Comunidad/meca2.png" alt="Fogata" className="c-img h-large" />
            </Reveal>
          </div>
          <div className="c-col c-col-large">
            <Reveal variant="fade-up" delay="80ms">
              <img src="/Comunidad/meca3.png" alt="Restaurante interior" className="c-img h-full" />
            </Reveal>
          </div>
          <div className="c-col">
            <Reveal variant="fade-up" delay="160ms">
              <img src="/Comunidad/meca4.png" alt="Domo atardecer" className="c-img h-medium" />
            </Reveal>
            <Reveal variant="fade-up" delay="260ms">
              <img src="/Comunidad/meca5.png" alt="Vista montañas" className="c-img h-medium" />
            </Reveal>
          </div>
          <div className="c-col">
            <Reveal variant="fade-up" delay="120ms">
              <img src="/Comunidad/meca6.png" alt="Fogata noche" className="c-img h-full" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;

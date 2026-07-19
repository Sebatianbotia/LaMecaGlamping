import React from 'react';
import { GlassWater, CalendarHeart, Music, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal';
import './EventsSection.css';

const EventsSection = () => {
  return (
    <section className="events-section" id="eventos">
      <div className="container">
        <div className="events-wrapper">
          <div className="events-content">
            <Reveal variant="fade-up" delay="0ms">
              <span className="section-title-tag">CELEBRA CON NOSOTROS</span>
            </Reveal>
            <Reveal variant="fade-up" delay="120ms">
              <h2>Eventos y Celebraciones Privadas en Guasca, Cundinamarca</h2>
            </Reveal>
            <Reveal variant="fade-up" delay="240ms">
              <p>
                Haz que tus fechas más especiales se conviertan en recuerdos eternos.
                En La Meca Glamping, ofrecemos el entorno perfecto para pedidas de mano,
                aniversarios, cumpleaños y eventos corporativos con un toque rústico y exclusivo.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay="360ms">
              <div className="events-features">
                <div className="event-feature">
                  <div className="ef-icon"><CalendarHeart size={24} /></div>
                  <div>
                    <h4>Fechas Especiales</h4>
                    <p>Sorpresas románticas y pedidas de mano bajo las estrellas.</p>
                  </div>
                </div>
                <div className="event-feature">
                  <div className="ef-icon"><GlassWater size={24} /></div>
                  <div>
                    <h4>Eventos Privados</h4>
                    <p>Celebraciones de cumpleaños y reuniones con atención personalizada.</p>
                  </div>
                </div>
                <div className="event-feature">
                  <div className="ef-icon"><Music size={24} /></div>
                  <div>
                    <h4>Música y Ambiente</h4>
                    <p>Disfruta de música en vivo y la magia de una fogata compartida.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay="480ms">
              <a
                href="https://wa.me/573214490484?text=Hola,%20quisiera%20informaci%C3%B3n%20para%20realizar%20un%20evento%20en%20La%20Meca."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary events-btn"
              >
                <Sparkles size={18} style={{ marginRight: '8px' }} />
                COTIZAR MI EVENTO
              </a>
            </Reveal>
          </div>

          <div className="events-images">
            <Reveal variant="fade-left" delay="200ms" className="ei-wrapper ei-main">
              <img src="/restaurante/local2.jpg" alt="Interior del Restaurante La Meca Glamping para eventos privados en Guasca" loading="lazy" />
            </Reveal>
            <Reveal variant="fade-up" delay="400ms" className="ei-wrapper ei-secondary">
              <img src="/Comunidad/meca3.png" alt="Celebración exclusiva en La Meca Glamping, Cundinamarca" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

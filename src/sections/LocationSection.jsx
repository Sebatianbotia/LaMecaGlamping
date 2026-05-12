import React from 'react';
import { Navigation, MapPin, Clock, Car } from 'lucide-react';
import Reveal from '../components/Reveal';
import './LocationSection.css';

// Coordenadas La Meca Glamping, Guasca, Cundinamarca
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=La+Meca+Glamping+Guasca+Cundinamarca+Colombia';

const EMBED_URL =
  'https://maps.google.com/maps?q=La+Meca+Glamping+Guasca+Cundinamarca+Colombia&t=&z=13&ie=UTF8&iwloc=&output=embed';

const TIPS = [
  {
    Icon: Car,
    title: 'En carro',
    desc: 'Desde Bogotá por la carrera 7 hacia Guasca. Aprox. 1h 15 min.',
  },
  {
    Icon: Clock,
    title: 'Check-in',
    desc: 'A partir de las 3:00 p.m. Check-out antes de las 12:00 m.',
  },
  {
    Icon: MapPin,
    title: 'Vereda',
    desc: 'Vereda Santa Bárbara, Guasca, Cundinamarca. Coordinar llegada con anticipación.',
  },
];

const LocationSection = () => (
  <section className="location-section" id="como-llegar">
    <div className="container">
      <div className="location-grid">
        {/* ── Left: info ── */}
        <Reveal variant="fade-left" delay="0ms">
          <div className="location-info">
            <span className="section-title-tag">UBICACIÓN</span>
            <h2>Cómo llegar</h2>
            <p className="location-desc">
              Guasca, Cundinamarca — Vereda Santa Bárbara. A solo una hora de Bogotá,
              rodeado de páramo y montaña.
            </p>

            <div className="location-tips">
              {TIPS.map(({ Icon, title, desc }) => (
                <div key={title} className="location-tip">
                  <div className="location-tip-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="location-tip-title">{title}</span>
                    <p className="location-tip-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary location-maps-btn"
            >
              <Navigation size={15} />
              ABRIR EN GOOGLE MAPS
            </a>
          </div>
        </Reveal>

        {/* ── Right: map ── */}
        <Reveal variant="fade-right" delay="150ms">
          <div className="location-map-wrap">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="location-map-link"
              aria-label="Abrir La Meca Glamping en Google Maps"
            >
              <iframe
                title="Mapa La Meca Glamping"
                src={EMBED_URL}
                className="location-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* Click overlay with label */}
              <div className="location-map-overlay">
                <div className="location-map-label">
                  <Navigation size={14} />
                  Al hacer clic se abrirá Google Maps o la app que tengas instalada
                </div>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default LocationSection;

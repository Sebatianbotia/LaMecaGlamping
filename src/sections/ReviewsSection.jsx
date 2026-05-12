import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Reveal from '../components/Reveal';
import './ReviewsSection.css';

const REVIEWS = [
  {
    id: 1,
    name: 'Valentina Ríos',
    location: 'Bogotá, Colombia',
    rating: 5,
    date: 'Marzo 2025',
    text: 'Una experiencia absolutamente mágica. Despertarse en el domo con las montañas de Guasca a tu alrededor no tiene precio. El jacuzzi al aire libre en la noche bajo las estrellas fue simplemente inolvidable.',
    avatar: '/Comunidad/meca4.png',
  },
  {
    id: 2,
    name: 'Andrés Morales',
    location: 'Medellín, Colombia',
    rating: 5,
    date: 'Febrero 2025',
    text: 'Fuimos en pareja para nuestro aniversario y La Meca superó todas las expectativas. El servicio es impecable, la comida deliciosa y la naturaleza te envuelve desde el momento en que llegas. Volveremos pronto.',
    avatar: '/Comunidad/meca5.png',
  },
  {
    id: 3,
    name: 'Catalina Jiménez',
    location: 'Cali, Colombia',
    rating: 5,
    date: 'Enero 2025',
    text: 'El glamping más bonito que he visitado en Colombia. Todo está pensado al detalle, desde la decoración hasta los pequeños detalles de bienvenida. La naturaleza y el lujo en perfecta armonía.',
    avatar: '/Comunidad/meca6.png',
  },
  {
    id: 4,
    name: 'Felipe Suárez',
    location: 'Bucaramanga, Colombia',
    rating: 5,
    date: 'Diciembre 2024',
    text: 'Llegué buscando descanso y encontré mucho más. La paz del lugar, el aire frío de la montaña y la calidez del equipo humano hacen de La Meca un lugar que se queda en el corazón.',
    avatar: '/Comunidad/meca7.png',
  },
  {
    id: 5,
    name: 'Laura Bernal',
    location: 'Bogotá, Colombia',
    rating: 5,
    date: 'Noviembre 2024',
    text: 'Una joya escondida en Guasca. El entorno natural es espectacular y la experiencia de dormir bajo las estrellas en el domo es algo que recomiendo a todo el mundo. ¡No lo piensen más!',
    avatar: '/Comunidad/meca8.png',
  },
];

const Stars = ({ count = 5 }) => (
  <div className="rv-stars">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={13} fill="currentColor" />
    ))}
  </div>
);

const ReviewsSection = () => {
  const [current, setCurrent] = useState(0);
  const visible = 3; // cards shown at once on desktop
  const total = REVIEWS.length;

  const goPrev = () => setCurrent((c) => (c - 1 + total) % total);
  const goNext = () => setCurrent((c) => (c + 1) % total);

  // Build the ordered list starting from `current`
  const ordered = Array.from({ length: total }, (_, i) => REVIEWS[(current + i) % total]);

  return (
    <section className="reviews-section" id="resenas">
      <div className="container">
        <Reveal variant="fade-up" delay="0ms">
          <div className="reviews-header">
            <span className="section-title-tag">RESEÑAS</span>
            <h2>Lo que dicen nuestros clientes</h2>
          </div>
        </Reveal>

        <div className="reviews-carousel-wrap">
          {/* Cards */}
          <div className="reviews-track">
            {ordered.slice(0, visible).map((r, i) => (
              <Reveal key={r.id} variant="fade-up" delay={`${i * 80}ms`}>
                <div className={`review-card${i === 0 ? ' review-card--featured' : ''}`}>
                  <Quote size={28} className="rv-quote-icon" />
                  <p className="rv-text">{r.text}</p>
                  <div className="rv-footer">
                    <img src={r.avatar} alt={r.name} className="rv-avatar" />
                    <div className="rv-author">
                      <Stars count={r.rating} />
                      <span className="rv-name">{r.name}</span>
                      <span className="rv-meta">{r.location} · {r.date}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Navigation */}
          <div className="reviews-nav">
            <button className="carousel-arrow" onClick={goPrev} aria-label="Anterior">
              <ChevronLeft size={20} />
            </button>
            <span className="reviews-counter">
              {current + 1} / {total}
            </span>
            <button className="carousel-arrow" onClick={goNext} aria-label="Siguiente">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

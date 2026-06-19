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
    text: 'Con solo llegar uno se transporta a un paisaje hermoso de nuestra sabana de Bogota, la amabilidad de la atención de los meseros de Angie y Alejandro son muy agradables, la calidad de la comida , las carnes, los cortes espectaculares, en su punto, las patatas bravas y la ensalada fresca con las luchas orgánicas qué cultivan, la atmósfera del restaurante es todo un arte , el diseño , la decoración muy exclusiva, moderna , acogedora y muy creativa. Todo es 10/10 los precios justos , hace que sea una experiencia muy espectacular en familia !! Super recomendado!! Y para cerrar una conversación amable y dulce de su Chef Clau!!',
    avatar: '/suite.png',
  },
  {
    id: 2,
    name: 'Andrés Morales',
    location: 'Medellín, Colombia',
    rating: 5,
    date: 'Febrero 2025',
    text: 'Un lugar hermoso para desconectarse de la ciudad que está a sólo una hora. Las habitaciones son cómodas pero si hace frío! Recomendable llevar abrigo. El servicio y atención de Paty, Britney y Alejo es excelente pero lo que nos quitó el aliento fue su comida tan sabrosa. Desde el café al vino caliente, la fruta, hasta la ensalada de la huerta, el chuletón y el puré. Muy relax si lo que buscas es descansar en silencio. Le pondría más estrellas pero ya no hay.',
    avatar: '/Comunidad/meca9.jpeg',
  },
  {
    id: 3,
    name: 'Catalina Jiménez',
    location: 'Cali, Colombia',
    rating: 5,
    date: 'Enero 2025',
    text: '¡Me encantó! Es un sitio súper acogedor con una comida deliciosa y un servicio impecable. Todo de 10/10. Sin duda, un lugar para volver y recomendar.😉',
    avatar: '/suite2.png',
  },
  {
    id: 4,
    name: 'Felipe Suárez',
    location: 'Bucaramanga, Colombia',
    rating: 5,
    date: 'Diciembre 2024',
    text: 'Fuí al restaurante y es completamente espectacular, la comida deliciosa, el ambiente increíble y la atención inmejorable. Súper recomendado.',
    avatar: '/fogata.png',
  },
  {
    id: 5,
    name: 'Laura Bernal',
    location: 'Bogotá, Colombia',
    rating: 5,
    date: 'Noviembre 2024',
    text: 'La Meca es el mejor lugar para desconectarse de la ciudad. Los gampling son limpios y cómodos, la vista es espectacular. Lo que más destaco, es el amor que le ponen a cada detalle. El desayuno es espectacular, se nota el amor en todo: los huevitos con cebolla y tomate picados finamente , la mermelada artesanal y el pan tostado. Nos sentimos como en casa. Gracias!!',
    avatar: '/Comunidad/meca11.PNG',
  },
  {
    id: 6,
    name: 'Camilo Rodríguez',
    location: 'Tunja, Colombia',
    rating: 5,
    date: 'Octubre 2024',
    text: 'Fui al restaurante, a mi esposo y a mi nos encanta. La presentación del lugar, los alimentos, las porciones, la chimenea, es un lugar muy recomendado para comer rico y tener una experiencia 10!',
    avatar: '/suite.png',
  },
  {
    id: 7,
    name: 'Daniela Vargas',
    location: 'Villavicencio, Colombia',
    rating: 5,
    date: 'Septiembre 2024',
    text: 'Almorzamos entre semana. 5 adultos 3 niños. Previa cita. Envian la carta por WA, solicitan la hora de llegada a comer. Muy puntuales en el servicio. Carnes variadas de muy buena preparación. Aderezos y salsas muy suaves y agradables al paladar. Ensalada diferente. Regresaremos con un grupo familiara 3 veces mas grande.',
    avatar: '/Comunidad/meca9.jpeg',
  }
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
  const [selectedReview, setSelectedReview] = useState(null);
  const visible = 3; // cards shown at once on desktop
  const total = REVIEWS.length;
  const MAX_CHARS = 160;

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
            {ordered.slice(0, visible).map((r, i) => {
              const isLong = r.text.length > MAX_CHARS;
              const displayText = isLong ? r.text.slice(0, MAX_CHARS).trim() + '...' : r.text;

              return (
                <Reveal key={r.id} variant="fade-up" delay={`${i * 80}ms`}>
                  <div className={`review-card${i === 0 ? ' review-card--featured' : ''}`}>
                    <Quote size={28} className="rv-quote-icon" />
                    <p className="rv-text">
                      {displayText}
                      {isLong && (
                        <button className="rv-read-more" onClick={() => setSelectedReview(r)}>
                          Leer más
                        </button>
                      )}
                    </p>
                    <div className="rv-footer">
                      <div className="rv-author">
                        <Stars count={r.rating} />
                        <span className="rv-name">{r.name}</span>
                        <span className="rv-meta">{r.location} · {r.date}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="reviews-nav">
            <button className="rv-nav-btn" onClick={goPrev} aria-label="Anterior">
              <ChevronLeft size={20} />
            </button>
            <span className="reviews-counter">
              {current + 1} / {total}
            </span>
            <button className="rv-nav-btn" onClick={goNext} aria-label="Siguiente">
              <ChevronRight size={20} />
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a 
              href="https://www.google.com/search?sca_esv=3750d84e3b6f83f6&sxsrf=APpeQnsgEKxM_p33uBNo-WVPIpZd46Gl1g:1781879516862&q=la+meca+glamping&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_4JYRHywHaD9v5pD0fIBLTNiCwxNc9KYBM7BHWwTuyxFIhMQ-dA8z6-49lCi8omYClufiGNy-4ty0UxqMad99qbQL38TtoBBSzk7rDVQvaCxwQLuqg%3D%3D&ved=1t:247458&ictx=111&biw=1536&bih=826&dpr=1.25"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Ver Más Reseñas
            </a>
          </div>
        </div>
      </div>

      {/* Modal Overlay for Full Review */}
      {selectedReview && (
        <div className="rv-modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="rv-modal-content" onClick={e => e.stopPropagation()}>
            <button className="rv-modal-close" onClick={() => setSelectedReview(null)} aria-label="Cerrar">
              &times;
            </button>
            <Quote size={32} className="rv-quote-icon" style={{ marginBottom: '1rem' }} />
            <p className="rv-modal-text">{selectedReview.text}</p>
            <div className="rv-footer" style={{ marginTop: '2rem', borderTop: 'none', paddingTop: 0 }}>
              <div className="rv-author">
                <Stars count={selectedReview.rating} />
                <span className="rv-name">{selectedReview.name}</span>
                <span className="rv-meta">{selectedReview.location} · {selectedReview.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;

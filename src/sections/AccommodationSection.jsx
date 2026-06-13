import React, { useState, useEffect } from 'react';
import {
  Bath, ThermometerSun, Tent, Waves, Users, Moon,
  Star, X, CalendarDays, MessageCircle, Maximize,
  Sparkles, ArrowRight, Dog, ChevronLeft, ChevronRight, Tag
} from 'lucide-react';
import Reveal from '../components/Reveal';
import './AccommodationSection.css';

// ── Weekday pricing hook ──────────────────────────────────────────
const BASE_PRICE = 450000;
const WEEKDAY_DISCOUNT = 0.20;

function useWeekdayPricing() {
  const [isWeekday, setIsWeekday] = useState(false);

  useEffect(() => {
    const check = () => {
      const day = new Date().getDay(); // 0=Sun, 1=Mon … 6=Sat
      setIsWeekday(day >= 1 && day <= 5); // Mon–Fri
    };
    check();
    // Re-evaluate at midnight (in case the tab stays open overnight)
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
    const midnight = setTimeout(() => { check(); }, msUntilMidnight);
    return () => clearTimeout(midnight);
  }, []);

  const discountedPrice = Math.round(BASE_PRICE * (1 - WEEKDAY_DISCOUNT));

  return {
    isWeekday,
    basePrice: BASE_PRICE,
    discountedPrice,
    displayPrice: isWeekday ? discountedPrice : BASE_PRICE,
    formattedBase: `$${BASE_PRICE.toLocaleString('es-CO')}`,
    formattedDiscounted: `$${discountedPrice.toLocaleString('es-CO')}`,
    formattedDisplay: isWeekday
      ? `$${discountedPrice.toLocaleString('es-CO')}`
      : `$${BASE_PRICE.toLocaleString('es-CO')}`,
  };
}

const GLAMPINGS = [
  {
    id: 'domo-geodesico',
    name: 'Nuestros Glampings',
    tag: 'MÁS POPULARES',
    tagColor: 'gold',
    image: '/glamping/glam1.jpg',
    images: ['/glamping/glam1.jpg', '/glamping/glam6.jpg', '/glamping/glam3.jpg', '/glamping/glam4.jpg'],
    capacity: 'Hasta 4 personas',
    description:
      'Contamos con 2 glampings: Patrón 70 y Don Julio. Vive una experiencia de descanso única en nuestros exclusivos domos geodésicos termoacondicionados, combinando confort, privacidad y naturaleza. Equipado con cama doble, sofá, baño privado de gran tamaño y amplia terraza. Relájate en nuestro jacuzzi panorámico climatizado para 4 personas contemplando la increíble vista a las montañas.\n\nPersona adicional $50.000.',
    amenities: [
      { Icon: Bath, label: 'Baño gran tamaño' },
      { Icon: ThermometerSun, label: 'Termoacondicionado' },
      { Icon: Waves, label: 'Jacuzzi panorámico' },
      { Icon: Users, label: 'Hasta 4 personas' },
      { Icon: Dog, label: 'Pet-Friendly' },
      { Icon: Moon, label: 'Vista a la montaña' },
    ],
    highlights: ['Jacuzzi panorámico climatizado', 'Aceptamos a tu mascota (Pet-Friendly)'],
  }
];

const WHATSAPP_NUMBER = '573112340584';
const INITIAL_FORM = {
  nombre: '',
  telefono: '',
  checkin: '',
  checkout: '',
  personas: '2 Personas',
  glamping_choice: 'Patrón 70',
  solicitud: '',
};

function buildWhatsAppUrl(glamping, form) {
  const msg = [
    `*Solicitud de Reserva - La Meca Glamping*`,
    ``,
    `Hola, me interesa reservar el *Glamping ${form.glamping_choice}*.`,
    ``,
    `*Mis datos:*`,
    `Nombre: ${form.nombre}`,
    `Teléfono: ${form.telefono}`,
    `Número de personas: ${form.personas}`,
    ``,
    `*Fechas:*`,
    `Check-in: ${form.checkin}`,
    `Check-out: ${form.checkout}`,
    form.solicitud ? `\n*Solicitud especial:* ${form.solicitud}` : '',
    ``,
    `Quedo pendiente de su confirmación.`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const Lightbox = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div className="lightbox-overlay" onClick={handleClose}>
      <button className="lightbox-close" onClick={handleClose} aria-label="Cerrar"><X size={24} /></button>
      <button className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Anterior"><ChevronLeft size={32} /></button>
      <button className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Siguiente"><ChevronRight size={32} /></button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={images[currentIndex]} alt="Fullscreen view" className="lightbox-img" />
        <div className="lightbox-counter">{currentIndex + 1} / {images.length}</div>
      </div>
    </div>
  );
};

const GlampingModal = ({ glamping, onClose }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [error, setError] = useState('');
  const [activeImg, setActiveImg] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.checkin || !form.checkout) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }
    if (form.checkin >= form.checkout) {
      setError('La fecha de check-out debe ser posterior al check-in.');
      return;
    }
    window.open(buildWhatsAppUrl(glamping, form), '_blank');
    onClose();
  };

  return (
    <div
      className="acc-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="acc-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="acc-modal-card">
        <button className="acc-modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        <div className="acc-modal-inner">
          <div className="acc-modal-info">
            <div className="acc-modal-gallery">
              <button className="expand-icon-btn" onClick={() => setLightboxOpen(true)} aria-label="Pantalla completa">
                <Maximize size={18} />
              </button>
              <img
                src={glamping.images[activeImg]}
                alt={glamping.name}
                className="acc-modal-main-img"
                onClick={() => setLightboxOpen(true)}
                style={{ cursor: 'pointer' }}
              />
              <div className="acc-modal-thumbs">
                {glamping.images.map((src, i) => (
                  <button
                    key={i}
                    className={`acc-thumb-btn${activeImg === i ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Imagen ${i + 1}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="acc-modal-meta">
              <div className="acc-modal-tag-row">
                <span className={`acc-tag acc-tag--${glamping.tagColor}`}>{glamping.tag}</span>
                <span className="acc-modal-price">{glamping.price}</span>
              </div>
              <h3 id="acc-modal-title" className="acc-modal-name">{glamping.name}</h3>
              <p className="acc-modal-desc">{glamping.description}</p>

              <div className="acc-modal-amenities">
                {glamping.amenities.map(({ Icon, label }) => (
                  <div key={label} className="acc-amenity">
                    <Icon size={14} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <ul className="acc-modal-highlights">
                {glamping.highlights.map((h) => (
                  <li key={h}>
                    <Sparkles size={12} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="acc-modal-form-wrapper">
            <div className="acc-form-header">
              <MessageCircle size={20} className="acc-form-icon" />
              <div>
                <h4>Reserva tu estadía</h4>
                <p>Completa el formulario y te contactamos por WhatsApp</p>
              </div>
            </div>

            <form className="acc-booking-form" onSubmit={handleSubmit} noValidate>
              <div className="acc-form-group">
                <label htmlFor="acc-nombre">NOMBRE COMPLETO</label>
                <input
                  id="acc-nombre"
                  name="nombre"
                  type="text"
                  placeholder="Escribe tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="acc-form-group">
                <label htmlFor="acc-telefono">TELÉFONO / WHATSAPP</label>
                <input
                  id="acc-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+57 300 000 0000"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="acc-form-row">
                <div className="acc-form-group">
                  <label htmlFor="acc-checkin">
                    <CalendarDays size={11} style={{ display: 'inline', marginRight: 4 }} />
                    CHECK-IN
                  </label>
                  <input
                    id="acc-checkin"
                    name="checkin"
                    type="date"
                    value={form.checkin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="acc-form-group">
                  <label htmlFor="acc-checkout">
                    <CalendarDays size={11} style={{ display: 'inline', marginRight: 4 }} />
                    CHECK-OUT
                  </label>
                  <input
                    id="acc-checkout"
                    name="checkout"
                    type="date"
                    value={form.checkout}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="acc-form-row">
                <div className="acc-form-group">
                  <label htmlFor="acc-glamping-choice">GLAMPING</label>
                  <select
                    id="acc-glamping-choice"
                    name="glamping_choice"
                    value={form.glamping_choice}
                    onChange={handleChange}
                  >
                    <option>Patrón 70</option>
                    <option>Don Julio</option>
                  </select>
                </div>

                <div className="acc-form-group">
                  <label htmlFor="acc-personas">NÚMERO DE PERSONAS</label>
                  <select
                    id="acc-personas"
                    name="personas"
                    value={form.personas}
                    onChange={handleChange}
                  >
                    <option>2 Personas</option>
                    <option>3 Personas</option>
                    <option>4 Personas</option>
                  </select>
                </div>
              </div>

              <div className="acc-form-group">
                <label htmlFor="acc-solicitud">SOLICITUD ESPECIAL (opcional)</label>
                <input
                  id="acc-solicitud"
                  name="solicitud"
                  type="text"
                  placeholder="¿Aniversario, sorpresa o petición especial?"
                  value={form.solicitud}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="acc-form-error">{error}</p>}

              <button type="submit" className="btn-primary acc-submit-btn">
                <MessageCircle size={16} />
                RESERVAR POR WHATSAPP
              </button>

              <p className="acc-form-note">
                Al hacer clic serás redirigido a WhatsApp con tu reserva lista para enviar.
              </p>
            </form>
          </div>
        </div>
      </div>
      {lightboxOpen && (
        <Lightbox images={glamping.images} initialIndex={activeImg} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
};

const AccommodationSection = () => {
  const [selectedGlamping, setSelectedGlamping] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const pricing = useWeekdayPricing();

  const glamping = GLAMPINGS[0];

  const goPrevImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? glamping.images.length - 1 : prev - 1));
  };

  const goNextImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === glamping.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section className="accommodation-section" id="domos">
        <div className="container">
          <Reveal variant="fade-up" delay="0ms">
            <div className="accommodation-header">
              <span className="section-title-tag">ALOJAMIENTO</span>
              <h2>Elige tu refugio</h2>
              <p className="accommodation-subtitle">
                Cada glamping en La Meca es un mundo propio. Escoge el que más resuene contigo
                y vive una noche que no olvidarás.
              </p>
            </div>
          </Reveal>

          <div className="glamping-carousel-wrap single-card">
            <div className="glamping-carousel-stage">
              <div
                key={glamping.id}
                className="glamping-card-hero"
              >

                <div className="glamping-hero-img-wrap">
                  <button className="expand-icon-btn" onClick={() => setLightboxOpen(true)} aria-label="Pantalla completa">
                    <Maximize size={18} />
                  </button>
                  <img
                    src={glamping.images[currentImg]}
                    alt={glamping.name}
                    className="glamping-hero-img"
                    onClick={() => setLightboxOpen(true)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span className={`glamping-card-tag glamping-card-tag--${glamping.tagColor}`}>
                    {glamping.tag}
                  </span>

                  {glamping.images && glamping.images.length > 1 && (
                    <>
                      <button className="img-nav-btn img-nav-btn--prev" onClick={goPrevImg} aria-label="Imagen anterior">
                        <ChevronLeft size={20} />
                      </button>
                      <button className="img-nav-btn img-nav-btn--next" onClick={goNextImg} aria-label="Siguiente imagen">
                        <ChevronRight size={20} />
                      </button>

                      <div className="img-nav-dots">
                        {glamping.images.map((_, i) => (
                          <button
                            key={i}
                            className={`img-nav-dot ${i === currentImg ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImg(i);
                            }}
                            aria-label={`Ir a imagen ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="glamping-hero-body">
                  <div className="glamping-hero-top">
                    <div>
                      <h3 className="glamping-hero-name">{glamping.name}</h3>
                    </div>
                    <span className="glamping-hero-capacity">
                      <Users size={13} /> {glamping.capacity}
                    </span>
                  </div>

                  {/* ── Weekday discount banner (always visible) ── */}
                  <div className="weekday-discount-banner">
                    <Tag size={14} className="weekday-discount-icon" />
                    <div className="weekday-discount-text">
                      <span className="weekday-discount-title">20% de descuento entre semana</span>
                      <span className="weekday-discount-sub">
                        Lun–Vie&nbsp;
                        <strong>{pricing.formattedDiscounted}</strong>
                        &nbsp;·&nbsp;Fin de semana&nbsp;
                        <strong>{pricing.formattedBase}</strong>
                        &nbsp;/ noche
                      </span>
                    </div>
                    {pricing.isWeekday
                      ? <span className="weekday-discount-badge weekday-discount-badge--active">ACTIVO HOY</span>
                      : <span className="weekday-discount-badge weekday-discount-badge--inactive">Lun – Vie</span>
                    }
                  </div>

                  <p className="glamping-hero-desc">{glamping.description}</p>

                  <div className="glamping-hero-amenities">
                    {glamping.amenities.map(({ Icon, label }) => (
                      <span key={label} className="glamping-mini-amenity">
                        <Icon size={12} /> {label}
                      </span>
                    ))}
                  </div>

                  <div className="glamping-hero-footer">
                    <div className="glamping-price-block">
                      {pricing.isWeekday && (
                        <span className="glamping-price-original">{pricing.formattedBase}</span>
                      )}
                      <span className={`glamping-card-price${pricing.isWeekday ? ' is-discounted' : ''}`}>
                        {pricing.formattedDisplay}
                        <span className="glamping-price-unit"> / noche</span>
                      </span>
                      {!pricing.isWeekday && (
                        <span className="glamping-price-note">Fin de semana</span>
                      )}
                    </div>
                    <button
                      className="btn-primary glamping-reserve-btn"
                      onClick={() => setSelectedGlamping(glamping)}
                    >
                      RESERVAR AHORA <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Reveal variant="fade-up" delay="200ms">
            <div className="accommodation-cta">
              <Star size={16} className="cta-star" />
              <span>¿No sabes cuál elegir? Escríbenos y te ayudamos a encontrar el perfecto.</span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Quisiera saber más sobre los glampings de La Meca 🏕️')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline cta-wa-btn"
              >
                <MessageCircle size={14} /> Consultar por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {selectedGlamping && (
        <GlampingModal
          glamping={selectedGlamping}
          onClose={() => setSelectedGlamping(null)}
        />
      )}
      {lightboxOpen && (
        <Lightbox
          images={glamping.images}
          initialIndex={currentImg}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default AccommodationSection;

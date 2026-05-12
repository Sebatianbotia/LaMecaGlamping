import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Bath, ThermometerSun, Tent, Waves, Users, Moon,
  Star, X, CalendarDays, MessageCircle,
  Sparkles, ArrowRight, ChevronLeft, ChevronRight,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import './AccommodationSection.css';

const GLAMPINGS = [
  {
    id: 'domo-celestial',
    name: 'Domo Celestial',
    tag: 'MÁS POPULAR',
    tagColor: 'gold',
    image: '/suite.png',
    images: ['/suite.png', '/Comunidad/meca10.PNG', '/Comunidad/meca11.PNG'],
    price: 'Desde $450.000 / noche',
    capacity: '2 personas',
    description:
      'Vive la experiencia de dormir bajo las estrellas en nuestro domo de cristal panorámico. Una cúpula geodésica con vista 360° a las montañas de Guasca, jacuzzi privado y malla catamarán suspendida sobre el bosque.',
    amenities: [
      { Icon: Bath, label: 'Baño privado' },
      { Icon: ThermometerSun, label: 'Calefacción' },
      { Icon: Tent, label: 'Malla catamarán' },
      { Icon: Waves, label: 'Jacuzzi' },
      { Icon: Users, label: '2 personas' },
      { Icon: Moon, label: 'Vista nocturna' },
    ],
    highlights: ['Cúpula geodésica 360°', 'Jacuzzi al aire libre', 'Desayuno incluido'],
  },
  {
    id: 'refugio-selva',
    name: 'Refugio Selva',
    tag: 'NATURALEZA PURA',
    tagColor: 'green',
    image: '/Comunidad/meca9.PNG',
    images: ['/Comunidad/meca9.PNG', '/Comunidad/meca12.PNG', '/Comunidad/meca13.jpg'],
    price: 'Desde $380.000 / noche',
    capacity: '2 – 3 personas',
    description:
      'Sumérgete en el corazón del bosque nativo en este refugio de madera y vidrio. Diseñado para quienes buscan desconectarse del mundo sin renunciar al confort. Terraza privada con hamaca y chimenea interior.',
    amenities: [
      { Icon: Bath, label: 'Baño completo' },
      { Icon: ThermometerSun, label: 'Chimenea' },
      { Icon: Tent, label: 'Hamaca privada' },
      { Icon: Waves, label: 'Ducha exterior' },
      { Icon: Users, label: '2 – 3 personas' },
      { Icon: Moon, label: 'Vista al bosque' },
    ],
    highlights: ['Terraza privada en el bosque', 'Chimenea interior', "Kit de s'mores"],
  },
  {
    id: 'glamping-nido',
    name: 'Nido de Montaña',
    tag: 'VISTA PANORÁMICA',
    tagColor: 'blue',
    image: '/suite2.png',
    images: ['/suite2.png', '/Comunidad/meca.png', '/Comunidad/meca2.png'],
    price: 'Desde $520.000 / noche',
    capacity: '2 – 4 personas',
    description:
      'En lo más alto del predio, este glamping premium ofrece la vista más espectacular de todo el páramo. Cama king con dosel, bañera de inmersión exterior y servicio de cena romántica bajo las estrellas a solicitud.',
    amenities: [
      { Icon: Bath, label: 'Bañera exterior' },
      { Icon: ThermometerSun, label: 'Calefacción radiante' },
      { Icon: Tent, label: 'Terraza suspendida' },
      { Icon: Waves, label: 'Hot tub' },
      { Icon: Users, label: '2 – 4 personas' },
      { Icon: Moon, label: 'Vista 360° páramo' },
    ],
    highlights: ['Bañera de inmersión exterior', 'Cama King con dosel', 'Cena romántica opcional'],
  },
];

const WHATSAPP_NUMBER = '573112340584';
const INITIAL_FORM = {
  nombre: '',
  telefono: '',
  checkin: '',
  checkout: '',
  personas: '2 Personas',
  solicitud: '',
};

function buildWhatsAppUrl(glamping, form) {
  const msg = [
    `🏕️ *Solicitud de Reserva – La Meca Glamping*`,
    ``,
    `👋 Hola, me interesa reservar el *${glamping.name}*.`,
    ``,
    `📋 *Mis datos:*`,
    `• Nombre: ${form.nombre}`,
    `• Teléfono: ${form.telefono}`,
    `• Número de personas: ${form.personas}`,
    ``,
    `📅 *Fechas:*`,
    `• Check-in: ${form.checkin}`,
    `• Check-out: ${form.checkout}`,
    form.solicitud ? `\n💬 *Solicitud especial:* ${form.solicitud}` : '',
    ``,
    `¡Quedo pendiente de su confirmación! 🙏`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const GlampingModal = ({ glamping, onClose }) => {
  const [form, setForm] = useState(INITIAL_FORM);
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
              <img
                src={glamping.images[activeImg]}
                alt={glamping.name}
                className="acc-modal-main-img"
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
    </div>
  );
};

const AccommodationSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const [animating, setAnimating] = useState(false);
  const [selectedGlamping, setSelectedGlamping] = useState(null);
  const autoRef = useRef(null);
  const total = GLAMPINGS.length;

  const goTo = useCallback(
    (index, dir) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 420);
    },
    [animating],
  );

  const goPrev = () => goTo((current - 1 + total) % total, 'prev');
  const goNext = () => goTo((current + 1) % total, 'next');

  useEffect(() => {
    autoRef.current = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, [current, goNext]);

  const glamping = GLAMPINGS[current];

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

          <div className="glamping-carousel-wrap">
            <button
              className="carousel-arrow carousel-arrow--prev"
              onClick={goPrev}
              aria-label="Anterior glamping"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="glamping-carousel-stage">
              <div
                key={glamping.id}
                className={`glamping-card-hero ${animating ? `exit-${direction}` : 'enter'}`}
              >

                <div className="glamping-hero-img-wrap">
                  <img
                    src={glamping.image}
                    alt={glamping.name}
                    className="glamping-hero-img"
                  />
                  <span className={`glamping-card-tag glamping-card-tag--${glamping.tagColor}`}>
                    {glamping.tag}
                  </span>
                  <div className="carousel-dots">
                    {GLAMPINGS.map((_, i) => (
                      <button
                        key={i}
                        className={`carousel-dot${i === current ? ' active' : ''}`}
                        onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                        aria-label={`Glamping ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="glamping-hero-body">
                  <div className="glamping-hero-top">
                    <div>
                      <p className="glamping-hero-counter">
                        {current + 1} / {total}
                      </p>
                      <h3 className="glamping-hero-name">{glamping.name}</h3>
                    </div>
                    <span className="glamping-hero-capacity">
                      <Users size={13} /> {glamping.capacity}
                    </span>
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
                    <span className="glamping-card-price">{glamping.price}</span>
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

            <button
              className="carousel-arrow carousel-arrow--next"
              onClick={goNext}
              aria-label="Siguiente glamping"
            >
              <ChevronRight size={24} />
            </button>
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
    </>
  );
};

export default AccommodationSection;

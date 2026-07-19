import React, { useState, useEffect, useCallback } from 'react';
import {
  Bath, ThermometerSun, Waves, Users, Moon,
  X, CalendarDays, MessageCircle, Maximize,
  Sparkles, Dog, ChevronLeft, ChevronRight, Tag,
  Star, AlertCircle, Info
} from 'lucide-react';
import Reveal from '../components/Reveal';
import './AccommodationSection.css';

// ─── Constants ────────────────────────────────────────────────────────────────
const BASE_WEEKEND = 450000;
const BASE_WEEKDAY = Math.round(BASE_WEEKEND * 0.80); // 20% off = 360,000
const EXTRA_PERSON_PRICE = 65000;
const WHATSAPP_NUMBER = '573214490484';

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
      'Contamos con 2 glampings: Patrón 70 y Don Julio. Vive una experiencia de descanso única en nuestros exclusivos domos geodésicos termoacondicionados, combinando confort, privacidad y naturaleza. Equipado con cama doble, sofá, baño privado de gran tamaño y amplia terraza. Relájate en nuestro jacuzzi panorámico climatizado para 4 personas contemplando la increíble vista a las montañas.',
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

const INITIAL_FORM = {
  nombre: '',
  telefono: '',
  personas: '2',
  glamping_choice: 'Patrón 70',
  solicitud: '',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isWeekend(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 6=Sat
  return day === 0 || day === 5 || day === 6; // Fri-Sun as "weekend" nights
}

function isWeekdayNight(date) {
  return !isWeekend(date);
}

function priceForNight(checkInDate) {
  // Price is determined by the check-in night date
  return isWeekend(checkInDate) ? BASE_WEEKEND : BASE_WEEKDAY;
}

function getNightsBetween(checkin, checkout) {
  const start = new Date(checkin);
  const end = new Date(checkout);
  const nights = [];
  const cur = new Date(start);
  while (cur < end) {
    nights.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return nights;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatCOP(n) {
  return `$${n.toLocaleString('es-CO')}`;
}

function calcPricing(checkin, checkout, personas) {
  if (!checkin || !checkout) return null;
  const nights = getNightsBetween(checkin, checkout);
  if (nights.length === 0) return null;

  const extraPersons = Math.max(0, parseInt(personas) - 2);
  const extraPersonTotal = extraPersons * EXTRA_PERSON_PRICE * nights.length;

  let weekdayNights = 0;
  let weekendNights = 0;
  let weekdayTotal = 0;
  let weekendTotal = 0;

  nights.forEach((night) => {
    const nightStr = night.toISOString().split('T')[0];
    if (isWeekdayNight(nightStr)) {
      weekdayNights++;
      weekdayTotal += BASE_WEEKDAY;
    } else {
      weekendNights++;
      weekendTotal += BASE_WEEKEND;
    }
  });

  const baseTotal = weekdayTotal + weekendTotal;
  const grandTotal = baseTotal + extraPersonTotal;

  return {
    nights: nights.length,
    weekdayNights,
    weekendNights,
    weekdayTotal,
    weekendTotal,
    baseTotal,
    extraPersons,
    extraPersonTotal,
    grandTotal,
  };
}

function buildWhatsAppMsg(form, checkin, checkout, pricing) {
  const lines = [
    `*SOLICITUD DE RESERVA - LA MECA GLAMPING*`,
    ``,
    `Hola, me interesa solicitar una reserva.`,
    ``,
    `*DATOS PERSONALES:*`,
    `Nombre: ${form.nombre}`,
    `Teléfono / WhatsApp: ${form.telefono}`,
    ``,
    `*GLAMPING SOLICITADO:*`,
    `Glamping: ${form.glamping_choice}`,
    `N° de personas: ${form.personas} persona${parseInt(form.personas) !== 1 ? 's' : ''} (base 2 personas)`,
    ``,
    `*FECHAS:*`,
    `Check-in:  ${formatDate(checkin)} — desde las 2:00 PM`,
    `Check-out: ${formatDate(checkout)} — antes de las 12:00 M`,
    `Total noches: ${pricing.nights}`,
    ``,
    `*DESGLOSE DE PRECIOS:*`,
  ];

  if (pricing.weekdayNights > 0) {
    lines.push(`• ${pricing.weekdayNights} noche${pricing.weekdayNights > 1 ? 's' : ''} entre semana (Lun–Jue): ${formatCOP(BASE_WEEKDAY)} × ${pricing.weekdayNights} = ${formatCOP(pricing.weekdayTotal)}`);
  }
  if (pricing.weekendNights > 0) {
    lines.push(`• ${pricing.weekendNights} noche${pricing.weekendNights > 1 ? 's' : ''} fin de semana (Vie–Dom): ${formatCOP(BASE_WEEKEND)} × ${pricing.weekendNights} = ${formatCOP(pricing.weekendTotal)}`);
  }
  if (pricing.extraPersons > 0) {
    lines.push(`• ${pricing.extraPersons} persona${pricing.extraPersons > 1 ? 's' : ''} adicional${pricing.extraPersons > 1 ? 'es' : ''}: ${formatCOP(EXTRA_PERSON_PRICE)} × ${pricing.extraPersons} × ${pricing.nights} noche${pricing.nights > 1 ? 's' : ''} = ${formatCOP(pricing.extraPersonTotal)}`);
  }

  lines.push(``, `*TOTAL ESTIMADO: ${formatCOP(pricing.grandTotal)}*`);

  if (form.solicitud) {
    lines.push(``, `*Solicitud especial:*`, form.solicitud);
  }

  lines.push(``, `Quedo pendiente de su confirmación. ¡Gracias!`);

  return lines.join('\n');
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAY_NAMES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

function MiniCalendar({ checkin, checkout, onCheckin, onCheckout }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hoveredDate, setHoveredDate] = useState(null);

  // Determine what we're selecting: if no checkin set, select checkin. If checkin set and no checkout, select checkout.
  const selecting = !checkin ? 'checkin' : (!checkout ? 'checkout' : 'checkin');

  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun

  const dateStr = (d) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${viewYear}-${mm}-${dd}`;
  };

  const handleDayClick = (d) => {
    const ds = dateStr(d);
    const clickedDate = new Date(ds + 'T12:00:00');
    if (clickedDate < today) return;

    if (selecting === 'checkin') {
      onCheckin(ds);
      onCheckout('');
      setHoveredDate(null);
    } else {
      // selecting checkout
      if (ds <= checkin) {
        // Clicked before or same as checkin → reset
        onCheckin(ds);
        onCheckout('');
      } else {
        onCheckout(ds);
        setHoveredDate(null);
      }
    }
  };

  const getDayClass = (d) => {
    const ds = dateStr(d);
    const dateObj = new Date(ds + 'T12:00:00');
    const isPast = dateObj < today;
    const isCheckin = ds === checkin;
    const isCheckout = ds === checkout;

    let inRange = false;
    if (checkin && (checkout || hoveredDate)) {
      const end = checkout || hoveredDate;
      inRange = ds > checkin && ds < end;
    }

    const isHoverEnd = ds === hoveredDate && selecting === 'checkout' && checkin;
    const wd = isWeekend(ds);

    let cls = 'cal-day';
    if (isPast) cls += ' cal-day--past';
    else cls += wd ? ' cal-day--weekend' : ' cal-day--weekday';
    if (isCheckin) cls += ' cal-day--checkin';
    if (isCheckout) cls += ' cal-day--checkout';
    if (inRange) cls += ' cal-day--in-range';
    if (isHoverEnd && !checkout) cls += ' cal-day--hover-end';
    return cls;
  };

  return (
    <div className="mini-calendar">
      <div className="cal-header">
        <button className="cal-nav-btn" onClick={handlePrevMonth} aria-label="Mes anterior">
          <ChevronLeft size={16} />
        </button>
        <span className="cal-month-label">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button className="cal-nav-btn" onClick={handleNextMonth} aria-label="Siguiente mes">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="cal-day-names">
        {DAY_NAMES.map(d => <span key={d} className="cal-day-name">{d}</span>)}
      </div>
      <div className="cal-grid">
        {/* Empty cells for first day offset */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="cal-day cal-day--empty" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const ds = dateStr(d);
          const dateObj = new Date(ds + 'T12:00:00');
          const isPast = dateObj < today;
          return (
            <button
              key={d}
              className={getDayClass(d)}
              onClick={() => !isPast && handleDayClick(d)}
              onMouseEnter={() => !isPast && checkin && !checkout && setHoveredDate(ds)}
              onMouseLeave={() => setHoveredDate(null)}
              disabled={isPast}
              aria-label={`${d} ${MONTH_NAMES[viewMonth]}`}
            >
              {d}
            </button>
          );
        })}
      </div>
      <div className="cal-legend">
        <span className="cal-legend-item cal-legend--weekend">Fin de semana (Vie–Dom)</span>
        <span className="cal-legend-item cal-legend--weekday">Entre semana (Lun–Jue)</span>
      </div>
    </div>
  );
}

// ─── Price Breakdown Panel ─────────────────────────────────────────────────────
function PriceBreakdown({ pricing, checkin, checkout }) {
  if (!pricing) return null;
  return (
    <div className="price-breakdown">
      <div className="price-breakdown-header">
        <Tag size={13} />
        <span>Desglose de precio estimado</span>
      </div>
      <div className="price-breakdown-rows">
        {pricing.weekdayNights > 0 && (
          <div className="price-breakdown-row">
            <span>{pricing.weekdayNights} noche{pricing.weekdayNights > 1 ? 's' : ''} entre semana</span>
            <span>{formatCOP(pricing.weekdayTotal)}</span>
          </div>
        )}
        {pricing.weekendNights > 0 && (
          <div className="price-breakdown-row">
            <span>{pricing.weekendNights} noche{pricing.weekendNights > 1 ? 's' : ''} fin de semana</span>
            <span>{formatCOP(pricing.weekendTotal)}</span>
          </div>
        )}
        {pricing.extraPersons > 0 && (
          <div className="price-breakdown-row">
            <span>{pricing.extraPersons} persona{pricing.extraPersons > 1 ? 's' : ''} adicional{pricing.extraPersons > 1 ? 'es' : ''} × {pricing.nights} noche{pricing.nights > 1 ? 's' : ''}</span>
            <span>{formatCOP(pricing.extraPersonTotal)}</span>
          </div>
        )}
      </div>
      <div className="price-breakdown-total">
        <span>TOTAL ESTIMADO ({pricing.nights} noche{pricing.nights > 1 ? 's' : ''})</span>
        <span>{formatCOP(pricing.grandTotal)}</span>
      </div>
      <p className="price-breakdown-note">
        <AlertCircle size={11} />
        El precio final se confirma por WhatsApp. Sujeto a disponibilidad.
      </p>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goPrev = (e) => { e.stopPropagation(); setCurrentIndex(p => p === 0 ? images.length - 1 : p - 1); };
  const goNext = (e) => { e.stopPropagation(); setCurrentIndex(p => p === images.length - 1 ? 0 : p + 1); };
  const handleClose = (e) => { e.stopPropagation(); onClose(); };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentIndex(p => p === 0 ? images.length - 1 : p - 1);
      if (e.key === 'ArrowRight') setCurrentIndex(p => p === images.length - 1 ? 0 : p + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  return (
    <div className="lightbox-overlay" onClick={handleClose}>
      <button className="lightbox-close" onClick={handleClose} aria-label="Cerrar"><X size={24} /></button>
      <button className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Anterior"><ChevronLeft size={32} /></button>
      <button className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Siguiente"><ChevronRight size={32} /></button>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={images[currentIndex]} alt="Vista completa del glamping" className="lightbox-img" loading="lazy" />
        <div className="lightbox-counter">{currentIndex + 1} / {images.length}</div>
      </div>
    </div>
  );
};

// ─── Booking Modal ─────────────────────────────────────────────────────────────
const GlampingModal = ({ glamping, onClose }) => {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [error, setError] = useState('');

  const pricing = calcPricing(checkin, checkout, form.personas);

  // Show the contact form only when both dates are selected
  useEffect(() => {
    if (checkin && checkout && checkin < checkout) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [checkin, checkout]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono) {
      setError('Por favor completa nombre y teléfono.');
      return;
    }
    if (!checkin || !checkout) {
      setError('Por favor selecciona las fechas de check-in y check-out.');
      return;
    }
    if (!pricing) {
      setError('Error calculando el precio. Verifica las fechas.');
      return;
    }
    const msg = buildWhatsAppMsg(form, checkin, checkout, pricing);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  const handleCheckinChange = (ds) => {
    setCheckin(ds);
    if (checkout && ds >= checkout) setCheckout('');
  };

  return (
    <div
      className="acc-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="acc-modal-title"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="acc-modal-card acc-modal-card--new">
        <button className="acc-modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        <div className="acc-modal-inner acc-modal-inner--new">
          {/* ── LEFT: Info only ── */}
          <div className="acc-modal-info acc-modal-info--new">
            {/* Gallery */}
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
                loading="lazy"
              />
              <div className="acc-modal-thumbs">
                {glamping.images.map((src, i) => (
                  <button
                    key={i}
                    className={`acc-thumb-btn${activeImg === i ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Imagen ${i + 1}`}
                  >
                    <img src={src} alt={`Miniatura glamping ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="acc-modal-meta">
              <div className="acc-modal-tag-row">
                <span className={`acc-tag acc-tag--${glamping.tagColor}`}>{glamping.tag}</span>
                <span className="acc-modal-price-hint">
                  Desde {formatCOP(BASE_WEEKDAY)} / noche
                </span>
              </div>
              <h3 id="acc-modal-title" className="acc-modal-name">{glamping.name}</h3>
              <div className="acc-modal-amenities">
                {glamping.amenities.map(({ Icon, label }) => (
                  <div key={label} className="acc-amenity">
                    <Icon size={13} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="acc-pricing-info">
                <div className="acc-pricing-info-row">
                  <span className="acc-pricing-dot acc-pricing-dot--weekday" />
                  <span>Entre semana (Lun–Jue): <strong>{formatCOP(BASE_WEEKDAY)}</strong> / noche</span>
                </div>
                <div className="acc-pricing-info-row">
                  <span className="acc-pricing-dot acc-pricing-dot--weekend" />
                  <span>Fin de semana (Vie–Dom): <strong>{formatCOP(BASE_WEEKEND)}</strong> / noche</span>
                </div>
                <div className="acc-pricing-info-row">
                  <span className="acc-pricing-dot acc-pricing-dot--extra" />
                  <span>Persona adicional (más de 2): <strong>+{formatCOP(EXTRA_PERSON_PRICE)}</strong> / noche</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Calendar → Form ── */}
          <div className="acc-modal-form-wrapper acc-modal-form-wrapper--new">
            <div className="acc-form-header">
              <MessageCircle size={20} className="acc-form-icon" />
              <div>
                <h4>Solicitar reserva</h4>
                <p>
                  {!showForm
                    ? 'Elige tus fechas para ver el precio y continuar'
                    : 'Completa el formulario para enviarnos tu solicitud por WhatsApp'
                  }
                </p>
              </div>
            </div>

            {/* ── CALENDAR (visible only when form is NOT shown) ── */}
            {!showForm && (
              <div className="acc-calendar-wrapper acc-calendar-wrapper--inline">
                <div className="acc-calendar-title">
                  <CalendarDays size={14} />
                  <span>
                    {!checkin
                      ? 'Selecciona tu fecha de llegada'
                      : !checkout
                        ? 'Ahora selecciona tu fecha de salida'
                        : `${formatDateShort(checkin)} → ${formatDateShort(checkout)}`
                    }
                  </span>
                </div>
                <MiniCalendar
                  checkin={checkin}
                  checkout={checkout}
                  onCheckin={handleCheckinChange}
                  onCheckout={setCheckout}
                />
                <div className="acc-availability-note" style={{ marginTop: '12px' }}>
                  <Info size={13} />
                  <span>La disponibilidad está sujeta a confirmación por WhatsApp.</span>
                </div>
              </div>
            )}

            {/* Dates summary bar — visible when form is shown */}
            {showForm && (
              <div className="acc-dates-summary">
                <div className="acc-date-pill">
                  <CalendarDays size={12} />
                  <span>Check-in: <strong>{formatDateShort(checkin)}</strong></span>
                </div>
                <div className="acc-date-arrow">→</div>
                <div className="acc-date-pill">
                  <CalendarDays size={12} />
                  <span>Check-out: <strong>{formatDateShort(checkout)}</strong></span>
                </div>
                <button
                  className="acc-dates-reset"
                  onClick={() => { setCheckin(''); setCheckout(''); setShowForm(false); }}
                  aria-label="Cambiar fechas"
                  title="Cambiar fechas"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Price breakdown */}
            {pricing && <PriceBreakdown pricing={pricing} checkin={checkin} checkout={checkout} />}

            {showForm && (
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
                    <label htmlFor="acc-personas">N° DE PERSONAS</label>
                    <select
                      id="acc-personas"
                      name="personas"
                      value={form.personas}
                      onChange={handleChange}
                    >
                      <option value="2">2 Personas (base)</option>
                      <option value="3">3 Personas (+{formatCOP(EXTRA_PERSON_PRICE)}/noche)</option>
                      <option value="4">4 Personas (+{formatCOP(EXTRA_PERSON_PRICE * 2)}/noche)</option>
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

                <div className="acc-availability-note">
                  <AlertCircle size={13} />
                  <span>La disponibilidad queda sujeta a <strong>confirmación por WhatsApp</strong>. Tu solicitud no garantiza la reserva hasta que el equipo de La Meca la confirme.</span>
                </div>

                <button type="submit" className="btn-primary acc-submit-btn">
                  <MessageCircle size={16} />
                  SOLICITAR RESERVA POR WHATSAPP
                </button>

                <p className="acc-form-note">
                  Al hacer clic serás redirigido a WhatsApp con el detalle completo de tu solicitud.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox images={glamping.images} initialIndex={activeImg} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const AccommodationSection = () => {
  const [selectedGlamping, setSelectedGlamping] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Today's pricing for display on the card
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const todayIsWeekend = isWeekend(todayStr);
  const displayPrice = todayIsWeekend ? BASE_WEEKEND : BASE_WEEKDAY;

  const glamping = GLAMPINGS[0];

  const goPrevImg = (e) => {
    e.stopPropagation();
    setCurrentImg(p => p === 0 ? glamping.images.length - 1 : p - 1);
  };
  const goNextImg = (e) => {
    e.stopPropagation();
    setCurrentImg(p => p === glamping.images.length - 1 ? 0 : p + 1);
  };

  return (
    <>
      <section className="accommodation-section" id="domos">
        <div className="container">
          <Reveal variant="fade-up" delay="0ms">
            <div className="accommodation-header">
              <span className="section-title-tag">ALOJAMIENTO</span>
              <h2>Glamping con Jacuzzi en Guasca — Domos Geodésicos Exclusivos</h2>
              <p className="accommodation-subtitle">
                Cada glamping en La Meca es un mundo propio. Escoge el que más resuene contigo
                y vive una noche que no olvidarás.
              </p>
            </div>
          </Reveal>

          <div className="glamping-carousel-wrap single-card">
            <div className="glamping-carousel-stage">
              <div key={glamping.id} className="glamping-card-hero">

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
                    loading="lazy"
                    decoding="async"
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
                            onClick={e => { e.stopPropagation(); setCurrentImg(i); }}
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

                  {/* Pricing info banner */}
                  <div className="weekday-discount-banner">
                    <Tag size={14} className="weekday-discount-icon" />
                    <div className="weekday-discount-text">
                      <span className="weekday-discount-title">20% de descuento entre semana</span>
                      <span className="weekday-discount-sub">
                        Lun–Jue&nbsp;<strong>{formatCOP(BASE_WEEKDAY)}</strong>
                        &nbsp;·&nbsp;Vie–Dom&nbsp;<strong>{formatCOP(BASE_WEEKEND)}</strong>
                        &nbsp;/ noche
                      </span>
                    </div>
                    {todayIsWeekend
                      ? <span className="weekday-discount-badge weekday-discount-badge--inactive">Fin de semana</span>
                      : <span className="weekday-discount-badge weekday-discount-badge--active">ACTIVO HOY</span>
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
                      {!todayIsWeekend && (
                        <span className="glamping-price-original">{formatCOP(BASE_WEEKEND)}</span>
                      )}
                      <span className={`glamping-card-price${!todayIsWeekend ? ' is-discounted' : ''}`}>
                        {formatCOP(displayPrice)}
                        <span className="glamping-price-unit"> / noche</span>
                      </span>
                      <span className="glamping-price-note">
                        {todayIsWeekend ? 'Fin de semana' : 'Precio hoy (entre semana)'}
                      </span>
                    </div>
                    <button
                      className="btn-primary glamping-reserve-btn"
                      onClick={() => setSelectedGlamping(glamping)}
                    >
                      SOLICITAR RESERVA <ChevronRight size={14} />
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

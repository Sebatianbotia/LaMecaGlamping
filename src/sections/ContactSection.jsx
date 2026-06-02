import React, { useState } from 'react';
import { MapPin, Plus, Minus, Navigation, CheckCircle, X, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Reveal from '../components/Reveal';
import './ContactSection.css';

// ── EmailJS config ──────────────────────────────────────────────────────────
// Crea una cuenta en https://emailjs.com y reemplaza estos valores:
const EMAILJS_SERVICE_ID = 'service_lameca';   // tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_reserva'; // tu Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';  // tu Public Key
// ───────────────────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  nombre: '',
  identificacion: '',
  telefono: '',
  fecha: '',
  personas: '2 Personas',
};

const ContactSection = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.identificacion || !form.telefono || !form.fecha) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    setLoading(true);
    setError('');

    // Construct WhatsApp message
    const msg = [
      `*Solicitud Reserva de Restaurante*`,
      ``,
      `Hola, quisiera reservar una mesa.`,
      `Nombre: ${form.nombre}`,
      `Identificación: ${form.identificacion}`,
      `Teléfono: ${form.telefono}`,
      `Fecha: ${form.fecha}`,
      `Personas: ${form.personas}`,
    ].join('\n');

    // Here we can just simulate the submit and open WhatsApp
    setTimeout(() => {
      setLoading(false);
      window.open(`https://wa.me/573112340584?text=${encodeURIComponent(msg)}`, '_blank');
      setForm(INITIAL_FORM);
      setShowModal(true);
    }, 800);
  };

  const isLargeGroup = form.personas === 'Más de 15 Personas';

  return (
    <>
      <section className="contact-section" id="contacto">
        <div className="container contact-container">

          <Reveal variant="fade-up" delay="0ms">
            <div className="contact-form-wrapper">
              <div className="contact-header">
                <h2>Reserva tu mesa</h2>
                <p>Asegura tu lugar en nuestro exclusivo restaurante campestre. Déjanos tus datos para coordinar.</p>
              </div>

              <form className="booking-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">NOMBRE COMPLETO</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Escribe tu nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="identificacion">IDENTIFICACIÓN</label>
                    <input
                      id="identificacion"
                      name="identificacion"
                      type="text"
                      placeholder="Número de documento"
                      value={form.identificacion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telefono">TELÉFONO</label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="+57 --- --- ----"
                      value={form.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fecha">FECHA DE RESERVA</label>
                    <input
                      id="fecha"
                      name="fecha"
                      type="date"
                      value={form.fecha}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="personas">NÚMERO DE PERSONAS</label>
                  <select
                    id="personas"
                    name="personas"
                    value={form.personas}
                    onChange={handleChange}
                  >
                    <option>2 Personas</option>
                    <option>3 Personas</option>
                    <option>4 Personas</option>
                    <option>5 a 15 Personas</option>
                    <option>Más de 15 Personas</option>
                  </select>
                </div>

                {error && <p className="form-error">{error}</p>}

                {isLargeGroup ? (
                  <div className="large-group-warning">
                    <p style={{ color: 'var(--color-accent)', marginBottom: '16px', fontSize: '14px' }}>
                      Para grupos de más de 15 personas es obligatorio realizar la reserva directamente con uno de nuestros asesores para garantizar la mejor experiencia.
                    </p>
                    <a
                      href="https://wa.me/573112340584?text=Hola,%20quisiera%20cotizar%20una%20reserva%20para%20un%20grupo%20grande%20en%20el%20restaurante."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary form-submit-btn"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                    >
                      <MessageCircle size={18} style={{ marginRight: '8px' }} /> HABLAR CON UN ASESOR
                    </a>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary form-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="btn-loading">
                        <span className="spinner" />
                        ENVIANDO...
                      </span>
                    ) : (
                      'CONFIRMAR RESERVA POR WHATSAPP'
                    )}
                  </button>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Modal de confirmación ── */}
      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal-card">
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            <div className="modal-icon-wrapper">
              <CheckCircle size={48} className="modal-check-icon" />
            </div>

            <h3 id="modal-title" className="modal-title">¡Solicitud enviada!</h3>

            <p className="modal-body">
              Recibimos tu solicitud de reserva. Nuestro asesor se comunicará
              contigo pronto por&nbsp;
              <span className="modal-highlight">
                <MessageCircle size={14} className="modal-wa-icon" />
                WhatsApp
              </span>
              &nbsp;para confirmar todos los detalles de tu estadía.
            </p>

            <p className="modal-sub">Pronto vivirás la experiencia La Meca ✨</p>

            <button
              className="btn-primary modal-btn"
              onClick={() => setShowModal(false)}
            >
              ENTENDIDO
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;

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
  correo: '',
  telefono: '',
  fecha: '',
  personas: '2 Personas',
  solicitud: '',
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

    // Validación básica
    if (!form.nombre || !form.correo || !form.telefono || !form.fecha) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    setLoading(true);
    setError('');

    const templateParams = {
      to_email: 'adrianbotia@gmail.com',
      nombre: form.nombre,
      correo: form.correo,
      telefono: form.telefono,
      fecha: form.fecha,
      personas: form.personas,
      solicitud: form.solicitud || 'Ninguna',
    };

    try {
      // await emailjs.send(
      //   EMAILJS_SERVICE_ID,
      //   EMAILJS_TEMPLATE_ID,
      //   templateParams,
      //   EMAILJS_PUBLIC_KEY
      // );
      setForm(INITIAL_FORM);
      setShowModal(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-section" id="contacto">
        <div className="container contact-container">

          <Reveal variant="fade-left" delay="0ms">
            <div className="contact-form-wrapper">
              <div className="contact-header">
                <h2>Empieza tu historia</h2>
                <p>Completa tus datos y nos pondremos en contacto para coordinar tu estancia ideal.</p>
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
                    <label htmlFor="correo">CORREO ELECTRÓNICO</label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      placeholder="tu@email.com"
                      value={form.correo}
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
                    <label htmlFor="fecha">FECHA DE ESTADÍA</label>
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

                <div className="form-row">
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
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="solicitud">SOLICITUD ESPECIAL</label>
                    <input
                      id="solicitud"
                      name="solicitud"
                      type="text"
                      placeholder="¿Aniversario o alguna sorpresa?"
                      value={form.solicitud}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {error && <p className="form-error">{error}</p>}

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
                    'CONFIRMAR SOLICITUD DE RESERVA'
                  )}
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal variant="fade-right" delay="200ms">
            <div className="contact-map-wrapper">
              <span className="section-title-tag">UBICACIÓN</span>
              <h2>Cómo llegar al cielo</h2>
              <p className="location-desc">Guasca, Cundinamarca — Vereda Santa Bárbara</p>

              <button className="btn-primary map-btn">
                ABRIR EN GOOGLE MAPS <Navigation size={14} className="icon-ml" />
              </button>

              <div className="map-container">
                <div className="map-content">
                  <MapPin size={40} color="#E8B849" />
                  <div className="map-label">LA MECA GLAMPING, GUASCA</div>
                </div>
                <div className="map-controls">
                  <button className="map-control-btn"><Plus size={16} /></button>
                  <button className="map-control-btn"><Minus size={16} /></button>
                </div>
              </div>
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

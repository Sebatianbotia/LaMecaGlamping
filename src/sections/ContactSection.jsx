import React from 'react';
import { MapPin, Plus, Minus, Navigation } from 'lucide-react';
import Reveal from '../components/Reveal';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section" id="contacto">
      <div className="container contact-container">

        <Reveal variant="fade-left" delay="0ms">
          <div className="contact-form-wrapper">
            <div className="contact-header">
              <h2>Empieza tu historia</h2>
              <p>Completa tus datos y nos pondremos en contacto para coordinar tu estancia ideal.</p>
            </div>

            <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>NOMBRE COMPLETO</label>
                  <input type="text" placeholder="Escribe tu nombre" />
                </div>
                <div className="form-group">
                  <label>CORREO ELECTRÓNICO</label>
                  <input type="email" placeholder="tu@email.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>TELÉFONO</label>
                  <input type="tel" placeholder="+57 --- --- ----" />
                </div>
                <div className="form-group">
                  <label>FECHA DE ESTADÍA</label>
                  <input type="date" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>NÚMERO DE PERSONAS</label>
                  <select>
                    <option>2 Personas</option>
                    <option>3 Personas</option>
                    <option>4 Personas</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>SOLICITUD ESPECIAL</label>
                  <input type="text" placeholder="¿Aniversario o alguna sorpresa?" />
                </div>
              </div>

              <button type="submit" className="btn-primary form-submit-btn">
                CONFIRMAR SOLICITUD DE RESERVA
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
  );
};

export default ContactSection;

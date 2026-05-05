import React from 'react';
import { Cloud, Globe, Share2, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <Cloud size={28} strokeWidth={1.5} />
              <span>LA MECA</span>
            </div>
            <p className="footer-desc">
              El escenario perfecto en Guasca para vivir emociones reales. Un santuario celestial diseñado para el alma.
            </p>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">UBICACIÓN</h4>
            <ul className="footer-links">
              <li>Guasca, Cundinamarca</li>
              <li>A 1 hora de Bogotá</li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">CONTACTO</h4>
            <ul className="footer-links">
              <li>lamecaglamping@gmail.com</li>
              <li>WhatsApp: +57 300 000 0000</li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">LEGAL</h4>
            <ul className="footer-links">
              <li><a href="#privacidad">Políticas de Privacidad</a></li>
              <li><a href="#terminos">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#" aria-label="Website"><Globe size={20} strokeWidth={1.5} /></a>
            <a href="#" aria-label="Share"><Share2 size={20} strokeWidth={1.5} /></a>
            <a href="#" aria-label="Email"><Mail size={20} strokeWidth={1.5} /></a>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} LA MECA GLAMPING. DESARROLLADO POR ZOWL WEB DESIGN.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

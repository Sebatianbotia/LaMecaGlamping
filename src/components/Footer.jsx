import React from 'react';
import { Cloud, MessageCircle } from 'lucide-react';
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
              <li>WhatsApp: +57 311 234 0584</li>
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
            <a href="https://www.instagram.com/lamecaglamping/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/lamecaglamping/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.tiktok.com/@lamecaglamping" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
            <a href="https://wa.me/573112340584" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={20} strokeWidth={1.5} />
            </a>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} LA MECA GLAMPING. DESARROLLADO POR <a href="https://zowlwebdesign.netlify.app/" target="_blank" rel="noopener noreferrer" className='zowl'>ZOWL WEB DESIGN</a>.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

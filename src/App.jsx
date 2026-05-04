import React from 'react';
import Navbar from './components/Navbar';
import StarField from './components/StarField';
import HeroSection from './sections/HeroSection';
import RetreatSection from './sections/RetreatSection';
import GastronomySection from './sections/GastronomySection';
import AccommodationSection from './sections/AccommodationSection';
import CommunitySection from './sections/CommunitySection';
import ContactSection from './sections/ContactSection';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Ambient background animation — fixed, behind everything */}
      <StarField count={120} speed={0.2} maxOpacity={0.45} color="#E8B849" />

      <Navbar />
      <main>
        <HeroSection />
        <RetreatSection />
        <GastronomySection />
        <AccommodationSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} La Meca Glamping. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React from 'react';
import Navbar from './components/Navbar';
import StarField from './components/StarField';
import HeroSection from './sections/HeroSection';
import RetreatSection from './sections/RetreatSection';
import GastronomySection from './sections/GastronomySection';
import AccommodationSection from './sections/AccommodationSection';
import SpacesCarouselSection from './sections/SpacesCarouselSection';
import EventsSection from './sections/EventsSection';
import ReviewsSection from './sections/ReviewsSection';
import ContactSection from './sections/ContactSection';
import LocationSection from './sections/LocationSection';
import Footer from './components/Footer';
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
        <ContactSection />
        <AccommodationSection />
        <SpacesCarouselSection />
        <EventsSection />
        <ReviewsSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

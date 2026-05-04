import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ImageCarousel.css';

/**
 * ImageCarousel — horizontal swipe carousel, mobile-only.
 * On desktop: renders nothing (sections keep their masonry grid).
 * On mobile (≤900px): shows a full-width snap scroll with dots.
 *
 * Props:
 *  - images: [{ src, alt }]
 *  - aspectRatio: CSS aspect-ratio string (default '4/3')
 */
const ImageCarousel = ({ images, aspectRatio = '4/3' }) => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active dot as user scrolls/swipes
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    const index = Math.round(track.scrollLeft / slideWidth);
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' });
  };

  return (
    <div className="carousel">
      {/* Slide track */}
      <div className="carousel__track" ref={trackRef}>
        {images.map((img, i) => (
          <div
            key={i}
            className="carousel__slide"
            style={{ aspectRatio }}
          >
            <img src={img.src} alt={img.alt} className="carousel__img" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="carousel__dots" aria-label="Indicador de imagen">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot ${i === activeIndex ? 'carousel__dot--active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;

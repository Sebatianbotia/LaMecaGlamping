import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images, aspectRatio = '4/3' }) => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

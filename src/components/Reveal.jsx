import React, { useEffect, useRef } from 'react';
import './Reveal.css';

const Reveal = ({
  children,
  variant = 'fade-up',
  delay = '0ms',
  duration = '800ms',
  className = '',
  as: Tag = 'div',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use a raw IntersectionObserver to bypass any React re-render bugs
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            // Directly mutate the DOM to avoid StrictMode double-render state issues
            el.classList.add('reveal--visible');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${className}`}
      style={{
        transitionDelay: delay,
        transitionDuration: duration,
      }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;

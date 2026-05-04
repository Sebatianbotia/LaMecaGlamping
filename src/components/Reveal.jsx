import React from 'react';
import useInView from '../hooks/useInView';
import './Reveal.css';

/**
 * Wraps children with a scroll-reveal animation.
 *
 * Props:
 *  - variant: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' (default: 'fade-up')
 *  - delay:   CSS delay string, e.g. '200ms' (default: '0ms')
 *  - duration: CSS duration string (default: '700ms')
 *  - threshold: Intersection threshold (default: 0.15)
 *  - className: extra classes to pass to the wrapper div
 */
const Reveal = ({
  children,
  variant = 'fade-up',
  delay = '0ms',
  duration = '700ms',
  threshold,
  className = '',
  as: Tag = 'div',
}) => {
  const [ref, isInView] = useInView({ threshold });

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${isInView ? 'reveal--visible' : ''} ${className}`}
      style={{ '--reveal-delay': delay, '--reveal-duration': duration }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;

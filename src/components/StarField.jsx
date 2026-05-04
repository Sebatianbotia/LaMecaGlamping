import React, { useEffect, useRef } from 'react';
import './StarField.css';

/**
 * StarField — tiny drifting star particles that:
 *  • Parallax-scroll: move at ~15% of scroll speed so they feel "deep"
 *  • Are hidden behind the hero image (canvas z-index < hero z-index)
 *  • Use near-white color so they look like real stars, not gold smudges
 */
const StarField = ({
  count     = 130,
  maxOpacity = 0.38,
}) => {
  const canvasRef = useRef(null);
  const starsRef  = useRef([]);
  const rafRef    = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Resize ───────────────────────────────────────────────────────
    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // ── Build stars ──────────────────────────────────────────────────
    const rand = (a, b) => Math.random() * (b - a) + a;

    const makeStar = () => ({
      // Distribute across the full page height so they appear everywhere
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(0.25, 0.9),
      // Each star breathes at its own pace
      opacity:       rand(0, maxOpacity * 0.3),
      opacityTarget: rand(maxOpacity * 0.1, maxOpacity),
      opacitySpeed:  rand(0.0008, 0.0025),
      // Slow horizontal drift
      vx: rand(-0.04, 0.04),
      // Very slow upward drift (mimics rising heat shimmer)
      vy: rand(-0.07, -0.02),
    });

    const initStars = () => {
      starsRef.current = Array.from({ length: count }, makeStar);
    };

    // ── Scroll parallax ──────────────────────────────────────────────
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Draw loop ────────────────────────────────────────────────────
    let running = true;
    // Smooth scroll value (lerped to avoid jitter)
    let smoothScroll = 0;

    const draw = () => {
      if (!running) return;

      // Lerp toward real scroll position (0.06 = silky smooth)
      smoothScroll += (scrollRef.current - smoothScroll) * 0.06;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parallax offset: stars move at 12% of scroll speed
      const parallaxY = -smoothScroll * 0.12;

      starsRef.current.forEach((s) => {
        // Breathe
        if (s.opacity < s.opacityTarget) {
          s.opacity = Math.min(s.opacity + s.opacitySpeed, s.opacityTarget);
        } else {
          s.opacityTarget = rand(0, maxOpacity);
        }

        // Drift
        s.x += s.vx;
        s.y += s.vy;

        // Wrap within viewport (not full page — they're fixed visually)
        if (s.y < -4)                       s.y = canvas.height + 4;
        if (s.x < -4)                       s.x = canvas.width  + 4;
        if (s.x > canvas.width  + 4)        s.x = -4;

        const drawY = s.y + parallaxY;
        // Fade out stars that go above viewport (top = hero image area)
        const edgeFade = Math.min(1, drawY / 80); // 0→80px: fade in from top
        const finalOpacity = s.opacity * Math.max(0, edgeFade);

        if (finalOpacity <= 0.005) return; // skip invisible stars

        // Single crisp point — no glow blobs
        ctx.beginPath();
        ctx.arc(s.x, drawY, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,236,220,${finalOpacity})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    setSize();
    initStars();
    draw();

    window.addEventListener('resize', setSize);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [count, maxOpacity]);

  return <canvas ref={canvasRef} className="star-field" aria-hidden="true" />;
};

export default StarField;

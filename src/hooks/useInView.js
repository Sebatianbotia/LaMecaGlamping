import { useEffect, useRef, useState } from 'react';

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      // If the element is in view, or it has already been scrolled past
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        setIsInView(true);
        observer.disconnect();
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isInView];
};

export default useInView;

import { useEffect, useRef, useState } from 'react';

/**
 * useInView — returns [ref, isInView].
 *
 * Strategy: schedule observer registration with setTimeout(200ms) so that:
 *  1. The CSS initial state (opacity:0 / translate) is guaranteed to be painted.
 *  2. React StrictMode double-invocation: the cleanup cancels the first timer
 *     before it fires, and the second invocation sets a fresh timer. The
 *     observer is registered only once, after the DOM is stable.
 */
const useInView = ({
  threshold  = 0.1,
  rootMargin = '0px 0px -60px 0px',
} = {}) => {
  const ref      = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer;
    let observer;

    timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin }
      );
      observer.observe(el);
    }, 200);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isInView];
};

export default useInView;

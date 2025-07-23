import { useEffect, useState, useRef } from "react";

const useCountUp = <T extends HTMLElement>(ref: React.RefObject<T | null>, end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isCountingRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const start = 0;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const current = Math.floor(percentage * (end - start) + start);
      setCount(current);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
        isCountingRef.current = false;
      }
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isCountingRef.current) {
        isCountingRef.current = true;
        startTime = null;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.5,
    });

    observerRef.current.observe(element);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, end, duration]);

  return count;
};

export default useCountUp;
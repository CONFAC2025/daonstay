import { useEffect, useRef, useCallback } from "react";

function useTypingEffect<T extends HTMLElement>(text: string, repeatDelay: number = 0) {
  const elementRef = useRef<T>(null);
  const frameId = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const hasBeenVisible = useRef(false);

  const type = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    let currentText = "";
    let index = 0;
    const speed = 50; // 타이핑 속도 (ms)

    function typeCharacter() {
      if (index < text.length) {
        currentText += text.charAt(index);
        element!.textContent = currentText;
        index++;
        frameId.current = window.setTimeout(typeCharacter, speed);
      } else if (repeatDelay > 0) {
        // 반복 실행
        timeoutRef.current = window.setTimeout(() => {
          index = 0;
          currentText = "";
          element!.textContent = "";
          typeCharacter();
        }, repeatDelay);
      }
    }
    typeCharacter();
  }, [text, repeatDelay]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const cleanup = () => {
      if (frameId.current) window.clearTimeout(frameId.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (observerRef.current) observerRef.current!.disconnect();
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasBeenVisible.current) {
          hasBeenVisible.current = true; // 한 번만 실행되도록 플래그 설정
          type();
          if (observerRef.current) {
            observerRef.current.unobserve(element);
          }
        }
      },
      { threshold: 0.8 }
    );

    observerRef.current.observe(element);

    return cleanup;
  }, [type]);

  return elementRef;
}

export default useTypingEffect;

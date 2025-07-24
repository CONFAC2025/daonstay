import { useEffect, useRef, Fragment } from 'react';

const useTypingEffect = (text: string, delay: number = 50, repeatDelay: number = 3000) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const chars = element.querySelectorAll('.char');

    const animateChars = () => {
      chars.forEach((char, index) => {
        (char as HTMLElement).style.opacity = '0'; // Ensure starting from invisible
        (char as HTMLElement).style.animation = 'none'; // Reset animation
        // Force reflow to apply 'none' before reapplying animation
        void (char as HTMLElement).offsetWidth;
        (char as HTMLElement).style.animation = `reveal-char 0.1s steps(1) forwards ${index * delay}ms`;
      });
    };

    let timeoutId: NodeJS.Timeout;

    const startLoop = () => {
      animateChars();

      const lastChar = chars[chars.length - 1];
      if (lastChar) {
        const animationEndHandler = () => {
          lastChar.removeEventListener('animationend', animationEndHandler);
          timeoutId = setTimeout(() => {
            startLoop();
          }, repeatDelay);
        };
        lastChar.addEventListener('animationend', animationEndHandler);
      } else {
        // Fallback if no chars (empty text)
        timeoutId = setTimeout(() => {
          startLoop();
        }, repeatDelay);
      }
    };

    startLoop();

    return () => {
      clearTimeout(timeoutId);
      chars.forEach((char) => {
        (char as HTMLElement).style.animation = 'none'; // Clean up on unmount
        (char as HTMLElement).style.opacity = '1'; // Ensure visible if unmounted mid-animation
      });
    };
  }, [text, delay, repeatDelay]);

  return (
    <Fragment>
      <span ref={ref}>
        {text.split('').map((char, index) => (
          <span key={index} className="char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </Fragment>
  );
};

export default useTypingEffect;

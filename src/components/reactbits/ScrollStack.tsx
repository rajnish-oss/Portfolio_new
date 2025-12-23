import {
  ReactNode,
  useRef,
  useEffect,
  useState,
  Children,
  cloneElement,
  isValidElement,
  CSSProperties,
} from "react";

interface ScrollStackProps {
  children: ReactNode;
  totalHeight?: string;
  persistentElements?: ReactNode;
  slideHeight?: string;
  styles?: {
    container?: CSSProperties;
    slideContainer?: CSSProperties;
    slide?: CSSProperties;
  };
  spring?: {
    stiffness?: number;
    damping?: number;
  };
}

const ScrollStack = ({
  children,
  totalHeight = "300vh",
  persistentElements,
  slideHeight = "100vh",
  styles = {},
  spring = { stiffness: 0.04, damping: 0.9 },
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const slidePositions = useRef<number[]>([]);
  const velocity = useRef(0);
  const lastScrollY = useRef(0);

  const items = Children.toArray(children);
  const totalSlides = items.length;

  useEffect(() => {
    slidePositions.current = items.map((_, i) => i);
  }, [items.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = -rect.top;
      const containerHeight =
        containerRef.current.offsetHeight - window.innerHeight;

      const rawProgress = containerTop / containerHeight;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      const slideProgress = clampedProgress * (totalSlides - 1);
      const activeSlide = Math.floor(slideProgress);

      velocity.current = (window.scrollY - lastScrollY.current) * 0.1;
      lastScrollY.current = window.scrollY;

      setCurrentSlide(Math.min(activeSlide, totalSlides - 1));
      setScrollProgress(slideProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSlides]);

  const getSlideStyle = (index: number): CSSProperties => {
    const diff = scrollProgress - index;
    const absDiff = Math.abs(diff);

    let translateY = 0;
    let scale = 1;
    let opacity = 1;
    let rotateX = 0;
    let zIndex = totalSlides - index;

    if (diff < 0) {
      // Slide below current
      translateY = (index - scrollProgress) * 100;
      scale = 1;
      opacity = 1;
    } else if (diff >= 0 && diff < 1) {
      // Active slide transitioning
      translateY = -diff * 20;
      scale = 1 - diff * 0.05;
      opacity = 1 - diff * 0.3;
      rotateX = diff * 5;
      zIndex = totalSlides + 1;
    } else {
      // Stacked slides
      translateY = -20 - (diff - 1) * 10;
      scale = 0.95 - (diff - 1) * 0.02;
      opacity = 0.7 - (diff - 1) * 0.2;
      rotateX = 5 + (diff - 1) * 2;
    }

    return {
      transform: `translateY(${translateY}%) scale(${scale}) perspective(1000px) rotateX(${rotateX}deg)`,
      opacity: Math.max(0, opacity),
      zIndex,
      transition: `transform 0.1s ease-out, opacity 0.1s ease-out`,
      ...styles.slide,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight, ...styles.container }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={styles.slideContainer}
      >
        {persistentElements}
        <div className="relative w-full h-full">
          {items.map((child, index) => (
            <div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              style={getSlideStyle(index)}
            >
              <div
                className="w-full max-w-6xl mx-auto px-4"
                style={{ height: slideHeight }}
              >
                {isValidElement(child) ? cloneElement(child) : child}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;

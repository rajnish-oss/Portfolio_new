import { ReactNode, useRef, useEffect, useState, Children, cloneElement, isValidElement } from "react";
import Lenis from "lenis";

interface ScrollStackProps {
  children: ReactNode;
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  fadeOut?: boolean;
}

const ScrollStack = ({
  children,
  itemDistance = 100,
  itemStackDistance = 30,
  stackPosition = "20%",
  baseScale = 0.85,
  rotationAmount = 5,
  blurAmount = 0,
  fadeOut = true,
}: ScrollStackProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenisInstance) return;

    const handleScroll = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top;
        setScrollY(scrollProgress);
      }
    };

    lenisInstance.on("scroll", handleScroll);
    return () => {
      lenisInstance.off("scroll", handleScroll);
    };
  }, [lenisInstance]);

  const items = Children.toArray(children);
  const totalItems = items.length;

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${totalItems * itemDistance + 100}vh` }}
    >
      <div
        className="sticky flex flex-col items-center justify-start w-full"
        style={{ top: stackPosition, height: `calc(100vh - ${stackPosition})` }}
      >
        {items.map((child, index) => {
          const progress = Math.max(0, scrollY - index * window.innerHeight * (itemDistance / 100));
          const maxProgress = window.innerHeight * (itemDistance / 100);
          const normalizedProgress = Math.min(progress / maxProgress, 1);
          
          const scale = baseScale + (1 - baseScale) * (1 - normalizedProgress);
          const translateY = -normalizedProgress * itemStackDistance * (totalItems - index);
          const rotateX = normalizedProgress * rotationAmount;
          const blur = normalizedProgress * blurAmount;
          const opacity = fadeOut ? 1 - normalizedProgress * 0.4 : 1;

          return (
            <div
              key={index}
              className="absolute w-full max-w-4xl px-4"
              style={{
                transform: `translateY(${translateY}px) scale(${scale}) perspective(1000px) rotateX(${rotateX}deg)`,
                opacity,
                filter: blurAmount > 0 ? `blur(${blur}px)` : undefined,
                zIndex: totalItems - index,
                transition: "transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out",
              }}
            >
              {isValidElement(child) ? cloneElement(child) : child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollStack;

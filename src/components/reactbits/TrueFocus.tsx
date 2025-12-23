import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

interface TrueFocusProps {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const TrueFocus = ({
  sentence,
  manualMode = false,
  blurAmount = 5,
  borderColor = "hsl(var(--primary))",
  glowColor = "hsl(var(--primary))",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}: TrueFocusProps) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  const getRect = useCallback((index: number) => {
    const el = wordRefs.current[index];
    const container = containerRef.current;
    if (!el || !container) return { x: 0, y: 0, width: 0, height: 0 };

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return {
      x: elRect.left - containerRect.left,
      y: elRect.top - containerRect.top,
      width: elRect.width,
      height: elRect.height,
    };
  }, []);

  useEffect(() => {
    if (currentIndex === null) return;
    
    const rect = getRect(currentIndex);
    controls.start({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      opacity: 1,
      transition: { duration: animationDuration, ease: "easeInOut" },
    });

    setLastActiveIndex(currentIndex);
  }, [currentIndex, controls, getRect, animationDuration]);

  const handleMouseEnter = (index: number) => {
    if (!manualMode) return;
    setCurrentIndex(index);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Focus border indicator */}
      <motion.div
        className="absolute pointer-events-none rounded-md"
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: `0 0 20px ${glowColor}`,
        }}
        initial={{ opacity: 0 }}
        animate={controls}
      />

      {/* Words */}
      <span className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
        {words.map((word, index) => {
          const isActive = currentIndex === index;
          return (
            <motion.span
              key={index}
              ref={(el) => {
                wordRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              className="inline-block px-2 py-1 cursor-default transition-all"
              animate={{
                filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ duration: animationDuration }}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
    </div>
  );
};

export default TrueFocus;

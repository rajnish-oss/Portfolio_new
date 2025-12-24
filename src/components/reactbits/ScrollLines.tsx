import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollLinesProps {
  className?: string;
  lineCount?: number;
  strokeWidth?: number;
  color?: string;
}

const ScrollLines = ({
  className = "",
  lineCount = 5,
  strokeWidth = 1,
  color = "hsl(var(--primary))",
}: ScrollLinesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pathVariants = Array.from({ length: lineCount }, (_, i) => {
    const delay = i * 0.1;
    return {
      pathLength: useTransform(
        scrollYProgress,
        [0 + delay, 0.5 + delay * 0.5],
        [0, 1]
      ),
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.3, 0.3, 0]),
    };
  });

  const generatePath = (index: number) => {
    const yOffset = (index / lineCount) * 100;
    const amplitude = 30 + index * 10;
    return `M 0 ${50 + yOffset} Q 25 ${50 + yOffset - amplitude} 50 ${50 + yOffset} T 100 ${50 + yOffset}`;
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 0 100 200"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ opacity: 0.15 }}
      >
        {pathVariants.map((variant, i) => (
          <motion.path
            key={i}
            d={generatePath(i)}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 0.1}
            style={{
              pathLength: variant.pathLength,
              opacity: variant.opacity,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default ScrollLines;

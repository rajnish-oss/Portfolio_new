import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollGridProps {
  className?: string;
  gridSize?: number;
  color?: string;
}

const ScrollGrid = ({
  className = "",
  gridSize = 60,
  color = "hsl(var(--border))",
}: ScrollGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          scale,
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
    </div>
  );
};

export default ScrollGrid;

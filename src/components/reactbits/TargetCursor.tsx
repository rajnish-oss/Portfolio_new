import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TargetCursorProps {
  size?: number;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

const TargetCursor = ({
  size = 60,
  color = "hsl(var(--primary))",
  children,
  className = "",
}: TargetCursorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => setIsInside(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ cursor: "none" }}>
      {/* Custom cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 flex items-center justify-center"
        style={{
          width: size,
          height: size,
          left: 0,
          top: 0,
        }}
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2,
          opacity: isInside ? 1 : 0,
          scale: isInside ? 1 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute rounded-full border-2"
          style={{
            width: size,
            height: size,
            borderColor: color,
          }}
        />
        
        {/* Crosshair lines */}
        <div
          className="absolute"
          style={{
            width: size * 0.3,
            height: 2,
            backgroundColor: color,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 2,
            height: size * 0.3,
            backgroundColor: color,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        
        {/* Center dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            backgroundColor: color,
          }}
        />
      </motion.div>

      {children}
    </div>
  );
};

export default TargetCursor;

import { useRef, useState } from "react";

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  glareOpacity?: number;
  glareSize?: number;
  borderRadius?: string;
}

const GlareHover = ({
  children,
  className = "",
  glareColor = "255, 255, 255",
  glareOpacity = 0.3,
  glareSize = 300,
  borderRadius = "1rem",
}: GlareHoverProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glareSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glareColor}, ${glareOpacity}), transparent 60%)`,
        }}
      />
      
      {/* Border glow effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glareSize * 1.5}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glareColor}, ${glareOpacity * 0.5}), transparent 70%)`,
          filter: "blur(10px)",
        }}
      />

      {children}
    </div>
  );
};

export default GlareHover;

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface FluidGlassProps {
  className?: string;
  intensity?: number;
  blur?: number;
  children?: React.ReactNode;
}

const FluidGlass = ({
  className = "",
  intensity = 20,
  blur = 20,
  children,
}: FluidGlassProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) / intensity);
      mouseY.set((e.clientY - centerY) / intensity);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* SVG Filter for glass distortion */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="fluid-glass-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Glass effect layer */}
      <motion.div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          x,
          y,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
        }}
      >
        {/* Glass gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-background/10" />
        
        {/* Refraction highlights */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 70% 70%, hsl(var(--accent) / 0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Edge glow */}
        <div className="absolute inset-0 rounded-3xl border border-border/30 shadow-[inset_0_0_60px_rgba(255,255,255,0.05)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FluidGlass;
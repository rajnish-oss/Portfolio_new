import { useEffect, useRef } from "react";

interface PixelBandsProps {
  pixelSize?: number;
  speed?: number;
  opacity?: number;
}

const PixelBands = ({ pixelSize = 8, speed = 1, opacity = 0.2 }: PixelBandsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Colors matching the theme
    const colors = [
      { h: 0, s: 0, l: 20 },      // Dark gray
      { h: 90, s: 40, l: 35 },    // Dark olive
      { h: 90, s: 60, l: 45 },    // Olive
      { h: 90, s: 100, l: 50 },   // Lime
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Vertical fade - stronger fade at top and bottom for blending
          const verticalPos = y / rows;
          const edgeFade = Math.sin(verticalPos * Math.PI); // 0 at edges, 1 in middle
          
          // Skip if too faded
          if (edgeFade < 0.1) continue;

          // Horizontal wave pattern
          const waveX = x * pixelSize;
          const waveY = y * pixelSize;
          
          // Multiple waves for organic movement
          const wave1 = Math.sin(waveX * 0.01 + time * speed * 0.3 + waveY * 0.005);
          const wave2 = Math.sin(waveX * 0.02 - time * speed * 0.2 + waveY * 0.01) * 0.5;
          const wave3 = Math.sin((waveX + waveY) * 0.008 + time * speed * 0.4) * 0.3;
          
          const combinedWave = (wave1 + wave2 + wave3) / 1.8;
          
          // Only draw some pixels based on wave value (creates scattered band effect)
          if (combinedWave > 0.2) {
            // Pick color based on wave intensity
            const colorIndex = Math.min(
              colors.length - 1,
              Math.floor((combinedWave + 1) * 0.5 * colors.length)
            );
            const color = colors[colorIndex];
            
            // Calculate final opacity with edge fade
            const waveOpacity = (combinedWave - 0.2) * 1.25;
            const finalOpacity = opacity * waveOpacity * edgeFade;
            
            ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${finalOpacity})`;
            ctx.fillRect(
              x * pixelSize,
              y * pixelSize,
              pixelSize - 1,
              pixelSize - 1
            );
          }
        }
      }

      time += 0.016;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [pixelSize, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
};

export default PixelBands;

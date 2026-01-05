import { useEffect, useRef } from "react";

interface PixelWaveProps {
  pixelSize?: number;
  speed?: number;
}

const PixelWave = ({ pixelSize = 20, speed = 1 }: PixelWaveProps) => {
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

    // Three color layers with different lime shades
    const layers = [
      { color: "hsla(90, 100%, 60%, 0.04)", speedMultiplier: 0.3, waveFreq: 0.02, phaseOffset: 0 },
      { color: "hsla(90, 100%, 60%, 0.07)", speedMultiplier: 0.5, waveFreq: 0.03, phaseOffset: 2 },
      { color: "hsla(90, 100%, 60%, 0.1)", speedMultiplier: 0.8, waveFreq: 0.04, phaseOffset: 4 },
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / pixelSize) + 1;
      const rows = Math.ceil(canvas.height / pixelSize) + 1;

      // Draw each layer
      layers.forEach((layer) => {
        ctx.fillStyle = layer.color;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            // Create wave effect using sine waves
            const wave1 = Math.sin((x * layer.waveFreq) + (time * speed * layer.speedMultiplier) + layer.phaseOffset);
            const wave2 = Math.sin((y * layer.waveFreq * 0.8) + (time * speed * layer.speedMultiplier * 0.7) + layer.phaseOffset);
            const wave3 = Math.sin(((x + y) * layer.waveFreq * 0.5) + (time * speed * layer.speedMultiplier * 0.5));
            
            // Combine waves for more organic movement
            const combinedWave = (wave1 + wave2 + wave3) / 3;
            
            // Only draw pixel if wave value is above threshold
            if (combinedWave > 0.2) {
              const opacity = (combinedWave - 0.2) * 1.25; // Normalize to 0-1
              ctx.globalAlpha = opacity;
              ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize - 1, pixelSize - 1);
            }
          }
        }
      });

      ctx.globalAlpha = 1;
      time += 0.016; // ~60fps timing

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [pixelSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
};

export default PixelWave;

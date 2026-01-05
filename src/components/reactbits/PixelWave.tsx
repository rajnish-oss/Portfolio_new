import { useEffect, useRef } from "react";

interface PixelWaveProps {
  pixelSize?: number;
  speed?: number;
  opacity?: number;
}

const PixelWave = ({ pixelSize = 16, speed = 1, opacity = 0.3 }: PixelWaveProps) => {
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

    // Three wave layers with different colors matching the reference
    const waves = [
      { 
        color: "hsl(0, 0%, 25%)", // Dark gray layer (back)
        baseHeight: 0.3,
        amplitude: 0.15,
        frequency: 0.008,
        speed: 0.3,
        phaseOffset: 0,
      },
      { 
        color: "hsl(90, 40%, 50%)", // Olive/lime layer (middle)
        baseHeight: 0.5,
        amplitude: 0.12,
        frequency: 0.01,
        speed: 0.4,
        phaseOffset: 2,
      },
      { 
        color: "hsl(90, 100%, 60%)", // Bright lime layer (front)
        baseHeight: 0.65,
        amplitude: 0.1,
        frequency: 0.012,
        speed: 0.5,
        phaseOffset: 4,
      },
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);

      // Draw each wave layer from back to front
      waves.forEach((wave) => {
        ctx.fillStyle = wave.color;
        ctx.globalAlpha = opacity;

        for (let x = 0; x < cols; x++) {
          // Calculate wave height at this x position with stair-step effect
          const waveX = x * pixelSize;
          
          // Multiple sine waves combined for organic movement
          const wave1 = Math.sin(waveX * wave.frequency + time * speed * wave.speed + wave.phaseOffset);
          const wave2 = Math.sin(waveX * wave.frequency * 0.5 + time * speed * wave.speed * 0.7 + wave.phaseOffset * 1.5) * 0.5;
          const wave3 = Math.sin(waveX * wave.frequency * 2 + time * speed * wave.speed * 1.2) * 0.25;
          
          const combinedWave = (wave1 + wave2 + wave3) / 1.75;
          
          // Calculate the row where wave starts (from bottom up)
          const waveHeight = wave.baseHeight + combinedWave * wave.amplitude;
          const startRow = Math.floor(rows * (1 - waveHeight));
          
          // Draw pixels from wave line down to bottom
          for (let y = startRow; y < rows; y++) {
            ctx.fillRect(
              x * pixelSize,
              y * pixelSize,
              pixelSize - 1,
              pixelSize - 1
            );
          }
        }
      });

      ctx.globalAlpha = 1;
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

export default PixelWave;

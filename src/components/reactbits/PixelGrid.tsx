import { useEffect, useRef } from "react";

interface PixelGridProps {
  pixelSize?: number;
  speed?: number;
  opacity?: number;
}

const PixelGrid = ({ pixelSize = 12, speed = 1, opacity = 0.12 }: PixelGridProps) => {
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

    // Create a grid of pixels with random properties
    interface Pixel {
      x: number;
      y: number;
      baseOpacity: number;
      phaseOffset: number;
      colorIndex: number;
      pulseSpeed: number;
    }

    let pixels: Pixel[] = [];

    const initPixels = () => {
      pixels = [];
      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          // Only add some pixels randomly for a scattered effect
          if (Math.random() > 0.7) {
            pixels.push({
              x: x * pixelSize,
              y: y * pixelSize,
              baseOpacity: 0.3 + Math.random() * 0.7,
              phaseOffset: Math.random() * Math.PI * 2,
              colorIndex: Math.floor(Math.random() * 3),
              pulseSpeed: 0.5 + Math.random() * 1.5,
            });
          }
        }
      }
    };

    initPixels();
    window.addEventListener("resize", initPixels);

    // Three colors: dark, olive, bright lime
    const colors = [
      "hsl(0, 0%, 25%)",      // Dark gray
      "hsl(90, 40%, 45%)",    // Olive
      "hsl(90, 100%, 60%)",   // Bright lime
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pixels.forEach((pixel) => {
        // Pulsing opacity based on time
        const pulse = Math.sin(time * speed * pixel.pulseSpeed + pixel.phaseOffset);
        const currentOpacity = opacity * pixel.baseOpacity * (0.3 + (pulse + 1) * 0.35);

        // Floating effect - slight vertical movement
        const floatY = Math.sin(time * speed * 0.5 + pixel.phaseOffset) * 3;

        ctx.fillStyle = colors[pixel.colorIndex];
        ctx.globalAlpha = currentOpacity;
        
        ctx.fillRect(
          pixel.x,
          pixel.y + floatY,
          pixelSize - 2,
          pixelSize - 2
        );
      });

      ctx.globalAlpha = 1;
      time += 0.016;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", initPixels);
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

export default PixelGrid;

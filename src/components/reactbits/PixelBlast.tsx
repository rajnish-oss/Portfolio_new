import { useEffect, useRef } from "react";

interface PixelBlastProps {
  containerRef?: React.RefObject<HTMLElement>;
  color?: string;
  gap?: number;
  speed?: number;
  noFocus?: boolean;
}

const PixelBlast = ({
  containerRef,
  color = "#beff00",
  gap = 5,
  speed = 35,
  noFocus = false,
}: PixelBlastProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      originX: number;
      originY: number;
      color: string;
      size: number;
      dx: number;
      dy: number;
      vx: number;
      vy: number;
      force: number;
      angle: number;
      distance: number;
      friction: number;
      ease: number;
    }[] = [];

    const mouse = {
      x: 0,
      y: 0,
      radius: 100,
    };

    const initCanvas = () => {
      const container = containerRef?.current || canvas.parentElement;
      if (!container) return;

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      particles = [];

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            color,
            size: Math.random() * 2 + 1,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
            force: 0,
            angle: 0,
            distance: 0,
            friction: Math.random() * 0.6 + 0.15,
            ease: Math.random() * 0.1 + 0.005,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.dx = mouse.x - particle.x;
        particle.dy = mouse.y - particle.y;
        particle.distance = Math.sqrt(
          particle.dx * particle.dx + particle.dy * particle.dy
        );

        if (particle.distance < mouse.radius) {
          particle.force = (mouse.radius - particle.distance) / mouse.radius;
          particle.angle = Math.atan2(particle.dy, particle.dx);
          particle.vx -=
            particle.force * Math.cos(particle.angle) * (speed / 100);
          particle.vy -=
            particle.force * Math.sin(particle.angle) * (speed / 100);
        }

        particle.x +=
          (particle.vx *= particle.friction) +
          (particle.originX - particle.x) * particle.ease;
        particle.y +=
          (particle.vy *= particle.friction) +
          (particle.originY - particle.y) * particle.ease;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initCanvas();
    animate();

    window.addEventListener("resize", initCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    if (!noFocus) {
      canvas.focus();
    }

    return () => {
      window.removeEventListener("resize", initCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef, color, gap, speed, noFocus]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      tabIndex={0}
    />
  );
};

export default PixelBlast;

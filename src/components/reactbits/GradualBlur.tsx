import { ReactNode } from "react";

interface GradualBlurProps {
  children?: ReactNode;
  direction?: "top" | "bottom";
  strength?: number;
  divCount?: number;
  exponential?: boolean;
  className?: string;
}

const GradualBlur = ({
  children,
  direction = "bottom",
  strength = 2,
  divCount = 5,
  exponential = false,
  className = "",
}: GradualBlurProps) => {
  const blurLayers = Array.from({ length: divCount }, (_, i) => {
    const blurAmount = exponential
      ? Math.pow(strength, i + 1)
      : strength * (i + 1);
    const opacity = (i + 1) / divCount;

    return (
      <div
        key={i}
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          maskImage:
            direction === "bottom"
              ? `linear-gradient(to bottom, transparent ${(i / divCount) * 100}%, black ${((i + 1) / divCount) * 100}%)`
              : `linear-gradient(to top, transparent ${(i / divCount) * 100}%, black ${((i + 1) / divCount) * 100}%)`,
          WebkitMaskImage:
            direction === "bottom"
              ? `linear-gradient(to bottom, transparent ${(i / divCount) * 100}%, black ${((i + 1) / divCount) * 100}%)`
              : `linear-gradient(to top, transparent ${(i / divCount) * 100}%, black ${((i + 1) / divCount) * 100}%)`,
        }}
      />
    );
  });

  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="absolute inset-0 pointer-events-none">{blurLayers}</div>
    </div>
  );
};

export default GradualBlur;

import { ReactNode } from "react";

interface GradualBlurProps {
  children?: ReactNode;
  direction?: "top" | "bottom" | "both";
  strength?: number;
  divCount?: number;
  exponential?: boolean;
  className?: string;
  fullScreen?: boolean;
}

const GradualBlur = ({
  children,
  direction = "bottom",
  strength = 2,
  divCount = 5,
  exponential = false,
  className = "",
  fullScreen = false,
}: GradualBlurProps) => {
  const createBlurLayers = (dir: "top" | "bottom") => {
    return Array.from({ length: divCount }, (_, i) => {
      const blurAmount = exponential
        ? Math.pow(strength, i + 1)
        : strength * (i + 1);

      return (
        <div
          key={`${dir}-${i}`}
          className="absolute inset-x-0 pointer-events-none"
          style={{
            [dir]: 0,
            height: fullScreen ? "120px" : "100%",
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            maskImage:
              dir === "bottom"
                ? `linear-gradient(to bottom, transparent ${(i / divCount) * 100}%, black ${((i + 1) / divCount) * 100}%)`
                : `linear-gradient(to top, transparent ${(i / divCount) * 100}%, black ${((i + 1) / divCount) * 100}%)`,
            WebkitMaskImage:
              dir === "bottom"
                ? `linear-gradient(to bottom, transparent ${(i / divCount) * 100}%, black ${((i + 1) / divCount) * 100}%)`
                : `linear-gradient(to top, transparent ${(i / divCount) * 100}%, black ${((i + 1) / divCount) * 100}%)`,
          }}
        />
      );
    });
  };

  if (fullScreen) {
    return (
      <>
        {/* Top blur */}
        {(direction === "top" || direction === "both") && (
          <div className={`fixed top-0 left-0 right-0 h-[120px] z-40 pointer-events-none ${className}`}>
            {createBlurLayers("top")}
          </div>
        )}
        {/* Bottom blur */}
        {(direction === "bottom" || direction === "both") && (
          <div className={`fixed bottom-0 left-0 right-0 h-[120px] z-40 pointer-events-none ${className}`}>
            {createBlurLayers("bottom")}
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="absolute inset-0 pointer-events-none">
        {direction === "both" ? (
          <>
            {createBlurLayers("top")}
            {createBlurLayers("bottom")}
          </>
        ) : (
          createBlurLayers(direction)
        )}
      </div>
    </div>
  );
};

export default GradualBlur;
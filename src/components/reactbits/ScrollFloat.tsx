import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.out(1.7)",
  scrollStart = "top 80%",
  scrollEnd = "bottom 20%",
  stagger = 0.03,
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  const text = typeof children === "string" ? children : "";

  useEffect(() => {
    if (!containerRef.current || charsRef.current.length === 0) return;

    gsap.set(charsRef.current, {
      willChange: "opacity, transform",
      opacity: 0,
      y: 50,
      rotateX: -90,
    });

    const scrollConfig: ScrollTrigger.Vars = {
      trigger: containerRef.current,
      start: scrollStart,
      end: scrollEnd,
      toggleActions: "play none none reverse",
    };

    if (scrollContainerRef?.current) {
      scrollConfig.scroller = scrollContainerRef.current;
    }

    gsap.to(charsRef.current, {
      duration: animationDuration,
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: stagger,
      ease: ease,
      scrollTrigger: scrollConfig,
    });
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger, scrollContainerRef]);

  const renderChars = () => {
    if (!text) return children;

    return text.split("").map((char, index) => (
      <span
        key={index}
        ref={(el) => {
          if (el) charsRef.current[index] = el;
        }}
        className="inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <span ref={containerRef} className={`inline-block ${containerClassName}`}>
      <span className={`inline-block ${textClassName}`} style={{ perspective: "1000px" }}>
        {renderChars()}
      </span>
    </span>
  );
};

export default ScrollFloat;

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface MenuItem {
  link: string;
  text: string;
  image?: string;
}

interface FlowingMenuProps {
  items: MenuItem[];
  className?: string;
}

const FlowingMenu = ({ items, className = "" }: FlowingMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const quickToX = useRef<gsap.QuickToFunc | null>(null);
  const quickToY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!menuRef.current || !imageRef.current) return;

    // Setup quickTo for smooth image following
    quickToX.current = gsap.quickTo(imageRef.current, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    quickToY.current = gsap.quickTo(imageRef.current, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!menuRef.current) return;
      const rect = menuRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 100;
      const y = e.clientY - rect.top - 75;
      
      quickToX.current?.(x);
      quickToY.current?.(y);
    };

    menuRef.current.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      menuRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleItemHover = (index: number, isEnter: boolean) => {
    const item = itemsRef.current[index];
    if (!item || !imageRef.current) return;

    const image = items[index].image;
    
    if (isEnter && image) {
      imageRef.current.style.backgroundImage = `url(${image})`;
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Animate the text
    gsap.to(item, {
      x: isEnter ? 20 : 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // Dim other items
    itemsRef.current.forEach((otherItem, i) => {
      if (otherItem && i !== index) {
        gsap.to(otherItem, {
          opacity: isEnter ? 0.3 : 1,
          duration: 0.3,
        });
      }
    });
  };

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      {/* Floating image preview */}
      <div
        ref={imageRef}
        className="absolute w-[200px] h-[150px] bg-cover bg-center rounded-lg pointer-events-none opacity-0 scale-75 z-10 shadow-2xl"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Menu items */}
      <nav className="relative z-20">
        {items.map((item, index) => (
          <a
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            href={item.link}
            className="block py-4 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground hover:text-primary transition-colors border-b border-border/30 last:border-b-0"
            onMouseEnter={() => handleItemHover(index, true)}
            onMouseLeave={() => handleItemHover(index, false)}
          >
            <span className="inline-block">
              {item.text}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default FlowingMenu;
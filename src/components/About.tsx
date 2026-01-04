import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VariableProximity from "@/components/reactbits/VariableProximity";
import ScrollGrid from "@/components/reactbits/ScrollGrid";

gsap.registerPlugin(ScrollTrigger);

const aboutCards = [
  {
    number: "01",
    title: "Clean Code Advocate",
    description: "I write maintainable, scalable code following best practices and modern standards.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Problem Solver",
    description: "I love tackling complex challenges and finding elegant solutions to tough problems.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Design-Minded",
    description: "I bridge the gap between design and development, creating pixel-perfect interfaces.",
    icon: "◇",
  },
  {
    number: "04",
    title: "Continuous Learner",
    description: "Always exploring new technologies and staying up-to-date with industry trends.",
    icon: "○",
  },
];

// Floating orb component
const FloatingOrb = ({ delay, size, position }: { delay: number; size: number; position: { x: string; y: string } }) => (
  <motion.div
    className="absolute rounded-full blur-3xl pointer-events-none"
    style={{
      width: size,
      height: size,
      left: position.x,
      top: position.y,
      background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
    }}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.2, 0.9, 1],
      opacity: [0.3, 0.6, 0.4, 0.3],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated line decoration
const AnimatedLine = ({ direction = "horizontal" }: { direction?: "horizontal" | "vertical" }) => (
  <motion.div
    className={`absolute bg-gradient-to-r from-transparent via-primary/50 to-transparent ${
      direction === "horizontal" ? "h-px w-full" : "w-px h-full"
    }`}
    animate={{
      opacity: [0.2, 0.8, 0.2],
      scaleX: direction === "horizontal" ? [0.5, 1, 0.5] : 1,
      scaleY: direction === "vertical" ? [0.5, 1, 0.5] : 1,
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Geometric shape that rotates
const RotatingShape = ({ className }: { className?: string }) => (
  <motion.div
    className={`absolute border border-primary/20 ${className}`}
    animate={{
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    }}
  />
);

// Particle dots
const ParticleDot = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/60"
    style={{ left: x, top: y }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const About = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovering] = useState(false);

  useEffect(() => {
    if (!cardsRef.current) return;

    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Scroll-based grid background */}
      <ScrollGrid gridSize={80} />
      
      {/* Floating Orbs */}
      <FloatingOrb delay={0} size={300} position={{ x: "10%", y: "20%" }} />
      <FloatingOrb delay={2} size={200} position={{ x: "70%", y: "60%" }} />
      <FloatingOrb delay={4} size={150} position={{ x: "80%", y: "10%" }} />

      {/* Rotating geometric shapes */}
      <RotatingShape className="w-32 h-32 left-[5%] top-[30%] rotate-45" />
      <RotatingShape className="w-24 h-24 right-[10%] top-[20%] rounded-full" />
      <RotatingShape className="w-16 h-16 left-[40%] bottom-[15%]" />

      {/* Particle dots */}
      {[...Array(8)].map((_, i) => (
        <ParticleDot
          key={i}
          delay={i * 0.5}
          x={`${15 + i * 10}%`}
          y={`${20 + (i % 3) * 25}%`}
        />
      ))}
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0">
          <AnimatedLine direction="vertical" />
        </div>
        <div className="absolute left-1/2 top-0 bottom-0">
          <AnimatedLine direction="vertical" />
        </div>
        <div className="absolute left-3/4 top-0 bottom-0">
          <AnimatedLine direction="vertical" />
        </div>
        <div className="absolute top-1/3 left-0 right-0">
          <AnimatedLine direction="horizontal" />
        </div>
        <div className="absolute top-2/3 left-0 right-0">
          <AnimatedLine direction="horizontal" />
        </div>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 text-6xl font-display font-black text-primary/10"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 text-8xl font-display font-black text-primary/10"
        animate={{ opacity: [0.1, 0.2, 0.1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ◈
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Artistic badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(var(--primary) / 0.1)",
                  "0 0 40px hsl(var(--primary) / 0.2)",
                  "0 0 20px hsl(var(--primary) / 0.1)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span
                className="text-primary"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ✦
              </motion.span>
              <span className="text-sm font-medium text-primary tracking-wider uppercase">About Me</span>
            </motion.div>

            <div 
              ref={containerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="mb-6 relative"
            >
              {/* Glowing underline */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full"
                animate={{ width: ["0%", "60%", "40%", "50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
                WHO{" "}
                <span className="text-primary relative">
                  <VariableProximity
                    label="I AM"
                    containerRef={containerRef as React.RefObject<HTMLElement>}
                    fromFontVariationSettings="'wght' 400"
                    toFontVariationSettings="'wght' 900"
                    radius={150}
                    falloff="gaussian"
                    className="font-display"
                  />
                  {/* Sparkle effect */}
                  <motion.span
                    className="absolute -right-6 -top-2 text-xl"
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.5],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    ✦
                  </motion.span>
                </span>
              </h2>
            </div>

            <motion.p 
              className="text-muted-foreground text-lg mb-8 font-light leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I'm Anish, a full-stack developer with a passion 
              for building exceptional digital experiences. With over 2 years of 
              experience, I specialize in React, Node.js, and modern web technologies.
            </motion.p>
            <motion.p 
              className="text-muted-foreground text-lg mb-10 font-light leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              When I'm not coding, you'll find me exploring new coffee shops, 
              contributing to open source, or learning something new. I believe 
              great software is built with empathy and attention to detail.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="hero" size="lg" className="gap-2 relative overflow-hidden group">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">More About Me</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
            {aboutCards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 } 
                }}
                className="bg-card/80 backdrop-blur-sm border border-border p-6 rounded-xl relative overflow-hidden group"
              >
                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
                  }}
                />
                
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Large background number */}
                <motion.div 
                  className="absolute -right-4 -top-4 font-display font-bold text-8xl text-border/50 group-hover:text-primary/20 transition-colors duration-500"
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {card.number}
                </motion.div>

                {/* Floating icon */}
                <motion.div
                  className="absolute right-4 top-4 text-2xl text-primary/40 group-hover:text-primary/70 transition-colors"
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                >
                  {card.icon}
                </motion.div>

                <div className="relative z-10">
                  <motion.span 
                    className="text-primary font-display font-bold text-sm mb-2 block"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {card.number}
                  </motion.span>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light">
                    {card.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/30"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-16 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

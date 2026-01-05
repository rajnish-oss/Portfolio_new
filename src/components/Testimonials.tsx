import { Star, Quote } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelBands from "@/components/reactbits/PixelBands";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Anish delivered our project ahead of schedule with exceptional quality. His attention to detail and communication made the collaboration seamless. Highly recommend!",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "TechStart Inc.",
  },
  {
    quote:
      "Working with Anish was a game-changer for our product. His technical expertise and design sensibility helped us create something truly special.",
    name: "James Anderson",
    role: "Product Manager",
    company: "GrowthLab",
  },
  {
    quote:
      "Anish transformed our outdated platform into a modern, user-friendly application. His problem-solving skills and dedication were impressive throughout.",
    name: "Emily Chen",
    role: "Founder",
    company: "Innovatech",
  },
];

// 3D Tilt Card Component with magnetic effect
const TiltCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const brightness = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.9, 1, 1.1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80, rotateX: 45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative h-full cursor-pointer"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 blur-sm"
        style={{
          background: `linear-gradient(135deg, hsl(var(--primary)) 0%, transparent 50%, hsl(var(--primary)) 100%)`,
          filter: `brightness(${brightness})`,
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-500 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-500 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-500 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-500 rounded-br-2xl" />
      
      {children}
    </motion.div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax effect for background elements
    gsap.to(".testimonial-line", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated Pixel Bands Background */}
      <PixelBands pixelSize={10} speed={0.6} opacity={0.25} />

      {/* Parallax Background Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="testimonial-line absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent" />
        <div className="testimonial-line absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent" />
        <div className="testimonial-line absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            CLIENT <span className="text-primary">REVIEWS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            What clients say about working with me.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: "1500px" }}>
          {testimonials.map((testimonial, index) => (
            <TiltCard key={index} index={index}>
              <div className="bg-card/90 backdrop-blur-xl border border-border/30 p-8 rounded-2xl h-full group hover:border-primary/40 transition-all duration-700 relative overflow-hidden">
                
                {/* Animated gradient mesh */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.08)_0%,transparent_50%)]" />
                </div>
                
                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={false}
                >
                  <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                    animate={{
                      top: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                  {/* Animated quote icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Quote className="w-10 h-10 text-primary mb-5 drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                  </motion.div>

                  {/* Stars with wave animation */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10, rotate: -180 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.2 + i * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.3, 
                          rotate: 360,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <Star className="w-4 h-4 text-primary fill-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.6)]" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.p 
                    className="text-muted-foreground font-light leading-relaxed mb-6 group-hover:text-foreground/90 transition-colors duration-500"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    "{testimonial.quote}"
                  </motion.p>

                  <div className="flex items-center gap-4" style={{ transform: "translateZ(40px)" }}>
                    {/* Animated avatar */}
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30 relative overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Rotating ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary/50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="font-display font-bold text-primary text-lg relative z-10">
                        {testimonial.name.charAt(0)}
                      </span>
                    </motion.div>
                    <div>
                      <motion.h4 
                        className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {testimonial.name}
                      </motion.h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

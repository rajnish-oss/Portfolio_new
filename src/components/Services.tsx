import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from "@/components/reactbits/ScrollFloat";
import PixelWave from "@/components/reactbits/PixelWave";
import GlareHover from "@/components/reactbits/GlareHover";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Web Development",
    description: "Building fast, responsive, and scalable web applications using modern frameworks and best practices.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing interfaces that enhance user experience and engagement.",
  },
  {
    number: "03",
    title: "API Development",
    description: "Designing and implementing RESTful and GraphQL APIs that power your applications efficiently.",
  },
  {
    number: "04",
    title: "Performance Optimization",
    description: "Analyzing and optimizing your applications for speed, SEO, and overall performance.",
  },
  {
    number: "05",
    title: "Technical Consulting",
    description: "Providing expert advice on architecture, tech stack selection, and development best practices.",
  },
  {
    number: "06",
    title: "Code Review & Mentoring",
    description: "Helping teams improve code quality and upskilling developers through mentorship.",
  },
];

const Services = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Animated Pixel Wave Background */}
      <PixelWave pixelSize={6} speed={0.8} opacity={0.2} />
      
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border/50" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border/50" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
            WHAT I{" "}
            <span className="text-primary">
              <ScrollFloat animationDuration={1} ease="back.out(1.5)" stagger={0.05}>
                OFFER
              </ScrollFloat>
            </span>
          </h2>
        </motion.div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlareHover
              key={index}
              glareColor="190, 255, 0"
              glareOpacity={0.12}
              glareSize={250}
              borderRadius="0px"
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-card/90 backdrop-blur-sm border border-border/60 p-8 h-full group cursor-pointer relative overflow-hidden hover:border-primary/40 transition-all duration-500"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-[20px] h-[20px] border-l border-b border-primary/40 bg-primary/5" 
                  style={{ transform: "rotate(45deg) translate(7px, -7px)" }} 
                />
                <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-t border-r border-primary/40 bg-primary/5" 
                  style={{ transform: "rotate(45deg) translate(-7px, 7px)" }} 
                />
                
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-primary font-display font-bold text-3xl group-hover:scale-110 transition-transform duration-300 origin-left">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed group-hover:text-foreground/70 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </GlareHover>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

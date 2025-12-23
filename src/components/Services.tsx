import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <section id="services" className="py-24 relative">
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border" />
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
            WHAT I <span className="text-primary">OFFER</span>
          </h2>
        </motion.div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card border border-border p-8 rounded-lg group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-primary font-display font-bold text-2xl">
                  {service.number}
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

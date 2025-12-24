import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlareHover from "@/components/reactbits/GlareHover";
import ParticleNetwork from "@/components/reactbits/ParticleNetwork";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Alex delivered our project ahead of schedule with exceptional quality. His attention to detail and communication made the collaboration seamless. Highly recommend!",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "TechStart Inc.",
  },
  {
    quote:
      "Working with Alex was a game-changer for our product. His technical expertise and design sensibility helped us create something truly special.",
    name: "James Anderson",
    role: "Product Manager",
    company: "GrowthLab",
  },
  {
    quote:
      "Alex transformed our outdated platform into a modern, user-friendly application. His problem-solving skills and dedication were impressive throughout.",
    name: "Emily Chen",
    role: "Founder",
    company: "Innovatech",
  },
];

const Testimonials = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 50, rotateY: -10 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Interactive Particle Network Background */}
      <ParticleNetwork
        particleCount={35}
        particleSize={1.5}
        particleColor="hsl(90, 100%, 60%)"
        lineColor="rgba(190, 255, 0, 0.08)"
        maxDistance={100}
        speed={0.2}
        interactive={true}
      />

      {/* Static Background Elements */}
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
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            CLIENT <span className="text-primary">REVIEWS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            What clients say about working with me.
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <GlareHover
              key={index}
              glareColor="190, 255, 0"
              glareOpacity={0.15}
              glareSize={300}
              borderRadius="16px"
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-card/80 backdrop-blur-md border border-border/50 p-8 rounded-2xl h-full group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                
                <div className="relative z-10">
                  <Quote className="w-10 h-10 text-primary mb-5 group-hover:scale-110 transition-transform duration-300" />

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-4 h-4 text-primary fill-primary" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-muted-foreground font-light leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                      <span className="font-display font-bold text-primary text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </GlareHover>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

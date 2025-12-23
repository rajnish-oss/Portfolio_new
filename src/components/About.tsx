import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutCards = [
  {
    number: "01",
    title: "Clean Code Advocate",
    description: "I write maintainable, scalable code following best practices and modern standards.",
  },
  {
    number: "02",
    title: "Problem Solver",
    description: "I love tackling complex challenges and finding elegant solutions to tough problems.",
  },
  {
    number: "03",
    title: "Design-Minded",
    description: "I bridge the gap between design and development, creating pixel-perfect interfaces.",
  },
  {
    number: "04",
    title: "Continuous Learner",
    description: "Always exploring new technologies and staying up-to-date with industry trends.",
  },
];

const About = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

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
    <section id="about" className="py-24 relative">
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              WHO <span className="text-primary">I AM</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 font-light leading-relaxed">
              I'm Alex, a full-stack developer based in San Francisco with a passion 
              for building exceptional digital experiences. With over 5 years of 
              experience, I specialize in React, Node.js, and modern web technologies.
            </p>
            <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">
              When I'm not coding, you'll find me exploring new coffee shops, 
              contributing to open source, or learning something new. I believe 
              great software is built with empathy and attention to detail.
            </p>
            <Button variant="hero" size="lg" className="gap-2">
              More About Me
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Right Content - Cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
            {aboutCards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card border border-border p-6 rounded-lg relative overflow-hidden group"
              >
                <div className="absolute -right-4 -top-4 font-display font-bold text-8xl text-border opacity-50 group-hover:text-primary/20 transition-colors">
                  {card.number}
                </div>
                <div className="relative z-10">
                  <span className="text-primary font-display font-bold text-sm mb-2 block">
                    {card.number}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

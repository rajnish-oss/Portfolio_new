import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Alex delivered our project ahead of schedule with exceptional quality. His attention to detail and communication made the collaboration seamless. Highly recommend!",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "TechStart Inc.",
    image: "https://framerusercontent.com/images/wpDspSB5J6TyMpd7mXzSsKy0ds.png",
  },
  {
    quote: "Working with Alex was a game-changer for our product. His technical expertise and design sensibility helped us create something truly special.",
    name: "James Anderson",
    role: "Product Manager",
    company: "GrowthLab",
    image: "https://framerusercontent.com/images/bqyH4SQ3ViY4NXPNOSPlg7xRIk.png",
  },
  {
    quote: "Alex transformed our outdated platform into a modern, user-friendly application. His problem-solving skills and dedication were impressive throughout.",
    name: "Emily Chen",
    role: "Founder",
    company: "Innovatech",
    image: "https://framerusercontent.com/images/20HCPp6bWHQ8CflnKsLgR8W7mI.png",
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
      }
    );
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
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
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            CLIENT <span className="text-primary">REVIEWS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            What clients say about working with me.
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card border border-border p-8 rounded-xl"
            >
              <Quote className="w-10 h-10 text-primary mb-6" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

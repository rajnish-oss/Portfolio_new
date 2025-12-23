import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "2023 - Present",
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    description: "Leading development of scalable web applications using React and Node.js. Mentoring junior developers and implementing best practices.",
  },
  {
    year: "2021 - 2023",
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    description: "Built and maintained multiple client-facing applications. Improved site performance by 40% through optimization techniques.",
  },
  {
    year: "2019 - 2021",
    role: "Frontend Developer",
    company: "DigitalAgency",
    description: "Developed responsive web interfaces for various clients. Collaborated closely with designers to deliver pixel-perfect implementations.",
  },
];

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const items = timelineRef.current.querySelectorAll('.experience-item');
    
    gsap.fromTo(
      items,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate the timeline line
    const line = timelineRef.current.querySelector('.timeline-line');
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            MY <span className="text-primary">JOURNEY</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            A timeline of my professional growth and career milestones.
          </p>
        </motion.div>

        <div ref={timelineRef} className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`experience-item relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                viewport={{ once: true }}
                className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 mt-2 z-10"
              />

              {/* Content */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`ml-8 md:ml-0 md:w-1/2 bg-card border border-border p-8 rounded-xl ${
                  index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                }`}
              >
                <span className="text-primary font-display font-bold text-sm mb-2 block">
                  {exp.year}
                </span>
                <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                  {exp.role}
                </h3>
                <p className="text-muted-foreground text-sm font-medium mb-4">
                  {exp.company}
                </p>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

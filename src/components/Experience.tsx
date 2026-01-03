import { Calendar, Briefcase, MapPin, ArrowRight } from "lucide-react";
import ScrollFloat from "./reactbits/ScrollFloat";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    year: "2023 - Present",
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description:
      "Leading development of scalable web applications using React and Node.js. Mentoring junior developers and implementing best practices.",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
  },
  {
    year: "2021 - 2023",
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    description:
      "Built and maintained multiple client-facing applications. Improved site performance by 40% through optimization techniques.",
    skills: ["Vue.js", "Python", "PostgreSQL", "Docker"],
  },
  {
    year: "2019 - 2021",
    role: "Frontend Developer",
    company: "DigitalAgency",
    location: "New York, NY",
    description:
      "Developed responsive web interfaces for various clients. Collaborated closely with designers to deliver pixel-perfect implementations.",
    skills: ["React", "SCSS", "JavaScript", "Figma"],
  },
];

const ExperienceCard = ({
  experience,
  index,
  progress,
}: {
  experience: (typeof experiences)[0];
  index: number;
  progress: any;
}) => {
  const cardOpacity = useTransform(
    progress,
    [index * 0.25, index * 0.25 + 0.15],
    [0.3, 1]
  );
  
  const cardY = useTransform(
    progress,
    [index * 0.25, index * 0.25 + 0.15],
    [60, 0]
  );

  const cardRotate = useTransform(
    progress,
    [index * 0.25, index * 0.25 + 0.15],
    [5, 0]
  );

  return (
    <motion.div
      style={{ opacity: cardOpacity, y: cardY, rotateX: cardRotate }}
      className="min-w-[340px] md:min-w-[420px] h-full flex-shrink-0"
    >
      <div className="relative h-full bg-card/80 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 md:p-8 group hover:border-primary/50 transition-all duration-500 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Large number background */}
        <div className="absolute -right-4 -top-4 font-display font-bold text-[120px] text-primary/5 group-hover:text-primary/10 transition-colors duration-500 select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Year pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full w-fit mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-sm text-primary">
              {experience.year}
            </span>
          </div>
          
          {/* Role */}
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3 leading-tight">
            {experience.role}
          </h3>
          
          {/* Company & Location */}
          <div className="flex flex-wrap gap-4 text-muted-foreground text-sm mb-5">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary/70" />
              <span>{experience.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary/70" />
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 flex-grow">
            {experience.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {experience.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1.5 bg-secondary/80 border border-border rounded-lg text-xs text-foreground font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Hover arrow indicator */}
        <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
          <ArrowRight className="w-5 h-5 text-primary" />
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["5%", "-45%"]);

  return (
    <section ref={containerRef} className="relative py-24 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20" />
      
      {/* Animated line */}
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10 px-6">
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          MY{" "}
          <span className="text-primary">
            <ScrollFloat
              animationDuration={1.2}
              ease="back.out(1.7)"
              stagger={0.04}
            >
              JOURNEY
            </ScrollFloat>
          </span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
          A timeline of my professional growth and career milestones.
        </p>
        
        {/* Scroll indicator */}
        <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground/60 text-sm">
          <span>Scroll to explore</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <motion.div
        style={{ x }}
        className="flex gap-6 pl-6 md:pl-12 pb-4"
      >
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
            index={index}
            progress={scrollYProgress}
          />
        ))}
        
        {/* End card */}
        <div className="min-w-[280px] h-full flex-shrink-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="font-display font-bold text-2xl text-primary">?</span>
            </div>
            <p className="text-muted-foreground text-sm font-light">
              Your project could be next
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;

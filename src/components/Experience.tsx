import { Calendar, Briefcase, MapPin } from "lucide-react";
import ScrollFloat from "./reactbits/ScrollFloat";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    year: "2023",
    endYear: "Present",
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description:
      "Leading development of scalable web applications using React and Node.js. Mentoring junior developers and implementing best practices.",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
  },
  {
    year: "2021",
    endYear: "2023",
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    description:
      "Built and maintained multiple client-facing applications. Improved site performance by 40% through optimization techniques.",
    skills: ["Vue.js", "Python", "PostgreSQL", "Docker"],
  },
  {
    year: "2019",
    endYear: "2021",
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
}: {
  experience: (typeof experiences)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <div ref={cardRef} className="relative grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10">
      {/* Left: Year rail */}
      <div className="relative flex flex-col items-center">
        {/* Year text */}
        <div className="sticky top-32 text-right w-full">
          <span className="font-display font-bold text-2xl md:text-3xl text-primary">
            {experience.year}
          </span>
          <span className="block text-muted-foreground text-xs mt-1">
            — {experience.endYear}
          </span>
        </div>
      </div>

      {/* Right: Card */}
      <motion.div
        style={{ opacity, x }}
        className="relative pb-16"
      >
        {/* Connector line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-5 md:-translate-x-7" />
        
        {/* Dot on line */}
        <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 -translate-x-[26px] md:-translate-x-[34px]" />

        {/* Card */}
        <div className="relative bg-card/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 md:p-8 group hover:border-primary/40 transition-all duration-300 overflow-hidden">
          {/* Glow edge */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2">
              {experience.role}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-4">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-primary/70" />
                <span>{experience.company}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary/70" />
                <span>{experience.location}</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm font-light leading-relaxed mb-5">
              {experience.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-primary/15 border border-primary/30 rounded-full text-xs text-foreground font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-secondary/30 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16 px-6">
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
      </div>

      {/* Progress bar (left edge) */}
      <div className="absolute left-4 md:left-8 top-48 bottom-24 w-[2px] bg-border/30 hidden lg:block">
        <motion.div
          style={{ height: progressHeight }}
          className="w-full bg-primary origin-top"
        />
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;

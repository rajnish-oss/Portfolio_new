import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import ScrollFloat from "@/components/reactbits/ScrollFloat";

const experiences = [
  {
    year: "2023 - Present",
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description: "Leading development of scalable web applications using React and Node.js. Mentoring junior developers and implementing best practices.",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    color: "from-primary/20 to-primary/5",
  },
  {
    year: "2021 - 2023",
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    description: "Built and maintained multiple client-facing applications. Improved site performance by 40% through optimization techniques.",
    skills: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    color: "from-accent/20 to-accent/5",
  },
  {
    year: "2019 - 2021",
    role: "Frontend Developer",
    company: "DigitalAgency",
    location: "New York, NY",
    description: "Developed responsive web interfaces for various clients. Collaborated closely with designers to deliver pixel-perfect implementations.",
    skills: ["React", "SCSS", "JavaScript", "Figma"],
    color: "from-primary/20 to-primary/5",
  },
];

const ExperienceCard = ({ 
  experience, 
  index,
  scrollYProgress,
}: { 
  experience: typeof experiences[0]; 
  index: number;
  scrollYProgress: any;
}) => {
  const start = index * 0.25;
  const end = start + 0.5;
  
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.85, 1, 1, 0.85]);
  const y = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [50, 0, 0, -50]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="sticky top-1/4 w-full max-w-4xl mx-auto"
    >
      <div className={`bg-gradient-to-br ${experience.color} backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-2xl`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Calendar className="w-4 h-4" />
              <span className="font-display font-semibold text-sm">{experience.year}</span>
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
              {experience.role}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{experience.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>
          
          {/* Index Badge */}
          <div className="font-display font-bold text-6xl md:text-8xl text-primary/10">
            0{index + 1}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
          {experience.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill, skillIndex) => (
            <motion.span
              key={skillIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: skillIndex * 0.1 }}
              className="px-4 py-2 bg-background/50 border border-border rounded-full text-sm text-foreground font-medium"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative bg-secondary/30">
      {/* Header */}
      <div className="py-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            MY <span className="text-primary">
              <ScrollFloat animationDuration={1.2} ease="back.out(1.7)" stagger={0.04}>
                JOURNEY
              </ScrollFloat>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light px-6">
            A timeline of my professional growth and career milestones.
          </p>
        </motion.div>
      </div>

      {/* Scroll Stack Experience Cards */}
      <div ref={containerRef} className="relative" style={{ height: `${experiences.length * 100}vh` }}>
        {/* Progress Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30 -translate-x-1/2" />
        <motion.div 
          className="absolute left-1/2 top-0 w-px bg-primary -translate-x-1/2 origin-top"
          style={{ 
            scaleY: scrollYProgress,
            height: "100%"
          }}
        />

        {/* Cards */}
        <div className="px-6">
          {experiences.map((experience, index) => (
            <div 
              key={index} 
              className="h-screen flex items-center justify-center"
              style={{ 
                position: index === 0 ? 'relative' : 'relative',
              }}
            >
              <ExperienceCard 
                experience={experience} 
                index={index}
                scrollYProgress={scrollYProgress}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

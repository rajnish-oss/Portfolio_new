import { Calendar, Briefcase, MapPin } from "lucide-react";
import ScrollFloat from "./reactbits/ScrollFloat";
import { motion } from "framer-motion";

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
}: {
  experience: (typeof experiences)[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Card */}
      <div className="flex-1">
        <div className="relative bg-primary/15 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 md:p-8 shadow-2xl group hover:bg-primary/20 transition-all duration-300">
          {/* Permanent blur background overlay */}
          <div className="absolute inset-0 rounded-2xl bg-background/60 backdrop-blur-md -z-10" />
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/10 to-transparent -z-10" />
          
          {/* Year badge */}
          <div className="flex items-center gap-2 text-primary mb-3">
            <Calendar className="w-4 h-4" />
            <span className="font-display font-semibold text-sm">
              {experience.year}
            </span>
          </div>
          
          {/* Role */}
          <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2">
            {experience.role}
          </h3>
          
          {/* Company & Location */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-4">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{experience.company}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm font-light leading-relaxed mb-5">
            {experience.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-xs text-foreground font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Timeline center */}
      <div className="flex flex-col items-center">
        {/* Number circle */}
        <motion.div 
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-display font-bold text-primary-foreground text-lg shadow-lg shadow-primary/30"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
          viewport={{ once: true }}
        >
          0{index + 1}
        </motion.div>
      </div>
      
      {/* Empty space for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section className="relative py-20 bg-secondary/30 overflow-hidden">
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 top-32 bottom-20 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent transform -translate-x-1/2 hidden md:block" />
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
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
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light px-6">
          A timeline of my professional growth and career milestones.
        </p>
      </div>

      {/* Timeline cards */}
      <div className="max-w-5xl mx-auto px-6 space-y-12 relative z-10">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;

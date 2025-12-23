import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import ScrollFloat from "@/components/reactbits/ScrollFloat";
import ScrollStack from "@/components/reactbits/ScrollStack";

const experiences = [
  {
    year: "2023 - Present",
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description:
      "Leading development of scalable web applications using React and Node.js. Mentoring junior developers and implementing best practices.",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    color: "from-primary/20 to-primary/5",
  },
  {
    year: "2021 - 2023",
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    description:
      "Built and maintained multiple client-facing applications. Improved site performance by 40% through optimization techniques.",
    skills: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    color: "from-accent/20 to-accent/5",
  },
  {
    year: "2019 - 2021",
    role: "Frontend Developer",
    company: "DigitalAgency",
    location: "New York, NY",
    description:
      "Developed responsive web interfaces for various clients. Collaborated closely with designers to deliver pixel-perfect implementations.",
    skills: ["React", "SCSS", "JavaScript", "Figma"],
    color: "from-primary/20 to-primary/5",
  },
];

const ExperienceCard = ({ experience, index }: { experience: (typeof experiences)[0]; index: number }) => {
  return (
    <div
      className={`bg-gradient-to-br ${experience.color} backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-2xl w-full`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Calendar className="w-4 h-4" />
            <span className="font-display font-semibold text-sm">{experience.year}</span>
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">{experience.role}</h3>
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
        <div className="font-display font-bold text-6xl md:text-8xl text-primary/10">0{index + 1}</div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">{experience.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="px-4 py-2 bg-background/50 border border-border rounded-full text-sm text-foreground font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section className="relative bg-secondary/30">
      {/* Header */}
      <div className=" text-center relative z-10">
        <div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            MY{" "}
            <span className="text-primary">
              <ScrollFloat animationDuration={1.2} ease="back.out(1.7)" stagger={0.04}>
                JOURNEY
              </ScrollFloat>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light px-6">
            A timeline of my professional growth and career milestones.
          </p>
        </div>
      </div>

      {/* ScrollStack Experience Cards */}
      <ScrollStack totalHeight="300vh" slideHeight="auto">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} index={index} />
        ))}
      </ScrollStack>
    </section>
  );
};

export default Experience;

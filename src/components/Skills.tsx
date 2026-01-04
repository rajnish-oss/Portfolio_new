import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Featured skills with progress bars
const featuredSkills = [
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", progress: 70 },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", progress: 80 },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", progress: 100 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", progress: 80 },
];

// Core programming languages
const coreStacks = [
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

// Web development technologies
const webDevStacks = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", invert: true },
  { name: "GSAP", icon: "https://cdn.simpleicons.org/greensock/88CE02" },
  { name: "Astro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg" },
  { name: "ShadCN UI", icon: "https://ui.shadcn.com/apple-touch-icon.png" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true },
  { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
];

// Platforms and services
const platforms = [
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Clerk", icon: "https://cdn.simpleicons.org/clerk/6C47FF" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", invert: true },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
];

interface SkillIconProps {
  name: string;
  icon: string;
  invert?: boolean;
  index: number;
}

const SkillIcon = ({ name, icon, invert, index }: SkillIconProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true }}
    className="flex flex-col items-center gap-2 group"
  >
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="w-14 h-14 md:w-16 md:h-16 bg-secondary/80 rounded-xl flex items-center justify-center border border-border/50 hover:border-primary/50 hover:bg-secondary transition-all duration-300"
    >
      <img
        src={icon}
        alt={name}
        className={`w-8 h-8 md:w-9 md:h-9 object-contain ${invert ? "invert" : ""}`}
        loading="lazy"
      />
    </motion.div>
    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
      {name}
    </span>
  </motion.div>
);

interface FeaturedSkillProps {
  name: string;
  icon: string;
  progress: number;
  index: number;
}

const FeaturedSkill = ({ name, icon, progress, index }: FeaturedSkillProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-secondary/60 border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 bg-background/50 rounded-lg flex items-center justify-center">
        <img src={icon} alt={name} className="w-6 h-6 object-contain" loading="lazy" />
      </div>
      <span className="font-medium text-foreground">{name}</span>
      <span className="ml-auto text-xs text-primary font-semibold">{progress}%</span>
    </div>
    <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
      />
    </div>
  </motion.div>
);

interface SectionHeaderProps {
  title: string;
  highlight: string;
}

const SectionHeader = ({ title, highlight }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex items-center gap-2 mb-6"
  >
    <span className="text-primary font-display font-bold">{highlight}</span>
    <span className="text-foreground font-display">{title}</span>
    <ArrowRight className="w-4 h-4 text-muted-foreground" />
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,255,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start mb-16">
          {/* Left: Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-2 block">
              MY SKILLS
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Know-How &
              <br />
              <span className="text-primary">Recognitions</span>
            </h2>
          </motion.div>

          {/* Right: Featured skills with progress */}
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredSkills.map((skill, index) => (
              <FeaturedSkill key={skill.name} {...skill} index={index} />
            ))}
          </div>
        </div>

        {/* Core Stacks */}
        <div className="mb-12">
          <SectionHeader highlight="Core" title="Stacks" />
          <div className="flex flex-wrap gap-6">
            {coreStacks.map((skill, index) => (
              <SkillIcon key={skill.name} {...skill} index={index} />
            ))}
          </div>
        </div>

        {/* Web Dev Stacks */}
        <div className="mb-12">
          <SectionHeader highlight="Web Dev" title="Stacks" />
          <div className="flex flex-wrap gap-6">
            {webDevStacks.map((skill, index) => (
              <SkillIcon key={skill.name} {...skill} index={index} />
            ))}
          </div>
        </div>

        {/* Platforms Used */}
        <div>
          <SectionHeader highlight="Platforms" title="Used" />
          <div className="flex flex-wrap gap-6">
            {platforms.map((skill, index) => (
              <SkillIcon key={skill.name} {...skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

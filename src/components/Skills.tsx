import TrueFocus from "@/components/reactbits/TrueFocus";
import GlareHover from "@/components/reactbits/GlareHover";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    icon: "🎨",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
    icon: "⚙️",
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions"],
    icon: "🛠️",
  },
  {
    title: "Design",
    skills: ["Figma", "Adobe XD", "Photoshop", "UI/UX", "Prototyping"],
    icon: "✨",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with TrueFocus */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            <TrueFocus
              sentence="MY SKILLS & EXPERTISE"
              blurAmount={4}
              animationDuration={0.4}
              pauseBetweenAnimations={1.5}
            />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid with GlareHover */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <GlareHover
              key={index}
              glareColor="190, 255, 0"
              glareOpacity={0.15}
              glareSize={250}
              className="h-full"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-border h-full p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group">
                {/* Icon */}
                <div className="text-4xl mb-4">{category.icon}</div>
                
                {/* Title */}
                <h3 className="font-display font-semibold text-xl text-primary mb-6 group-hover:text-primary/90 transition-colors">
                  {category.title}
                </h3>
                
                {/* Skills list */}
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-muted-foreground font-light flex items-center gap-3 group-hover:text-foreground/80 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlareHover>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

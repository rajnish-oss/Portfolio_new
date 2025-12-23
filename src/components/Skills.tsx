import TrueFocus from "@/components/reactbits/TrueFocus";
import GlareHover from "@/components/reactbits/GlareHover";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "FRONTEND",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    icon: "🎨",
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
  },
  {
    title: "BACKEND",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
    icon: "⚙️",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    title: "TOOLS & DEVOPS",
    skills: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions"],
    icon: "🛠️",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
  {
    title: "DESIGN",
    skills: ["Figma", "Adobe XD", "Photoshop", "UI/UX", "Prototyping"],
    icon: "✨",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(190,255,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>
      
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

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlareHover
                glareColor="190, 255, 0"
                glareOpacity={0.2}
                glareSize={300}
                className="h-full"
                borderRadius="16px"
              >
                <motion.div 
                  className={`relative bg-card/80 backdrop-blur-md border border-border/50 h-full p-8 rounded-2xl transition-all duration-500 hover:border-primary/60 group overflow-hidden`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Card gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon with glow */}
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-display font-semibold text-lg text-primary mb-6 group-hover:text-primary transition-colors tracking-wide">
                      {category.title}
                    </h3>
                    
                    {/* Skills list */}
                    <ul className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skillIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="text-muted-foreground font-light flex items-center gap-3 group-hover:text-foreground/90 transition-colors duration-300"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                          <span>{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

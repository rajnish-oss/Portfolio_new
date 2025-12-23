import { Star, Zap } from "lucide-react";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "Tailwind CSS",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "AWS",
  "Figma",
];

const ServicesMarquee = () => {
  return (
    <section className="relative py-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary to-primary/10" />
      
      {/* Top border line with glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Bottom border line with glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <ScrollVelocity baseVelocity={-2} className="py-3">
        <div className="flex items-center gap-12">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 whitespace-nowrap group"
            >
              <Zap className="w-5 h-5 text-primary fill-primary/50 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="text-foreground text-xl font-display font-bold tracking-wide uppercase">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </ScrollVelocity>
      
      {/* Second row going opposite direction */}
      <ScrollVelocity baseVelocity={2} className="py-3 opacity-50">
        <div className="flex items-center gap-12">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 whitespace-nowrap"
            >
              <Star className="w-4 h-4 text-primary/60 fill-primary/30 flex-shrink-0" />
              <span className="text-muted-foreground text-lg font-display font-medium tracking-wide uppercase">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </ScrollVelocity>
    </section>
  );
};

export default ServicesMarquee;

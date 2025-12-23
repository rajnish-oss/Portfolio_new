import { Star } from "lucide-react";
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
    <section className="py-8 bg-secondary border-y border-border overflow-hidden">
      <ScrollVelocity baseVelocity={-3} className="py-2">
        <div className="flex items-center gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 whitespace-nowrap"
            >
              <Star className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
              <span className="text-foreground text-lg font-display font-semibold">
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

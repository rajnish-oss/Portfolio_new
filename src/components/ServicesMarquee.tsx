import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex animate-marquee"
      >
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-8 whitespace-nowrap"
          >
            <Star className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
            <span className="text-muted-foreground text-sm font-medium">
              {skill}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesMarquee;

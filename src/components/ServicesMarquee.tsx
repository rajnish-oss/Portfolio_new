import { Star } from "lucide-react";

const services = [
  "Web Design",
  "Mobile App Design",
  "Digital Marketing",
  "Graphic Design",
  "Content Creation",
  "Social Media Management",
  "SEO Optimization",
  "Brand Identity",
  "UI/UX Design",
  "Motion Graphics",
];

const ServicesMarquee = () => {
  return (
    <section className="py-8 bg-secondary border-y border-border overflow-hidden">
      <div className="flex animate-marquee">
        {[...services, ...services].map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-8 whitespace-nowrap"
          >
            <Star className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
            <span className="text-muted-foreground text-sm font-medium">
              {service}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesMarquee;

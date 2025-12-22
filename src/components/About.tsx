import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const aboutCards = [
  {
    number: "01",
    title: "Innovation at the Core",
    description: "We believe in pushing boundaries and exploring new possibilities to create groundbreaking designs.",
  },
  {
    number: "02",
    title: "Your Vision, Our Expertise",
    description: "Partner with us to bring your ideas to life with precision and creativity.",
  },
  {
    number: "03",
    title: "Crafting Digital Experiences",
    description: "We create engaging and intuitive digital experiences tailored to your audience.",
  },
  {
    number: "04",
    title: "Driven by Creativity",
    description: "Our team is passionate about delivering top-notch solutions that exceed expectations.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              WHO <span className="text-primary">WE ARE</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 font-light leading-relaxed">
              DesignCube is a creative design agency dedicated to transforming ideas 
              into stunning visual experiences. With a team of passionate designers, 
              developers, and strategists, we bring your vision to life.
            </p>
            <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">
              Our mission is to deliver innovative solutions that not only meet but 
              exceed our clients' expectations. We combine creativity with technology 
              to create impactful digital experiences.
            </p>
            <Button variant="hero" size="lg" className="gap-2">
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Content - Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {aboutCards.map((card, index) => (
              <div
                key={index}
                className="bg-card border border-border p-6 rounded-lg hover-lift relative overflow-hidden group"
              >
                <div className="absolute -right-4 -top-4 font-display font-bold text-8xl text-border opacity-50 group-hover:text-primary/20 transition-colors">
                  {card.number}
                </div>
                <div className="relative z-10">
                  <span className="text-primary font-display font-bold text-sm mb-2 block">
                    {card.number}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

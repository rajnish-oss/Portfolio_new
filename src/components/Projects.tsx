import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Rently",
    category: "Real Estate Website",
    image: "https://framerusercontent.com/images/gc9XBt4kBOdzUdF76TenAusXLc.png",
  },
  {
    title: "Quomi",
    category: "Designer Portfolio",
    image: "https://framerusercontent.com/images/mIVeYkZ7AY3I6nBeeIJBdrYmhXo.png",
  },
  {
    title: "Aiveo",
    category: "AI SaaS Startup",
    image: "https://framerusercontent.com/images/Hqrsr0qCchpMQ3qD5lr23ZblGk.jpg",
  },
  {
    title: "+XZERO®",
    category: "Web Design",
    image: "https://framerusercontent.com/images/Wz3hFd8Q00IPgx6kaYPHaCCHOmo.png",
  },
  {
    title: "Wedora",
    category: "E-commerce Platform",
    image: "https://framerusercontent.com/images/uxNbVYg6JF1nOlix86r82F8kT0.png",
  },
  {
    title: "TechFlow",
    category: "SaaS Dashboard",
    image: "https://framerusercontent.com/images/sRySW0tJNTyLWsQwz1S9xY41mEk.png",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              FEATURED <span className="text-primary">PROJECTS</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl font-light">
              Explore our latest work and see how we've helped brands transform their digital presence.
            </p>
          </div>
          <Button variant="outline" size="lg" className="mt-6 md:mt-0 gap-2">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <ArrowUpRight className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {project.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

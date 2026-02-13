import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradualBlur from "@/components/reactbits/GradualBlur";
import ScrollGrid from "@/components/reactbits/ScrollGrid";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Career Coach",
    code:"https://github.com/rajnish-oss/XioCoach",
    image: "careerAi.png",
  },
  {
    title: "MindMaster",
    live:"https://mindmaster-swart.vercel.app/",
    code:"https://github.com/rajnish-oss/mindMaster",
    image: "mindMaster.png",
  },
  {
    title: "Xio Articles",
    live:"https://rajnish3xio.pythonanywhere.com/",
    code:"https://github.com/rajnish-oss/Blogging-System-Django",
    image: "xio.png",
  },
  {
    title: "FreeLive",
    live:"https://free-live.vercel.app/",
    code:"https://github.com/rajnish-oss/FREELive",
    image: "freeLive.png",
  },
  {
    title: "ChatApp",
    code:"https://github.com/rajnish-oss/Chat-app",
    image: "chatApp.png",
  },
];

const Projects = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: false,
        },
      },
    );
  }, []);

  return (
    <section id="projects" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Scroll-based grid background */}
      <ScrollGrid gridSize={100} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              FEATURED <span className="text-primary">PROJECTS</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl font-light">
              A selection of projects I've worked on, showcasing my skills and passion for building great products.
            </p>
          </div>
          <Button variant="outline" size="lg" className="mt-6 md:mt-0 gap-2">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group cursor-pointer will-change-transform"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                <GradualBlur direction="bottom" strength={1} divCount={3} className="w-full h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </GradualBlur>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <motion.div initial={{ y: 20, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }}>
                    <ArrowUpRight className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-1 group-hover:text-secondry transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-2">
             
              {project.live && <a className="text-muted-foreground text-lg hover:text-primary " href={project.live}>Live</a>}
              {project.code && <a className="text-muted-foreground text-lg hover:text-primary " href={project.code}>Code</a>}

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import VariableProximity from "@/components/reactbits/VariableProximity";
import Galaxy from "@/components/reactbits/Galaxy";

const Hero = () => {
  const heroContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="min-h-screen pt-20 flex items-center relative overflow-hidden bg-background">
      {/* Galaxy Background */}
      <div className="absolute inset-0">
        <Galaxy 
          density={1.5}
          hueShift={350}
          glowIntensity={0.3}
          saturation={1}
          starSpeed={0.7}
          rotationSpeed={0.15}
          mouseRepulsion={true}
          repulsionStrength={2.5}
          twinkleIntensity={0}
          autoCenterRepulsion={0}
          speed={1}
        />
      </div>

      {/* Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-border/30" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-border/30" />
      </div>

      <div ref={heroContainerRef} className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-border/50"
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-muted-foreground text-sm">Full-Stack Developer & Designer</span>
          </motion.div>

          {/* Main Heading with VariableProximity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight">
              HI, I'M{" "}
              <span className="text-primary">ALEX</span>
              <br />
              <VariableProximity
                label="I BUILD THINGS"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
                containerRef={heroContainerRef as React.RefObject<HTMLElement>}
                radius={150}
                falloff="gaussian"
                className="cursor-default"
                style={{ fontFamily: "inherit" }}
              />
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
          >
            I'm a passionate developer crafting beautiful, performant web experiences. 
            From concept to deployment, I bring ideas to life with clean code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" className="gap-2">
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" className="backdrop-blur-sm">
              Download Resume
            </Button>
          </motion.div>

          {/* Minimal Stats Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 text-muted-foreground text-sm tracking-widest uppercase"
          >
            <span className="text-primary font-semibold">50+</span> Projects • 
            <span className="text-primary font-semibold"> 5+</span> Years • 
            <span className="text-primary font-semibold"> 30+</span> Clients
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
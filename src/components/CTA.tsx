import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ScrollFloat from "@/components/reactbits/ScrollFloat";
import Magnetic from "@/components/reactbits/Magnetic";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border" />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%)] bg-[size:60px_60px] animate-[marquee_20s_linear_infinite]" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary-foreground/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary-foreground/10 rounded-full blur-2xl" />
          
          {/* Floating sparkles */}
          <motion.div
            className="absolute top-10 left-10"
            animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-primary-foreground/30" />
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-10"
            animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-primary-foreground/30" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-20"
            animate={{ y: [-3, 3, -3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-primary-foreground/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
              <ScrollFloat 
                animationDuration={0.8} 
                ease="power3.out" 
                stagger={0.03}
                textClassName="text-primary-foreground"
              >
                LET'S BUILD
              </ScrollFloat>
              <br />
              <motion.span 
                className="text-primary-foreground/80 inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                SOMETHING GREAT
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 font-light relative z-10"
          >
            Have a project in mind? I'd love to hear about it. 
            Let's discuss how I can help bring your ideas to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
          >
            <Magnetic strength={0.4} radius={100}>
              <Button variant="dark" size="xl" className="gap-2 group">
                Get In Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.4} radius={100}>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm"
              >
                View Resume
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

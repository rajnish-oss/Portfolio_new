import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import ScrollFloat from "./reactbits/ScrollFloat";
import Magnetic from "./reactbits/Magnetic";

const CTA = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-background">
      {/* Clean background with subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-background" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border/30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-secondary via-secondary to-secondary/90 border border-border rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Subtle gradient overlays */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-4">
              <ScrollFloat animationDuration={1} ease="back.out(1.7)" stagger={0.03}>
                LET'S BUILD
              </ScrollFloat>
              <br />
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                SOMETHING GREAT
              </motion.span>
            </h2>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Have a project in mind? Let's collaborate and create something
              extraordinary together.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Magnetic>
                <a
                  href="mailto:hello@alex.dev"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

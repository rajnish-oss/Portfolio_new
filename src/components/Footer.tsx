import { ArrowRight, Mail, MapPin, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Magnetic from "@/components/reactbits/Magnetic";

const Footer = () => {
  const menuLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "#", icon: Github },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Twitter", href: "#", icon: Twitter },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="contact"
      className="bg-gradient-to-b from-primary via-primary to-primary/95 text-primary-foreground relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.03)_25%,rgba(0,0,0,0.03)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.03)_75%)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Top section with big heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight">
            LET'S WORK
            <br />
            <span className="text-primary-foreground/70">TOGETHER</span>
          </h3>
          <p className="text-primary-foreground/60 text-lg max-w-md font-light">
            Ready to start your next project? Get in touch and let's create something amazing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h4 className="font-display font-semibold text-sm tracking-wider mb-6 text-primary-foreground/50">
              CONTACT
            </h4>
            <div className="space-y-4 mb-8">
              <motion.div 
                className="flex items-start gap-4 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-light text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">
                    San Francisco, CA
                  </p>
                  <p className="font-light text-primary-foreground/50 text-sm">
                    United States
                  </p>
                </div>
              </motion.div>
              <motion.a 
                href="mailto:hello@alex.dev" 
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-light text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">
                    hello@alex.dev
                  </p>
                  <p className="font-light text-primary-foreground/50 text-sm">
                    Drop me a line
                  </p>
                </div>
              </motion.a>
            </div>
            <Magnetic strength={0.4} radius={80}>
              <Button variant="dark" size="lg" className="gap-2 group">
                Send a Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Magnetic>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-semibold text-sm tracking-wider mb-6 text-primary-foreground/50">
              NAVIGATION
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-semibold text-sm tracking-wider mb-6 text-primary-foreground/50">
              FOLLOW
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <Magnetic key={link.label} strength={0.3} radius={60}>
                  <motion.a
                    href={link.href}
                    className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-primary-foreground rounded-xl flex items-center justify-center">
              <span className="text-primary font-display font-bold text-xl">A</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-wider">
              ALEX.DEV
            </span>
          </motion.div>

          <p className="text-sm font-light text-primary-foreground/50 text-center">
            © {currentYear} Alex. Crafted with precision and passion.
          </p>

          <div className="flex items-center gap-4 text-xs text-primary-foreground/40">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

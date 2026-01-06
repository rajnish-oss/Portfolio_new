import { useState } from "react";
import { ArrowRight, Mail, Github, Twitter, ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Magnetic from "@/components/reactbits/Magnetic";
import ContactModal from "@/components/ContactModal";

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const menuLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/anishchowdhury9935", icon: Github },
    { label: "Twitter", href: "https://x.com/Back_track_og", icon: Twitter },
    { label: "Discord", href: "https://discordapp.com/users/1011559805850234981", icon: MessageCircle },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        id="contact"
        className="bg-secondary text-foreground relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%)] bg-[size:40px_40px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          {/* Top section with big heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="mb-12"
          >
            <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight">
              LET'S WORK
              <br />
              <span className="text-primary">TOGETHER</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-md font-light">
              Ready to start your next project? Get in touch and let's create something amazing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false }}
              className="lg:col-span-2"
            >
              <h4 className="font-display font-semibold text-sm tracking-wider mb-5 text-muted-foreground">CONTACT</h4>
              <div className="space-y-3 mb-6">
                <motion.a
                  href="mailto:hello@anish.dev"
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-border flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-light text-foreground/80 group-hover:text-foreground transition-colors">
                      hello@anish.dev
                    </p>
                    <p className="font-light text-muted-foreground text-sm">Drop me a line</p>
                  </div>
                </motion.a>
              </div>
              <Magnetic strength={0.4} radius={80}>
                <Button variant="default" size="lg" className="gap-2 group" onClick={() => setIsContactOpen(true)}>
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
              viewport={{ once: false }}
            >
              <h4 className="font-display font-semibold text-sm tracking-wider mb-5 text-muted-foreground">
                NAVIGATION
              </h4>
              <ul className="space-y-2">
                {menuLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="font-light text-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group"
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
              viewport={{ once: false }}
            >
              <h4 className="font-display font-semibold text-sm tracking-wider mb-5 text-muted-foreground">FOLLOW</h4>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <Magnetic key={link.label} strength={0.3} radius={60}>
                    <motion.a
                      href={link.href}
                      className="w-12 h-12 rounded-xl bg-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
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
            viewport={{ once: false }}
            className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">A</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-wider">ANISH.DEV</span>
            </motion.div>

            <p className="text-sm font-light text-muted-foreground text-center">
              © {currentYear} Anish. Crafted with precision and passion.
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Footer;

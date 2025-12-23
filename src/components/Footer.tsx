import { ArrowRight, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  const menuLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "#", icon: Github },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Twitter", href: "#", icon: Twitter },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="contact"
      className="bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-2xl mb-6">LET'S CONNECT</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="font-light">
                  San Francisco, CA<br />
                  United States
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:hello@alex.dev" className="font-light hover:underline">
                  hello@alex.dev
                </a>
              </div>
            </div>
            <Button variant="dark" size="lg" className="gap-2">
              Send a Message
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">NAVIGATION</h3>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-light hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="text-primary font-display font-bold text-lg">A</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wider">
              ALEX.DEV
            </span>
          </div>

          <p className="text-sm font-light text-center">
            © {new Date().getFullYear()} Alex. All rights reserved.
          </p>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:opacity-80 transition-opacity"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-primary rounded-3xl p-12 md:p-20 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
            READY TO START
            <br />
            YOUR PROJECT?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10 font-light">
            Let's collaborate and create something amazing together. 
            Get in touch with us today and let's bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="dark" size="xl" className="gap-2">
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

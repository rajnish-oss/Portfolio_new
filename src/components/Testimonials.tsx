import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "DesignCube transformed our brand with their exceptional design skills. The team was professional, creative, and delivered beyond our expectations. Highly recommend!",
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "TechStart Inc.",
    image: "https://framerusercontent.com/images/wpDspSB5J6TyMpd7mXzSsKy0ds.png",
  },
  {
    quote: "Working with DesignCube was a game-changer for our business. Their attention to detail and innovative approach helped us stand out in a competitive market.",
    name: "James Anderson",
    role: "CEO",
    company: "GrowthLab",
    image: "https://framerusercontent.com/images/bqyH4SQ3ViY4NXPNOSPlg7xRIk.png",
  },
  {
    quote: "DesignCube's UX/UI design expertise transformed our app into a user-friendly and engaging platform. Their collaborative approach and commitment to excellence were evident in every stage.",
    name: "Michael Brown",
    role: "Product Manager",
    company: "Innovatech",
    image: "https://framerusercontent.com/images/wYHEdCwM2EtawA0fIzu2egzayU.png",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            WHAT OUR <span className="text-primary">CLIENTS SAY</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border p-8 rounded-xl hover-lift"
            >
              <Quote className="w-10 h-10 text-primary mb-6" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

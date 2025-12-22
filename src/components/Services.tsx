import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Web Design",
    description: "Crafting visually stunning and user-friendly websites tailored to your brand's identity and goals.",
  },
  {
    number: "02",
    title: "SEO Optimization",
    description: "Enhancing your website's visibility and ranking on search engines through strategic keyword integration and technical optimization.",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user interfaces that enhance user experience and drive conversions.",
  },
  {
    number: "04",
    title: "Brand Identity",
    description: "Developing cohesive brand identities that communicate your values and resonate with your target audience.",
  },
  {
    number: "05",
    title: "Mobile App Design",
    description: "Designing beautiful and functional mobile applications that provide seamless user experiences across all devices.",
  },
  {
    number: "06",
    title: "Digital Marketing",
    description: "Implementing comprehensive digital marketing strategies to boost your online presence and drive growth.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
            SERVICES
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card border border-border p-8 rounded-lg hover-lift group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-primary font-display font-bold text-2xl">
                  {service.number}
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

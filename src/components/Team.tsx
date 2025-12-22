const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://framerusercontent.com/images/wpDspSB5J6TyMpd7mXzSsKy0ds.png",
  },
  {
    name: "David Chen",
    role: "Creative Director",
    image: "https://framerusercontent.com/images/bqyH4SQ3ViY4NXPNOSPlg7xRIk.png",
  },
  {
    name: "Emma Williams",
    role: "Lead Designer",
    image: "https://framerusercontent.com/images/20HCPp6bWHQ8CflnKsLgR8W7mI.png",
  },
  {
    name: "Michael Brown",
    role: "Senior Developer",
    image: "https://framerusercontent.com/images/wYHEdCwM2EtawA0fIzu2egzayU.png",
  },
];

const Team = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            MEET OUR <span className="text-primary">TEAM</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            A talented group of creative professionals dedicated to bringing your vision to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group text-center"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

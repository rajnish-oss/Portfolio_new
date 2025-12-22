const awards = [
  {
    title: "CSS Nectar - Site of the Day",
    date: "Nov 16, 2023",
    description: "DesignCube's website was recognized as the \"Site of the Day\" by CSS Nectar, highlighting our commitment to excellence in web design.",
  },
  {
    title: "Web Guru Awards",
    date: "Oct 11, 2023",
    description: "DesignCube received the Web Guru Award for outstanding achievement in web design, showcasing our design expertise.",
  },
  {
    title: "Mobile Excellence Awards",
    date: "Sep 28, 2023",
    description: "DesignCube's dedication to providing the best mobile user experiences was acknowledged with a Mobile Excellence Award.",
  },
];

const Awards = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            AWARDS & <span className="text-primary">RECOGNITION</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Our work has been recognized by leading design communities and publications.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-card border border-border p-8 rounded-xl hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display font-semibold text-xl text-foreground">
                  {award.title}
                </h3>
              </div>
              <p className="text-primary text-sm font-medium mb-4">
                {award.date}
              </p>
              <p className="text-muted-foreground font-light leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;

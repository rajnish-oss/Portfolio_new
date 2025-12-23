import FlowingMenu from "@/components/reactbits/FlowingMenu";

const menuItems = [
  { link: "#about", text: "About Me", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" },
  { link: "#projects", text: "My Projects", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
  { link: "#services", text: "Services", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop" },
  { link: "#contact", text: "Contact", image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop" },
];

const FlowingMenuSection = () => {
  return (
    <section className="py-20 bg-secondary/30 border-y border-border/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <FlowingMenu items={menuItems} />
        </div>
      </div>
    </section>
  );
};

export default FlowingMenuSection;

import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  return (
    <>
      <Helmet>
        <title>Alex - Full-Stack Developer & Designer</title>
        <meta 
          name="description" 
          content="I'm Alex, a full-stack developer crafting beautiful, performant web experiences. From concept to deployment, I bring ideas to life with clean code." 
        />
        <meta property="og:title" content="Alex - Full-Stack Developer & Designer" />
        <meta 
          property="og:description" 
          content="I'm Alex, a full-stack developer crafting beautiful, performant web experiences. From concept to deployment, I bring ideas to life with clean code." 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alex - Full-Stack Developer & Designer" />
        <meta 
          name="twitter:description" 
          content="I'm Alex, a full-stack developer crafting beautiful, performant web experiences. From concept to deployment, I bring ideas to life with clean code." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ServicesMarquee />
          <About />
          <Skills />
          <Testimonials />
          <Services />
          <Projects />
          <Experience />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

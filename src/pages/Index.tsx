import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import About from "@/components/About";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>DesignCube - Digital and Web Design Agency</title>
        <meta 
          name="description" 
          content="Designed for agencies, portfolios, and personal brands, DesignCube seamlessly blends minimalist aesthetics with dynamic animations." 
        />
        <meta property="og:title" content="DesignCube - Digital and Web Design Agency" />
        <meta 
          property="og:description" 
          content="Designed for agencies, portfolios, and personal brands, DesignCube seamlessly blends minimalist aesthetics with dynamic animations." 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DesignCube - Digital and Web Design Agency" />
        <meta 
          name="twitter:description" 
          content="Designed for agencies, portfolios, and personal brands, DesignCube seamlessly blends minimalist aesthetics with dynamic animations." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ServicesMarquee />
          <About />
          <Team />
          <Testimonials />
          <Services />
          <Projects />
          <Awards />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

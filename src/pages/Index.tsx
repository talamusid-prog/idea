import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Blog from "@/components/Blog";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import PricingHero from "@/components/PricingHero";
import WhyWebsite from "@/components/WhyWebsite";
import WebsiteTypes from "@/components/WebsiteTypes";
import ConsultationCTA from "@/components/ConsultationCTA";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Process />
        <PricingHero />
        <WhyWebsite />
        <WebsiteTypes />
        <ConsultationCTA />
        <Pricing />
        <Portfolio />
        <Blog />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <FloatingChat />
      <BackToTop />
    </div>
  );
};

export default Index;

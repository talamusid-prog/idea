import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Idea Digital Creative - Jasa Pembuatan Website Profesional di Makassar</title>
        <meta name="description" content="Idea Digital Creative adalah perusahaan digital agency yang berfokus pada pengembangan aplikasi dan website yang inovatif, aman, dan mudah digunakan. Kami membantu bisnis dari berbagai sektor untuk bertransformasi secara digital melalui solusi teknologi yang disesuaikan dengan kebutuhan unik setiap klien." />
        <meta name="keywords" content="jasa pembuatan website, web development, digital agency, website profesional, jasa website makassar, pembuatan website murah, web design, aplikasi web, website company profile, toko online, e-commerce, responsive website, SEO friendly website" />
        <meta name="author" content="Idea Digital Creative" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ideadigitalcreative.com/" />
        <meta property="og:title" content="Idea Digital Creative - Jasa Pembuatan Website Profesional di Makassar" />
        <meta property="og:description" content="Idea Digital Creative adalah perusahaan digital agency yang berfokus pada pengembangan aplikasi dan website yang inovatif, aman, dan mudah digunakan." />
        <meta property="og:image" content="https://ideadigitalcreative.com/logo.png" />
        <meta property="og:site_name" content="Idea Digital Creative" />
        <meta property="og:locale" content={language === 'id' ? 'id_ID' : 'en_US'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ideadigitalcreative.com/" />
        <meta name="twitter:title" content="Idea Digital Creative - Jasa Pembuatan Website Profesional di Makassar" />
        <meta name="twitter:description" content="Idea Digital Creative adalah perusahaan digital agency yang berfokus pada pengembangan aplikasi dan website yang inovatif, aman, dan mudah digunakan." />
        <meta name="twitter:image" content="https://ideadigitalcreative.com/logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ideadigitalcreative.com/" />
        
        {/* Language */}
        <html lang={language} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Idea Digital Creative",
            "url": "https://ideadigitalcreative.com",
            "logo": "https://ideadigitalcreative.com/logo.png",
            "description": "Idea Digital Creative adalah perusahaan digital agency yang berfokus pada pengembangan aplikasi dan website yang inovatif, aman, dan mudah digunakan.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Makassar",
              "addressCountry": "ID"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+62-852-4276-6676",
              "contactType": "customer service",
              "availableLanguage": ["Indonesian", "English"]
            },
            "sameAs": [
              "https://wa.me/6285242766676"
            ],
            "service": [
              {
                "@type": "Service",
                "name": "Website Development",
                "description": "Jasa pembuatan website profesional dan responsif"
              },
              {
                "@type": "Service", 
                "name": "Web Design",
                "description": "Desain website yang menarik dan user-friendly"
              },
              {
                "@type": "Service",
                "name": "E-commerce Development", 
                "description": "Pembuatan website toko online dan e-commerce"
              }
            ]
          })}
        </script>
      </Helmet>
      
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
    </>
  );
};

export default Index;

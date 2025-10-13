import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Fungsi untuk handle logo click - redirect ke home
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>{t('about.title')} - Idea Digital Creative</title>
        <meta name="description" content={t('about.subtitle')} />
        <meta name="keywords" content="tentang kami, about us, ideadigital creative, jasa website, desain kreatif" />
        <meta property="og:title" content={`${t('about.title')} - Idea Digital Creative`} />
        <meta property="og:description" content={t('about.subtitle')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('about.title')} - Idea Digital Creative`} />
        <meta name="twitter:description" content={t('about.subtitle')} />
        <link rel="canonical" href={`https://ideadigitalcreative.com/about`} />
        <html lang={language} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header onLogoClick={handleLogoClick} />
        <About />
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;

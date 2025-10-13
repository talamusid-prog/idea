import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Target, Users, Handshake, Star, ArrowRight } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Fungsi untuk membuka WhatsApp dengan format nomor yang benar
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285242766676"; // Format nomor WhatsApp dengan kode negara +62
    const message = "Halo! Saya ingin berkonsultasi tentang pembuatan website. Apakah ada yang bisa dibantu?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Fungsi untuk handle logo click - redirect ke home
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 lg:pt-16 pb-16 lg:pb-32 bg-gradient-to-br from-background to-muted relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              {t('about.title')}
            </div>
            <h1 className="text-2xl lg:text-6xl font-bold text-secondary leading-none lg:leading-tight mb-2 lg:mb-4">
              {t('about.title')}
            </h1>
          </div>
          
          <div className="max-w-4xl mx-auto text-left -mt-4 lg:mt-0 px-4 lg:px-0">
            <p 
              className="text-lg text-muted-foreground leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: t('about.subtitle') }}
            />
            <p 
              className="text-lg text-muted-foreground leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: t('about.description') }}
            />
            <p 
              className="text-lg text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('about.commitment') }}
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <div className="group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-secondary ml-4">
                  {t('about.vision.title')}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.vision.content')}
              </p>
            </div>

            {/* Mission */}
            <div className="group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-secondary ml-4">
                  {t('about.mission.title')}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.mission.item1')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.mission.item2')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.mission.item3')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.mission.item4')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.mission.item5')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <ArrowRight className="w-4 h-4" />
              {t('about.values.badge')}
            </div>
            <h2 className="text-2xl lg:text-6xl font-bold text-secondary mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Innovation */}
            <div className="text-center group hover:transform hover:scale-105 transition-smooth">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center group-hover:shadow-glow transition-smooth">
                  <Target className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                {t('about.values.innovation.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.values.innovation.desc')}
              </p>
            </div>

            {/* Quality */}
            <div className="text-center group hover:transform hover:scale-105 transition-smooth">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center group-hover:shadow-glow transition-smooth">
                  <Users className="w-10 h-10 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                {t('about.values.quality.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.values.quality.desc')}
              </p>
            </div>

            {/* Partnership */}
            <div className="text-center group hover:transform hover:scale-105 transition-smooth">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center group-hover:shadow-glow transition-smooth">
                  <Handshake className="w-10 h-10 text-success" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                {t('about.values.partnership.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.values.partnership.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-6 lg:px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {t('about.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('about.cta.subtitle')}
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg gradient-primary text-white hover:shadow-glow transition-smooth"
            onClick={handleWhatsAppClick}
          >
            {t('common.contactUs')}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;

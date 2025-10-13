import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="pt-8 lg:pt-16 lg:mt-0 pb-60 lg:pb-32 bg-gradient-to-br from-background to-muted relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(141, 141, 141, 0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:30px_30px] lg:bg-[size:60px_60px] bg-gradient-to-t from-transparent to-gray-400/20" style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
        backgroundPosition: '0 0, 0 0'
      }}></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-end">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-6xl font-bold text-secondary leading-none lg:leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="hidden lg:flex flex-col sm:flex-row gap-4 mb-32 lg:mb-0">
              <Button 
                size="lg" 
                className="gradient-primary text-white hover:shadow-glow transition-smooth text-lg px-8 rounded-[30px]"
              >
                {t('hero.cta.primary')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-4 -translate-y-8 lg:translate-y-0 justify-items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{t('hero.stats.websites.value')}</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.websites.label')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{t('hero.stats.satisfaction.value')}</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.satisfaction.label')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{t('hero.stats.support.value')}</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.support.label')}</div>
              </div>
            </div>
          </div>

          {/* Empty div for grid spacing */}
          <div className="lg:col-span-1"></div>
        </div>
      </div>
      
      {/* Image positioned outside grid */}
      <div className="absolute -bottom-20 lg:bottom-0 left-0 lg:left-[60vw] lg:transform lg:-translate-x-1/6 z-10">
        <img
          src="/jasa1.webp"
          alt="Jasa Website Development"
          className="w-full h-auto lg:w-auto lg:max-h-[65vh] lg:object-contain"
        />
      </div>

      {/* Logo Slider */}
      <div className="absolute -bottom-8 lg:bottom-4 left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 max-w-full lg:max-w-4xl">
        <div className="overflow-hidden">
          <div className="flex items-center space-x-8 animate-scroll">
            {/* First set of logos */}
            <img src="/app/react.webp" alt="React" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/nextjs.webp" alt="Next.js" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/vue.png" alt="Vue.js" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/angular.png" alt="Angular" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/svelte.webp" alt="Svelte" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/nodejs.webp" alt="Node.js" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/laravel.webp" alt="Laravel" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/django.png" alt="Django" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/codeigniter.png" alt="CodeIgniter" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/bootstrap.png" alt="Bootstrap" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/tailwind.webp" alt="Tailwind CSS" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/css.webp" alt="CSS" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            
            {/* Duplicate set for seamless loop */}
            <img src="/app/react.webp" alt="React" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/nextjs.webp" alt="Next.js" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/vue.png" alt="Vue.js" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/angular.png" alt="Angular" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/svelte.webp" alt="Svelte" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/nodejs.webp" alt="Node.js" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/laravel.webp" alt="Laravel" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/django.png" alt="Django" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/codeigniter.png" alt="CodeIgniter" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/bootstrap.png" alt="Bootstrap" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/tailwind.webp" alt="Tailwind CSS" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
            <img src="/app/css.webp" alt="CSS" className="h-6 lg:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
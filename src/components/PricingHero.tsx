import { useLanguage } from "@/contexts/LanguageContext";

const PricingHero = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      iconSrc: "/Premium-Legal.png",
      title: t('pricing.features.premium.title'),
      description: t('pricing.features.premium.desc')
    },
    {
      iconSrc: "/SEO-Basic.png",
      title: t('pricing.features.seo.title'),
      description: t('pricing.features.seo.desc')
    },
    {
      iconSrc: "/Training.png",
      title: t('pricing.features.training.title'),
      description: t('pricing.features.training.desc')
    },
    {
      iconSrc: "/Tampilan-Responsif.png",
      title: t('pricing.features.responsive.title'),
      description: t('pricing.features.responsive.desc')
    },
    {
      iconSrc: "/Support.png",
      title: t('pricing.features.support.title'),
      description: t('pricing.features.support.desc')
    }
  ];

  return (
    <section className="relative py-16">
             {/* Background Split */}
       <div className="absolute inset-0">
         <div className="h-1/2 bg-orange-500"></div>
         <div className="h-1/2 bg-white"></div>
       </div>


      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Top Section - Orange Background */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('pricing.hero.title')}
          </h2>
          <p className="text-white text-lg">
            {t('pricing.hero.subtitle')}
          </p>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
                         {/* Left Panel - Pricing & CTA */}
             <div className="text-center">
                              {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img 
                      src="/icon-konsultasi-jasa-web.png.png" 
                      alt="Website Development"
                      className="w-20 h-20" 
                    />
                  </div>
                </div>

               {/* Service Title */}
               <h3 className="text-3xl font-bold text-gray-700 mb-2">
                 {t('pricing.hero.serviceTitle')}
               </h3>

               {/* Starting Price */}
               <p className="text-gray-600 mb-2">{t('pricing.hero.startingFrom')}</p>

               {/* Price */}
               <div className="text-4xl lg:text-5xl font-bold text-gray-700 mb-8">
                 {t('pricing.hero.price')}
               </div>

               {/* CTA Button */}
               <button className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-base transition-colors duration-300">
                 {t('pricing.hero.cta')}
               </button>
             </div>

                                      {/* Right Panel - Features Grid */}
              <div className="space-y-3 lg:space-y-4 flex flex-col justify-center">
                                 {/* Top Row - 3 Cards */}
                 <div className="grid grid-cols-3 gap-2 lg:gap-4">
                   {features.slice(0, 3).map((feature, index) => (
                     <div key={index} className="bg-gray-50 rounded-xl px-4 py-2 lg:py-3 text-center border border-gray-200">
                       <div className="flex justify-center mb-1">
                         <img 
                           src={feature.iconSrc} 
                           alt={feature.title}
                           className="w-6 h-6 lg:w-8 lg:h-8" 
                         />
                       </div>
                       <h4 className="font-semibold text-gray-700 text-sm lg:text-base mb-0.5">
                         {feature.title}
                       </h4>
                       <p className="text-gray-600 text-xs lg:text-sm">
                         {feature.description}
                       </p>
                     </div>
                   ))}
                 </div>
                
                                 {/* Bottom Row - 2 Cards */}
                 <div className="grid grid-cols-2 gap-2 lg:gap-4">
                   {features.slice(3, 5).map((feature, index) => (
                     <div key={index + 3} className="bg-gray-50 rounded-xl px-4 py-2 lg:py-3 text-center border border-gray-200">
                       <div className="flex justify-center mb-1">
                         <img 
                           src={feature.iconSrc} 
                           alt={feature.title}
                           className="w-6 h-6 lg:w-8 lg:h-8" 
                         />
                       </div>
                       <h4 className="font-semibold text-gray-700 text-sm lg:text-base mb-0.5">
                         {feature.title}
                       </h4>
                       <p className="text-gray-600 text-xs lg:text-sm">
                         {feature.description}
                       </p>
                     </div>
                   ))}
                 </div>
              </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingHero;

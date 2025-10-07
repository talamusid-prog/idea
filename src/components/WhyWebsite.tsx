import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyWebsite = () => {
  const { t } = useLanguage();
  
  const reasons = [
    {
      text: t('whyWebsite.reasons.search.text'),
      highlight: t('whyWebsite.reasons.search.highlight')
    },
    {
      text: t('whyWebsite.reasons.trust.text'),
      highlight: t('whyWebsite.reasons.trust.highlight')
    },
    {
      text: t('whyWebsite.reasons.business.text'),
      highlight: t('whyWebsite.reasons.business.highlight')
    },
    {
      text: t('whyWebsite.reasons.promotion.text'),
      highlight: t('whyWebsite.reasons.promotion.highlight')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 -mt-16 lg:mt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="text-gray-800 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
              {t('whyWebsite.title')}{" "}
              <span className="text-orange-500">{t('whyWebsite.highlight')}</span>{" "}
              {t('whyWebsite.titleEnd')}
            </h2>
            
            <div className="space-y-3 lg:space-y-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 lg:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    {reason.text}
                    <span className="text-orange-500 font-semibold">
                      {reason.highlight}
                    </span>
                    {index === 0 && ` ${t('whyWebsite.reasons.search.suffix')}`}
                    {index === 1 && ` ${t('whyWebsite.reasons.trust.suffix')}`}
                    {index === 2 && ` ${t('whyWebsite.reasons.business.suffix')}`}
                    {index === 3 && ` ${t('whyWebsite.reasons.promotion.suffix')}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="order-1 lg:order-2 mb-4 lg:mb-0">
            <img
              src="/paket.webp"
              alt="Jasa Website Development"
              className="w-4/5 h-auto rounded-lg mx-auto"
            />
          </div>
         </div>
       </div>
     </section>
   );
 };

export default WhyWebsite;

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Process = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      number: "01",
      iconSrc: "/icon-konsultasi-jasa-web.png.png",
      title: t('process.consultation.title'),
      description: t('process.consultation.desc'),
      iconColor: "text-orange-500"
    },
    {
      number: "02",
      iconSrc: "/icon-payment-jasa-web.png.png",
      title: t('process.design.title'),
      description: t('process.design.desc'),
      iconColor: "text-orange-500"
    },
    {
      number: "03",
      iconSrc: "/icon-pengerjaan-jasa-web.png.png",
      title: t('process.development.title'),
      description: t('process.development.desc'),
      iconColor: "text-orange-500"
    },
    {
      number: "04",
      iconSrc: "/icon-website-siap-jasa-web.png.png",
      title: t('process.launch.title'),
      description: t('process.launch.desc'),
      iconColor: "text-orange-500"
    }
  ];

  return (
    <section id="process" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <ArrowRight className="w-4 h-4" />
            {t('process.title')}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-black">{t('process.title')} </span>
            <span className="text-orange-500">{t('process.subtitle')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group"
            >
              {/* Icon and Number Container */}
              <div className="flex items-center justify-between mb-4">
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src={step.iconSrc} 
                    alt={step.title}
                    className="w-12 h-12 group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                
                {/* Step Number */}
                <div className="text-6xl font-bold text-gray-300">
                  {step.number}
                </div>
              </div>

              {/* Content - Rata Kiri */}
              <div className="space-y-3 text-left">
                <h3 className="text-xl font-bold text-black">
                  {step.title}
                </h3>
                <p className="text-black leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
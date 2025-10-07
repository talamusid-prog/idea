import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ConsultationCTA = () => {
  const { t } = useLanguage();
  
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285242766676";
    const message = t('consultation.whatsappMessage');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-2 lg:py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-900 rounded-2xl p-6 border border-orange-500">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            
            {/* Left Side - WhatsApp Icon */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Middle Section - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                {t('consultation.title')}{" "}
                <span className="text-green-400">{t('consultation.highlight')}</span>{" "}
                {t('consultation.titleEnd')}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t('consultation.description')}
              </p>
            </div>

            {/* Right Side - Button */}
            <div className="flex-shrink-0">
              <button 
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-full text-sm transition-colors duration-300 whitespace-nowrap"
              >
                {t('consultation.button')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTA;

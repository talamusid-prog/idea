import { Building2, Store, Monitor, FileText, GraduationCap, Award, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WebsiteTypes = () => {
  const { t } = useLanguage();
  
  const websiteTypes = [
    {
      icon: Building2,
      title: t('websiteTypes.corporate.title'),
      description: t('websiteTypes.corporate.description'),
      iconColor: "text-orange-500"
    },
    {
      icon: Store,
      title: t('websiteTypes.ecommerce.title'),
      description: t('websiteTypes.ecommerce.description'),
      iconColor: "text-orange-500"
    },
    {
      icon: Monitor,
      title: t('websiteTypes.application.title'),
      description: t('websiteTypes.application.description'),
      iconColor: "text-orange-500"
    },
         {
       icon: FileText,
       title: t('websiteTypes.news.title'),
       description: t('websiteTypes.news.description'),
       iconColor: "text-orange-500"
     },
    {
      icon: GraduationCap,
      title: t('websiteTypes.ecourse.title'),
      description: t('websiteTypes.ecourse.description'),
      iconColor: "text-orange-500"
    },
         {
       icon: Award,
       title: t('websiteTypes.donation.title'),
       description: t('websiteTypes.donation.description'),
       iconColor: "text-orange-500"
     }
  ];

     return (
     <section className="py-16 bg-gray-50">
       <div className="max-w-6xl mx-auto px-4 -mt-16 lg:mt-0">
         <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
             <Globe className="w-4 h-4" />
             Jenis Website
           </div>
           <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
             Pilihan{" "}
             <span className="text-orange-500">Jenis Website</span>{" "}
             yang Dapat Dibuat
           </h2>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
           {websiteTypes.map((type, index) => (
             <div 
               key={index}
               className="bg-white rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-200 hover:border-orange-400"
             >
               <div className="flex justify-center mb-3">
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                   <type.icon className={`w-6 h-6 ${type.iconColor}`} />
                 </div>
               </div>
               <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                 {type.title}
               </h3>
               <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                 {type.description}
               </p>
             </div>
           ))}
         </div>

         <div className="text-center mt-12">
           <p className="text-gray-600 text-base">
             Dan berbagai jenis website lainnya sesuai dengan kebutuhanmu
           </p>
         </div>
       </div>
     </section>
  );
};

export default WebsiteTypes;

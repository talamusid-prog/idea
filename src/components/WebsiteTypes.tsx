import { Building2, Store, Monitor, FileText, GraduationCap, Award, Globe } from "lucide-react";

const WebsiteTypes = () => {
  const websiteTypes = [
    {
      icon: Building2,
      title: "Website Profil Perusahaan",
      description: "Buat website profil perusahaan yang profesional untuk meningkatkan kredibilitas bisnismu.",
      iconColor: "text-orange-500"
    },
    {
      icon: Store,
      title: "Website Toko Online",
      description: "Website dengan berbagai fitur menarik dan mudah digunakan untuk meningkatkan penjualanmu.",
      iconColor: "text-orange-500"
    },
    {
      icon: Monitor,
      title: "Website Aplikasi",
      description: "Kembangkan website aplikasi yang fungsional dan user-friendly untuk kebutuhan bisnismu.",
      iconColor: "text-orange-500"
    },
         {
       icon: FileText,
       title: "Web Berita",
       description: "Buat website berita yang informatif dan terpercaya untuk menyampaikan informasi terkini kepada pembaca.",
       iconColor: "text-orange-500"
     },
    {
      icon: GraduationCap,
      title: "E-Course",
      description: "Buat platform yang interaktif untuk membagikan pengetahuan dan kursus online.",
      iconColor: "text-orange-500"
    },
         {
       icon: Award,
       title: "Web Donasi",
       description: "Buat website donasi yang aman dan terpercaya untuk mengumpulkan dana dari berbagai donatur.",
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

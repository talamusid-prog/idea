const PricingHero = () => {
  const features = [
    {
      iconSrc: "/Premium-Legal.png",
      title: "Premium Legal",
      description: "Themes & Plugin"
    },
    {
      iconSrc: "/SEO-Basic.png",
      title: "SEO Basic",
      description: "Teroptimasi"
    },
    {
      iconSrc: "/Training.png",
      title: "Training",
      description: "Penggunaan Web"
    },
    {
      iconSrc: "/Tampilan-Responsif.png",
      title: "Tampilan Responsif",
      description: "Menyesuaikan di Device Apapun"
    },
    {
      iconSrc: "/Support.png",
      title: "Support + Maintenance",
      description: "1 Tahun (Tergantung Paket yang Dipilih)"
    }
  ];

  return (
    <section className="relative py-16">
             {/* Background Split */}
       <div className="absolute inset-0">
         <div className="h-1/2 bg-orange-500"></div>
         <div className="h-1/2 bg-white"></div>
       </div>

      {/* Orange Circle Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Top Section - Orange Background */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Hanya Hari Ini, Kesempatan Buat Website Murah, Mudah, Cepat dan Keren
          </h2>
          <p className="text-white text-lg">
            Paket Lengkap Bikin Website Jasa Dalam Sekejap
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
                 Jasa Pembuatan Website
               </h3>

               {/* Starting Price */}
               <p className="text-gray-600 mb-2">Mulai Dari</p>

               {/* Price */}
               <div className="text-4xl lg:text-5xl font-bold text-gray-700 mb-8">
                 Rp. 2,5 Juta
               </div>

               {/* CTA Button */}
               <button className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-base transition-colors duration-300">
                 Buat Website Sekarang
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

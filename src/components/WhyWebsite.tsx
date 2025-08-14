import { Check } from "lucide-react";

const WhyWebsite = () => {
  const reasons = [
    {
      text: "Jutaan orang melakukan pencarian di Google sebelum membeli sesuatu, ",
      highlight: "termasuk bisnismu"
    },
    {
      text: "Bisnis yang punya website ",
      highlight: "lebih dipercaya"
    },
    {
      text: "1 dari 3 pebisnis saat ini sudah menggunakan ",
      highlight: "website untuk jualan"
    },
    {
      text: "Ampuh sebagai ",
      highlight: "media promosi"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 -mt-16 lg:mt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="text-gray-800 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
              Inilah Mengapa Kamu Harus{" "}
              <span className="text-orange-500">Bikin Website</span>{" "}
              Sekarang Juga
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
                    {index === 0 && " daripada yang tidak"}
                    {index === 1 && " daripada yang tidak"}
                    {index === 2 && ""}
                    {index === 3 && " dan ekspansi pasar untuk bisnismu"}
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

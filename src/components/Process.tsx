import { ArrowRight } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "01",
      iconSrc: "/icon-konsultasi-jasa-web.png.png",
      title: "Konsultasi",
      description: "Diskusikan kebutuhan websitemu dengan tim sales atau developer kami yang ahli, Sob!",
      iconColor: "text-orange-500"
    },
    {
      number: "02",
      iconSrc: "/icon-payment-jasa-web.png.png",
      title: "Melakukan Payment",
      description: "selesaikan pembayaran pembuatan website terlebih dahulu agar dapat diproses",
      iconColor: "text-orange-500"
    },
    {
      number: "03",
      iconSrc: "/icon-pengerjaan-jasa-web.png.png",
      title: "Proses Pengerjaan",
      description: "Websitemu sedang dalam proses pengerjaan dan finalisasi. Kamu bisa melakukan revisi 2x sekali",
      iconColor: "text-orange-500"
    },
    {
      number: "04",
      iconSrc: "/icon-website-siap-jasa-web.png.png",
      title: "Website Siap Digunakan",
      description: "Selamat! Websitemu sudah jadi. Kami juga akan memberikan edukasi penggunaan website.",
      iconColor: "text-orange-500"
    }
  ];

  return (
    <section id="process" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <ArrowRight className="w-4 h-4" />
            Cara Kerja
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-black">Langkah Mudah </span>
            <span className="text-orange-500">Pembuatan Website</span>
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
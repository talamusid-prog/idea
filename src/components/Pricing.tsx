import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, DollarSign } from "lucide-react";

const Pricing = () => {
  // Fungsi untuk mengirim pesan ke WhatsApp dengan template berdasarkan paket
  const handleWhatsAppClick = (packageName: string, price: string) => {
    // ⚠️ PENTING: Ganti nomor WhatsApp di bawah ini dengan nomor WhatsApp Anda
    // Format: 6281234567890 (tanpa tanda + atau spasi)
    const phoneNumber = "6285242766676"; // Nomor WhatsApp Swift Site Builders
    
    // Template pesan yang lebih detail dan profesional
    const message = encodeURIComponent(
      `*Halo! Saya tertarik dengan paket website* 🚀\n\n` +
      `*Paket:* ${packageName}\n` +
      `*Harga:* Rp ${price}\n\n` +
      `Saya ingin bertanya tentang:\n` +
      `📋 Detail lengkap paket ${packageName}\n` +
      `⏱️ Timeline pengerjaan\n` +
      `💳 Metode pembayaran\n` +
      `🔄 Proses revisi\n` +
      `📞 Konsultasi gratis\n\n` +
      `Mohon informasi lebih lanjut. Terima kasih! 🙏\n\n` +
      `*Pesan ini dikirim dari website Swift Site Builders*`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  const packages = [
    {
      name: "Starter",
      price: "2,5 Juta",
      popular: false,
      description: "Sempurna untuk bisnis kecil",
      features: [
        "5 Halaman Website",
        "Domain .com Gratis 1 Tahun",
        "Hosting 5 GB",
        "SSL Certificate",
        "Responsive Design",
        "SEO Basic",
        "Contact Form",
        "WhatsApp Integration",
        "Revisi 3x"
      ]
    },
    {
      name: "Business",
      price: "5 Juta",
      popular: true,
      description: "Ideal untuk bisnis menengah",
      features: [
        "Unlimited Halaman",
        "Domain .com Gratis 1 Tahun",
        "Hosting 10 GB",
        "SSL Certificate",
        "Responsive Design",
        "SEO Premium",
        "E-commerce Ready",
        "Payment Gateway",
        "Admin Panel",
        "Google Analytics",
        "WhatsApp Integration",
        "Revisi 5x"
      ]
    },
    {
      name: "Pro",
      price: "Konsultasi",
      popular: false,
      description: "Solusi lengkap untuk bisnis besar",
      features: [
        "Unlimited Halaman",
        "Domain .com Gratis 1 Tahun",
        "Hosting 30 GB",
        "SSL Certificate",
        "Responsive Design",
        "SEO Advance",
        "E-commerce Ready",
        "Payment Gateway",
        "Admin Panel",
        "Google Analytics",
        "WhatsApp Integration",
        "Revisi Unlimited"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <DollarSign className="w-4 h-4" />
            Paket Harga
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Paket Harga Terjangkau
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. 
            Semua paket sudah termasuk garansi dan support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`relative transition-smooth hover:shadow-xl ${
                pkg.popular 
                  ? 'border-primary shadow-glow transform scale-105' 
                  : 'hover:transform hover:scale-105'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Paling Populer
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-secondary mb-2">
                  {pkg.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">Rp {pkg.price}</span>
                </div>
                <p className="text-muted-foreground">{pkg.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    pkg.popular 
                      ? 'gradient-primary text-white hover:shadow-glow' 
                      : 'border-primary text-primary hover:bg-primary hover:text-white'
                  } transition-smooth`}
                  variant={pkg.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleWhatsAppClick(pkg.name, pkg.price)}
                >
                  Pilih Paket {pkg.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
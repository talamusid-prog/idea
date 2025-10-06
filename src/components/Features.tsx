import { Rocket, Wallet, Smartphone, Headphones, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Proses Cepat",
      description: "Website online dalam hitungan hari",
      color: "text-primary"
    },
    {
      icon: Wallet,
      title: "Harga Terjangkau",
      description: "Paket fleksibel sesuai kebutuhan Anda",
      color: "text-accent"
    },
    {
      icon: Smartphone,
      title: "Desain Responsif",
      description: "Tampilan sempurna di semua perangkat",
      color: "text-success"
    },
    {
      icon: Headphones,
      title: "Dukungan Penuh",
      description: "Bantuan teknis kapan pun dibutuhkan",
      color: "text-warning"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Fitur Unggulan
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Kenapa Memilih Kami?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami memberikan layanan terbaik dengan standar profesional untuk 
            mewujudkan website impian Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-smooth"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center group-hover:shadow-glow transition-smooth">
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
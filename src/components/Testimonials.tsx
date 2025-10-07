import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MessageSquare, User } from "lucide-react";
import { useRef, useMemo } from "react";
import { useSimpleCache, CACHE_KEYS } from "@/hooks/useCache";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Cache untuk testimonials data
  const { data: cachedTestimonials } = useSimpleCache(
    CACHE_KEYS.TESTIMONIALS,
    undefined,
    24 * 60 * 60 * 1000 // 24 jam
  );

  const testimonials = useMemo(() => [
    {
      name: "Budi Santoso",
      position: "Pemilik Toko Online",
      icon: User,
      rating: 5,
      text: "Website toko online yang dibuat sangat professional dan user-friendly. Penjualan saya meningkat 300% setelah menggunakan website dari Ideadigiralcreative!"
    },
    {
      name: "Dr. Sarah Wijaya",
      position: "Dokter Klinik Kesehatan",
      icon: User,
      rating: 5,
      text: "Pelayanan excellent! Website klinik kami jadi lebih modern dan pasien bisa booking online dengan mudah. Tim WebCraft sangat responsif dan professional."
    },
    {
      name: "Ahmad Rahman",
      position: "CEO Perusahaan Konstruksi",
      icon: User,
      rating: 5,
      text: "Website corporate yang dibuat sangat representatif untuk perusahaan kami. Design elegan dan fitur portfolio yang memudahkan client melihat project kami."
    },
    {
      name: "Siti Nurhaliza",
      position: "Wedding Organizer",
      icon: User,
      rating: 5,
      text: "Amazing! Website wedding organizer kami jadi terlihat sangat elegant dan romantic. Banyak client yang tertarik setelah melihat website kami."
    },
    {
      name: "Rudi Hartono",
      position: "Pemilik Restaurant",
      icon: User,
      rating: 5,
      text: "Website restaurant dengan menu online yang sangat membantu customer. Reservasi online juga memudahkan operasional restaurant kami. Highly recommended!"
    },
    {
      name: "Maya Sari",
      position: "Kepala Sekolah",
      icon: User,
      rating: 5,
      text: "Website sekolah yang informatif dan mudah digunakan oleh siswa dan orang tua. Portal siswa sangat membantu untuk komunikasi sekolah dengan keluarga."
    }
  ], []);

  // Duplicate testimonials for seamless marquee effect
  const marqueeTestimonials = useMemo(() => [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials], [testimonials]);

  // Pause marquee on hover
  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'running';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            {t('testimonials.badge')}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Marquee Container */}
        <div 
          className="relative overflow-hidden w-full max-w-4xl mx-auto py-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Marquee Track */}
          <div 
            ref={marqueeRef}
            className="flex animate-scroll"
          >
            {marqueeTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-full md:w-1/3 flex-shrink-0 px-2"
              >
                <Card className="relative hover:shadow-xl transition-smooth border-0 shadow-lg h-full">
                  <CardContent className="p-5 pt-6">
                    {/* Quote Icon */}
                    <div className="absolute -top-2 left-4">
                      <div className="w-5 h-5 gradient-primary rounded-full flex items-center justify-center">
                        <Quote className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground italic leading-relaxed mb-4 text-sm">
                      "{testimonial.text}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <testimonial.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-secondary text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.position}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 lg:gap-4 px-4 lg:px-8 py-2 lg:py-4 bg-success/10 rounded-full">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-success font-semibold text-sm lg:text-base">
              {t('testimonials.rating')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
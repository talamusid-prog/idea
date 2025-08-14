import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useSimpleCache, CACHE_KEYS } from "@/hooks/useCache";

const FAQ = () => {
  // Cache untuk FAQ data
  const { data: cachedFaqs } = useSimpleCache(
    CACHE_KEYS.FAQ,
    undefined,
    24 * 60 * 60 * 1000 // 24 jam
  );
  const faqs = [
    {
      question: "Berapa lama proses pembuatan website?",
      answer: "Proses pembuatan website biasanya memakan waktu 5-7 hari kerja untuk paket Basic dan Bisnis, sedangkan paket Pro membutuhkan 10-14 hari kerja tergantung kompleksitas fitur yang diminta."
    },
    {
      question: "Apakah saya bisa update konten website sendiri?",
      answer: "Ya, semua website yang kami buat dilengkapi dengan admin panel yang user-friendly. Kami juga akan memberikan tutorial cara menggunakan admin panel tersebut."
    },
    {
      question: "Apakah website yang dibuat sudah SEO friendly?",
      answer: "Tentu! Semua website yang kami buat sudah dioptimasi untuk SEO dasar. Untuk paket Bisnis dan Pro, kami bahkan melakukan optimasi SEO yang lebih advanced."
    },
    {
      question: "Bagaimana jika saya ingin revisi desain?",
      answer: "Setiap paket sudah termasuk revisi sesuai ketentuan (Basic: 3x, Bisnis: 5x, Pro: unlimited). Revisi dapat dilakukan selama masa pengerjaan website."
    },
    {
      question: "Apakah ada biaya maintenance bulanan?",
      answer: "Tidak ada biaya maintenance wajib. Namun kami menyediakan layanan maintenance optional dengan biaya terpisah jika Anda membutuhkan update rutin atau backup berkala."
    },
    {
      question: "Apakah domain dan hosting sudah termasuk?",
      answer: "Ya, semua paket sudah termasuk domain .com gratis untuk 1 tahun pertama dan hosting sesuai spesifikasi masing-masing paket."
    },
    {
      question: "Bagaimana sistem pembayaran?",
      answer: "Pembayaran dapat dilakukan secara bertahap: 50% di awal sebagai down payment dan 50% sisanya setelah website selesai dan Anda puas dengan hasilnya."
    },
    {
      question: "Apakah ada garansi untuk website yang dibuat?",
      answer: "Ya, kami memberikan garansi 30 hari untuk bug fixing dan technical support setelah website live. Garansi tidak termasuk penambahan fitur baru."
    }
  ];

  return (
    <section id="faq" className="py-12 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar layanan pembuatan website kami
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background rounded-lg border border-border px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-secondary hover:text-primary transition-smooth">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
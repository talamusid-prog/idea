import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useSimpleCache, CACHE_KEYS } from "@/hooks/useCache";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();
  
  // Cache untuk FAQ data
  const { data: cachedFaqs } = useSimpleCache(
    CACHE_KEYS.FAQ,
    undefined,
    24 * 60 * 60 * 1000 // 24 jam
  );
  
  const faqs = [
    {
      question: t('faq.timeline.question'),
      answer: t('faq.timeline.answer')
    },
    {
      question: t('faq.update.question'),
      answer: t('faq.update.answer')
    },
    {
      question: t('faq.seo.question'),
      answer: t('faq.seo.answer')
    },
    {
      question: t('faq.revision.question'),
      answer: t('faq.revision.answer')
    },
    {
      question: t('faq.maintenance.question'),
      answer: t('faq.maintenance.answer')
    },
    {
      question: t('faq.domain.question'),
      answer: t('faq.domain.answer')
    },
    {
      question: t('faq.payment.question'),
      answer: t('faq.payment.answer')
    },
    {
      question: t('faq.warranty.question'),
      answer: t('faq.warranty.answer')
    }
  ];

  return (
    <section id="faq" className="py-12 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            {t('faq.badge')}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('faq.subtitle')}
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
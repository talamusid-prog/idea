import React, { useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'id', flag: '/indonesia.png', text: 'ID', color: 'bg-red-500' },
    { code: 'en', flag: '/united-kingdom.png', text: 'EN', color: 'bg-blue-500' },
  ] as const;

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: 'id' | 'en') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center justify-center px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border/70 hover:border-border shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-1">
                    <img 
                      src={currentLanguage?.flag} 
                      alt={currentLanguage?.text}
                      className="w-4 h-4 rounded-sm object-cover"
                    />
                    <span className="text-xs font-semibold">
                      {currentLanguage?.text}
                    </span>
                  </div>
                </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-24">
        {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={lang.flag} 
                        alt={lang.text}
                        className="w-4 h-4 rounded-sm object-cover"
                      />
                      <span className="text-sm font-medium">{lang.text}</span>
                    </div>
                    {language === lang.code && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

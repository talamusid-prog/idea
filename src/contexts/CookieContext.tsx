import React, { createContext, useContext, useState, useEffect } from 'react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

interface CookieContextType {
  cookieConsent: boolean | null;
  cookiePreferences: CookiePreferences;
  setCookieConsent: (consent: boolean) => void;
  setCookiePreferences: (preferences: CookiePreferences) => void;
  showCookieBanner: boolean;
  setShowCookieBanner: (show: boolean) => void;
  acceptAllCookies: () => void;
  rejectAllCookies: () => void;
  savePreferences: () => void;
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Always true, cannot be disabled
  analytics: false,
  functional: false,
  marketing: false,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

interface CookieProviderProps {
  children: React.ReactNode;
}

export const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Load cookie preferences from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    const savedPreferences = localStorage.getItem('cookiePreferences');
    
    if (savedConsent !== null) {
      setCookieConsent(savedConsent === 'true');
      setShowCookieBanner(false);
    } else {
      setShowCookieBanner(true);
    }
    
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setCookiePreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const acceptAllCookies = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    
    setCookieConsent(true);
    setCookiePreferences(allAccepted);
    setShowCookieBanner(false);
    
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    
    // Initialize analytics if accepted
    if (allAccepted.analytics) {
      initializeAnalytics();
    }
  };

  const rejectAllCookies = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    
    setCookieConsent(false);
    setCookiePreferences(onlyEssential);
    setShowCookieBanner(false);
    
    localStorage.setItem('cookieConsent', 'false');
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential));
  };

  const savePreferences = () => {
    setCookieConsent(true);
    setShowCookieBanner(false);
    
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    
    // Initialize analytics if accepted
    if (cookiePreferences.analytics) {
      initializeAnalytics();
    }
  };

  const initializeAnalytics = () => {
    // Initialize Google Analytics or other analytics tools here
    console.log('Analytics initialized');
  };

  const value: CookieContextType = {
    cookieConsent,
    cookiePreferences,
    setCookieConsent,
    setCookiePreferences,
    showCookieBanner,
    setShowCookieBanner,
    acceptAllCookies,
    rejectAllCookies,
    savePreferences,
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
};

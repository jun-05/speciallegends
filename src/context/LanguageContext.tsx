import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

export const LanguageContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>] | undefined
>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('SL_language');
    let defaultLanguage = 'en';
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else if (navigator) {
      const browserLanguage = navigator.language.slice(0, 2);
      if (browserLanguage === 'ko') {
        defaultLanguage = 'ko';
      }
      setLanguage(defaultLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('SL_language', language);
  }, [language]);

  if (!language) {
    return null; // 언어 설정이 로드되지 않은 경우 렌더링하지 않습니다
  }

  return (
    <LanguageContext.Provider value={[language, setLanguage]}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('LanguageContext is not provided');
  }
  return context;
};

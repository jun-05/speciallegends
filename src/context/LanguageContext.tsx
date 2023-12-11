import React, { createContext, useState, ReactNode, useContext } from 'react';

export const LanguageContext = createContext<
  | [
      string | undefined,
      React.Dispatch<React.SetStateAction<string | undefined>>,
    ]
  | undefined
>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string | undefined>('ko');

  if (!language) {
    return null;
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

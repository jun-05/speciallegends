import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

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

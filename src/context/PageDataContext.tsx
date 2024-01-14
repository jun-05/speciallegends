import { pageData } from '@/types/pageDataType';
import React, { ReactNode, useContext } from 'react';

const initialPageData: pageData = {
  imageTextJson: null,
  abilityTextJson: null,
  localeTextJson: null,
};

export const PageDataContext = React.createContext<pageData>(initialPageData);

export const PageDataProvider = ({
  pageData,
  children,
}: {
  pageData: pageData;
  children: ReactNode;
}) => {
  return (
    <PageDataContext.Provider value={pageData}>
      {children}
    </PageDataContext.Provider>
  );
};

export function useImageTextContext() {
  const { imageTextJson } = useContext(PageDataContext);
  if (!imageTextJson) {
    throw new Error('ImageTextJson is not provided');
  }
  return imageTextJson;
}

export function useAbilityTextContext() {
  const { abilityTextJson } = useContext(PageDataContext);
  if (!abilityTextJson) {
    throw new Error('abilityTextJson is not provided');
  }
  return abilityTextJson;
}

export function useLocaleTextContext() {
  const { localeTextJson } = useContext(PageDataContext);
  if (!localeTextJson) {
    throw new Error('ImageTextJson is not provided');
  }
  return localeTextJson;
}

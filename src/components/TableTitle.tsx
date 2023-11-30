import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
import { formatDateRange } from '@/utils/formatDateRange';

import React from 'react';

interface TableTitleProps {
  period: string;
}

const TableTitle = ({ period }: TableTitleProps) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  return (
    <div className="flex items-center justify-between  mb-8">
      <div className="text-3xl font-bold">
        {languageTranslations.tableTitle}
      </div>
      <div>
        <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg ">
          <h2 className="flex flex-wrap w-18 md:w-full text-xs md:text-base font-semibold text-gray-800 dark:text-white">
            {formatDateRange(period, language)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TableTitle;

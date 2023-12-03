import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
import { formatDateRange } from '@/utils/formatDateRange';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import React from 'react';

interface TableTitleProps {
  period: string;
  onClickPrevIndex: () => void;
  onClickNextIndex: () => void;
}

const TableTitle = ({
  period,
  onClickPrevIndex,
  onClickNextIndex,
}: TableTitleProps) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  return (
    <div className="flex items-top justify-between  mb-8">
      <div className="text-3xl font-bold">
        {languageTranslations.tableTitle}
      </div>
      <div className="flex flex-col">
        <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg ">
          <h2 className="flex flex-wrap w-18 md:w-full text-xs md:text-base font-semibold text-gray-800 dark:text-white">
            {formatDateRange(period, language)}
          </h2>
        </div>
        <div className="flex justify-between pt-1">
          <div>{/**월 - 주간 선택 컴포넌트  */}</div>
          <div className="flex">
            <div
              className="text-xl md:text-2xl cursor-pointer "
              onClick={onClickPrevIndex}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div
              className="text-xl md:text-2xl cursor-pointer"
              onClick={onClickNextIndex}
            >
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTitle;

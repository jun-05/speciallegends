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
  index: number;
  onClickPrevIndex: () => void;
  onClickNextIndex: () => void;
}

const TableTitle = ({
  period,
  index,
  onClickPrevIndex,
  onClickNextIndex,
}: TableTitleProps) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  console.log(index);

  return (
    <div className="flex items-top justify-between  mb-8">
      <div>
        <div className="text-2xl sm:text-3xl font-bold">
          {languageTranslations.tableTitle}
        </div>
        <div className="text-[9px]  md:text-xs mt-1 sm:mt-2">
          {languageTranslations.updateTimeInfo}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg ">
          <h2 className="flex flex-wrap w-18 md:w-full text-xs md:text-base font-semibold text-gray-800 dark:text-white">
            {formatDateRange(period, language)}
          </h2>
        </div>
        <div className="flex justify-between pt-1">
          <div>{/**월 - 주간 선택 컴포넌트  */}</div>
          <div className="flex space-x-1">
            {/** index 3은 4주전 데이터기간을 의미 */}
            <div
              className={`${
                index !== 3
                  ? 'bg-gray-200 dark:bg-gray-600 '
                  : 'bg-red-200 dark:bg-gray-400 '
              } flex items-center justify-center text-xl md:text-2xl cursor-pointer h-6 w-6 rounded-full text-gray-800 dark:text-white `}
              onClick={onClickPrevIndex}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div
              className={`${
                index !== 0
                  ? 'bg-gray-200 dark:bg-gray-600 '
                  : 'bg-red-200 dark:bg-gray-400 '
              } flex items-center justify-center text-xl md:text-2xl cursor-pointer h-6 w-6 rounded-full text-gray-800 dark:text-white `}
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

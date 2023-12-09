import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { FiInfo } from 'react-icons/fi';

interface TableOptionProps {
  sortOption: { sortType: string; order: string };
  onClickSort: (sortType: string) => void;
}

const TableOption = ({ sortOption, onClickSort }: TableOptionProps) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  return (
    <thead className="w-full  bg-gray-300 border-b-gray-300 dark:bg-gray-700 dark:border-gray-700">
      <tr className="text-gray-600 dark:text-gray-400">
        <th className="w-[5%]">#</th>
        <th className="w-[35%] xs:w-[40%] md:w-[50%]">
          <div className="flex justify-start items-center text-left space-x-1 pl-2 md:pl-8">
            <span> {languageTranslations.firstTableOption}</span>
            <div
              onClick={() => onClickSort('name')}
              className="hover:cursor-pointer"
            >
              {sortOption.order === 'desc' ? (
                <MdOutlineKeyboardArrowDown size={20} />
              ) : (
                <MdOutlineKeyboardArrowUp size={20} />
              )}
            </div>
          </div>
        </th>
        <th className="w-[20%] md:w-[15%] ">
          <div className="inline-flex items-center space-x-1 pl-2">
            <span> {languageTranslations.secondTableOption}</span>
            <div
              onClick={() => onClickSort('pickRate')}
              className="hover:cursor-pointer"
            >
              {sortOption.order === 'desc' ? (
                <MdOutlineKeyboardArrowDown size={20} />
              ) : (
                <MdOutlineKeyboardArrowUp size={20} />
              )}
            </div>
          </div>
        </th>
        <th className="w-[20%] md:w-[15%]">
          <div className="inline-flex items-center space-x-1 pl-2 ">
            <span> {languageTranslations.thirdTableOption} </span>

            <div
              onClick={() => onClickSort('winRate')}
              className="hover:cursor-pointer"
            >
              {sortOption.order === 'desc' ? (
                <MdOutlineKeyboardArrowDown size={20} />
              ) : (
                <MdOutlineKeyboardArrowUp size={20} />
              )}
            </div>
          </div>
        </th>
        <th className="w-[10%] md:w-[10%] ">
          <div className="flex items-center justify-center">
            <FiInfo className="h-4 w-4 md:h-5 md:w-5" />
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableOption;

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
        <th className="w-[40%] md:w-[50%] text-left pl-1 md:pl-8">
          {languageTranslations.firstTableOption}
        </th>
        <th className="w-[15%]">재능</th>

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
            <span> {languageTranslations.thirdTableOption}</span>
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
      </tr>
    </thead>
  );
};

export default TableOption;

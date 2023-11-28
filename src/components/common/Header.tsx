import React, { useContext, useEffect, useState } from 'react';
import { MdLanguage } from 'react-icons/md';
import { BsBrightnessHigh, BsMoonFill } from 'react-icons/bs';
import { useLanguageContext } from '@/context/LanguageContext';

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header = ({ toggleDarkMode, darkMode }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_, setLanguage] = useLanguageContext();

  const handleClick = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const clickOutside = () => setIsOpen(false);
    window.addEventListener('click', clickOutside);

    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, []);

  return (
    <header
      className={`flex h-12 md:h-16 justify-between items-center p-4 bg-blue-500  dark:bg-blue-800`}
    >
      <h1 className={`ali text-white dark:text-black hover:cursor-pointer`}>
        <div className="text-lg md:text-xl italic">
          <span className="text-xl md:text-2xl">S</span>mash
        </div>
        <div className="text-lg md:text-xl italic pl-2 -mt-2">
          <span className="text-xl md:text-2xl">L</span>egend
        </div>
      </h1>
      <div className="flex  space-x-2 md:space-x-4">
        <div className="h-5 w-5 md:h-6 md:w-6" onClick={toggleDarkMode}>
          {darkMode ? (
            <BsMoonFill className="w-full h-full text-black" />
          ) : (
            <BsBrightnessHigh className="w-full h-full text-white" />
          )}
        </div>
        <div
          className="flex flex-col relative"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <div className="h-5 w-5 md:h-6 md:w-6">
            <MdLanguage className="w-full h-full text-white dark:text-gray-300" />
          </div>
          {/** 드롭다운 */}
          {isOpen && (
            <div className="absolute right-0 top-7 w-16 text-center bg-white dark:bg-blue-700 rounded-md overflow-hidden z-50">
              <div
                onClick={() => handleClick('ko')}
                className="flex items-center justify-center h-6 md:h-8 hover:bg-blue-500 hover:dark:bg-blue-600 text-black font-bold text-sm md:text-base dark:text-gray-200"
              >
                KR
              </div>
              <div
                onClick={() => handleClick('en')}
                className="flex items-center justify-center h-6 md:h-8 hover:bg-blue-500 hover:dark:bg-blue-600 text-black font-bold text-sm md:text-base dark:text-gray-200"
              >
                EN
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

/* eslint-disable @next/next/no-img-element */
import { MapIcon, TierIcon } from '@/constants/images';
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
import React from 'react';

interface TierAndMapSelectProps {
  option: {
    selectedTier: string;
    selectedMap: number;
  };
  onChangeTier: (tier: string) => void;
  onChangeMap: (map: number) => void;
}

const TierAndMapSelect = ({
  option,
  onChangeTier,
  onChangeMap,
}: TierAndMapSelectProps) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  const tierList = languageTranslations.tierList;
  const mapList = languageTranslations.mapList;

  // 티어와 맵 이미지 선로딩
  if (typeof window !== 'undefined') {
    Object.keys(mapList).forEach((mapNum) => {
      const img = new Image();
      img.src = MapIcon[Number(mapNum) as keyof typeof MapIcon].url;
    });
    Object.keys(tierList).forEach((tier) => {
      const img = new Image();
      img.src = TierIcon[tier as keyof typeof TierIcon].url;
    });
  }

  const selectedTierIcon =
    TierIcon[option.selectedTier as keyof typeof TierIcon];
  const selectedMapIcon = MapIcon[option.selectedMap as keyof typeof MapIcon];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <select
            className="mr-2 h-10 md:h-11  p-2 w-22 md:w-48 lg:w-40 text-xs md:text-sm lg:text-base border form-select bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 rounded"
            onChange={(e) => onChangeTier(e.target.value)}
          >
            <option value={option.selectedTier}>
              {languageTranslations.tierListOptionName}
            </option>
            {Object.entries(tierList).map(([value, tier], idx) => {
              return (
                <option key={`tier_${idx}`} value={value}>
                  {tier}
                </option>
              );
            })}
          </select>
          <select
            className="p-2  h-10  md:h-11 w-32 lg:w-60 md:w-48 text-xs md:text-sm lg:text-base  border form-select bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 rounded"
            onChange={(e) => onChangeMap(Number(e.target.value))}
          >
            <option value={option.selectedMap}>
              {languageTranslations.mapListOptionName}
            </option>
            {Object.entries(mapList).map(([value, map], idx) => (
              <option key={`map_${idx}`} value={value}>
                {map}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-end">
          <div className="group flex space-x-2 md:space-x-8 md:mr-7">
            <img
              src={selectedTierIcon.url}
              alt={selectedTierIcon.name}
              className=" rounded-md object-fill h-10 w-10 md:h-14 md:w-14"
            />
            <img
              src={selectedMapIcon.url}
              alt={selectedMapIcon.name}
              className={`h-10 w-10 md:h-14 md:w-14
          ${
            option.selectedMap !== 4000 && window.innerWidth > 768
              ? 'transition-all duration-500 ease-in-out transform group-hover:scale-x-[2] rounded-md object-fill'
              : ''
          }  `}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TierAndMapSelect;

/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  useImageTextContext,
  useLocaleTextContext,
} from '@/context/PageDataContext';

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
  const localeTextJson = useLocaleTextContext();
  const { mapIcon, tierIcon } = useImageTextContext();
  const cloundFrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || '';

  const tierList = localeTextJson?.tierList;
  const mapList = localeTextJson?.mapList;

  // 티어와 맵 이미지 선로딩
  if (typeof window !== 'undefined') {
    Object.keys(mapList).forEach((mapNum) => {
      const img = new Image();
      img.src = mapIcon[mapNum].url;
    });
    Object.keys(tierList).forEach((tier) => {
      const img = new Image();
      img.src = tierIcon[tier as keyof typeof tierIcon].url;
    });
  }

  const selectedTierIcon =
    tierIcon[option.selectedTier as keyof typeof tierIcon];
  const selectedMapIcon = mapIcon[option.selectedMap];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <select
            className="mr-2 h-10 md:h-11  p-2 w-16 xs:w-24 md:w-48 lg:w-40 text-xs md:text-sm lg:text-base border form-select bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 rounded"
            onChange={(e) => onChangeTier(e.target.value)}
          >
            <option value={option.selectedTier}>
              {localeTextJson?.tierListOptionName}
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
            className="p-2  h-10  md:h-11 w-28 xs:w-32 lg:w-60 md:w-48 text-xs md:text-sm lg:text-base  border form-select bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 rounded"
            onChange={(e) => onChangeMap(Number(e.target.value))}
          >
            <option value={option.selectedMap}>
              {localeTextJson?.mapListOptionName}
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
              src={cloundFrontUrl + selectedTierIcon.url}
              alt={selectedTierIcon.name}
              className=" rounded-md object-fill h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14"
            />
            <img
              src={cloundFrontUrl + selectedMapIcon.url}
              alt={selectedMapIcon.name}
              className={` h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14
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

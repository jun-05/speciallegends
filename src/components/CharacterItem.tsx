/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import { characterResult } from '@/types/smasherDataTypes';
import {
  useImageTextContext,
  useLocaleTextContext,
} from '@/context/PageDataContext';
import CharacterDetail from './CharacterDetail';

import { GrCaretDown, GrCaretUp } from 'react-icons/gr';

interface CharacterItemProps {
  characterData: characterResult;
  tierAvgWinRate: number;
  isAllDataInTier: boolean;
  characterAvgWinRate: number;
  characterAvgPickRate: number;
}

const CharacterItem = ({
  characterData,
  tierAvgWinRate,
  isAllDataInTier,
  characterAvgWinRate,
  characterAvgPickRate,
}: CharacterItemProps) => {
  const localeTextJson = useLocaleTextContext();
  const { charactersIcon } = useImageTextContext();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setShowDetails(false);
  }, [characterData]);

  const onClickDetailButton = () => {
    setShowDetails(!showDetails);
  };

  const name = localeTextJson?.characterName[characterData.cID!];

  const characterIcon = charactersIcon?.[characterData.cID!];

  const infoWinRateByisAllData = isAllDataInTier
    ? (characterData.wR! - tierAvgWinRate).toFixed(1)
    : (characterData.wR! - characterAvgWinRate).toFixed(1);

  const tierAvgPickRate = Math.round((6 / 38) * 1000) / 10;

  const infoPickRateByisAllData = isAllDataInTier
    ? (characterData.pR! - tierAvgPickRate).toFixed(1)
    : (characterData.pR! - characterAvgPickRate).toFixed(1);

  return (
    <>
      <tr
        className={`${
          !showDetails
            ? 'bg-gray-200 dark:bg-gray-800'
            : 'bg-gray-300 dark:bg-gray-700'
        }  hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white `}
      >
        <th className="w-[5%] "></th>
        <th className="flex w-full items-center text-left pl-2 md:pl-8 space-x-2 md:space-x-5">
          <span className="flex-shrink-0">
            <img
              src={characterIcon.url}
              alt={characterIcon.name}
              className="rounded-md object-fill h-8 w-8 md:h-14 md:w-14"
            />
          </span>

          <span className="flex-grow">{name}</span>
        </th>
        <th className="w-[20%] md:w-[15%] text-center ">
          {characterData.pR}%
          <div
            className={`${
              Number(infoPickRateByisAllData) > 0
                ? 'text-red-600 dark:text-red-400'
                : Number(infoPickRateByisAllData) === 0
                  ? ''
                  : 'text-blue-600 dark:text-blue-400'
            } text-[9px] md:text-[10px] ml-2 -mt-1`}
          >
            {Number(infoPickRateByisAllData) > 0
              ? `+${infoPickRateByisAllData} `
              : infoPickRateByisAllData}
            %
          </div>
        </th>
        <th className="w-[20%] md:w-[15%] text-center ">
          {characterData.wR}%
          <div
            className={`${
              Number(infoWinRateByisAllData) > 0
                ? 'text-red-600 dark:text-red-400'
                : Number(infoWinRateByisAllData) === 0
                  ? ''
                  : 'text-blue-600 dark:text-blue-400'
            } text-[9px] md:text-[10px] ml-2 -mt-1`}
          >
            {Number(infoWinRateByisAllData) > 0
              ? `+${infoWinRateByisAllData}`
              : infoWinRateByisAllData}
            %
          </div>
        </th>
        <th className="w-[10%] ">
          <div className="flex items-center justify-center ">
            {showDetails ? (
              <GrCaretUp
                className="h-4 w-4 md:h-5 md:w-5 hover:cursor-pointer"
                onClick={onClickDetailButton}
              />
            ) : (
              <GrCaretDown
                className="h-4 w-4 md:h-5 md:w-5 hover:cursor-pointer"
                onClick={onClickDetailButton}
              />
            )}
          </div>
        </th>
      </tr>

      {/**상세정보 컴포넌트 */}
      {showDetails && <CharacterDetail characterData={characterData} />}
    </>
  );
};
export default CharacterItem;

/* eslint-disable @next/next/no-img-element */
import { characterResult } from '@/types/smasherDataTypes';
import React from 'react';
import TableImgItem from './TableImgItem';
import {
  useAbilityTextContext,
  useImageTextContext,
  useLocaleTextContext,
} from '@/context/PageDataContext';

interface CharacterDetailProps {
  characterData: characterResult;
}

const CharacterDetail = ({ characterData }: CharacterDetailProps) => {
  const localeTextJson = useLocaleTextContext();
  const abilityTextJson = useAbilityTextContext();
  const { enchantmentIcon, charactersIcon } = useImageTextContext();

  const characterId = characterData.cID?.toString();
  const sortedAbilities = Object.entries(characterData.abs)
    .filter(([abilityId]) => abilityId !== '0')
    .sort((a, b) => Number(b[1].aUR) - Number(a[1].aUR));

  const sortedEnchantments = Object.entries(characterData.echs)
    .filter(([enchantmentId]) => enchantmentId !== '0')
    .sort((a, b) => Number(b[1].eUR) - Number(a[1].eUR));

  const abilityIcons = charactersIcon?.characterId;
  const enchantMentInfo = localeTextJson?.enchantMentInfo;

  return (
    <td colSpan={5} className="bg-gray-300 dark:bg-gray-700 dark:text-white">
      <div className="flex flex-grow w-full justify-around   space-x-2  sm:space-x-8 md:space-x-6  ">
        <div className="w-1/2 xs:w-32 sm:w-60 md:w-80  py-2 ml-[5%] sm:ml-[10%]  lg:ml-0">
          <h2 className="text-sm font-bold mb-2 w-28 sm:w-full ">
            {localeTextJson?.firstInfoHeadName}
          </h2>
          <div className="flex flex-wrap justify-start items-center ">
            {sortedAbilities.map(([abilityNum, { aUR }], index) => {
              return (
                <TableImgItem
                  key={index}
                  src={abilityIcons.url}
                  alt={abilityIcons.name}
                  UsageRate={aUR}
                  tooltipTitle={
                    abilityTextJson?.characterAbility?.[characterId!][
                      abilityNum
                    ].name
                  }
                  tooltipInfo={
                    abilityTextJson?.characterAbility?.[characterId!][
                      abilityNum
                    ].effect
                  }
                  idx={index}
                  position="left"
                />
              );
            })}
          </div>
        </div>

        <div className="w-1/2 xs:w-32 sm:w-60 md:w-72 py-2">
          <h2 className="text-sm font-bold mb-2">
            {localeTextJson?.secondInfoHeadName}
          </h2>
          <div className="flex flex-wrap justify-start items-center">
            {sortedEnchantments.map(([enchantmentNumber, { eUR }], index) => {
              return (
                <TableImgItem
                  key={index}
                  src={enchantmentIcon[enchantmentNumber].url}
                  alt={enchantmentIcon[enchantmentNumber].name}
                  UsageRate={eUR}
                  tooltipTitle={enchantMentInfo[enchantmentNumber].name}
                  tooltipInfo={enchantMentInfo[enchantmentNumber].effect}
                  idx={index}
                  position="right"
                />
              );
            })}
          </div>
        </div>
      </div>
    </td>
  );
};

export default CharacterDetail;

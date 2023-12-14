/* eslint-disable @next/next/no-img-element */
import { EnchantmentIcon, characterAbilityIcon } from '@/constants/images';
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
import { characterResult } from '@/types/smasherDataTypes';
import React from 'react';
import { abilityLocaleText } from '@/locales/abilityLocaleText';
import TableImgItem from './TableImgItem';

interface CharacterDetailProps {
  characterData: characterResult;
}

const CharacterDetail = ({ characterData }: CharacterDetailProps) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  const characterId = characterData.cID?.toString();
  const sortedAbilities = Object.entries(characterData.abs)
    .filter(([abilityId]) => abilityId !== '0')
    .sort((a, b) => Number(b[1].aUR) - Number(a[1].aUR));

  const sortedEnchantments = Object.entries(characterData.echs)
    .filter(([enchantmentId]) => enchantmentId !== '0')
    .sort((a, b) => Number(b[1].eUR) - Number(a[1].eUR));

  const abilityIcons =
    characterAbilityIcon[characterId as keyof typeof characterAbilityIcon];
  const enchantmentIcons = EnchantmentIcon;

  const abilityTranslation =
    abilityLocaleText[language as keyof typeof abilityLocaleText]
      .characterAbility;

  const abilityInfo =
    abilityTranslation[characterId as keyof typeof abilityTranslation];

  const enchantMentInfo = languageTranslations.enchantMentInfo;

  return (
    <td colSpan={5} className="bg-gray-300 dark:bg-gray-700 dark:text-white">
      <div className="flex flex-grow w-full justify-around   space-x-2  sm:space-x-8 md:space-x-6  ">
        <div className="w-1/2 xs:w-32 sm:w-60 md:w-80  py-2 ml-[5%] sm:ml-[10%]  lg:ml-0">
          <h2 className="text-sm font-bold mb-2 w-28 sm:w-full ">
            {languageTranslations.firstInfoHeadName}
          </h2>
          <div className="flex flex-wrap justify-start items-center ">
            {sortedAbilities.map(([abilityNum, { aUR }], index) => {
              return (
                <TableImgItem
                  key={index}
                  src={
                    abilityIcons[
                      String(abilityNum) as keyof typeof abilityIcons
                    ].url
                  }
                  alt={
                    abilityIcons[
                      String(abilityNum) as keyof typeof abilityIcons
                    ].name
                  }
                  UsageRate={aUR}
                  tooltipTitle={
                    abilityInfo[String(abilityNum) as keyof typeof abilityInfo]
                      .name
                  }
                  tooltipInfo={
                    abilityInfo[String(abilityNum) as keyof typeof abilityInfo]
                      .effect
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
            {languageTranslations.secondInfoHeadName}
          </h2>
          <div className="flex flex-wrap justify-start items-center">
            {sortedEnchantments.map(([enchantmentNumber, { eUR }], index) => {
              return (
                <TableImgItem
                  key={index}
                  src={
                    enchantmentIcons[
                      Number(enchantmentNumber) as keyof typeof enchantmentIcons
                    ].url
                  }
                  alt={
                    enchantmentIcons[
                      Number(
                        enchantmentNumber
                      ) as unknown as keyof typeof enchantmentIcons
                    ].name
                  }
                  UsageRate={eUR}
                  tooltipTitle={
                    enchantMentInfo[
                      Number(enchantmentNumber!) as keyof typeof enchantMentInfo
                    ].name
                  }
                  tooltipInfo={
                    enchantMentInfo[
                      Number(enchantmentNumber!) as keyof typeof enchantMentInfo
                    ].effect
                  }
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

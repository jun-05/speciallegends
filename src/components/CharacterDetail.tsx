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

  const characterId = characterData.characterId?.toString();
  const sortedAbilities = Object.entries(characterData.abilities)
    .filter(([abilityId]) => abilityId !== '0')
    .sort(
      (a, b) => Number(b[1].abilityUsageRate) - Number(a[1].abilityUsageRate)
    );

  const sortedEnchantments = Object.entries(characterData.enchantments)
    .filter(([enchantmentId]) => enchantmentId !== '0')
    .sort(
      (a, b) =>
        Number(b[1].enchantmentUsageRate) - Number(a[1].enchantmentUsageRate)
    );

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
      <div className="flex flex-grow w-full justify-center sm:justify-around md:space-x-6 space-x-8">
        <div className="w-36 sm:w-60 md:w-80  py-2 pl-2 md:pl-6 ml-[5%] ">
          <h2 className="text-sm font-bold mb-2 sm:min-h-0">
            {languageTranslations.firstInfoHeadName}
          </h2>
          <div className="flex flex-wrap justify-start items-center ">
            {sortedAbilities.map(
              ([abilityNum, { abilityUsageRate }], index) => {
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
                    UsageRate={abilityUsageRate}
                    tooltipTitle={
                      abilityInfo[
                        String(abilityNum) as keyof typeof abilityInfo
                      ].name
                    }
                    tooltipInfo={
                      abilityInfo[
                        String(abilityNum) as keyof typeof abilityInfo
                      ].effect
                    }
                    idx={index}
                    position="left"
                  />
                );
              }
            )}
          </div>
        </div>

        <div className="w-36 sm:w-60 md:w-72 py-2">
          <h2 className="text-sm font-bold mb-2">
            {languageTranslations.secondInfoHeadName}
          </h2>
          <div className="flex flex-wrap justify-start items-center">
            {sortedEnchantments.map(
              ([enchantmentId, { enchantmentUsageRate }], index) => {
                return (
                  <TableImgItem
                    key={index}
                    src={
                      enchantmentIcons[
                        Number(enchantmentId) as keyof typeof enchantmentIcons
                      ].url
                    }
                    alt={
                      enchantmentIcons[
                        Number(
                          enchantmentId
                        ) as unknown as keyof typeof enchantmentIcons
                      ].name
                    }
                    UsageRate={enchantmentUsageRate}
                    tooltipTitle={
                      enchantMentInfo[
                        Number(enchantmentId!) as keyof typeof enchantMentInfo
                      ].name
                    }
                    tooltipInfo={
                      enchantMentInfo[
                        Number(enchantmentId!) as keyof typeof enchantMentInfo
                      ].effect
                    }
                    idx={index}
                    position="right"
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </td>
  );
};

export default CharacterDetail;

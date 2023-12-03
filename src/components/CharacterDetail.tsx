/* eslint-disable @next/next/no-img-element */
import { EnchantmentIcon, characterAbilityIcon } from '@/constants/images';
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
import { characterResult } from '@/types/smasherDataTypes';
import React from 'react';

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

  return (
    <td colSpan={5} className="bg-gray-300 dark:bg-gray-700 dark:text-white">
      <div className="flex flex-grow w-full justify-around space-x-6 md:space-x-10">
        <div className="w-[132px] md:w-80 py-2 pl-2 md:pl-8 ml-[5%] overflow-hidden">
          <h2 className="text-sm font-bold mb-2">
            {languageTranslations.firstInfoHeadName}
          </h2>
          <div className="flex overflow-hidden justify-start items-center ">
            {sortedAbilities.map(
              ([abilityNum, { abilityUsageRate }], index) => {
                return (
                  <div key={index} className=" text-start ml-3 first:ml-0">
                    <img
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
                      className="h-6 w-6 md:h-10 md:w-10 "
                    />
                    <span className="text-xs inline-block w-8">
                      {abilityUsageRate}%
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="w-32 md:w-80 py-2">
          <h2 className="text-sm font-bold mb-2">
            {languageTranslations.secondInfoHeadName}
          </h2>
          <div className="flex overflow-hidden justify-start items-center">
            {sortedEnchantments.map(
              ([enchantmentId, { enchantmentUsageRate }], index) => {
                return (
                  <div key={index} className=" text-center ml-3 first:ml-0">
                    <img
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
                      className="h-6 w-6 md:h-10 md:w-10 "
                    />
                    <span className="text-xs">{enchantmentUsageRate}%</span>
                  </div>
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

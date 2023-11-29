/* eslint-disable @next/next/no-img-element */

import { charactersIcon } from '@/constants/images';
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
import { characterResult } from '@/types/smasherDataTypes';
import { GrCaretDown } from 'react-icons/gr';

interface CharacterItemProps {
  characterData: characterResult;
}

const CharacterItem = ({ characterData }: CharacterItemProps) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  const name =
    languageTranslations.characterName[
      characterData.characterId as keyof typeof characterData.characterId
    ];

  if (!name) {
    throw new Error(`Invalid character ID: ${characterData.characterId}`);
  }

  const characterIcon =
    charactersIcon[characterData.characterId as keyof typeof charactersIcon];

  const talentData = [
    {
      name: '재능1',
      image: '/assets/images/icon/abilityIcon/T_UI_JackO_Ability_02_Common.png',
      rate: 20,
    },
    {
      name: '재능2',
      image: '/assets/images/icon/abilityIcon/T_UI_JackO_Ability_02_Common.png',
      rate: 30,
    },
  ];

  const enChantData = [
    {
      name: '재능1',
      image:
        '/assets/images/icon/enchantment/T_UI_Icon_Enchant_Attack_Symbol.png',
      rate: 20,
    },
    {
      name: '재능2',
      image:
        '/assets/images/icon/enchantment/T_UI_Icon_Enchant_Attack_Symbol.png',
      rate: 30,
    },
  ];

  return (
    <>
      <tr className="bg-gray-200  hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white dark:bg-gray-800">
        <th className="w-[5%] ">-</th>
        <th className="flex w-full items-center text-left pl-1 md:pl-8 space-x-2 md:space-x-5">
          <span className="flex-shrink-0">
            <img
              src={characterIcon.url}
              alt={characterIcon.name}
              className="rounded-md object-fill h-8 w-8 md:h-14 md:w-14"
            />
          </span>

          <span className="flex-grow">{name}</span>
        </th>
        <th className="w-[15%]">
          <div className="w-full flex justify-center space-x-1 md:space-x-2 ">
            <img
              src={talentData[1].image}
              className=" h-5 w-5  md:h-8 md:w-8"
            />
            <img src={talentData[1].image} className="h-5 w-5  md:h-8 md:w-8" />
          </div>
        </th>

        <th className="w-[20%] md:w-[15%] text-center ">
          {characterData.pickRate}%
        </th>
        <th className="w-[20%] md:w-[15%] text-center ">
          {characterData.winRate}%
        </th>
      </tr>
      {/**상세정보 컴포넌트 */}
    </>
  );
};
export default CharacterItem;

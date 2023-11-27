/* eslint-disable @next/next/no-img-element */

import { charactersIcon } from '@/constants/images';
import { legendTypes } from '@/constants/mapping';
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
import { characterResult } from '@/types/smasherDataTypes';

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

  return (
    <tr className="bg-gray-200  hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white dark:bg-gray-800">
      <th className="w-[10%] ">-</th>
      <th className="flex w-full items-center text-left pl-4 md:pl-8 space-x-2 md:space-x-5">
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
        {characterData.pickRate}%
      </th>
      <th className="w-[20%] md:w-[15%] text-center ">
        {characterData.winRate}%
      </th>
    </tr>
  );
};
export default CharacterItem;

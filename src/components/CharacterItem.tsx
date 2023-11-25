/* eslint-disable @next/next/no-img-element */

import { charactersIcon } from '@/constants/images';
import { legendTypes } from '@/constants/mapping';
import { characterResult } from '@/types/smasherDataTypes';

interface CharacterItemProps {
  characterData: characterResult;
}

const CharacterItem = ({ characterData }: CharacterItemProps) => {
  const characterType =
    legendTypes[characterData.characterId as keyof typeof legendTypes];
  const name = characterType[0];
  const characterIcon =
    charactersIcon[characterData.characterId as keyof typeof charactersIcon];

  return (
    <tr className="hover:bg-gray-300 hover:cursor-pointer">
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

/* eslint-disable @next/next/no-img-element */

import { characterResult } from '@/types/smasherDataTypes';
import CharacterItem from './CharacterItem';

interface CharacterListProps {
  sortedCharacters: characterResult[];
}

const CharacterList = ({ sortedCharacters }: CharacterListProps) => {
  return (
    <tbody className=" w-full">
      {sortedCharacters.map((characterData, idx: number) => (
        <CharacterItem key={`charcter_${idx}`} characterData={characterData} />
      ))}
    </tbody>
  );
};
export default CharacterList;

/* eslint-disable @next/next/no-img-element */

import { TierData } from '@/types/smasherDataTypes';
import CharacterItem from './CharacterItem';
import { getSortedCharacters } from '@/utils/sortedCharacters';

interface CharacterListProps {
  tierData: TierData;
  selectedMap: number;
  sortOption: { sortType: string; order: string };
}

const CharacterList = ({
  tierData,
  selectedMap,
  sortOption,
}: CharacterListProps) => {
  const { characters, maps, totalGameWin, totalGamesInTier } = tierData;
  const tierAvgWinRate =
    Math.round((totalGameWin / totalGamesInTier) * 1000) / 10;
  const isAllDataInTier = selectedMap === 4000;
  const dataInOption =
    selectedMap == 4000 ? characters : maps[selectedMap].characters;

  const sortedCharacters = getSortedCharacters(dataInOption, sortOption);

  return (
    <tbody className=" w-full">
      {sortedCharacters.map((characterData, idx: number) => (
        <CharacterItem
          key={`charcter_${idx}`}
          characterData={characterData}
          tierAvgWinRate={tierAvgWinRate}
          isAllDataInTier={isAllDataInTier}
          characterAvgWinRate={
            tierData.characters[characterData.characterId!].winRate!
          }
          characterAvgPickRate={
            tierData.characters[characterData.characterId!].pickRate!
          }
        />
      ))}
    </tbody>
  );
};
export default CharacterList;

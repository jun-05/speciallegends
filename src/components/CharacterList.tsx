/* eslint-disable @next/next/no-img-element */

import { TierData } from '@/types/smasherDataTypes';
import CharacterItem from './CharacterItem';
import {
  getSortedCharactersByRate,
  getSortedCharactersByName,
} from '@/utils/sortedCharacters';
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';

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
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];
  const { characters, maps, totalGameWin, totalGamesInTier } = tierData;
  const tierAvgWinRate =
    Math.round((totalGameWin / totalGamesInTier) * 1000) / 10;
  const isAllDataInTier = selectedMap === 4000;
  const dataInOption =
    selectedMap == 4000 ? characters : maps[selectedMap].characters;

  console.log(dataInOption);
  let sortedCharacters = [];
  if (sortOption.sortType === 'name') {
    sortedCharacters = getSortedCharactersByName(
      dataInOption,
      sortOption,
      languageTranslations.characterName
    );
  } else {
    sortedCharacters = getSortedCharactersByRate(dataInOption, sortOption);
  }

  console.log(sortedCharacters);

  return (
    <tbody className=" w-full ">
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

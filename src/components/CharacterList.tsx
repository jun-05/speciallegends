/* eslint-disable @next/next/no-img-element */
import { TierData } from '@/types/smasherDataTypes';
import CharacterItem from './CharacterItem';
import { useLocaleTextContext } from '@/context/PageDataContext';

import {
  getSortedCharactersByRate,
  getSortedCharactersByName,
} from '@/utils/sortedCharacters';

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
  const localeTextJson = useLocaleTextContext();
  const { characters, maps, totalGameWin, totalGamesInTier } = tierData;
  const tierAvgWinRate =
    Math.round((totalGameWin / totalGamesInTier) * 1000) / 10;
  const isTotalData = selectedMap === 4000;
  const dataInOption =
    selectedMap == 4000 ? characters : maps[selectedMap].characters;

  let sortedCharacters = [];
  if (sortOption.sortType === 'name') {
    sortedCharacters = getSortedCharactersByName(
      dataInOption,
      sortOption,
      localeTextJson?.characterName
    );
  } else {
    sortedCharacters = getSortedCharactersByRate(dataInOption, sortOption);
  }

  return (
    <tbody className=" w-full ">
      {sortedCharacters.map((characterData, idx: number) =>
        //json 파일에 해당 캐릭터의 이름이 있을때만 item 렌더링
        localeTextJson.characterName[characterData.cID!] ? (
          <CharacterItem
            key={`charcter_${idx}`}
            characterData={characterData}
            tierAvgWinRate={tierAvgWinRate}
            isTotalData={isTotalData}
            totalCharacters={Object.keys(characters).length}
            characterAvgWinRate={tierData.characters[characterData.cID!].wR!}
            characterAvgPickRate={tierData.characters[characterData.cID!].pR!}
          />
        ) : (
          ''
        )
      )}
    </tbody>
  );
};
export default CharacterList;

import { legendTypes } from '@/types/datatypes';
import React from 'react';

const CharacterStat = ({ characterData }) => {
  const characterId = characterData.characterId;
  const charName = legendTypes[characterId][0];

  const { pickRate, winRate } = characterData;

  return (
    <div className="m-2 border-2 border-gray-400">
      {<h2>Character : {charName}</h2>}

      <p>Pick Rate: {pickRate} %</p>
      <p>Win Rate: {winRate} %</p>
    </div>
  );
};

export default CharacterStat;

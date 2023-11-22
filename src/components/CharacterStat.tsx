import { legendTypes } from '@/types/datatypes';
import React from 'react';

const CharacterStat = ({ stat }) => {
  const characterName = legendTypes[stat.characterNumber][0];
  return (
    <div className="m-2 border-2 border-gray-400">
      <h2>Character : {characterName}</h2>
      <p>Games Played: {stat.gamesPlayed}</p>
      <p>Games Won: {stat.gamesWon}</p>
      <p>Selection Rate: {(stat.selectionRate * 100).toFixed(1)}</p>
      <p>Win Rate: {(stat.winRate * 100).toFixed(1)}</p>
    </div>
  );
};

export default CharacterStat;

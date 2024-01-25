import { Characters, characterResult } from '@/types/smasherDataTypes';


export const getSortedCharactersByRate = (
  dataInOption: Characters,
  sortOption: {
    sortType: string;
    order: string;
  }
): characterResult[] => {
  return Object.entries(dataInOption)
    .map(([cID, data]) => ({ cID , ...data }))
    .sort((a, b) => {
      const keyA = Number(a[sortOption.sortType as keyof typeof a]);
      const keyB = Number(b[sortOption.sortType as keyof typeof b]);
      return sortOption.order === 'asc' ? keyA - keyB : keyB - keyA;
    });
};

export const getSortedCharactersByName = (
  dataInOption: Characters,
  sortOption: {
    sortType: string;
    order: string;
  },
  characterNameObj : {
    [cID: number] : string
  },
): characterResult[] => {

  return Object.entries(dataInOption)
    .map(([cID, data]) => ({ cID , ...data }))
    .filter(character => characterNameObj.hasOwnProperty(character.cID))
    .sort((a, b) => {
      const nameA = characterNameObj[a.cID as keyof typeof characterNameObj];
      const nameB = characterNameObj[b.cID as keyof typeof characterNameObj];
      return sortOption.order === 'asc' ?    nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
};
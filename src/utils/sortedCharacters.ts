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
  characteNameObj : {
    [cID: number] : string
  },
): characterResult[] => {

  return Object.entries(dataInOption)
    .map(([cID, data]) => ({ cID , ...data }))
    .sort((a, b) => {
      const nameA = characteNameObj[a.cID as keyof typeof characteNameObj];
      const nameB = characteNameObj[b.cID as keyof typeof characteNameObj];
      return sortOption.order === 'asc' ?    nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
};
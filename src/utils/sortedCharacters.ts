import { characterResult } from '@/types/smasherDataTypes';
import { Characters } from 'aws-sdk/clients/comprehendmedical';

export const getSortedCharacters = (
  dataInOption: Characters,
  sortOption: {
    sortType: string;
    order: string;
  }
): characterResult[] => {
  return Object.entries(dataInOption)
    .map(([characterId, data]) => ({ characterId, ...data }))
    .sort((a, b) => {
      const keyA = Number(a[sortOption.sortType as keyof typeof a]);
      const keyB = Number(b[sortOption.sortType as keyof typeof b]);
      return sortOption.order === 'asc' ? keyA - keyB : keyB - keyA;
    });
};

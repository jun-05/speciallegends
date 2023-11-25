export interface characterResult {
  characterId?: number;
  gameCount: number;
  winCount: number;
  winRate?: number;
  pickRate?: number;
}

export interface Characters {
  [charNumber: string]: characterResult;
}

interface MapData {
  characters: Characters;
  totalGamesInMap: number;
}

interface Maps {
  [mapNumber: string]: MapData;
}

interface TierData {
  maps: Maps;
  characters: Characters;
  totalGamesInTier: number;
  totalGameWin: number;
}
export interface SmasherData {
  [tier: string]: TierData;
}

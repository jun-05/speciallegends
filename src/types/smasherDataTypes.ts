interface enchantment {
  enchantmentUseCount : number;
  enchantmentUsageRate? : number
}

interface enchantments {
  [enchantment:string] : enchantment;
}

interface ability {
  abilityUseCount : number
  abilityUsageRate? : number
}

interface abilities {
  [abilityUseCount:string] : ability;
}

export interface characterResult {
  characterId?: number;
  gameCount: number;
  winCount: number;
  winRate?: number;
  pickRate?: number;
  abilities:abilities;
  enchantments:enchantments;
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

export interface TierData {
  maps: Maps;
  characters: Characters;
  totalGamesInTier: number;
  totalGameWin: number;
}
export interface SmasherData {
  [tier: string]: TierData;
}

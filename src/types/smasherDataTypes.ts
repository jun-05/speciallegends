interface enchantment {
  eUC?: number; // enchantmentUseCount
  eUR?: number; // enchantmentUsageRate
}

interface enchantments {
  [enchantment: string]: enchantment;
}

interface ability {
  aUC?: number; // abilityUseCount
  aUR?: number; // abilityUsageRate
}

interface abilities {
  [abilityUseCount: string]: ability;
}

export interface characterResult {
  cID?: number | string; // chracterID
  gC?: number; // gameCount
  wC?: number; // winCount
  wR?: number; // winRate
  pR?: number; // pickRate
  abs: abilities; // abilities
  echs: enchantments; // enchantments
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
export interface SmasherDataInPeriod {
  data: SmasherData;
  period: string;
}

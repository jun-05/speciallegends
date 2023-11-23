interface characterResult {
  gameCount: number;
  winCount: number;
  winRate?: number;
  pickRate?: number;
}

interface Characters {
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

class GameStatisticsService {
  //각 티어를 분류로하는 맵에 따른 캐릭터 정보 / 티어에 따른 캐릭터 정보를 갖는 객체를 만듦
  analyzeData(data: (string | number)[][]): SmasherData {
    const results: SmasherData = {};

    for (const row of data) {
      const tier = row[2].toString().replace(/\d/g, '');

      const mapNumber = row[3].toString();
      const charNumber = row[4].toString();

      const gameCount = Number(row[9]);
      const winCount = Number(row[10]);

      if (!results[tier]) {
        results[tier] = {
          maps: {},
          characters: {},
          totalGamesInTier: 0,
          totalGameWin: 0,
        };
      }
      results[tier].totalGamesInTier += gameCount;
      results[tier].totalGameWin += winCount;

      if (!results[tier].maps[mapNumber]) {
        results[tier].maps[mapNumber] = { characters: {}, totalGamesInMap: 0 };
      }
      results[tier].maps[mapNumber].totalGamesInMap += gameCount;

      if (!results[tier].maps[mapNumber].characters[charNumber]) {
        results[tier].maps[mapNumber].characters[charNumber] = {
          gameCount: 0,
          winCount: 0,
        };
      }

      if (!results[tier].characters[charNumber]) {
        results[tier].characters[charNumber] = { gameCount: 0, winCount: 0 };
      }

      results[tier].maps[mapNumber].characters[charNumber].gameCount +=
        gameCount;
      results[tier].maps[mapNumber].characters[charNumber].winCount += winCount;

      results[tier].characters[charNumber].gameCount += gameCount;
      results[tier].characters[charNumber].winCount += winCount;
    }

    return results;
  }

  calculateRates(smasherData: SmasherData): void {
    for (const tier of Object.values(smasherData)) {
      for (const mapData of Object.values(tier.maps)) {
        for (const characterResult of Object.values(mapData.characters)) {
          characterResult.winRate =
            Math.round(
              (characterResult.winCount / characterResult.gameCount) * 1000
            ) / 10;
          characterResult.pickRate =
            Math.round(
              (characterResult.gameCount / (mapData.totalGamesInMap / 6)) * 1000
            ) / 10;
        }
      }

      for (const characterResult of Object.values(tier.characters)) {
        characterResult.winRate =
          Math.round(
            (characterResult.winCount / characterResult.gameCount) * 1000
          ) / 10;
        characterResult.pickRate =
          Math.round(
            (characterResult.gameCount / (tier.totalGamesInTier / 6)) * 1000
          ) / 10;
      }
    }
  }
}

module.exports = GameStatisticsService;

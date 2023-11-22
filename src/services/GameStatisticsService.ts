interface GameResult {
  gameCount: number;
  winCount: number;
  winRate?: number;
}

interface MapResult {
  [charNumber: string]: GameResult;
}

interface TierResult {
  [mapNumber: string]: MapResult;
}

export interface SmasherData {
  [tier: string]: TierResult;
}

class GameStatisticsService {
  analyzeData(data: (string | number)[][]): SmasherData {
    const results: SmasherData = {};

    for (const row of data) {
      //tier의 숫자는 필요 없으므로 정규식을 사용하여 제거
      const tier = row[2].toString().replace(/\d/g,'');
      const mapNumber = row[3].toString();
      const charNumber = row[4].toString();
      const gameCount = Number(row[8]);
      const winCount = Number(row[9]);

      if (!results[tier]) {
        results[tier] = {};
      }

      if (!results[tier][mapNumber]) {
        results[tier][mapNumber] = {};
      }

      if (!results[tier][mapNumber][charNumber]) {
        results[tier][mapNumber][charNumber] = { gameCount: 0, winCount: 0 };
      }

      results[tier][mapNumber][charNumber].gameCount += gameCount;
      results[tier][mapNumber][charNumber].winCount += winCount;
    }

    return results;
  }
}

module.exports = GameStatisticsService;
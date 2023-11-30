import { SmasherData, SmasherDatas } from '@/types/smasherDataTypes';

class GameStatisticsService {
  //각 티어를 분류로하는 맵에 따른 캐릭터 정보 / 티어에 따른 캐릭터 정보를 갖는 객체를 만듦
  analyzeData(data: (string | number)[][]): SmasherDatas {
    const startDate = data[0][0].toString().slice(5);
    const endDate = data[0][1].toString().slice(5);

    const smasherData: SmasherData = {};

    const results = {
      [startDate + '-' + endDate]: smasherData,
    };

    for (const row of data) {
      const tier = row[2].toString().replace(/\d/g, '');
      const mapNumber = row[3].toString();
      const charNumber = row[4].toString();
      const gameCount = Number(row[9]);
      const winCount = Number(row[10]);
      const abilityNumbers = [row[5], row[6]];
      const enchantmentNumbers = [row[7], row[8]];

      if (!smasherData[tier]) {
        smasherData[tier] = {
          maps: {},
          characters: {},
          totalGamesInTier: 0,
          totalGameWin: 0,
        };
      }
      smasherData[tier].totalGamesInTier += gameCount;
      smasherData[tier].totalGameWin += winCount;

      if (!smasherData[tier].maps[mapNumber]) {
        smasherData[tier].maps[mapNumber] = {
          characters: {},
          totalGamesInMap: 0,
        };
      }

      smasherData[tier].maps[mapNumber].totalGamesInMap += gameCount;

      if (!smasherData[tier].characters[charNumber]) {
        smasherData[tier].characters[charNumber] = {
          gameCount: 0,
          winCount: 0,
          abilities: {},
          enchantments: {},
        };
      }

      if (!smasherData[tier].maps[mapNumber].characters[charNumber]) {
        smasherData[tier].maps[mapNumber].characters[charNumber] = {
          gameCount: 0,
          winCount: 0,
          abilities: {},
          enchantments: {},
        };
      }
      smasherData[tier].maps[mapNumber].characters[charNumber].gameCount +=
        gameCount;
      smasherData[tier].maps[mapNumber].characters[charNumber].winCount +=
        winCount;

      for (const enchantmentNumber of enchantmentNumbers) {
        if (
          !smasherData[tier].characters[charNumber].enchantments![
            enchantmentNumber
          ]
        ) {
          smasherData[tier].characters[charNumber].enchantments![
            enchantmentNumber
          ] = { enchantmentUseCount: 0 };
        }
        if (
          !smasherData[tier].maps[mapNumber].characters[charNumber]
            .enchantments![enchantmentNumber]
        ) {
          smasherData[tier].maps[mapNumber].characters[
            charNumber
          ].enchantments![enchantmentNumber] = { enchantmentUseCount: 0 };
        }
        smasherData[tier].maps[mapNumber].characters[charNumber].enchantments![
          enchantmentNumber
        ].enchantmentUseCount += gameCount;
        smasherData[tier].characters[charNumber].enchantments![
          enchantmentNumber
        ].enchantmentUseCount += gameCount;

        if (enchantmentNumbers[0] === 0 && enchantmentNumbers[1] === 0) break;
      }

      for (const abilityNumber of abilityNumbers) {
        if (
          !smasherData[tier].characters[charNumber].abilities![abilityNumber]
        ) {
          smasherData[tier].characters[charNumber].abilities![abilityNumber] = {
            abilityUseCount: 0,
          };
        }
        if (
          !smasherData[tier].maps[mapNumber].characters[charNumber].abilities![
            abilityNumber
          ]
        ) {
          smasherData[tier].maps[mapNumber].characters[charNumber].abilities![
            abilityNumber
          ] = { abilityUseCount: 0 };
        }
        smasherData[tier].maps[mapNumber].characters[charNumber].abilities![
          abilityNumber
        ].abilityUseCount += gameCount;
        smasherData[tier].characters[charNumber].abilities![
          abilityNumber
        ].abilityUseCount += gameCount;

        if (abilityNumbers[0] === 0 && abilityNumbers[1] === 0) break;
      }

      smasherData[tier].characters[charNumber].gameCount += gameCount;
      smasherData[tier].characters[charNumber].winCount += winCount;
    }

    return results;
  }

  calculateRates(smasherDatas: SmasherDatas): void {
    for (const smasherData of Object.values(smasherDatas)) {
      for (const tier of Object.values(smasherData)) {
        for (const mapData of Object.values(tier.maps)) {
          for (const characterResult of Object.values(mapData.characters)) {
            characterResult.winRate =
              Math.round(
                (characterResult.winCount / characterResult.gameCount) * 1000
              ) / 10;
            characterResult.pickRate =
              Math.round(
                (characterResult.gameCount / (mapData.totalGamesInMap / 6)) *
                  1000
              ) / 10;

            for (const enchantmentNumber of Object.values(
              characterResult.enchantments
            )) {
              enchantmentNumber.enchantmentUsageRate =
                Math.round(
                  (enchantmentNumber.enchantmentUseCount /
                    characterResult.gameCount) *
                    1000
                ) / 10;
            }

            for (const abilityNumber of Object.values(
              characterResult.abilities
            )) {
              abilityNumber.abilityUsageRate =
                Math.round(
                  (abilityNumber.abilityUseCount / characterResult.gameCount) *
                    1000
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

        for (const characterResult of Object.values(tier.characters)) {
          for (const enchantmentNumber of Object.values(
            characterResult.enchantments
          )) {
            enchantmentNumber.enchantmentUsageRate =
              Math.round(
                (enchantmentNumber.enchantmentUseCount /
                  characterResult.gameCount) *
                  1000
              ) / 10;
          }

          for (const abilityNumber of Object.values(
            characterResult.abilities
          )) {
            abilityNumber.abilityUsageRate =
              Math.round(
                (abilityNumber.abilityUseCount / characterResult.gameCount) *
                  1000
              ) / 10;
          }
        }
      }
    }
  }
}
module.exports = GameStatisticsService;

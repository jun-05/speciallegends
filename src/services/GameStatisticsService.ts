import { SmasherData, SmasherDataInPeriod } from '@/types/smasherDataTypes';

class GameStatisticsService {
  //각 티어를 분류로하는 맵에 따른 캐릭터 정보 / 티어에 따른 캐릭터 정보를 갖는 객체를 만듦
  analyzeData(data: (string | number)[][] , period : {start:string,end:string}): SmasherDataInPeriod {
    const startDate = period.start;
    const endDate = period.end;

    const smasherData: SmasherData = {};

    const results = {
      data: smasherData,
      period:
        startDate.slice(0,2) + '-' + startDate.slice(-2) + '-' + endDate.slice(0,2) + '-' + endDate.slice(-2),
    };

    for (const row of data) {
      const tier = row[0].toString().replace(/\d/g, '');
      const mapNumber = row[1].toString();
      const charNumber = row[2].toString();
      const gC = Number(row[7]);
      const wC = Number(row[8]);
      const abilityNumbers = [row[3], row[4]];
      const enchantmentNumbers = [row[5], row[6]];

      if (!smasherData[tier]) {
        smasherData[tier] = {
          maps: {},
          characters: {},
          totalGamesInTier: 0,
          totalGameWin: 0,
        };
      }
      smasherData[tier].totalGamesInTier += gC;
      smasherData[tier].totalGameWin += wC;

      if (!smasherData[tier].maps[mapNumber]) {
        smasherData[tier].maps[mapNumber] = {
          characters: {},
          totalGamesInMap: 0,
        };
      }

      smasherData[tier].maps[mapNumber].totalGamesInMap += gC;

      if (!smasherData[tier].characters[charNumber]) {
        smasherData[tier].characters[charNumber] = {
          gC: 0,
          wC: 0,
          abs: {},
          echs: {},
        };
      }

      if (!smasherData[tier].maps[mapNumber].characters[charNumber]) {
        smasherData[tier].maps[mapNumber].characters[charNumber] = {
          gC: 0,
          wC: 0,
          abs: {},
          echs: {},
        };
      }
      smasherData[tier].maps[mapNumber].characters[charNumber].gC! +=
        gC;
      smasherData[tier].maps[mapNumber].characters[charNumber].wC! +=
        wC;

      for (const enchantmentNumber of enchantmentNumbers) {
        if (
          !smasherData[tier].characters[charNumber].echs![
            enchantmentNumber
          ]
        ) {
          smasherData[tier].characters[charNumber].echs![
            enchantmentNumber
          ] = { eUC: 0 };
        }
        if (
          !smasherData[tier].maps[mapNumber].characters[charNumber]
            .echs![enchantmentNumber]
        ) {
          smasherData[tier].maps[mapNumber].characters[
            charNumber
          ].echs![enchantmentNumber] = { eUC: 0 };
        }
        smasherData[tier].maps[mapNumber].characters[charNumber].echs![
          enchantmentNumber
        ].eUC! += gC;
        smasherData[tier].characters[charNumber].echs![
          enchantmentNumber
        ].eUC! += gC;

        if (enchantmentNumbers[0] === 0 && enchantmentNumbers[1] === 0) break;
      }

      for (const abilityNumber of abilityNumbers) {
        if (
          !smasherData[tier].characters[charNumber].abs![abilityNumber]
        ) {
          smasherData[tier].characters[charNumber].abs![abilityNumber] = {
            aUC: 0,
          };
        }
        if (
          !smasherData[tier].maps[mapNumber].characters[charNumber].abs![
            abilityNumber
          ]
        ) {
          smasherData[tier].maps[mapNumber].characters[charNumber].abs![
            abilityNumber
          ] = { aUC: 0 };
        }
        smasherData[tier].maps[mapNumber].characters[charNumber].abs![
          abilityNumber
        ].aUC! += gC;
        smasherData[tier].characters[charNumber].abs![
          abilityNumber
        ].aUC! += gC;

        if (abilityNumbers[0] === 0 && abilityNumbers[1] === 0) break;
      }

      smasherData[tier].characters[charNumber].gC! += gC;
      smasherData[tier].characters[charNumber].wC! += wC;
    }

    return results;
  }

  calculateRates(smasherData: SmasherData): void {
    for (const tier of Object.values(smasherData)) {
      for (const mapData of Object.values(tier.maps)) {
        for (const characterResult of Object.values(mapData.characters)) {
          characterResult.wR =
            Math.round(
              (characterResult.wC! / characterResult.gC!) * 1000
            ) / 10;
          characterResult.pR =
            Math.round(
              (characterResult.gC! / (mapData.totalGamesInMap / 6)) * 1000
            ) / 10;


          for (const enchantmentNumber of Object.values(
            characterResult.echs
          )) {
            enchantmentNumber.eUR =
              Math.round(
                (enchantmentNumber.eUC! /
                  characterResult.gC!) *
                  1000
              ) / 10;

          }

          for (const abilityNumber of Object.values(
            characterResult.abs
          )) {
            abilityNumber.aUR =
              Math.round(
                (abilityNumber.aUC! / characterResult.gC!) *
                  1000
              ) / 10;

          }
        }

        for (const characterResult of Object.values(tier.characters)) {
          characterResult.wR =
            Math.round(
              (characterResult.wC! / characterResult.gC!) * 1000
            ) / 10;
          characterResult.pR =
            Math.round(
              (characterResult.gC! / (tier.totalGamesInTier / 6)) * 1000
            ) / 10;

        }
      }

      for (const characterResult of Object.values(tier.characters)) {
        for (const enchantmentNumber of Object.values(
          characterResult.echs
        )) {
          enchantmentNumber.eUR =
            Math.round(
              (enchantmentNumber.eUC! /
                characterResult.gC!) *
                1000
            ) / 10;

        }

        for (const abilityNumber of Object.values(characterResult.abs)) {
          abilityNumber.aUR =
            Math.round(
              (abilityNumber.aUC! / characterResult.gC!) * 1000
            ) / 10;
        }
      }
    }
  }
  deleteCount(smasherData: SmasherData): void {
    for (const tier of Object.values(smasherData)) {
      for (const mapData of Object.values(tier.maps)) {
        for (const characterResult of Object.values(mapData.characters)) {
          delete characterResult.wC;
          delete characterResult.gC;
          for (const enchantmentNumber of Object.values(
            characterResult.echs
          )) {
            delete enchantmentNumber.eUC;
          }

          for (const abilityNumber of Object.values(
            characterResult.abs
          )) {
            delete abilityNumber.aUC;
          }
        }

        for (const characterResult of Object.values(tier.characters)) {
          delete characterResult.wC;
          delete characterResult.gC;
        }
      }

      for (const characterResult of Object.values(tier.characters)) {
        for (const enchantmentNumber of Object.values(
          characterResult.echs
        )) {
          delete enchantmentNumber.eUC;
        }

        for (const abilityNumber of Object.values(characterResult.abs)) {

            delete abilityNumber.aUC;
        }
      }
    }
  }
}
module.exports = GameStatisticsService;

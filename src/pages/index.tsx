/* eslint-disable @next/next/no-img-element */
import CharacterDetail from '@/components/CharacterDetail';
import CharacterStat from '@/components/CharacterStat';
import { MapIcon, TierIcon, charactersIcon } from '@/constants/images';
import { SmasherData } from '@/services/GameStatisticsService';
import { legendTypes } from '@/types/datatypes';
import { getSortedCharacters } from '@/utils/sortedCharacters';
import { useState } from 'react';

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

const MyPage = ({ smasherData }: { smasherData: SmasherData }) => {
  const [option, setOption] = useState({
    selectedTier: 'master',
    selectedMap: 4000,
  });

  // const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
  //   null
  // );

  const [sortOption, setSortOption] = useState({
    sortType: 'winRate', // 'winRate' 또는 'pickRate'
    order: 'desc', // 'asc' 또는 'desc'
  });

  const tierData = smasherData[option.selectedTier];
  const { characters, maps, totalGamesInTier, totalGameWin } = tierData;

  const dataInOption =
    option.selectedMap == 4000
      ? characters
      : maps[option.selectedMap].characters;

  const sortedCharacters = getSortedCharacters(dataInOption, sortOption);

  const tierList = [
    { master: '마스터' },
    { diamond: '다이아몬드' },
    { platinum: '플래티넘' },
    { gold: '골드' },
    { silver: '실버' },
    { bronze: '브론즈' },
  ];
  const mapList = [
    { 4000: '전체' },
    { 4003: '버려진 해적선 - 정오' },
    { 4005: '버려진 해적선 - 석양' },
    { 4006: '버려진 해적선 - 심야' },
    { 4007: '버려진 해적선 - 비' },
    { 4008: '비허가 스페이스독 - 성층권' },
    { 4009: '비허가 스페이스독 - 석양' },
  ];

  const onChangeTier = (tier: string) => {
    setOption((prevOption) => ({
      ...prevOption,
      selectedTier: tier,
    }));
  };

  const onChangeMap = (map: number) => {
    setOption((prevOption) => ({
      ...prevOption,
      selectedMap: map,
    }));
  };

  const onClickSort = (sortType: string) => {
    if (sortType === sortOption.sortType) {
      setSortOption((prevOption) => ({
        sortType,
        order: prevOption.order === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setSortOption((prevOption) => ({
        ...prevOption,
        sortType,
      }));
    }
  };

  const selectedTierIcon =
    TierIcon[option.selectedTier as keyof typeof TierIcon];
  const selectedMapIcon = MapIcon[option.selectedMap as keyof typeof MapIcon];

  return (
    <div className="min-w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <header className="p-4 bg-blue-500 text-white dark:bg-blue-800">
        <h1 className="text-xl hover:cursor-pointer">SL.GG</h1>
      </header>

      <div className="p-4 pt-8 md:pt-32 flex justify-center items-center dark:text-white">
        <div className="w-[512px] md:w-[720px] lg:w-[1024px] ">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <select
                className="mr-2 h-10 md:h-11  p-2 w-22 md:w-48 lg:w-40 text-xs md:text-sm lg:text-base border border-gray-200 rounded"
                onChange={(e) => onChangeTier(e.target.value)}
              >
                <option value="master">티어 선택</option>
                {tierList.map((tier, idx) => (
                  <option key={`tier_${idx}`} value={Object.keys(tier)}>
                    {Object.values(tier)}
                  </option>
                ))}
              </select>
              <select
                className="p-2  h-10  md:h-11 w-32 lg:w-60 md:w-48 text-xs md:text-sm lg:text-base  border border-gray-200 rounded"
                onChange={(e) => onChangeMap(Number(e.target.value))}
              >
                <option value="4000">맵 선택</option>
                {mapList.map((map, idx) => (
                  <option key={`map_${idx}`} value={Object.keys(map)}>
                    {Object.values(map)}
                  </option>
                ))}
              </select>
            </div>
            <div className="group flex space-x-2 md:space-x-8 md:mr-6">
              <img
                src={selectedTierIcon.url}
                alt={selectedTierIcon.name}
                className="rounded-md object-fill h-10 w-10 md:h-14 md:w-14"
              />
              <img
                src={selectedMapIcon.url}
                alt={selectedMapIcon.name}
                className={`h-10 w-10 md:h-14 md:w-14
                ${
                  option.selectedMap !== 4000
                    ? 'transition-all duration-500 ease-in-out transform group-hover:scale-x-[2] rounded-md object-fill'
                    : ''
                }  `}
              />
            </div>
          </div>
          <div className="rounded-md overflow-hidden">
            <table className=" w-full mt-4 border rounded-md text-sm md:text-base text-gray-800 dark:text-white">
              <thead className="w-full border-b-2">
                <tr>
                  <th className="w-[10%]">#</th>
                  <th className="w-[50%] md:w-[60%] text-left pl-4 md:pl-8">
                    캐릭터네임
                  </th>
                  <th className="w-[20%] md:w-[15%] ">
                    <div className="inline-flex items-center space-x-1 pl-2">
                      <span>픽률</span>
                      <div
                        onClick={() => onClickSort('pickRate')}
                        className="hover:cursor-pointer"
                      >
                        {sortOption.order === 'desc' ? (
                          <MdOutlineKeyboardArrowDown size={20} />
                        ) : (
                          <MdOutlineKeyboardArrowUp size={20} />
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="w-[20%] md:w-[15%]">
                    <div className="inline-flex items-center space-x-1 pl-2 ">
                      <span>승률</span>
                      <div
                        onClick={() => onClickSort('winRate')}
                        className="hover:cursor-pointer"
                      >
                        {sortOption.order === 'desc' ? (
                          <MdOutlineKeyboardArrowDown size={20} />
                        ) : (
                          <MdOutlineKeyboardArrowUp size={20} />
                        )}
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-200 w-full">
                {sortedCharacters.map((characterData, idx) => {
                  const characterType =
                    legendTypes[
                      characterData.characterId as keyof typeof legendTypes
                    ];
                  const name = characterType[0];
                  const characterIcon =
                    charactersIcon[
                      characterData.characterId as keyof typeof charactersIcon
                    ];

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-gray-300 hover:cursor-pointer"
                    >
                      <th className="w-[10%] ">-</th>
                      <th className="flex w-full items-center text-left pl-4 md:pl-8 space-x-2 md:space-x-5">
                        <span className="flex-shrink-0">
                          <img
                            src={characterIcon.url}
                            alt={characterIcon.name}
                            className="rounded-md object-fill h-8 w-8 md:h-14 md:w-14"
                          />
                        </span>

                        <span className="flex-grow">{name}</span>
                      </th>
                      <th className="w-[20%] md:w-[15%] text-center ">
                        {characterData.pickRate}%
                      </th>
                      <th className="w-[20%] md:w-[15%] text-center ">
                        {characterData.winRate}%
                      </th>
                    </tr>
                  );
                })}
                {/* {selectedCharacter === item.characterId && (    
                     <tr>
                  <td colSpan={4}>
                    <CharacterDetail characterId={''} />
                  </td>
                </tr>
                    )} */}
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-center border-t-2 pt-4 mt-6">
            © 5minlab Corp. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const S3Service = require('/src/services/S3Service');
  const ExcelService = require('/src/services/ExcelService');
  const GameStatisticsService = require('/src/services/GameStatisticsService');

  const params = {
    Bucket: process.env.AWS_BUCKET!,
    Key: process.env.AWS_FILE_KEY!,
  };

  const s3Service = new S3Service();
  const excelService = new ExcelService();
  const gameStatisticsService = new GameStatisticsService();

  const xlsxFile = await s3Service.getObject(params);
  const fileBuffer = xlsxFile.Body;
  const data = excelService.readExcelFile(fileBuffer);
  const smasherData = gameStatisticsService.analyzeData(data);
  gameStatisticsService.calculateRates(smasherData);

  return {
    props: {
      smasherData,
    },
  };
}

export default MyPage;

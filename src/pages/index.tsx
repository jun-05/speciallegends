import CharacterStat from '@/components/CharacterStat';
import { SmasherData } from '@/services/GameStatisticsService';
import { useState } from 'react';

const MyPage = ({ smasherData }: { smasherData: SmasherData }) => {
  const [option, setOption] = useState({
    selectedTier: 'master',
    selectedMap: 'total',
  });

  const [sortOption, setSortOption] = useState({
    sortType: 'winRate', // 'winRate' 또는 'pickRate'
    order: 'desc', // 'asc' 또는 'desc'
  });

  const tierData = smasherData[option.selectedTier];
  const { characters, maps, totalGamesInTier, totalGameWin } = tierData;

  const dataInOption =
    option.selectedMap == 'total'
      ? characters
      : maps[option.selectedMap].characters;

  const sortedCharacters = Object.entries(dataInOption)
    .map(([characterId, data]) => ({ characterId, ...data }))
    .sort((a, b) => {
      const keyA = Number(a[sortOption.sortType as keyof typeof a]);
      const keyB = Number(b[sortOption.sortType as keyof typeof b]);
      return sortOption.order === 'asc' ? keyA - keyB : keyB - keyA;
    });

  const onClickTierButton = (tier: string) => {
    setOption((prevOption) => ({
      ...prevOption,
      selectedTier: tier,
    }));
  };

  const onClickMapButton = (map: string) => {
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

  return (
    <>
      <div className="w-full flex">
        <div className="flex flex-col">
          <div>tierList</div>
          <div className="flex flex-row space-x-4">
            <div onClick={() => onClickTierButton('master')}>master</div>
            <div onClick={() => onClickTierButton('diamond')}>diamond</div>
            <div onClick={() => onClickTierButton('platinum')}>platinum</div>
            <div onClick={() => onClickTierButton('gold')}>gold</div>
            <div onClick={() => onClickTierButton('silver')}>silver</div>
            <div onClick={() => onClickTierButton('bronze')}>bronze</div>
          </div>
          <div className="">
            <div>mapList</div>
            <div className="flex flex-row space-x-4">
              <div onClick={() => onClickMapButton('total')}>전체</div>
              <div onClick={() => onClickMapButton('4003')}>map1</div>
              <div onClick={() => onClickMapButton('4005')}>map2</div>
              <div onClick={() => onClickMapButton('4006')}>map3</div>
              <div onClick={() => onClickMapButton('4007')}>map4</div>
              <div onClick={() => onClickMapButton('4008')}>map5</div>
              <div onClick={() => onClickMapButton('4009')}>map6</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div>
          티어 평균 승률
          {Math.round((totalGameWin / totalGamesInTier) * 1000) / 10}
        </div>
        <div onClick={() => onClickSort('winRate')}>승률 차순변경</div>
        <div onClick={() => onClickSort('pickRate')}>픽률 차순변경</div>
        {sortedCharacters.map((characterData, idx) => (
          <CharacterStat key={idx} characterData={characterData} />
        ))}
      </div>
    </>
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

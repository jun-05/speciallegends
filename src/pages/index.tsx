/* eslint-disable @next/next/no-img-element */
import { SmasherDataInPeriod } from '@/types/smasherDataTypes';
import { useState } from 'react';
import TierAndMapSelect from '@/components/TierAndMapSelect';
import TableOption from '@/components/TableOption';
import CharacterList from '@/components/CharacterList';
import TableTitle from '@/components/TableTitle';
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';

const MyPage = ({ smasherDatas }: { smasherDatas: SmasherDataInPeriod[] }) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  const [smasherDataIndex, setSmasherDataIndex] = useState(0);
  const [option, setOption] = useState({
    selectedTier: 'master',
    selectedMap: 4000, // 4000은 All값
  });

  const [sortOption, setSortOption] = useState({
    sortType: 'winRate', // 'winRate' 또는 'pickRate'
    order: 'desc', // 'asc' 또는 'desc'
  });

  const smasherData = smasherDatas[smasherDataIndex].data;
  const period = smasherDatas[smasherDataIndex].period;

  const tierData = smasherData[option.selectedTier];

  const onClickPrevIndex = () => {
    if (smasherDataIndex < smasherDatas.length - 1) {
      setSmasherDataIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onClickNextIndex = () => {
    if (smasherDataIndex > 0) {
      setSmasherDataIndex((prevIndex) => prevIndex - 1);
    }
  };

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

  return (
    <div className="p-4 pt-8 md:pt-12 flex justify-center items-center text-gray-800 dark:text-white ">
      <div className=" w-[512px] md:w-[720px] lg:w-[1024px] ">
        {/** 타이틀 */}
        <TableTitle
          period={period}
          onClickNextIndex={onClickNextIndex}
          onClickPrevIndex={onClickPrevIndex}
          index={smasherDataIndex}
        />
        {/**옵션 */}
        <TierAndMapSelect
          option={option}
          onChangeTier={onChangeTier}
          onChangeMap={onChangeMap}
        />

        {/** 테이블 설명 텍스트 */}
        <div className="rounded-md ">
          <div className="flex justify-end">
            {option.selectedMap !== 4000 ? (
              <div className="text-xs md:text-base mt-2">
                {languageTranslations.explanationTextByMap}
              </div>
            ) : (
              <div className="text-xs md:text-base mt-2">
                {languageTranslations.explanationText}
              </div>
            )}
          </div>
          {/**테이블 */}
          <table className="w-full mt-4 rounded-md text-sm md:text-base text-gray-800 dark:text-white  ">
            {/**테이블 헤드 컴포넌트 */}
            <TableOption sortOption={sortOption} onClickSort={onClickSort} />
            {/**테이블 리스트 컴포넌트 */}
            <CharacterList
              tierData={tierData}
              selectedMap={option.selectedMap}
              sortOption={sortOption}
            />
          </table>
        </div>
      </div>
    </div>
  );
};
import fs from 'fs';

export async function getStaticProps() {
  const S3Service = require('/src/services/S3Service');
  const ExcelService = require('/src/services/ExcelService');
  const GameStatisticsService = require('/src/services/GameStatisticsService');
  const DateService = require('/src/services/DateService');

  const s3Service = new S3Service();
  const excelService = new ExcelService();
  const gameStatisticsService = new GameStatisticsService();
  const dateService = new DateService();

  const currentDate = new Date();
  const smasherDatas = [];

  for (let i = 0; i < 3; i++) {
    try {
      const targetDate = new Date(
        currentDate.getTime() - dateService.weeksToMs(i)
      );
      const period = dateService.getPeriod(targetDate);

      const params = {
        Bucket: process.env.AWS_BUCKET!,
        Key: `sl_${period.start}${period.end}.csv`,
      };

      const csvFile = await s3Service.getObject(params);

      const fileBuffer = csvFile.Body;
      const data = excelService.readExcelFile(fileBuffer);

      const weekSmasherData = gameStatisticsService.analyzeData(data);

      gameStatisticsService.calculateRates(weekSmasherData.data);
      smasherDatas.push(weekSmasherData);
    } catch (error) {
      console.error(`Error occurred in week ${i}:`, error);
    }
  }

  return {
    props: {
      smasherDatas,
    },
    revalidate: 604800,
  };
}

export default MyPage;

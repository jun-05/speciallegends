/* eslint-disable @next/next/no-img-element */
import { SmasherDataInPeriod } from '@/types/smasherDataTypes';
import { useEffect, useState } from 'react';
import TierAndMapSelect from '@/components/TierAndMapSelect';
import TableOption from '@/components/TableOption';
import CharacterList from '@/components/CharacterList';
import TableTitle from '@/components/TableTitle';
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';

const MyPage = ({ smasherDatas }: { smasherDatas: SmasherDataInPeriod[] }) => {
  const router = useRouter();
  const { lang } = router.query;
  const langStr = Array.isArray(lang) ? lang[0] : lang;
  const [language, setLanguage] = useLanguageContext();

  useEffect(() => {
    setLanguage(langStr);
  }, [langStr, setLanguage]);

  const languageTranslations = localeText[language as keyof typeof localeText];

  const [smasherDataIndex, setSmasherDataIndex] = useState(0);
  const [option, setOption] = useState({
    selectedTier: 'master',
    selectedMap: 4000, // 4000은 All값
  });

  const [sortOption, setSortOption] = useState({
    sortType: 'pickRate', // 'name', 'winRate', 'pickRate'
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
  const title =
    langStr === 'ko'
      ? '스매시 레전드 통계 사이트 : 스페셜 레전드 :'
      : 'Smash Legends statistics site : Special Legends';
  const description =
    langStr === 'ko'
      ? '스매시 레전드 통계 사이트, 4주간의 캐릭터 통계 결과를 제공합니다.'
      : 'Smash Legends statistics site, providing character statistics results for 4 weeks';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta http-equiv="content-language" content={langStr} />
      </Head>
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
            <div className="flex flex-col items-end">
              {option.selectedMap !== 4000 ? (
                <div className="text-xs md:text-base mt-1">
                  {languageTranslations.explanationTextByMap}
                </div>
              ) : (
                <div className="text-xs md:text-base mt-1">
                  {languageTranslations.explanationText}
                </div>
              )}
            </div>
            {/**테이블 */}
            <table className="w-full mt-2 rounded-md text-sm md:text-base text-gray-800 dark:text-white  ">
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
    </>
  );
};

export async function getStaticPaths() {
  const paths = ['ko', 'en'].map((lang) => ({ params: { lang } }));

  return { paths, fallback: false };
}

let cache: { smasherDatas: SmasherDataInPeriod[] } = {
  smasherDatas: [],
};

import fs from 'fs';
import { useRouter } from 'next/router';
import Head from 'next/head';

export async function getStaticProps() {
  if (!cache.smasherDatas.length) {
    //const S3Service = require('/src/services/S3Service');
    const ExcelService = require('/src/services/ExcelService');
    const GameStatisticsService = require('/src/services/GameStatisticsService');
    const DateService = require('/src/services/DateService');

    //const s3Service = new S3Service();
    const excelService = new ExcelService();
    const gameStatisticsService = new GameStatisticsService();
    const dateService = new DateService();

    const currentDate = new Date();
    const smasherDatas = [];

    // 3주전까지의 데이터를 저장 , 차후 4주
    for (let i = 0; i < 4; i++) {
      try {
        const targetDate = new Date(
          currentDate.getTime() - dateService.weeksToMs(i)
        );
        const period = dateService.getPeriod(targetDate);

        const params = {
          Bucket: process.env.AWS_BUCKET!,
          Key: `sl_${period.start}${period.end}.csv`,
        };

        //    const csvFile = await s3Service.getObject(params);

        // 로컬 개발환경
        const filePath = `./public/sl_${period.start}${period.end}.csv`;
        const fileBuffer = fs.readFileSync(filePath);

        // const fileBuffer = csvFile.Body;
        const data = excelService.readExcelFile(fileBuffer);

        const weekSmasherData = gameStatisticsService.analyzeData(data);

        gameStatisticsService.calculateRates(weekSmasherData.data);
        smasherDatas.push(weekSmasherData);
      } catch (error) {
        console.error(`Error occurred in week ${i}:`, error);
      }
    }
    cache.smasherDatas = smasherDatas;
  }

  return {
    props: {
      smasherDatas: cache.smasherDatas,
    },
    revalidate: 604800,
  };
}

export default MyPage;

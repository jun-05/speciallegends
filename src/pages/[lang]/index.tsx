/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import TierAndMapSelect from '@/components/TierAndMapSelect';
import TableOption from '@/components/TableOption';
import CharacterList from '@/components/CharacterList';
import TableTitle from '@/components/TableTitle';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { pageData } from '@/types/pageDataType';
import { PageDataContext } from './../../context/PageDataContext';
import { SmasherDataInPeriod } from '@/types/smasherDataTypes';
import { imagesTextJSON } from '@/types/imageJsonTypes';

const MyPage = ({
  smasherDatas,
  pageData,
  generatedAt,
}: {
  smasherDatas: SmasherDataInPeriod[];
  pageData: pageData;
  generatedAt: string;
}) => {
  const { localeTextJson } = pageData;
  const router = useRouter();
  const { lang } = router.query;
  const langStr = Array.isArray(lang) ? lang[0] : lang;

  console.log(generatedAt);

  const [smasherDataIndex, setSmasherDataIndex] = useState(0);
  const [option, setOption] = useState({
    selectedTier: 'master',
    selectedMap: 4000, // 4000은 All값
  });

  const [sortOption, setSortOption] = useState({
    sortType: 'pR', // 'name', 'wR', 'pR'
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
      ? '스매시 레전드 통계 사이트 : 스페셜 레전드 '
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
      <PageDataContext.Provider value={pageData}>
        <div className="p-4 pt-8 md:pt-12 flex justify-center items-center text-gray-800 dark:text-white ">
          <div className=" w-[512px] md:w-[720px] lg:w-[1024px] ">
            {/** 타이틀 */}
            <TableTitle
              period={period}
              onClickNextIndex={onClickNextIndex}
              onClickPrevIndex={onClickPrevIndex}
              index={smasherDataIndex}
              lang={langStr!}
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
                    {localeTextJson?.explanationTextByMap}
                  </div>
                ) : (
                  <div className="text-xs md:text-base mt-1">
                    {localeTextJson?.explanationText}
                  </div>
                )}
              </div>
              {/**테이블 */}
              <table className="w-full mt-2 rounded-md text-sm md:text-base text-gray-800 dark:text-white  ">
                {/**테이블 헤드 컴포넌트 */}
                <TableOption
                  sortOption={sortOption}
                  onClickSort={onClickSort}
                />
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
      </PageDataContext.Provider>
    </>
  );
};

export async function getStaticPaths() {
  const paths = ['ko', 'en'].map((lang) => ({ params: { lang } }));
  return { paths, fallback: false };
}

let cache: {
  smasherDatas: SmasherDataInPeriod[];
  imageTextJson: imagesTextJSON | null;
} = {
  smasherDatas: [],
  imageTextJson: null,
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const params = context.params;
  const S3Service = require('/src/services/S3Service');
  const s3Service = new S3Service();

  const abilityTextJson = JSON.parse(
    await s3Service.getAbilityTextFile(params?.lang)
  );
  const localeTextJson = JSON.parse(
    await s3Service.getLocaleTextFile(params?.lang)
  );
  const startDate = new Date();
  /**중복으로 사용되는 값들은 한번만 사용하고 캐시에 저장하여 사용 */
  if (!cache.smasherDatas.length) {
    const GameStatisticsService = require('/src/services/GameStatisticsService');
    const DateService = require('/src/services/DateService');
    const gameStatisticsService = new GameStatisticsService();
    const dateService = new DateService();

    const currentDate = new Date();
    const smasherDatas = [];

    cache.imageTextJson = JSON.parse(await s3Service.getImagesTextFile());

    for (let i = 0; i < 4; i++) {
      try {
        const targetDate = new Date(
          currentDate.getTime() - dateService.weeksToMs(i)
        );
        const period = dateService.getPeriod(targetDate);

        const aws_params = {
          Bucket: process.env.AWS_BUCKET!,
          Key: `sl_${period.start}${period.end}.json`,
        };

        const statsData = await s3Service.getStatDataFile(aws_params);

        const jsonData = JSON.parse(statsData.Body.toString('utf-8'));
        const weekSmasherData = gameStatisticsService.analyzeData(
          jsonData,
          period
        );

        gameStatisticsService.calculateRates(weekSmasherData.data);
        gameStatisticsService.deleteCount(weekSmasherData.data);
        smasherDatas.push(weekSmasherData);
      } catch (error) {
        console.error(`Error occurred in week ${i}:`, error);
      }
    }
    cache.smasherDatas = smasherDatas;
  }

  const result = {
    props: {
      smasherDatas: cache.smasherDatas,
      pageData: {
        abilityTextJson: abilityTextJson,
        localeTextJson: localeTextJson,
        imageTextJson: cache.imageTextJson,
      },
      generatedAt: startDate.toISOString(),
    },
    revalidate: 604800,
  };

  if (params!.lang === 'en') {
    cache = {
      smasherDatas: [],
      imageTextJson: null,
    };
  }

  return result;
}

export default MyPage;

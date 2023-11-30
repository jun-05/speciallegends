/* eslint-disable @next/next/no-img-element */
import { SmasherData } from '@/types/smasherDataTypes';
import { useState } from 'react';
import TierAndMapSelect from '@/components/TierAndMapSelect';
import TableOption from '@/components/TableOption';
import CharacterList from '@/components/CharacterList';

const MyPage = ({ smasherData }: { smasherData: SmasherData }) => {
  const [language] = useLanguageContext();
  const languageTranslations = localeText[language as keyof typeof localeText];

  const [option, setOption] = useState({
    selectedTier: 'master',
    selectedMap: 4000, // 4000은 All값
  });

  const [sortOption, setSortOption] = useState({
    sortType: 'winRate', // 'winRate' 또는 'pickRate'
    order: 'desc', // 'asc' 또는 'desc'
  });

  const tierData = smasherData[option.selectedTier];

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
    <div className="p-4 pt-8 md:pt-32 flex justify-center items-center text-gray-800 dark:text-white ">
      <div className="w-[512px] md:w-[720px] lg:w-[1024px] ">
        <div>dddddddddddd</div>
        {/**옵션 */}
        <TierAndMapSelect
          option={option}
          onChangeTier={onChangeTier}
          onChangeMap={onChangeMap}
        />
        {/**테이블 */}

        <div className="rounded-md overflow-hidden">
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

          <table className="w-full mt-4 rounded-md text-sm md:text-base text-gray-800 dark:text-white bg-white dark:bg-gray-800">
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
import { useLanguageContext } from '@/context/LanguageContext';
import { localeText } from '@/locales/localeText';
export async function getStaticProps() {
  // const S3Service = require('/src/services/S3Service');
  const ExcelService = require('/src/services/ExcelService');
  const GameStatisticsService = require('/src/services/GameStatisticsService');

  //로컬 개발환경에서 사용하는 코드
  const filePath = './public/slgg_sheet_2023_11121119.xlsx';
  const buffer = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.AWS_BUCKET!,
    Key: process.env.AWS_FILE_KEY!,
  };

  // const s3Service = new S3Service();

  const excelService = new ExcelService();
  const gameStatisticsService = new GameStatisticsService();

  // const xlsxFile = await s3Service.getObject(params);
  // const fileBuffer = xlsxFile.Body;
  // const data = excelService.readExcelFile(fileBuffer);

  //로컬 개발환경에서 사용하는 코드
  const data = excelService.readExcelFile(buffer);

  const smasherData = gameStatisticsService.analyzeData(data);
  gameStatisticsService.calculateRates(smasherData);

  return {
    props: {
      smasherData,
    },
  };
}

export default MyPage;

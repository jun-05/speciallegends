import CharacterStat from '@/components/CharacterStat';
import { SmasherData } from '@/services/GameStatisticsService';
import { useState } from 'react';

const params = {
  Bucket: process.env.AWS_BUCKET!,
  Key: process.env.AWS_FILE_KEY!,
};

const MyPage = ({ smasherData }: { smasherData: SmasherData }) => {
  const [option, setOption] = useState({});

  return (
    <>
      <div className="w-full flex">
        <div>
          <div>master</div>
          <div>diamond</div>
        </div>
      </div>
      <div className="mt-10"></div>
    </>
  );
};

export async function getStaticProps() {
  const S3Service = require('/src/services/S3Service');
  const ExcelService = require('/src/services/ExcelService');
  const GameStatisticsService = require('/src/services/GameStatisticsService');

  const s3Service = new S3Service();
  const excelService = new ExcelService();
  const gameStatisticsService = new GameStatisticsService();

  const xlsxFile = await s3Service.getObject(params);
  const fileBuffer = xlsxFile.Body;
  const data = excelService.readExcelFile(fileBuffer);
  const smasherData = gameStatisticsService.analyzeData(data);

  return {
    props: {
      smasherData,
    },
  };
}

export default MyPage;

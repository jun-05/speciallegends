const S3Service = require('/src/services/S3Service');
const ExcelService = require('/src/services/ExcelService');

const params = {
  Bucket: process.env.AWS_BUCKET!,
  Key: process.env.AWS_FILE_KEY!,
};

const MyPage = ({ data }: { data: [] }) => {
  console.log(data);
  return (
    <div className="h-full w-screen">
      <p className="h-full w-screen">{JSON.stringify(data)}</p>
    </div>
  );
};

export async function getStaticProps() {
  const s3Service = new S3Service();
  const excelService = new ExcelService();

  const xlsxFile = await s3Service.getObject(params);
  const fileBuffer = xlsxFile.Body;

  const data = excelService.readExcelFile(fileBuffer);

  return {
    props: {
      data,
    },
  };
}

export default MyPage;

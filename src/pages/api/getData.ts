const S3Service = require('/src/services/S3Service');
const ExcelService = require('/src/services/ExcelService');

const params = {
    Bucket: process.env.AWS_BUCKET!,
    Key: process.env.AWS_FILE_KEY!,
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_req, res) => {

    const s3Service = new S3Service();
    const excelService = new ExcelService();

    try {
      const xlsxFile = await s3Service.getObject(params)
      const fileBuffer = xlsxFile.Body;

      const data = excelService.readExcelFile(fileBuffer);

      res.status(200).json({ data: data });
    } catch (err :any) {
      res.status(500).json({ error: err.message });
    }
  };
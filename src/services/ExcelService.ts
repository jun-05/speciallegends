import * as xlsx from 'xlsx';

class ExcelService {
  public readExcelFile(file: Buffer): any[] {
    const workbook = xlsx.read(file, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    return jsonData;
  }
}

module.exports =  ExcelService;
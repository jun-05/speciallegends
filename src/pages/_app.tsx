import { AppProps } from 'next/app';
import '../styles/globals.css';
const xlsx = require('xlsx');

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/getData');

  const workbook = xlsx.readFile('파일경로.xlsx');
  const sheetName = workbook.SheetNames[0]; // 첫 번째 시트 이름을 가져옵니다.
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

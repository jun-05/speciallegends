import { GetServerSidePropsContext } from 'next';

const MyPage = () => {
  return (
    <div className="p-4 pt-8 md:pt-12 flex justify-center items-center text-gray-800 dark:text-white ">
      <div>loading..</div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const language = req.headers['accept-language'] || 'ko';

  if (language.startsWith('ko')) {
    return {
      redirect: {
        destination: '/ko',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/en',
        permanent: false,
      },
    };
  }
}

export default MyPage;

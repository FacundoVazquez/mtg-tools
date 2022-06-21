import { NextPage } from 'next';
import Head from 'next/head';
import { getTitle } from '../../utils/pages/title.util';

const pageName = 'Dashboard';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitle(pageName)}</title>
      </Head>
    </>
  );
};

export default Dashboard;

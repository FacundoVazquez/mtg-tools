import { NextPage } from 'next';
import Head from 'next/head';
import { getTitle } from '../../utils/pages/title.util';

const pageName = 'About';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitle(pageName)}</title>
      </Head>
    </>
  );
};

export default About;

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Home, PlayCard, User } from 'tabler-icons-react';
import Layout from '../components/app/layout/layout';
import { Page } from '../components/app/navbar/navbar.type';
import '../styles/globals.scss';

export const appName = 'MTG Tools';

const pages: Page[] = [
  { key: 'dashboard', title: 'Dashboard', url: '/', icon: <Home /> },
  { key: 'draft', title: 'Draft', url: '/draft', icon: <PlayCard /> },
  { key: 'about', title: 'About', url: '/about', icon: <User /> },
];

const App = ({ Component, pageProps }: AppProps) => {
  const defaultValue = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'theme',
    defaultValue,
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  //#region Hotkeys

  useHotkeys([['mod+Q', () => toggleColorScheme()]]);

  //#endregion

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="magic-tools" content="Magic tools" />
        <meta name="og:title" content={appName} />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <Layout pages={pages}>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;

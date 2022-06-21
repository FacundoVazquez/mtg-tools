import { AppShell, Burger, createStyles, Group, Header } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AppNavbar from '../navbar/navbar';
import ThemeToggle from '../theme-toggle/theme-toggle';
import { Page } from '../navbar/navbar.type';

interface Props {
  pages: Page[];
  children: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    top: '5px !important',
  },
}));

const Layout: React.FC<Props> = ({ pages, children }) => {
  const [opened, setOpened] = useState(true);
  const { classes } = useStyles();

  const handleNavbarToggle = () => {
    setOpened(!opened);
  };

  return (
    <>
      <AppShell
        padding="md"
        fixed
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        header={
          <Header height={64} px="xl" className={classes.header}>
            <Group>
              <Burger opened={false} onClick={handleNavbarToggle} />
              <Link href="/">
                <a>
                  <Image src="/mtg-logo.webp" height={'50'} width={'180'} className={classes.image} />
                </a>
              </Link>
            </Group>
            <ThemeToggle />
          </Header>
        }
        navbar={<AppNavbar pages={pages} opened={opened} />}
        navbarOffsetBreakpoint="sm"
      >
        {children}
      </AppShell>
    </>
  );
};

export default Layout;

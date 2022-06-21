import { Button, ButtonVariant, Center, createStyles, Divider, Navbar, ScrollArea, Text } from '@mantine/core';
import getConfig from 'next/config';
import Link from 'next/link';
import React from 'react';
import { Page } from './navbar.type';
import { useRouter } from 'next/router';

interface Props {
  pages: Page[];
  opened: boolean;
}

const { publicRuntimeConfig } = getConfig();
const version = publicRuntimeConfig?.version;

const useStyles = createStyles<any, any>((theme, params, getRef) => ({
  button: {
    height: 40,
    ['& .mantine-Button-inner']: {
      justifyContent: params.opened ? 'left' : 'center',
      ['& .mantine-Button-leftIcon']: {
        marginRight: params.opened ? 10 : 0,
        width: params.opened ? 'auto' : '100%',
      },
    },
  },
  buttonText: {
    paddingLeft: params.opened ? 10 : 0,
  },
}));

const AppNavbar: React.FC<Props> = ({ pages, opened }) => {
  const router = useRouter();
  const { classes } = useStyles({ opened });

  const isCurrentPage = (url: string): boolean => url === router.pathname;

  return (
    <Navbar hidden={true} hiddenBreakpoint="sm" p="xs" width={{ base: opened ? 180 : 84 }}>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {pages.map((page) => (
          <Link key={page.key} href={page.url}>
            <Button
              fullWidth
              className={classes.button}
              variant={isCurrentPage(page.url) ? 'filled' : 'subtle'}
              leftIcon={page.icon}
            >
              <span>{opened && page.title}</span>
            </Button>
          </Link>
        ))}
      </Navbar.Section>

      <Navbar.Section>
        <Divider my="sm" />
        <Center>
          <Text color="blue">{`v${version}`}</Text>
        </Center>
      </Navbar.Section>
    </Navbar>
  );
};

export default AppNavbar;

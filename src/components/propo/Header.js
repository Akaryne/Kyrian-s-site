import { Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

function Header({ stepScroll }) {
  const theme = useTheme();

  const backgroundColor =
    stepScroll === '0'
      ? theme.palette.primary.main
      : stepScroll === '1'
      ? theme.palette.complementary.main
      : stepScroll === '2'
      ? theme.palette.analogous.main
      : theme.palette.triadic.main;

  const backgroundColorButton =
    stepScroll === '0'
      ? theme.palette.primary.light
      : stepScroll === '1'
      ? theme.palette.complementary.light
      : stepScroll === '2'
      ? theme.palette.analogous.light
      : theme.palette.triadic.light;

  const hoverBackgroundColor =
    stepScroll === '0'
      ? theme.palette.primary.dark
      : stepScroll === '1'
      ? theme.palette.complementary.dark
      : stepScroll === '2'
      ? theme.palette.analogous.dark
      : theme.palette.triadic.dark;

  return (
    <Container
      style={{
        maxWidth: '100vw',
        height: '5vh',
        position: 'fixed',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        zIndex: 2,
      }}
      sx={{
        background: backgroundColor,
      }}
    >
      <Button sx={{ height: '90%', ml: 1, mr: 1,background:backgroundColorButton, '&:hover': { backgroundColor: hoverBackgroundColor } }}>
        about
      </Button>
      <Button sx={{ height: '90%', ml: 1, mr: 1,background:backgroundColorButton, '&:hover': { backgroundColor: hoverBackgroundColor } }}>
        work
      </Button>
      <Button sx={{ height: '90%', ml: 1, mr: 1,background:backgroundColorButton, '&:hover': { backgroundColor: hoverBackgroundColor } }}>
        contact
      </Button>
    </Container>
  );
}

export default Header;
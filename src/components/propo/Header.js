import { Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

function Header({ stepScroll, handleScrollIntoSection }) {
  const theme = useTheme();

  const backgroundColor =
    stepScroll === '0'
      ? theme.palette.primary.main
      : stepScroll === '1'
      ? theme.palette.primary.main
      : stepScroll === '2'
      ? theme.palette.complementary.main
      : theme.palette.triadic.main;

  const backgroundColorButton =
    stepScroll === '0'
      ? theme.palette.primary.light
      : stepScroll === '1'
      ? theme.palette.primary.light
      : stepScroll === '2'
      ? theme.palette.complementary.light
      : theme.palette.triadic.light;

  const hoverBackgroundColor =
    stepScroll === '0'
      ? theme.palette.primary.dark
      : stepScroll === '1'
      ? theme.palette.primary.dark
      : stepScroll === '2'
      ? theme.palette.complementary.dark
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
      <Button sx={{ height: '90%', ml: 1, mr: 1,background:backgroundColorButton, '&:hover': { backgroundColor: hoverBackgroundColor } }}
      onClick={()=>{handleScrollIntoSection(1)}}
      >
        about
      </Button>
      <Button sx={{ height: '90%', ml: 1, mr: 1,background:backgroundColorButton, '&:hover': { backgroundColor: hoverBackgroundColor } }}
      onClick={()=>{handleScrollIntoSection(2)}}
      >
        work
      </Button>
      <Button sx={{ height: '90%', ml: 1, mr: 1,background:backgroundColorButton, '&:hover': { backgroundColor: hoverBackgroundColor } }}
      onClick={()=>{handleScrollIntoSection(3)}}
      >
        contact
      </Button>
    </Container>
  );
}

export default Header;
import { Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

function Header({ handleScrollIntoSection }) {
  const theme = useTheme();

  const backgroundColor = theme.palette.primary.main

  const backgroundColorButton = theme.palette.primary.light

  const hoverBackgroundColor = theme.palette.primary.dark

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
import React,{useState, useEffect, useRef} from "react";
import Header from "./Header";
import About from "./About";
import Work from "./Work";
import Contact from "./Contact";
import Acceuil from "./Acceuil"



import { Box, Container } from "@mui/material";
import { motion, useScroll, useTransform,useInView } from "framer-motion";

import { Typography, createTheme, ThemeProvider} from '@mui/material';
import { styled } from '@mui/material/styles';

import '@fontsource/roboto/700.css';

const theme = createTheme({
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    palette: {
      primary: {
        main: '#26b682', // Vert (vous pouvez ajuster la couleur)
        light: '#8dd3b4',
        dark: '#007749',
      },
      complementary:{
         main:'#b62658',
         light:'#e7648f',
         dark:'#7b1c4a',
      },
      analogous:{
          main:'#26b63b',
          light:'#73cc79',
          dark:'#00831a',
      },
      triadic:{
         main:'#2658b6',
         light:'#718bcb',
         dark:'#003c94',
      },
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              color: '#ffffff', // Texte en blanc
              boxShadow:'#00000036 2px 2px 5px',
              backgroundColor: "#8dd3b4", // Couleur secondaire pour le background
              '&:hover': {
                backgroundColor: '#007749', // Couleur secondaire plus claire au survol
              },
            },
          },
        },
      },
  });

function Propos() {

    const [stepScroll, setStepScroll] = useState(0)

    const aboutSectionRef = useRef(null);
    const workSectionRef = useRef(null);
    const contactSectionRef = useRef(null);

    const handleScrollIntoSection = (section) =>{
        if(section===1){
            aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }if(section===2){
            workSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }if(section===3){
            contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(()=>{
        console.log('Actuellement au niveau ',stepScroll)
    },[stepScroll])
  

  return (
    <ThemeProvider theme={theme}>
    <Container style={{ maxWidth: "100vw", padding: 0, margin: 0, overflowX: "hidden", overflowY:'scroll',height:"100vh",scrollSnapType:"y mandatory" }}>

        <Header stepScroll={stepScroll} handleScrollIntoSection={handleScrollIntoSection}/>

      <motion.div style={{height:"100vh", scrollSnapAlign:"center",paddingTop:'5vh'}}>
        <Acceuil setStepScroll={setStepScroll}/>
      </motion.div>

      <motion.div ref={aboutSectionRef} style={{height:"100vh", scrollSnapAlign:"center",paddingTop:'5vh'}}>
        <About setStepScroll={setStepScroll}/>
      </motion.div>

      <motion.div ref={workSectionRef} style={{height:"100vh", scrollSnapAlign:"center",paddingTop:'5vh'}}>
        <Work setStepScroll={setStepScroll}/>
      </motion.div>

      <motion.div ref={contactSectionRef} style={{height:"100vh", scrollSnapAlign:"center",paddingTop:'5vh'}}>
        <Contact setStepScroll={setStepScroll}/>
      </motion.div>


    </Container>
    </ThemeProvider>
  );
}

export default Propos;
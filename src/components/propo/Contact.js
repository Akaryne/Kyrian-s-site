import React,{ useRef, useEffect } from 'react'
import { motion,useInView, useScroll, useTransform } from "framer-motion";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Card, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const NameText = styled('span')(({ theme }) => ({
    color: theme.palette.triadic.main,
  }));


function Contact({setStepScroll}){
    const theme = useTheme(); // Récupérer le thème actuel


    const ref = useRef(null)
    const inView = useInView(ref);

    // Appeler setStepScroll avec la valeur true lorsque le composant est visible
    useEffect(() => {
      if (inView) {
        setStepScroll('3');
        console.log('TRUE')
      }
    }, [inView]);


    return(
        <motion.div ref={ref} 

        style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Card elevation={3} sx={{width:"50vw", height:"fit-Content", p:2}}>
            <Typography variant="h2"><motion.div 

            ><NameText>Get in Touch</NameText></motion.div></Typography>

            Thank you for taking the time to explore my portfolio. If you'd like to connect, collaborate, or simply have a chat about web development and technology, I'd be delighted to hear from you. Feel free to reach out through the following channels:

            <motion.div style={{display:'flex',flexDirection:'column',margin:32, width:"fitContent"}}>
                <motion.div whileHover={{x:50}}><Typography variant="h5" sx={{color:theme.palette.triadic.dark}}><EmailIcon fontSize="large" sx={{color:theme.palette.triadic.light, mr:2}}/>kyrian.penillon@email.com</Typography></motion.div>
                <motion.div whileHover={{x:50}}><Typography variant="h5" sx={{color:theme.palette.triadic.dark}}><LinkedInIcon fontSize="large" sx={{color:theme.palette.triadic.light, mr:2}}/>linkedin.com/in/kyrianpenillon</Typography></motion.div>    
                <motion.div whileHover={{x:50}}><Typography variant="h5" sx={{color:theme.palette.triadic.dark}}><GitHubIcon fontSize="large" sx={{color:theme.palette.triadic.light, mr:2}}/>github.com/kyrianpenillon</Typography></motion.div>
            </motion.div>

            Looking forward to connecting with you and exploring the endless possibilities of the digital realm together!
            </Card>
        </motion.div>
    )
}export default Contact
import React,{useEffect,useRef} from 'react'

import { motion, useInView } from "framer-motion";
import { Card, Paper, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Créer un thème personnalisé


const NameText = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
  }));


function Acceuil({setStepScroll}){
    const theme = useTheme(); // Récupérer le thème actuel

    const ref = useRef(null)
    const inView = useInView(ref);

    // Appeler setStepScroll avec la valeur true lorsque le composant est visible
    useEffect(() => {
      if (inView) {
        setStepScroll('0');
      }
    }, [inView]);

    return(
        <motion.div ref={ref} 
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 2 }}
        animate={{ y: 0, opacity: 1 }}

        style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <motion.div whileHover={{scale:1.1}}>
            <Card elevation={3} sx={{width:"30vw", height:"20vh", p:2}}>
                <Typography variant="h3">
                    Greetings! I'm <NameText>Kyrian Penillon,</NameText> 
                    <Typography variant="body1">
                    currently pursuing my engineering studies.<br />
                    My fascination with the art of web development has led me to explore the vast realm of full-stack development.<br />
                    I find joy in crafting seamless user experiences and turning innovative concepts into functional code. Beyond coding,<br /> 
                    I'm an avid learner and an enthusiastic problem solver, always seeking new challenges to conquer.
                    </Typography>
                </Typography>
            </Card>
            </motion.div>


        </motion.div>
    )
}export default Acceuil
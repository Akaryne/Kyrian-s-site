import React,{useEffect,useRef} from 'react'

import { motion, useInView } from "framer-motion";
import { Typography } from '@mui/material';
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
        <motion.div ref={ref}>
            <Typography variant="h3">
                Greetings! I'm <NameText>Kyrian Penillon,</NameText> 
                <Typography variant="body1">
                currently pursuing my engineering studies.<br />
                My fascination with the art of web development has led me to explore the vast realm of full-stack development.<br />
                I find joy in crafting seamless user experiences and turning innovative concepts into functional code. Beyond coding,<br /> 
                I'm an avid learner and an enthusiastic problem solver, always seeking new challenges to conquer.
                </Typography>
            </Typography>
        </motion.div>
    )
}export default Acceuil
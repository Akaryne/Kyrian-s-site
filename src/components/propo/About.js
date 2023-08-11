import React,{ useRef, useEffect } from 'react'
import { motion,useInView, useScroll, useTransform } from "framer-motion";
import { Card, Typography } from '@mui/material';

function About({setStepScroll}){

    const ref = useRef(null)
    const inView = useInView(ref);

    // Appeler setStepScroll avec la valeur true lorsque le composant est visible
    useEffect(() => {
      if (inView) {
        setStepScroll('1');
      }
    }, [inView]);
    
    return(
        <motion.div ref={ref}
        style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>

            <Card elevation={3} sx={{width:"30vw", height:"fitContent", p:2}}>
            <Typography variant="body1">
            About Me
            Greetings! I'm Kyrian Penillon, currently pursuing my engineering studies. My fascination with the art of web development has led me to explore the vast realm of full-stack development. I find joy in crafting seamless user experiences and turning innovative concepts into functional code. Beyond coding, I'm an avid learner and an enthusiastic problem solver, always seeking new challenges to conquer.
            </Typography>
            </Card>
            
        </motion.div>
    )
}export default About
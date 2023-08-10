import React,{ useRef, useEffect } from 'react'
import { motion,useInView, useScroll, useTransform } from "framer-motion";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


function Contact({setStepScroll}){

    const ref = useRef(null)
    const inView = useInView(ref);

    // Appeler setStepScroll avec la valeur true lorsque le composant est visible
    useEffect(() => {
      if (inView) {
        setStepScroll('3');
      }
    }, [inView]);


    return(
        <motion.div ref={ref}>
            Get in Touch

            Thank you for taking the time to explore my portfolio. If you'd like to connect, collaborate, or simply have a chat about web development and technology, I'd be delighted to hear from you. Feel free to reach out through the following channels:

            <EmailIcon/>: kyrian.penillon@email.com
            <LinkedInIcon/>: linkedin.com/in/kyrianpenillon
            <GitHubIcon/>: github.com/kyrianpenillon

            Looking forward to connecting with you and exploring the endless possibilities of the digital realm together!
        </motion.div>
    )
}export default Contact
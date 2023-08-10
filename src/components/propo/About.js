import React,{ useRef, useEffect } from 'react'
import { motion,useInView, useScroll, useTransform } from "framer-motion";

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
        <motion.div ref={ref}>

            About Me
            Greetings! I'm Kyrian Penillon, currently pursuing my engineering studies. My fascination with the art of web development has led me to explore the vast realm of full-stack development. I find joy in crafting seamless user experiences and turning innovative concepts into functional code. Beyond coding, I'm an avid learner and an enthusiastic problem solver, always seeking new challenges to conquer.

        </motion.div>
    )
}export default About
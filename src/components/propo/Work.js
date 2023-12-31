import React,{ useRef, useEffect, useState } from 'react'
import { motion, useScroll,useInView, useTransform } from "framer-motion";
import { Card, Paper, Typography } from '@mui/material';


function Work({setStepScroll}){

    const ref = useRef(null)
    const inView = useInView(ref);

    // Appeler setStepScroll avec la valeur true lorsque le composant est visible
    useEffect(() => {
      if (inView) {
        setStepScroll('2');
      }
    }, [inView]);
    
    return(

        <motion.div 
        ref={ref}
        whileInView={{ x: 0, opacity: 1 }}
        initial={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 1 }}
        style={{height:"100%"}}>

            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around",alignItems:"center", height:"100%"}}>
                <Card style={{height:"fitContent",width:"40vw"}}>
                    <Typography>
                        Portfolio Highlights
                        Here are some of my proudest creations that showcase my skills and dedication to the world of full-stack development. Each project represents a blend of creativity and technical expertise that I bring to the table.
                        Feel free to explore these projects in detail and witness my dedication to crafting innovative digital solutions.
                    </Typography>
                </Card>
                <Card style={{height:"fitContent",width:"40vw"}}>
                    <Typography>
                        1. Project Name: E-Commerce Bliss
                        Description: Developed a responsive e-commerce platform from scratch, incorporating intuitive user interfaces and secure payment gateways. Technologies used: HTML, CSS, JavaScript, Node.js, MongoDB.
                    </Typography>
                </Card>
            </div>
        </motion.div>

    )
}export default Work
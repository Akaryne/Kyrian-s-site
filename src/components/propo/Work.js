import React,{ useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from "framer-motion";
import { Paper, Typography } from '@mui/material';


function Work(){

    
    return(
        <motion.div 
        whileInView={{ x: 0, opacity: 1 }}
        initial={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 2 }}
        animate={{ x: 0, opacity: 1 }}
        style={{height:"100%"}}>

            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around",alignItems:"center", height:"100%"}}>
                <Paper style={{height:"90vh",width:"40vw"}}>
                    <Typography>Work</Typography>
                </Paper>
                <Paper style={{height:"90vh",width:"40vw"}}>
                    <Typography>There are different project I have done as a student</Typography>
                </Paper>
            </div>
        </motion.div>
    )
}export default Work
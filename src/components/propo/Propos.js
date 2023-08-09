import React, { useRef } from "react";
import { Box, Container } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

function Propos() {
  const refAbout = useRef(null);

  const { scrollYProgress } = useScroll({
    target: refAbout,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], ["-10%", "10%"]);



  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["#f00", "#00f"]
  );

  return (
    <Container style={{ maxWidth: "100vw", padding: 0, margin: 0, overflowX: "hidden" }}>

      <motion.div style={{x:300,y:300, position:"fixed"}}>
        <Box sx={{width:"100px", height:"100px", background:"yellow"}}></Box>
      </motion.div>

      <motion.div>
        <div ref={refAbout} style={{height: "100vh"}}>
          Nothing to say
        </div>
      </motion.div>

      
    

      <motion.div
        
        style={{
          backgroundColor: backgroundColor,
          height: "100vh",
          opacity:opacity,
        }}
      >
        <motion.div
          style={{
            zIndex:2,
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            x: x, // Corrected usage of x transformation
          }}
        >
          <p style={{color:'black'}}>Nothing to say</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
        </motion.div>
      </motion.div>

      <div
        style={{
          height: "100vh",
          background:'green'
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            
          }}
        >
          <p style={{color:'black'}}>Nothing to say</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
          <p style={{color:'black'}}>AGAIN</p>
        </div>
      </div>


    </Container>
  );
}

export default Propos;
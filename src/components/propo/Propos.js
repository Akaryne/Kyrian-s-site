import React from "react";
import Header from "./Header";
import About from "./About";
import Work from "./Work";
import Contact from "./Contact";

import { Box, Container } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

function Propos() {

  

  return (
    <Container style={{ maxWidth: "100vw", padding: 0, margin: 0, overflowX: "hidden", overflowY:'scroll',height:"100vh",scrollSnapType:"y mandatory" }}>

      <Container style={{maxWidth: "100vw",padding: 0, margin: 0,position:"fixed",height:"5vh"}}>
        <Header/>
      </Container>


      <motion.div style={{height:"100vh", scrollSnapAlign:"center", background:"red"}}>
        <About/>
      </motion.div>

      <motion.div style={{height:"100vh", scrollSnapAlign:"center", background:"yellow"}}>
        <Work/>
      </motion.div>

      <motion.div style={{height:"100vh", scrollSnapAlign:"center", background:"green"}}>
        <Contact/>
      </motion.div>


    </Container>
  );
}

export default Propos;
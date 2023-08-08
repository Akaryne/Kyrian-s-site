import React from "react"
import { Container } from "@mui/material"
import {motion, AnimatePresence} from "framer-motion"


function Propos(){

    const list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

    return(
        <Container style={{maxWidth:"100%",padding:0,margin:0}}>
            <AnimatePresence>
            {list.map((elem)=>(
                <motion.div key={elem} style={{display:'flex',justifyContent:'center'}}
                initial={{ opacity: 0, x:-100 }}
                whileInView={{ opacity: 1, x:0 }}
                transition={{ duration: 0.7}}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0, x:100 }}
                ><motion.div whileHover={{scale:1.2}} style={{padding:32}}>test</motion.div></motion.div>
            ))}
            
            </AnimatePresence>
        </Container>
    )
}export default Propos
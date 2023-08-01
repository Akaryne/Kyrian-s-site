import React, {useState, useEffect} from "react";
import './Home.css'

import AppBar from './AppBar'
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Slide from '@mui/material/Slide';
import { Block } from "@mui/icons-material";


function Home() {
    const [animateIndex, setAnimateIndex] = useState([]);
    const [counter, setCounter] = useState(0);
    
  
    const jeuxData = [
      { title: 'Memory', link: '/memory', className: 'jeux1',image : 'memory.png' ,animate: true },
      { title: 'Démineurs', link: '/demineur', className: 'jeux2',image : 'demineur.png' ,animate: false },
      { title: 'Coming soon...', link: '/game3', className: 'jeux3',image : null ,animate: false },
      { title: 'Coming soon...', link: '/game4', className: 'jeux4',image : null  ,animate: false },
    ];


    


  
    useEffect(() => {
      const timer = setTimeout(() => {
        setCounter(counter + 1);
      }, 300);
  
      return () => clearTimeout(timer);
    }, [animateIndex]);
  
    useEffect(() => {
      if (counter < jeuxData.length) {
        const updatedAnimateIndex = [...animateIndex];
        updatedAnimateIndex[counter] = true;
        setAnimateIndex(updatedAnimateIndex);
      }
    }, [counter]);
  
    return (
      <Container style={{ maxWidth: '100%', height: '100%', padding: '0', margin: '0', background: 'linear-gradient(45deg, rgba(255,79,131,0.6502890173410405) 8%, rgba(253,68,29,0.12138728323699421) 45%, rgba(252,69,69,0.5982658959537572) 100%)' }}>
        <AppBar />
        <Container style={{
          height: '90%',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className="grid-container">
            {jeuxData.map((jeu, index) => (
              <Slide
                key={index}
                in={animateIndex[index]}
                direction="up"
                mountOnEnter
                unmountOnExit
                timeout={1000}
              >
                <div className={`${jeu.className} box`}>
                  <h3>{jeu.title}</h3>
                  <Link to={jeu.link} className="link">
                    <div className="illutration">
                    <img src={`/asset/image/${jeu.image}`} alt={`${jeu.title}`} 
                    style={{
                      width: '100%',
                      objectFit:'contain' }}
                    />
                    </div>
                  </Link>
                </div>
              </Slide>
            ))}
          </div>
        </Container>
      </Container>
    );
  }

  export default Home;
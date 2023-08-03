import React,{useEffect} from 'react';
import Game from './components/memory/Game';
import Home from './components/Home';
import Demineur from './components/demineur/Demineur'

import ReactGA from 'react-ga';

// Initialize Google Analytics with your tracking ID


import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'

ReactGA.initialize('G-J06PTETP08');


const App = () => {

  useEffect(() => {
    // Track the page view when the component mounts
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/memory" element={<Game />} />
          <Route path="/demineur" element={<Demineur />} />
        </Routes>
      </BrowserRouter>


  );
};

export default App;

import React,{useEffect, useContext} from 'react';
import Game from './components/memory/Game';
import Home from './components/Home';
import Demineur from './components/demineur/Demineur'
import Propos from './components/propo/Propos'
import { UserContext } from "./utils/UserContext";

import ReactGA from 'react-ga';

// Initialize Google Analytics with your tracking ID


import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'

ReactGA.initialize('G-J06PTETP08');


const App = () => {
  const {setUser} = useContext(UserContext)

  useEffect(() => {
    // Effectuez la requête Fetch vers la route '/'
    fetch('https://game-zone-f7b9ede0718d.herokuapp.com/', {
      method: 'GET',
      credentials: 'include', // Inclure les cookies pour l'authentification
    })
      .then((response) => {
        if (!response.ok) {
          // Si la requête a échoué (status 4xx ou 5xx), on lance une erreur
          setUser(null)
          throw new Error('Erreur lors de la requête POST');
        }
        return response.json(); // Renvoie les données de la réponse au format JSON
      })
      .then((data) => {
        // Mettez à jour l'état de l'utilisateur en fonction de la réponse du serveur
        setUser(data)
        console.log(data)
      })
      .catch((error) => {
        console.error('Erreur lors de la requête Fetch :', error);
      });
  }, []);


  console.log('TEST RENDER')
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
          <Route path="/propos" element={<Propos />} />
        </Routes>
      </BrowserRouter>


  );
};

export default App;

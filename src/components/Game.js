import React, { useEffect, useState } from 'react';
import Board from './Board';
import { generateCards } from '../utils/cardsGenerator';

import './game.css'

function Game(){
  const [score, setScore] = useState(0);
  const [cout, setCout] = useState(0);
  const [cardsData, setCardsData] = useState(generateCards());

  const handleScoreChange = () => {
    setScore(score + 2);
  };

  const handleCout = () => {
    setCout(cout + 1);
  };

  useEffect(() => {
    if (score % 16 === 0 && score !== 0) {
      setTimeout(() => {
        setCardsData(generateCards());
      }, 1000);
      
    }
  }, [score]);


  return (
    <div className="game">
        <div className='head'>
            <h2>Memory Game</h2>
            <p>Score : {score}</p>
            <p>Mouvements : {cout}</p>
        </div>
        <div className='container'>
            <Board cardsData={cardsData} handleScoreChange={handleScoreChange} handleCout={handleCout} />
        </div>
    </div>
  );
};

export default Game;
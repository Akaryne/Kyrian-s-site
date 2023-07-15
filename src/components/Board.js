import React, { useState, useEffect } from 'react';
import Card from './Card';

import './board.css'

function Board({ cardsData , handleScoreChange, handleCout}){

    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);


  useEffect(() => {
    setCards(cardsData);
  }, [cardsData]);

  const handleOnClick = (id) => {
    if(flippedCards.length===2 || flippedCards.length>2){
    }else{
        setFlippedCards([...flippedCards,...[id]])
        const card1 = cards.find((card) => card.id === id);
        card1.flipped = true
    }
  }

  useEffect(() => {
    console.log(flippedCards);
    if (flippedCards.length === 2) {
      const card1 = cards.find((card) => card.id === flippedCards[0]);
      const card2 = cards.find((card) => card.id === flippedCards[1]);
      handleCout()
      if (card1 && card2 && card1.pairId === card2.pairId) {
        card1.flipped = true
        card2.flipped = true
        handleScoreChange()
        setMatchedCards([...matchedCards,...[card1],...[card2]])
        setFlippedCards([]);

      }else{  
        setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;
            
            setFlippedCards([]);
          }, 1000);
      }
    }

  }, [flippedCards, cards]);



  return (
    <div className="board">
      {cards.map((card) => (
        <Card key={card.id} cardData={card} handleCardClick={handleOnClick} />
      ))}
    </div>
  );
};

export default Board;
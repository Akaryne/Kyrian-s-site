import React from 'react';
import './card.css'



function Card({ cardData, handleCardClick }){


const handleClick = () => {
    console.log(cardData.id)
    handleCardClick(cardData.id)
}

  return (
    <div className={`card ${cardData.flipped ? 'rotated' : ''}`} onClick={handleClick}>
        {cardData.flipped ? 
        <div className='cards-show'>
            {cardData.pairId}
        </div>
        :
        <div className='cards_hide'>
             ?
        </div>
        }
    </div>
  );
};

export default Card;
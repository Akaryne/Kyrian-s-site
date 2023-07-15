// utils/cardsGenerator.js

export const generateCards = () => {
  const cardPairs = [
    { pairId: 1 },
    { pairId: 1 },
    { pairId: 2 },
    { pairId: 2 },
    { pairId: 3 },
    { pairId: 3 },
    { pairId: 4 },
    { pairId: 4 },
    { pairId: 5 },
    { pairId: 5 },
    { pairId: 6 },
    { pairId: 6 },
    { pairId: 7 },
    { pairId: 7 },
    { pairId: 8 },
    { pairId: 8 },
    // Ajoutez d'autres paires de cartes avec leurs pairIds
  ];

  const shuffledPairs = shuffleArray(cardPairs);

  let id = 1;
  const cardsData = shuffledPairs.map((cardPair) => ({
    id: id++,
    pairId: cardPair.pairId,
    flipped: false,
  }));

  return cardsData;
}

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
import React, { useState, useEffect, useMemo } from "react";
import Case from './Case'
import './boardDemineur.css'

import { Navigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


function Game({selected, setGameStarted, setSuccesGame, setLeaderBoardOpen, setTimer, timer}){
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [matrix, setMatrix] = useState([]);
  

  const generateRandomCoordinates = () => {
    const x = Math.floor(Math.random() * 12); // Génère un nombre aléatoire entre 0 et 11
    const y = Math.floor(Math.random() * 8); // Génère un nombre aléatoire entre 0 et 7
    return { x, y };
  };

  



  useEffect(() => {
    const newMatrix = Array.from({ length: 12 }, (_, rowIndex) =>
      Array.from({ length: 8 }, (_, colIndex) => ({
        index: colIndex + rowIndex * 8,
        coord: {x:rowIndex,y:colIndex},
        hidden: true,
        value: 0,
        bomb: false,
        drapeau: false,
      }))
    );
    for (let i = 0; i < 12; i++) {
      const { x, y } = generateRandomCoordinates();
      newMatrix[x][y].bomb = true;
    }
    setMatrix(newMatrix);
  }, []);


  const handleRestart = () => {
    const newMatrix = Array.from({ length: 12 }, (_, rowIndex) =>
      Array.from({ length: 8 }, (_, colIndex) => ({
        index: colIndex + rowIndex * 8,
        coord: {x:rowIndex,y:colIndex},
        hidden: true,
        value: 0,
        bomb: false,
        drapeau: false,
      }))
    );
    for (let i = 0; i < 12; i++) {
      const { x, y } = generateRandomCoordinates();
      newMatrix[x][y].bomb = true;
    }
    setMatrix(newMatrix);
    setGameOver(false);
    setGameWin(false)
    setSuccesGame(false)
    setGameStarted(false)
    setTimer(0)
  };

  const handleQuit = () => {
    // Logique pour quitter la partie ou l'application
    setGameStarted(false)
    setSuccesGame(false)
    setRedirectToHome(true)
    setTimer(0)
  };
  
  const handleClickEvent = (caseData, drapeau=false) => {
    setGameStarted(p => p = true)
    if(!selected && !drapeau){
      if (caseData.bomb===true){
        setGameOver(true)
      }
      calculArroundBomb()
      discoverZone(caseData)
      let count = 0
      for(let i = 0; i<matrix.length;i++){
        for(let j = 0; j<matrix[i].length ; j++){
          if(matrix[i][j].hidden){
            count++
          }
        }
      }
      console.log(count)
      if (count===12){
        setGameWin(true)
        setSuccesGame(true)
        setGameStarted(false)
      }
    }else{
    console.log('DRAPEAU');
    const newMatrix = matrix.map((row) =>
      row.map((cell) =>
        cell.coord.x === caseData.coord.x && cell.coord.y === caseData.coord.y && (cell.value===0 || cell.hidden)
          ? { ...cell, drapeau: true }
          : cell
      )
    );
    setMatrix(newMatrix);
    console.log(newMatrix);
    }
  }


  const discoverZone = (data) => {
    const x = data.coord.x;
    const y = data.coord.y;
  
    const recursiveSearch = (x, y) => {
      if (x >= 0 && x < 12 && y >= 0 && y < 8) {
       
        const currentCase = matrix[x][y];
        console.log(currentCase)
        if (currentCase.hidden && (currentCase.value===0)) {
          // Marquer la case comme découverte
          currentCase.hidden = false;
  
          // Vérifier les cases adjacentes
          const adjacentCases = [
            { x: x + 1, y: y },
            { x: x - 1, y: y },
            { x: x, y: y - 1 },
            { x: x, y: y + 1 },
            { x: x + 1, y: y+1 },
            { x: x - 1, y: y-1 },
            { x: x+1, y: y - 1 },
            { x: x-1, y: y + 1 },
          ];
  
          for (const adjCase of adjacentCases) {
            const { x: adjX, y: adjY } = adjCase;
            console.log(x,y,matrix[x][y])
            recursiveSearch(adjX, adjY);
          }
        }else{
          currentCase.hidden = false;
        }
      }
    };
  
    // Démarrer la recherche récursive à partir de la case cliquée
    recursiveSearch(x, y);
  };



  const calculArroundBomb = () =>{
    matrix.map((row)=>row.map((colum)=>{colum.value=0}))
    const temp = matrix.map((row,indexRow)=>row.map((colum,indexColum)=>{
      if (colum.bomb === true) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Ne pas traiter la case courante
            const newRow = indexRow + i;
            const newCol = indexColum + j;
            if (matrix[newRow]?.[newCol]) {
              matrix[newRow][newCol].value += 1;
            }
          }
        }
      }
      return colum
    }
    ))
    setMatrix(temp)
  }

  return useMemo(()=>{return(
  <div className="board-demineur">
    {matrix.map((row)=>row.map((colum)=>
      (<Case key={colum.index} data={colum} handleClickEvent={handleClickEvent} selected={selected} />)
    ))}
    <GameOverDialog open={gameOver} onRestart={handleRestart} onQuit={handleQuit} setGameStarted={setGameStarted}/>
    <GameWinDialog open={gameWin} onRestart={handleRestart} onQuit={handleQuit} setLeaderBoardOpen={setLeaderBoardOpen}/>
    
    {redirectToHome && (
      <Navigate to="/" replace={true} />
    )}
  </div>
  )},[matrix,selected,gameOver,gameWin,redirectToHome]
)}export default Game





const GameOverDialog = ({ open, onRestart, onQuit, setGameStarted }) => {
  return (
    <Dialog open={open} onClose={onQuit}>
      <DialogTitle style={{color:'red'}}>Vous avez perdu !</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Voulez-vous recommencer ou quitter le jeu ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRestart} style={{
          color: 'white',
          background: '#ca0000',
          fontSize: '16px',
          height:'100%'
        }}>
          Recommencer
        </Button>
        <Button onClick={onQuit} style={{
          color: 'white',
          background: '#ca0000',
          fontSize: '16px',
          height:'100%'
        }}>
          Quitter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const GameWinDialog = ({ open, onRestart, onQuit, setLeaderBoardOpen}) => {
  return (
    <Dialog open={open} onClose={onQuit}>
      <DialogTitle style={{color:'green'}}>Vous avez gagné !</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Voulez-vous recommencer ou quitter le jeu ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setLeaderBoardOpen(true)} style={{
          color: 'white',
          background: 'rgb(82, 202, 0)',
          fontSize: '16px',
          height:'100%'
        }}>
          Score
        </Button>
        <Button onClick={onRestart} style={{
          color: 'white',
          background: 'rgb(82, 202, 0)',
          fontSize: '16px',
          height:'100%'
        }}>
          Recommencer
        </Button>
        <Button onClick={onQuit} style={{
          color: 'white',
          background: '#ca0000',
          fontSize: '16px',
          height:'100%'
        }}>
          Quitter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

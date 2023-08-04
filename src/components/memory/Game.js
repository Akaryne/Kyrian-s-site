import React, { useEffect, useState } from 'react';
import Board from './Board';
import AppBar from '../AppBar';
import { generateCards } from '../../utils/cardsGenerator';

import './game.css'
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Table, TableBody, TableCell, TableHead, TableRow,Dialog, DialogTitle,DialogContent,DialogContentText,DialogActions,Button,Paper,TableContainer, TextField } from '@mui/material';


function Game(){
  const [score, setScore] = useState(0);
  const [cout, setCout] = useState(0);
  const [cardsData, setCardsData] = useState(generateCards());
  const [leaderBoardOpen, setLeaderBoardOpen] = useState(false);
  const [minMouvement,setMinMouvement] = useState(999)
  const [succesGame,setSuccesGame] = useState(false)



  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://game-zone-f7b9ede0718d.herokuapp.com/data');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleQuit = () => {
    setLeaderBoardOpen(false)
  }

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
        setCout(0)
        setSuccesGame(true)
        setMinMouvement( p => cout < p ? cout : p)
      }, 1000);
      
    }else{
      setSuccesGame(false)
    }
  }, [score]);




  return (
    <div className="game">
        <AppBar/>
        <Slide
                in={true}
                direction="up"
                mountOnEnter
                unmountOnExit
                timeout={1000}
        >
          <div className='head'>
              <h1 className='un'>MEMORY</h1>
              <p className='deux'>SCORE : {score}</p>
              <p className='trois'>MOUVEMENT : {minMouvement === 999 ? cout : minMouvement}</p>
          </div>
        </Slide>  
        <Slide
                in={true}
                direction="up"
                mountOnEnter
                unmountOnExit
                timeout={1000}
        >
          <div className='container'>
              <Board cardsData={cardsData} handleScoreChange={handleScoreChange} handleCout={handleCout} />
          </div>
        </Slide>
        <Fab aria-label="add" 
        variant="extended" size='Large'
        onClick={()=>setLeaderBoardOpen(!leaderBoardOpen)}
        style={{ 
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          color:'white',
          background:'#C03737'
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 40}}/>
        </Fab>
        <LeaderBoard open={leaderBoardOpen} onQuit={handleQuit} data={data} fetchData={fetchData} succesGame={succesGame} setSuccesGame={setSuccesGame} minMouvement={minMouvement} />
    </div>
    

  );
};

export default Game;

const LeaderBoard = ({ open, onQuit,data,fetchData,minMouvement, succesGame,setSuccesGame }) => {
  const [name, setName] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construire l'objet de données à envoyer dans la requête POST
    const dataToSend = {
      game: 'memory',
      mouvement: minMouvement,
      time: 0,
      name: name,
    };

    if(succesGame){
      setSuccesGame(false)
    // Effectuer la requête POST vers l'endpoint /add
    fetch('https://game-zone-f7b9ede0718d.herokuapp.com/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dataToSend)
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData()
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST :', error);
        // Gérer les erreurs éventuelles ici
      });
    }
  };

  const dataFiltered = data.filter((elem) => elem.game === "memory");
  dataFiltered.sort((a, b) => a.mouvement - b.mouvement);

  return (
    <Dialog open={open} onClose={onQuit}>
      <DialogTitle style={{
        color: '#7b0000',
        textShadow: '#0000004d 3px 3px 3px',
        fontFamily: 'Inter',
        fontSize: '50px',
        fonStyle: 'normal',
        fontWeight: '600',
        letterSpacing:' 4px',
    }}>Tableau des scores</DialogTitle>
      <DialogContent>

        <Paper elevation={3}>
          <TableContainer sx={{ maxHeight: '40vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{textAlign: 'center',fontWeight: '600',background:'rgb(255, 212, 191)'}}>
                    Place
                  </TableCell>
                  <TableCell style={{textAlign: 'center',fontWeight: '600',background:'rgb(255, 212, 191)'}}>
                    Mouvement
                  </TableCell>
                  <TableCell style={{textAlign: 'center',fontWeight: '600',background:'rgb(255, 212, 191)'}}>
                    Pseudo
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFiltered.map((elem,index)=>{
                  return(
                  <TableRow key ={elem.id}>
                    <TableCell style={{
                      textAlign:'center',
                      backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#C0C0C0' : index === 2 ? '#DCA570' : ''}}>{index+1}</TableCell>
                    <TableCell style={{
                      textAlign:'center',
                      backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#C0C0C0' : index === 2 ? '#DCA570' : ''}}>{elem.mouvement}</TableCell>
                    <TableCell style={{
                      textAlign:'center',
                      backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#C0C0C0' : index === 2 ? '#DCA570' : ''}}>{elem.name}</TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
            </TableContainer>
          </Paper>

      </DialogContent>
      <DialogActions style={{justifyContent:'space-around'}}>
        <TextField
          required
          id="outlined-required"
          label="Name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleSubmit} style={{
          color: 'white',
          background: 'rgb(82, 202, 0)',
          fontSize: '16px',
          height:'100%'
        }}>
          Envoyer
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
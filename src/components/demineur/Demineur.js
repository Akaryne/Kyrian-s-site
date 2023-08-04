import React, { useMemo, useState,useEffect } from "react"
import AppBar from "../AppBar"
import Game from './Game'
import './demineur.css'


import Slide from '@mui/material/Slide';
import FlagIcon from '@mui/icons-material/Flag';
import ToggleButton from '@mui/material/ToggleButton';
import Fab from '@mui/material/Fab';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { Table, TableBody, TableCell, TableHead, TableRow,Dialog, DialogTitle,DialogContent,DialogContentText,DialogActions,Button,Paper,TableContainer, Typography,TextField } from '@mui/material';


function Demineur(){

    const [selected, setSelected] = useState(false)
    const [leaderBoardOpen, setLeaderBoardOpen] = useState(false);
    const [data, setData] = useState([]);
    const [timer, setTimer] = useState(0)
    const [gameStarted, setGameStarted] = useState(false)
    const [tempJeu,setTempJeu] = useState(999)
    const [succesGame, setSuccesGame] = useState(false)

    useEffect(()=>{
      let interval
      if(gameStarted){
        interval = setInterval(()=>{
          setTimer((p)=>p+1)
        },1000)
      }
  
      return ()=> clearInterval(interval)
  
    },[gameStarted])


    useEffect(()=>{
      console.log(gameStarted)
    },[gameStarted])

    useEffect(()=>{
      if(succesGame){
        setGameStarted(false)
        setTempJeu(timer)
      }
    },[succesGame])



    useEffect(() => {
        fetchData();
    }, []);

    useEffect(()=>{
        console.log(data)
    },[data])

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


    return useMemo(()=>{

    return(
        <div className="demineur">

            <AppBar/>

            <Slide
                in={true}
                direction="up"
                mountOnEnter
                unmountOnExit
                timeout={1000}
            >
                <div className='head-demineur'>
                    <ToggleButton
                        style={{color: selected ? 'green' : 'red',
                        background: selected ? '#00800026' : '#ff000012',
                        borderColor: selected ? '#00800050' : '#ff000050',
                        width: '50%' }}
                        value="check"
                        selected={selected}
                        onChange={() => {
                            setSelected(!selected);
                        }}
                        >
                        <FlagIcon  />
                    </ToggleButton>
                    <Typography style={{display:'flex', justifyContent:'center',alignItems:'center',width:'50%',color:'black'}}>Temps : {timer}</Typography>
                </div>
            </Slide>  

            <Slide
                in={true}
                direction="up"
                mountOnEnter
                unmountOnExit
                timeout={1000}
            >
                <div className='container-demineur'>
                    <Game selected={selected} setGameStarted={setGameStarted} setSuccesGame={setSuccesGame} setLeaderBoardOpen={setLeaderBoardOpen} setTimer={setTimer} tempJeu={tempJeu}/>
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
            <LeaderBoard open={leaderBoardOpen} onQuit={handleQuit} data={data} fetchData={fetchData} succesGame={succesGame} setSuccesGame={setSuccesGame} tempJeu={tempJeu}/>
        </div>
    )},[selected,data,leaderBoardOpen,timer,gameStarted])
}export default Demineur

const LeaderBoard = ({ open, onQuit,data,succesGame,setSuccesGame,tempJeu,fetchData }) => {
    const [name, setName] = useState('');

    console.log(tempJeu)
    
    
    const handleSubmit = (e) => {
      e.preventDefault();
  // Construire l'objet de données à envoyer dans la requête POST
      const dataToSend = {
        game: 'demineur',
        mouvement: 0,
        time: tempJeu,
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
        body: JSON.stringify(dataToSend),
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

    const dataFiltered = data.filter((elem) => elem.game === "demineur");
    dataFiltered.sort((a, b) => a.time - b.time);

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
                      Temps
                    </TableCell>
                    <TableCell style={{textAlign: 'center',fontWeight: '600',background:'rgb(255, 212, 191)'}}>
                      Pseudo
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFiltered.map((elem,index)=>(
                    <TableRow key ={elem.id}>
                      <TableCell style={{
                      textAlign:'center',
                      backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#C0C0C0' : index === 2 ? '#DCA570' : ''}}>{index+1}</TableCell>
                      <TableCell style={{
                      textAlign:'center',
                      backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#C0C0C0' : index === 2 ? '#DCA570' : ''}}>{elem.time}</TableCell>
                      <TableCell style={{
                      textAlign:'center',
                      backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#C0C0C0' : index === 2 ? '#DCA570' : ''}}>{elem.name}</TableCell>
                    </TableRow>
                  ))}
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

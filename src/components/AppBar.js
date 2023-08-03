import React,{useState} from "react";
import { Navigate } from 'react-router-dom';
import './AppBar.css'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import { Button, Icon, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper,TableContainer, Typography,TextField } from "@mui/material";






function AppBar() {

    const [anchorElInformation, setAnchorElInformation] = useState(null);
    const [redirectToHome, setRedirectToHome] = useState(false)
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [openSignInDialog, setOpenSignInDialog] = useState(false)
    const open = Boolean(anchorElInformation);

    const handleClickInformation = (event) => {
        setAnchorElInformation(event.currentTarget);
    };
    const handleCloseInformation = () => {
        setAnchorElInformation(null);
    };

    const handleLoginDialog = () => {
        setOpenLoginDialog(true)
    }

    const handleSignInDialog = () => {
        setOpenSignInDialog(true)
    }

    const fetchData = async () => {
      try {
        const response = await fetch('https://game-zone-f7b9ede0718d.herokuapp.com/logout');
        if (!response.ok) {
          throw new Error('Erreur logout');
        }
        const jsonData = await response.json();
        console.log(jsonData)
      } catch (error) {
        console.error(error);
      }
    };

    return(
            <div className='container-header'>

                <div className='logo'>
                    <h2 onClick={()=>setRedirectToHome(true)} style={{cursor: 'pointer'}}>GAME ZONE</h2>
                </div>

                <div className='searchBar boxH'>
                    <input
                    placeholder="Search a game..."
                    >
                    </input>
                </div>
                
                <div className="profile boxH">
                    <Button className="profileI"><AccountCircleOutlinedIcon sx={{ fontSize: 40, color:'#ffe6e6'}}/></Button>

                    <Button className="profileI"><ChatOutlinedIcon sx={{ fontSize: 40, color:'#ffe6e6'}}/></Button>

                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickInformation}>
                        <DehazeOutlinedIcon sx={{ fontSize: 40, color:'#ffe6e6'}}/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElInformation}
                        open={open}
                        onClose={handleCloseInformation}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleCloseInformation}>Contact</MenuItem>
                        <MenuItem onClick={handleCloseInformation}>A propos</MenuItem>
                        <MenuItem onClick={handleLoginDialog}>Login</MenuItem>
                        <MenuItem onClick={handleSignInDialog}>Sign in</MenuItem>
                        <MenuItem onClick={()=>fetchData()}>logout</MenuItem>
                    </Menu>
                </div>
               
                <LoginDialog open={openLoginDialog} onQuit={()=>setOpenLoginDialog(false)}></LoginDialog>
                <SignInDialog open={openSignInDialog} onQuit={()=>setOpenSignInDialog(false)}></SignInDialog>
                
                {redirectToHome && (
                    <Navigate to="/" replace={true} />
                )}
            </div>
    )
}export default AppBar

const LoginDialog = ({ open, onQuit }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)

    
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Construire l'objet de données à envoyer dans la requête POST
      const dataToSend = {
        login: login,
        password: password,
      };
  

      // Effectuer la requête POST vers l'endpoint /add
      fetch('https://game-zone-f7b9ede0718d.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            // Si la requête a échoué (status 4xx ou 5xx), on lance une erreur
            throw new Error('Erreur lors de la requête POST');
          }
          return response.json(); // Renvoie les données de la réponse au format JSON
        })
        .then((data) => {
          // Traiter les données de la réponse ici si nécessaire
          setError(false);
          onQuit();
        })
        .catch((error) => {
          console.error('Erreur lors de la requête POST :', error);
          setError(true);
          // Gérer les erreurs éventuelles ici
        });
    };
  
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
      }}>Login</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{p:2}}>
            <Paper elevation={3}>
              <TextField sx = {{m:2}}
                  required
                  id="outlined-required"
                  label="Pseudo"
                  placeholder="Pseudo"
                  onChange={(e) => setLogin(e.target.value)}
              />
              <TextField sx = {{m:2}}
                  required
                  id="outlined-required"
                  label="Password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
              />
            </Paper>
            {error ? <Typography sx={{
                textAlign: 'center',
                color: 'brown',
                mt: 1,}}>Error login or password incorrect</Typography> : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'space-around'}}>
          
          <Button onClick={handleSubmit} style={{
            color: 'white',
            background: 'rgb(82, 202, 0)',
            fontSize: '16px',
            height:'100%'
          }}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const SignInDialog = ({ open, onQuit }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Construire l'objet de données à envoyer dans la requête POST
      const dataToSend = {
        login: login,
        password: password,
      };
  

      // Effectuer la requête POST vers l'endpoint /add
      fetch('https://game-zone-f7b9ede0718d.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            // Si la requête a échoué (status 4xx ou 5xx), on lance une erreur
            throw new Error('Erreur lors de la requête POST');
          }
          return response.json(); // Renvoie les données de la réponse au format JSON
        })
        .then((data) => {
          // Traiter les données de la réponse ici si nécessaire
          setError(false);
          onQuit();
        })
        .catch((error) => {
          console.error('Utilisateur', error);
          setError(true);
          // Gérer les erreurs éventuelles ici
        });

    };
  
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
      }}>Sign in</DialogTitle>
        <DialogContent >
          <DialogContentText sx={{p:2}}>
            <Paper elevation={3}>
              <TextField sx = {{m:2}}
                  required
                  id="outlined-required"
                  label="Pseudo"
                  placeholder="pseudo"
                  onChange={(e) => setLogin(e.target.value)}
              />
              <TextField sx = {{m:2}}
                  required
                  id="outlined-required"
                  label="Password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
              />
            </Paper>
            {error ? <Typography sx={{
                textAlign: 'center',
                color: 'brown',
                mt: 1,}}>Pseudo are already used</Typography> : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'space-around'}}>
          
          <Button onClick={handleSubmit} style={{
            color: 'white',
            background: 'rgb(82, 202, 0)',
            fontSize: '16px',
            height:'100%'
          }}>
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
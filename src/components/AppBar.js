import React,{useState} from "react";
import { Navigate } from 'react-router-dom';
import './AppBar.css'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import { Button, Icon, Menu, MenuItem } from "@mui/material";





function AppBar() {

    const [anchorElInformation, setAnchorElInformation] = useState(null);
    const [redirectToHome, setRedirectToHome] = useState(false)
    const open = Boolean(anchorElInformation);

    const handleClickInformation = (event) => {
        setAnchorElInformation(event.currentTarget);
    };
    const handleCloseInformation = () => {
        setAnchorElInformation(null);
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
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleCloseInformation}>Contact</MenuItem>
                        <MenuItem onClick={handleCloseInformation}>A propos</MenuItem>
                    </Menu>
                </div>
                {redirectToHome && (
                    <Navigate to="/" replace={true} />
                )}
            </div>
    )
}export default AppBar
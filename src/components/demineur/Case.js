import React from "react";

import FlagIcon from '@mui/icons-material/Flag';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './case.css'

function Case({data, handleClickEvent, selected}){

    const handleClick = () =>{
        handleClickEvent(data)
    }


    return(
        <div    className="case" 
                onClick={handleClick}
                onContextMenu={(e) => {e.preventDefault()
                handleClickEvent(data,true)}}>
            {!data.hidden ? 
                <div className='case-show'>
                    {data.drapeau && data.hidden ?
                     <FlagIcon /> :
                      <p className="caseNumber">{data.bomb ?
                        <Brightness7Icon/> : 
                        data.value === 0 ?
                            null :
                            data.value}</p>}
                </div>
                :
                <div className='case-hide'>
                    {data.drapeau ? <FlagIcon /> : null}
                </div>
            }
        </div>

    )
}export default Case
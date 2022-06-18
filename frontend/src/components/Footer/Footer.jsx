import React from 'react'
import './Footer.css'
// import {Favorite} from "@mui/icons-material"
import {Favorite} from '@material-ui/icons';

const Footer = () => {
  return (
    <div className='footer'>
        <p>Made By <span>Harshil</span> with</p>
        <Favorite style={{ color: "red" }} />
    </div>
  )
}

export default Footer
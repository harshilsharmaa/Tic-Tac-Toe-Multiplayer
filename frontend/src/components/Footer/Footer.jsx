import React from 'react'
import './Footer.css'
// import {Favorite} from "@mui/icons-material"
import {Favorite} from '@material-ui/icons';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="upper">
        <p>Made with </p> <Favorite style={{ color: "red" , width:"20px"}} /> <p>by <a href="https://www.linkedin.com/in/harshilsharmaa" rel="noopener noreferrer" target="_blank">Harshil |</a> </p> 
      <div className="social">
        <a href="https://www.linkedin.com/in/harshilsharmaa/" rel="noopener noreferrer" target="_blank">LinkedIn</a>
        <a href="https://harshilsharma.tech" rel="noopener noreferrer" target="_blank">Portfolio</a>
      </div>
      </div>
    </div>
  )
}

export default Footer
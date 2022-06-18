import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h2>Page Not Found</h2>
        <p>Sorry, but the page you were trying to view does not exist.</p>
        <Link  to={`/`}> <button className='room-btn'>Home</button> </Link>
    </div>
  )
}

export default NotFound
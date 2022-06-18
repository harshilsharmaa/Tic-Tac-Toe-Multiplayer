import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo'
import './Home.css'
import {useDispatch} from 'react-redux'
import {addUser} from '../../Actions'
import {nanoid} from 'nanoid';


const Home = () => {
  
  const userId = nanoid(5);

  const [userName, setUserName] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError]  = useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    if(userName===''){
      setError('Please enter your name')
      setTimeout(() => {
        setError('');
      },4000)
      return;
    }

    dispatch(addUser(userName, userId));

    setShow(true);
  }


  return (
    <div className='home'>
      <h2>Welcome to tic tac toe</h2>
      <Logo />

      {error.length>0 ? <p className='error'>{error}</p>:null}

      {
        !show ? <>
        <input value={userName} onChange={(e)=>setUserName(e.target.value)} className='name-input' type="text" placeholder='Enter your name'/>
        <button className='room-btn' onClick={handleClick}>Let's Go</button>
        </>:null
      }

      {
        show &&
        <div className="show">

        <div className="room-btns">
          <Link  to="/createRoom">
            <button className='room-btn'>Invite Friend</button>
          </Link>
          <Link  to="/joinRoom">
            <button className='room-btn'>Join Room</button>
          </Link>
        </div>
        </div>
      }


    </div>
  )
}

export default Home
import './App.css';
import React from 'react';
import Home from './components/Home/Home';
import CreateRoom from './components/CreateRoom/CreateRoom';
import JoinRoom from './components/JoinRoom/JoinRoom';
import Game from './components/Game/Game';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Banner from './components/Banner/Banner';

const socket = io.connect('https://zerokataserver.onrender.com');
// const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER_URL);

function App() {

  // const {user} = useSelector(state => state.user)

  return (
    <div className="App">
      <header className="App-header">
        <Banner/>

    <Router>
      <Routes>
      <Route path='/' element={<Home />}></Route>
        <Route path='/createRoom' element={<CreateRoom socket={socket}/>}></Route>
        <Route path='/joinRoom' element={<JoinRoom socket={socket}/>}></Route>
        <Route path='/game/:roomId' element={<Game socket={socket}/>}></Route>
        <Route path='*' element={<NotFound />}></Route>
        
      </Routes>
      <Footer/>
    </Router>


      </header>
    </div>
  );
}

export default App;

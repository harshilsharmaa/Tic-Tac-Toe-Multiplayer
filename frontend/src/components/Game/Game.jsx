import React,{useEffect,useState} from 'react'
import { useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './Game.css'

const moves = [{move:-1,myMove:false}, {move:-1,myMove:false}, {move:-1,myMove:false}, {move:-1,myMove:false}, {move:-1,myMove:false}, {move:-1,myMove:false}, {move:-1,myMove:false}, {move:-1,myMove:false} ,{move:-1,myMove:false},{move:-1,myMove:false}];


const Game = ({socket}) => {


  useEffect(()=>{

    window.onbeforeunload = function() { 
      window.setTimeout(function () { 
        window.location = '/';
        socket.emit('removeRoom', {roomId});
      }, 0); 
      window.onbeforeunload = null; 
    }

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
    });

  })

  const params = useParams();

  const {user} = useSelector(state => state.user)

  const [roomId, setRoomId] = useState('');

  const [loading, setLoading] = useState(true);

  const [loadingValue, setLoadingValue] = useState("waiting for another player...");

  const [userJoined, setUserJoined] = useState(false);

  const [userTurn, setUserTurn] = useState(false);

  const [oponentName, setOponentName] = useState('');

  const [move, setMove] = useState();

  const [allMoves, setAllMoves] = useState([]);

  const [winner, setWinner] = useState("");
  const [winnerId, setWinnerId] = useState("");

  const [winPattern, setWinPattern] = useState([]);

  const [gameEnd, setGameEnd] = useState(false);

  const [leaveRoom, setLeaveRoom] = useState(false);

  const [myScore, setMyScore] = useState(0);
  const [oponentScore, setOponentScore] = useState(0);

  useEffect(() => {

    if(!user){
      window.location = '/';
    }

    socket.emit('usersEntered', {roomId: params.roomId, userId:user.userId})

    socket.off('usersEntered').on('usersEntered', (data) => {
      if(data.user1.userId !== user.userId){
        setOponentName(data.user1.username)
      }
      else{
        setOponentName(data.user2.username)
      }
      setLoading(false);
      // console.log(data);
    })

  },[socket, user, params.roomId])
  
  useEffect(() => {
    setRoomId(params.roomId);
    // console.log(params.roomId);

  },[params.roomId]);

  const handleMoveClick = (m) => {

    if(loading && !userJoined){
      return;
    }

    socket.emit('move', {move:m, roomId, userId:user.userId});

    moves[m].move = 1;
    moves[m].myMove = true;

    setUserTurn(true);
  }

  const handlePlayAgain = () => {
    socket.emit('reMatch', {roomId});
  }

  useEffect(()=>{
    socket.on('move', (payload)=>{
      // console.log(payload);
      setMove({move:payload.move, myMove:payload.userId===user.userId});
      setAllMoves([...allMoves, move]);

      moves[payload.move].move = 1;
      moves[payload.move].myMove = payload.userId===user.userId;

      if(payload.userId!==user.userId){
        setUserTurn(false);
      }

    })

    socket.on('win', (payload)=>{
      // console.log("WINNER WINNER WINNER!!! ",payload);
      setWinPattern(payload.pattern);
      setGameEnd(true);
      if(payload.userId===user.userId){
        setWinner('You won!');
        setMyScore(myScore+1);
      }
      else{
        setWinner(`You lost!, ${payload.username} won!`);
        setOponentScore(oponentScore+1);
      }

      setWinnerId(payload.userId);
      setUserTurn(false);
    })

    socket.on('draw', (payload)=>{
      // console.log("DRAW DRAW DRAW!!! ",payload);
      setWinner('Draw !');
      setGameEnd(true);
      setUserTurn(false);
      setLoadingValue('')
    })

  })



  useEffect(()=>{
    socket.on('reMatch', ({currGameDetail}) => {
      moves.forEach((m)=>{
        m.move=-1;
        m.myMove=false;
      })
      setWinner('');

      setUserTurn(user.userId!==winnerId);
      setGameEnd(false);
      
    })

    socket.on('removeRoom', (payload) => {
      // console.log("removeRoom",payload);
      setUserJoined(false);
      setLeaveRoom(true);
    })
  })
  

  useEffect(()=>{

    socket.on('userLeave', (payload) => {
      console.log("userLeave",payload);
      setLoadingValue('');
      setLoadingValue(`${oponentName} left the game`);
      setLoading(true);
      setUserJoined(false);
    })
  })


  const handleClose = ()=>{
    socket.emit('removeRoom', {roomId});
    return true;
  }


  return (
    <div className='game'>
      <h2>Tic Tac Toe</h2>
      <p>Room ID: {roomId}</p>
      <div className="score">
        <p>You: {myScore}</p>
        <p>{oponentName}: {oponentScore}</p>
      </div>
      {
        winner && winner!=='Draw !' && winner.length>0 ? <div className="winner">
          <h3>{winner}</h3>
          <div className={` line p${winPattern} `}></div>
          </div> : null
      }

      <div className="grid-container">

        <div onClick={moves[1].move===-1&&!winner?()=>handleMoveClick(1):null} className={moves[1].move===-1?`grid-item-hover grid-item bottom right`: `grid-item bottom right`}>{moves[1].move!==-1?moves[1].myMove?'0':'X':null}</div>

        <div onClick={moves[2].move===-1&&!winner?()=>handleMoveClick(2):null} className={moves[2].move===-1?`grid-item-hover grid-item bottom right`:'grid-item bottom right'}>{moves[2].move!==-1?moves[2].myMove?'0':'X':null}</div>

        <div onClick={moves[3].move===-1&&!winner?()=>handleMoveClick(3):null} className={moves[3].move===-1?`grid-item-hover grid-item bottom`:` grid-item bottom`}>{moves[3].move!==-1?moves[3].myMove?'0':'X':null}</div>  

        <div onClick={moves[4].move===-1&&!winner?()=>handleMoveClick(4):null} className={moves[4].move===-1?`grid-item-hover grid-item bottom right`:`grid-item bottom right`}>{moves[4].move!==-1?moves[4].myMove?'0':'X':null}</div>

        <div onClick={moves[5].move===-1&&!winner?()=>handleMoveClick(5):null} className={moves[5].move===-1?`grid-item-hover grid-item bottom right`:`grid-item bottom right`}>{moves[5].move!==-1?moves[5].myMove?'0':'X':null}</div>

        <div onClick={moves[6].move===-1&&!winner?()=>handleMoveClick(6):null} className={moves[6].move===-1?`grid-item-hover grid-item bottom`:`grid-item bottom`}>{moves[6].move!==-1?moves[6].myMove?'0':'X':null}</div>  

        <div onClick={moves[7].move===-1&&!winner?()=>handleMoveClick(7):null} className={moves[7].move===-1?`grid-item-hover grid-item right`:`grid-item right`}>{moves[7].move!==-1?moves[7].myMove?'0':'X':null}</div>

        <div onClick={moves[8].move===-1&&!winner?()=>handleMoveClick(8):null} className={moves[8].move===-1?`grid-item-hover grid-item right`:`grid-item right`}>{moves[8].move!==-1?moves[8].myMove?'0':'X':null}</div>

        <div onClick={moves[9].move===-1&&!winner?()=>handleMoveClick(9):null} className={moves[9].move===-1?`grid-item-hover grid-item`:`grid-item`}>{moves[9].move!==-1?moves[9].myMove?'0':'X':null}</div>  
      </div>

      {
        loading ? <div className="loading">{loadingValue}</div>:null
      }
      

      {
        userTurn ? <div className="loading">{`Wiating for oponent's response`}</div>:null
      }

      {
        gameEnd?<div className="game-end">
          {!leaveRoom?<button onClick={handlePlayAgain} className='room-btn'>Play Again</button>:null}
         
         <form onSubmit={handleClose} action="/">
          <button  className='room-btn'>Close</button>
         </form>
        </div>:null
      }
      
    </div>
  )
}

export default Game
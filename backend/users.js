const users = [];
const gameDetail = [];
// gameDetail = [room, player1:{id, username, moves = [], winCount:0}, player2:{id, username, moves= [], wincount:0}]


function addUser(socketId, roomId) {
  users.push({socketId, roomId});
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}


function addRoom(room) {
  let isRoomExsist = game.find(item => item.room === room);
  // console.log("isRoomExsist: ", isRoomExsist);
  if(!isRoomExsist) {
    game.push({ 
      room,
      users:[],
      moves: {} 
    });
  }
}


function newGame (room, userId, username) {
  
  let isRoomExsist = gameDetail.find(item => item.room === room);
  if(!isRoomExsist) {
    let newGameDetail = [];
    newGameDetail = {room, user1:{userId , username, moves: [], winCount:0, inGame:false}, user2:{userId:0 , username:0, moves: [], winCount:0, inGame:false}};

    gameDetail.push(newGameDetail);
  }
  else{
    if(isRoomExsist.user2.userId === 0 && isRoomExsist.user1.userId != userId){
      isRoomExsist.user2.userId = userId;
      isRoomExsist.user2.username = username;
    }
    else{
      // console.log("Same user cannot add two times or 2 players are already in the room");
      return false;
    }
  }

  return true;
}

function getGameDetail(room) {
  return gameDetail.find(item => item.room === room)
}

function addMove(room, userId, move) {
  let gameDetail = getGameDetail(room);
  if(gameDetail.users[0]==socket.id){

  }
  gameDetail.moves.push(move);
}

const winPatterns = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

function CheckWin(room, userId) {
  let gameDetail = getGameDetail(room);

  let user;
  let curr_user_moves;
  let winCount;
  if(gameDetail.user1.userId==userId){
    user = 1;
    curr_user_moves = gameDetail.user1.moves;
  }
  else{
    user = 2;
    curr_user_moves = gameDetail.user2.moves;
  }

  let pattern;
  let isWin;
  for(let i=0; i<winPatterns.length; i++){
    let win_pattern = winPatterns[i];
    isWin = true;
    for(let j=0; j<win_pattern.length; j++){
      if(!curr_user_moves.includes(win_pattern[j])){
        isWin = false;
      }
    }
    if(isWin){
      pattern = i;
      if(user===1){
        gameDetail.user1.winCount = gameDetail.user1.winCount +1;
        winCount = gameDetail.user1.winCount;
      }
      else{
        gameDetail.user2.winCount = gameDetail.user2.winCount +1;
        winCount = gameDetail.user1.winCount;
      }
      break;
    }
  }

  // console.log("isWin: ", isWin);
  return {isWin,winCount, pattern};
}

function removeRoom(room) {
  let index = gameDetail.findIndex(item => item.room === room);
  if(index !== -1){
    return gameDetail.splice(index, 1)[0];
  }
}


function userLeft(socketId) {
  // console.log("userLeft: ", socketId);
  // console.log("users: ", users);
  if(!users.find(user=>user.socketId === socketId)){
    return;
  }
  let roomId = users.find(user => user.socketId === socketId).roomId;
  // console.log("roomId: ", roomId);
  let index = users.findIndex(user => user.socketId === socketId);
  if(index !== -1){
    users.splice(index, 1)[0];
  }
  removeRoom(roomId);
  return roomId;
}


module.exports = {
  getCurrentUser,
  userLeave,
  addRoom,
  getGameDetail,
  newGame,
  CheckWin,
  removeRoom,
  addUser,
  userLeft
};
import { Room, Player, Lobby, RoomManager } from './classes.js';

import { WebSocketServer } from 'ws'
import { v4 as uuidv4 } from 'uuid';

// Host a web socket server
const wss = new WebSocketServer({port: 8080}, ()=> {
  console.log('The server is connected at port 8080');
})

// Create a new room manager to manage creating the lobby/game
var roomManager = new RoomManager();

function attemptJoin(username, passcode, ws) {
    // Try to join a room with the passcode
    var room = roomManager.getRoomByPasscode(passcode);
    if(room != null) {
      // Perform sanity check for duplicate username

      var containsUsername = room.containsUsername(username);
      console.log("contains username: " + containsUsername);

      if(!containsUsername) {
        console.log("No duplicate username");
        var player = new Player(ws.id, username, ws);
        
        room.join(player);
        // ws.send(room.roomName);
      }
      else {
        ws.send("duplicate username");
      }
    
    }
    else {
        ws.send("Failed to join");
    }
}

function checkPhoto(passcode, username, width, height, photoData, ws) {
    // console.log(`${moveData.sender} tried to ${moveData.index} in ${moveData.roomID}`);
    var room = roomManager.getRoomByPasscode(passcode);
    room.game.checkPhoto(username, width, height, photoData, ws);
}

// When a user is connected
wss.on('connection', (ws)=> {
  console.log("Someone has joined!");
  // Assign a unique ID to the client socket
  ws.id = uuidv4();

  // Handle messages
  ws.onmessage = ({data, origin}) => {
    const msg = JSON.parse(data);
    console.log(msg);

    switch(msg.type) {
      // For attempting to join the room 
      case "attemptJoinRoom":
        var username = msg.data.username;
        var passcode = msg.data.roomPasscode;
        attemptJoin(username, passcode, ws);
        break;
      // Route to the correct room
      case "checkPhoto":
            var passcode = msg.data.roomPasscode;
            var player = msg.data.player;
            var width = msg.data.width;
            var height = msg.data.height;
            var photoData = msg.data.photoData;
        checkPhoto(passcode, player, width, height, photoData, ws);
        break;
        // for the manager
      case "createRoom":
          var roomName = msg.data.roomName;
          var mapID = msg.data.mapID;
          var numPlayers = msg.data.numPlayers;
          var timeLimit = msg.data.timeLimit;

          // Room Manager creates a room with this data
          var room = roomManager.createRoom(roomName, mapID, numPlayers, timeLimit,ws);

          var passcode = room.getPasscode();

          console.log(`Roomname: ${roomName}, Map ID: ${mapID}, Num Players: ${numPlayers}, Time Limit: ${timeLimit}`);

          // NEED TO RETURN ROOM PASSCODE BACK
          ws.send(passcode);
          break;
      case "startGame":
          var roomPasscode = msg.data.roomPasscode;
          var room = roomManager.getRoomByPasscode(roomPasscode);
          room.startGame();
          break;
    }
  }

  ws.onclose = function() {
    console.log(`Client ${ws.id}, aka ${ws.username} has disconnected!`);
  };
})

wss.on('listening', ()=> {
  console.log('server is listening on port 8080');
})


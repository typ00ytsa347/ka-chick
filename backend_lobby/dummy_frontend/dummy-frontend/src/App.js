import logo from './logo.svg';
import './App.css';
import {useState,useRef} from 'react';

function CreateLobby(props) {
  const {socket} = props;

  const [code, setCode] = useState("");

  const handleClick = () => {
    var lobbyName = lobbyNameRef.current.value;

    var mapID = lobbyNameRef.current.value;

    var numPlayers = numPlayersRef.current.value;

    var timeLimit = timeLimitRef.current.value;

    var jsonPayload = {
      type: "createRoom",
      data: {
        roomName: lobbyName,
        mapID: mapID,
        numPlayers: numPlayers,
        timeLimit: timeLimit,
      }
    }
   
   socket.send(JSON.stringify(jsonPayload));


    socket.onmessage = function(event) {
      alert(`[message] Data received from server: ${event.data}`);
      setCode(event.data);
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
      }
    };

    socket.onerror = function(error) {
      alert(`[error]`);
    };

  } 

  const lobbyNameRef = useRef(null);
  const mapIDRef = useRef(null);
  const numPlayersRef = useRef(null);
  const timeLimitRef = useRef(null);

  return (<div>
    <h1>Create Lobby</h1>
    <p>Test system for creating a lobby</p>
    <label for="lobbyname">Lobby Name:</label><br></br>
    <input value = "Yuewei's Lobby" ref={lobbyNameRef} type="text" id="lobbyname" name="lobbyname"/><br></br>

    <label for="mapID">Map ID:</label><br></br>
    <input value = "23" ref={mapIDRef} type="text" id="mapID" name="mapID"/><br></br>

    <label for="numPlayers">Number of players:</label><br></br>
    <input value = "5" ref = {numPlayersRef} type="text" id="numPlayers" name="numPlayers"/><br></br>

    <label for="timeLimit">Time limit:</label><br></br>
    <input value = "10" ref = {timeLimitRef} type="text" id="timeLimit" name="timeLimit"/><br></br>
    <p>Received Passcode: {code}</p>
    <button onClick = {handleClick}>Submit</button>

  </div>);
}

function JoinLobby(props) {
  const {socket, roomPasscodeRef} = props;
  const [roomName, setRoomName] = useState("");

  const handleClick = () => {

    var roomPasscode = roomPasscodeRef.current.value;
    var username = usernameRef.current.value;
    alert("The room passcode is " + roomPasscode);

    var jsonPayload = {
      type: "attemptJoinRoom",
      data: {
        username: username,
        roomPasscode: roomPasscode
      }
    }
    socket.send(JSON.stringify(jsonPayload));


    socket.onmessage = function(event) {
      setRoomName(event.data);
      // alert(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
      }


    }
  } 
  
  const usernameRef = useRef(null);


  return ( <div>
    <h1>Join Lobby</h1>
    <p>Test system for joining a lobby</p>

    <label for="roomPasscode">Room Passcode:</label><br></br>
    <input ref = {roomPasscodeRef} type="text" id="roomPasscode" name="roomPasscode"/><br></br>

    <label for="username">Username:</label><br></br>
    <input ref = {usernameRef} value = "Yuewei" type="text" id="username" name="username"/><br></br>

    <p>Result: {roomName}</p>
    <button onClick = {handleClick}>Submit</button>

  </div>);
}

function GameStarter(props) {

  const [gameStatus, setGameStatus] = useState("Not started");
  const handleClick = () => {
    if(roomPasscodeRef.current.value === "") {
      setGameStatus("Haven't joined a game yet!")
    }
    else {
        var jsonPayload = {
          type: "startGame",
          data: {
            roomPasscode: roomPasscodeRef.current.value,
          }
        }
        socket.send(JSON.stringify(jsonPayload));
      socket.onmessage = function(event) {
        // alert(`[message] Data received from server: ${event.data}`);
        setGameStatus(event.data);
      };
    }
  } 
  const {roomPasscodeRef, socket} = props;

  return ( <div>
    <h1>Start Game</h1>
    <p>Test system for starting a game when room joined</p>
    <p>Result: {gameStatus}</p>
    <button onClick = {handleClick}>Submit</button>

  </div>);
}

function GiveImage(props) {

    const imageData = [255, 0, 0, 255, 255, 255, 0, 255, 23, 255, 0, 255, 255, 255, 0, 255, 0, 0, 0, 255, 255, 255, 0, 255, 255, 255, 255, 255, 255, 255, 0, 255, 0, 35, 255, 255];
    const width = 3;
    const height = 3;
    const name = "Somename";

    const handleImage = () => {
        if (roomPasscodeRef.current.value === "") {
        }
        else {
            var jsonPayload = {
                type: "checkPhoto",
                data: {
                    roomPasscode: roomPasscodeRef.current.value,
                    player: name,
                    width: width,
                    height: height,
                    photoData: imageData,
                }
            }
            socket.send(JSON.stringify(jsonPayload));
            socket.onmessage = function (event) {
                // alert(`[message] Data received from server: ${event.data}`);
            };
        }
    }
    const { roomPasscodeRef, socket } = props;

    return (<div>
        <h1>Test Sending Set Pixel Data</h1>
        <button onClick={handleImage}>Send Image</button>

    </div>);
}

function App() {
    let socket = new WebSocket("ws://192.168.1.75:8080/");
  socket.onopen = function(e) {
    // alert("Connection established");
  };
  const roomPasscodeRef = useRef(null);
  return (
    <div className="App">
      <header className="App-header">
        <CreateLobby socket = {socket}></CreateLobby>
       
        <JoinLobby socket = {socket} roomPasscodeRef = {roomPasscodeRef}></JoinLobby>
       
              <GameStarter socket={socket} roomPasscodeRef={roomPasscodeRef}></GameStarter>

              <GiveImage socket={socket} roomPasscodeRef={roomPasscodeRef}></GiveImage>

      </header>
    </div>
  );
}

export default App;

import { useLocation, useNavigate, useParams } from "react-router-dom";
import ThemeButton, { colors } from "../../components/ThemeButton";
import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../context/WebSocketContextProvider";

export default function StartLobbyScreen() {

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation()
  const passCode = location.state.passCode

  const [ready, val, send] = useContext(WebsocketContext); 
  const [jsonPayload, setJsonPayload] = useState(null)
  const [users, setUsers] = useState([]);
  
    useEffect(() => {

    }, [ready, send,jsonPayload]);

    useEffect(() => {
      console.log(val);
      try {
        const msg = JSON.parse(val);
        setUsers(msg.data.users);
      } catch (error) {
        console.log(error);
      }
    },[val])
    
  function startGame(){
      var Payload = {
        type: "startGame",
        data: {
          roomPasscode: passCode,
        }
      }
      setJsonPayload(Payload)
      if (ready && Payload) {
        send(JSON.stringify(Payload));
      } 
    }

  function stopGame() {
    navigate("/");
  }

  return (
    <>
    <div style={{position: "absolute", display: "block", top: "40px", width: "100%"}}>
      <h2 >Lobby {id}</h2>
      <p> Lobby passcode is: {passCode}</p>
    </div>
    <h3>Players:</h3>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr",}}>
        {users.map((user, index) => <p key={index}>{user}</p>)}
      </div>

      
      {/* <p>Timer</p> */}
      <br></br>
      <ThemeButton color={colors.GREEN} onClick={startGame}>Start Game</ThemeButton>
      <br></br>
      <ThemeButton color={colors.RED} onClick={stopGame}>Stop Game</ThemeButton>
    </>
  );
}
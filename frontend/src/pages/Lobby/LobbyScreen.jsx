import { NavLink, useNavigate, useParams } from "react-router-dom";
import ABS_PATHS from "../routes";
import ThemeButton from "../../components/ThemeButton";
import NavigateAlertButton from "../../components/NavigateAlertButton";
import { useContext, useEffect, useRef, useState } from "react";
import { WebsocketContext } from "../../context/WebSocketContextProvider";

export default function LobbyScreen() {

  const { id, name } = useParams();
  const [ready, val, send,clearVal] = useContext(WebsocketContext); 
  const navigate = useNavigate();
  const [users,setUsers] = useState([]);
  const [roomName, setRoomName] = useState(null);
  const [mapId, setMapId] = useState(null);
    const objectives = useRef(null);
  
    useEffect(() => {
        const msg = JSON.parse(val)
        
        if(msg === "Game has started!"){
          console.log("Here");
          navigate(`../../game/${id}/${name}`,{state:{roomName:roomName,mapId:mapId, fetchedObjectives: objectives.current}});
        } 
        else if(msg.type === "roomJoined"){
            const data = msg.data;
            setRoomName(data.roomName);
            setUsers(data.users);
            setMapId(data.mapID);
    
            console.log(data.roomName);
            console.log(data.users);
            console.log(data.mapID);
            
          async function fetchData() {
            await getObjectivesFromMap(data.mapID, objectives);
          }
          fetchData();
        }
    }, [val]);


  function leaveGame() {

  }

  async function getObjectivesFromMap(id, ref) {
    let response = await fetch(`http://127.0.0.1:3000/objectives/map/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).catch(err => console.log(err));

    ref.current = await response.json();
  }

  return (
    <>
    <div style={{position: "absolute", display: "block", top: "40px", width: "100%"}}>
      {roomName ? <h2>Lobby {roomName}</h2> : <h2>Loading Lobby</h2>}
      <p>Waiting for game to start...</p>
    </div>
    <h3>Players:</h3>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr",}}>
        {users.map((user, index) => <p key={index}>{user}</p>)}
      </div>
      
      <br></br>
      {/* <NavLink to={`/game/${id}`} state={{test:"here"}}
      >Start Game</NavLink> */}
      <NavigateAlertButton>Leave Game</NavigateAlertButton>
    </>
  );
}
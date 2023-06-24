import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import { GameContext } from "../../context/GameContextProvider";
import ABS_PATHS from "../routes";
import { useContext, useEffect, useState } from "react";
import ThemeButton from "../../components/ThemeButton";
import { WebsocketContext } from "../../context/WebSocketContextProvider";

export default function MainGameScreen() {
  const { objectives, setObjectives} = useContext(GameContext);
  const navigate = useNavigate();
  const { id } = useParams()
    const location = useLocation();

    const fetchedObjectives = location.state.fetchedObjectives;

    console.log(objectives);
  
  const [ready, val, send] = useContext(WebsocketContext); 
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    console.log(val);

    if(val.type !== "gameOver"){
      setTimer(val);
    }  
    
  },[val])

    useEffect(() => {

        let foundH = false;
        objectives.forEach(element => {
            if (element.letter.toUpperCase() === "H") {
                foundH = true;
            }
        });

        if (foundH === true) {
            setObjectives(fetchedObjectives);
        }
  }, [])
  
  function numberOfFound(){
    var count = 0;
    objectives.forEach(element => {
      if(element.found === true){
        count++;
      }
    });
    return count;
  }

  function endGame() {
    if (numberOfFound() < objectives.length) {
      const endConfirm = confirm("You haven't found all objectives yet. Are you sure you want to quit?")

      if (!endConfirm) {
        return;
      }
    }

    // TODO: send message that player has quit to server (?)
    navigate("end");
  }

  return (
    <>
      <div>
        <h2>Game {id}</h2>
        <h3>{timer}</h3>
      </div>

      <div style={{
          display:"grid", 
          gridTemplateColumns:"1fr 1fr 1fr",
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        {objectives && objectives.map((objective, index) => {
        return (
          <div key={index} style={{margin:"10px"}}> 
            <NavLink style={{ color: objective.found ? "green" : "red" }} to={`${objective.letter}`}>
              <img src={`https://drive.google.com/uc?export=view&id=${objective.image}`} alt="objective" style={{
                maxHeight: window.innerHeight/(objectives.length),
                maxWidth: window.innerWidth/2, 
                border: "solid white", 
                borderRadius: "15px", 
                opacity:objective.found ? 0.4 : 1
              }}/>
            </NavLink>
          </div>
        );
        })}
      </div>

      <div>
        <h3>Found {numberOfFound()} of {objectives.length}</h3>
        <ThemeButton onClick={endGame}>End Game</ThemeButton>
      </div>
    </>
  );
}
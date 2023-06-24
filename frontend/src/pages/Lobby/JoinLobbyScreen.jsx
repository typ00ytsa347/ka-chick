import { NavLink, useNavigate } from "react-router-dom";
import ABS_PATHS from "../routes";
import BackButton from "../../components/BackButton";
import ThemeButton, { colors }  from '../../components/ThemeButton'
import ThemeTextField from "../../components/ThemeTextField";
import { useContext, useEffect, useRef, useState } from "react";
import { isValidLobby } from "../../data/inputChecking";
import { WebsocketContext } from "../../context/WebSocketContextProvider";
import styles from "./JoinLobbyScreen.module.css";

export default function JoinLobbyScreen() {

  const lobbyIdRef = useRef(null);
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  const [ready, val, send,clearVal] = useContext(WebsocketContext); 
  const [jsonPayload, setJsonPayload] = useState(null);
  const [pressed, setPressed] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

  //This useeffect runs whenever we get a new value from our websockets, and then checks to see if a payload has been loaded onto this page to make sure we are reading a previous msg
    useEffect(() => {
      if(pressed){
        if(val === "duplicate username"){
          setErrorMsg("Name is taken. \nPlease enter another.");
        } else if(val === "Failed to join"){
          setErrorMsg("No such room");
        } else {
            console.log(val);
          navigate(`../${lobbyIdRef.current.value}/${usernameRef.current.value}`);
        }
        setPressed(false);
      } 
    }, [val])

  function joinLobby() {
    const id = lobbyIdRef.current.value;
    const username = usernameRef.current.value;

    if(!isValidLobby(id)) {
      return;
    }

    var payload = {
      type: "attemptJoinRoom",
      data: {
        username: username,
        roomPasscode: id
      }
    }

    if (ready && payload) {
      send(JSON.stringify(payload));
    }
    setPressed(true);
    setJsonPayload(payload)
  }

 
  return (
    <>
      <h2>Join Lobby</h2>
      {errorMsg && <h3>{errorMsg}</h3>}
      <ThemeTextField ref={usernameRef} label="Username" placeholder="Enter a username"/>
      <ThemeTextField ref={lobbyIdRef} label="Passcode" placeholder="Enter a lobby passcode"/>
      <div class={styles.button}>
        <br></br>
        <ThemeButton color={colors.BLUE} onClick={joinLobby}>Join</ThemeButton>
        <br></br>
        <BackButton class={styles.button} />
      </div>
    </>
  );
}
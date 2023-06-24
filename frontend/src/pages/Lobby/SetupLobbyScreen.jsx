import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import ThemeTextField from "../../components/ThemeTextField";
import ThemeButton, { colors } from "../../components/ThemeButton";
import BackButton from "../../components/BackButton";
import { isValidMap } from "../../data/inputChecking";
import { useContext, useEffect, useRef, useState } from "react";
import ThemeSlider from "../../components/ThemeSlider";
import { WebsocketContext } from "../../context/WebSocketContextProvider";
import { generateId } from "../../data/utils";

// TODO: remove hardcoded timer range
const MIN_TIME = 5;
const MAX_TIME = 20;
const DEFAULT_TIME = 10;

export default function SetupLobbyScreen() {

  const navigate = useNavigate();

  const { mapId } = useParams();
  const id = useRef(generateId());
  const mapIdInputRef = useRef(null);
  const [timerValue, setTimerValue] = useState(DEFAULT_TIME);
  const [jsonPayload, setJsonPayload] = useState(null);

  function handleTimerSlider(newValue) {
    setTimerValue(newValue)
  }

  useEffect(() => {
    if (mapId) {
      mapIdInputRef.current.value = mapId
    }
  }, [])

    const [ready, val, send] = useContext(WebsocketContext); 
  
    useEffect(() => {
      if (ready && jsonPayload) {
        send(JSON.stringify(jsonPayload));
      }
    }, [ready, send,jsonPayload]);

    useEffect(() => {
      if (jsonPayload) {
        navigate(`../${id.current}/start`,{state:{passCode:val}});
      }
    }, [val]);

  function createLobby() {
    if (!isValidMap(mapIdInputRef.current.value)) {
      return;
    }

    // TODO: fetch map and create Lobby instance
    const mapId = mapIdInputRef.current.value;

    const payload = {
      type: "createRoom",
      data: {
        roomName: id.current,
        mapID: mapId,
        numPlayers: 10,
        timeLimit: timerValue,
      }
    }
    setJsonPayload(payload);
  }
  
  return (
    <>
      <h2>Setup Lobby</h2>

      <div style={{
        marginBottom: "40px"
      }}>
        <ThemeTextField label={'Lobby ID'} disabled={true} placeholder={'Enter a lobby ID'} startValue={id.current}/>
        <br></br>
        <ThemeTextField label={'Map ID'} placeholder={'Enter a map ID'} ref={mapIdInputRef} startValue={mapId}/>
        <br></br>
        <ThemeSlider label={"Time limit (min): " + timerValue} min={MIN_TIME} max={MAX_TIME} defaultValue={DEFAULT_TIME} onChange={handleTimerSlider}/>
      </div>
      {/* <WsConsumer/> */}

      <ThemeButton color={colors.GREEN} onClick={() => createLobby()}>Create Lobby</ThemeButton>
      <br></br>
      <BackButton />
    </>
  );
}
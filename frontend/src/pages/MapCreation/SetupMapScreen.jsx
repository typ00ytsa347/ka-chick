import { useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavigateAlertButton from "../../components/NavigateAlertButton";
import { MapCreatorContext } from "../../context/MapCreatorContextProvider";
import ThemeButton, { colors } from "../../components/ThemeButton";
import ThemeTextField from "../../components/ThemeTextField";
import { isEmpty } from "../../data/inputChecking";
import Map from "../../domain/Map";
import DummyMapCreator from "./DummyMapCreator";

export default function SetupMapScreen() {

  const navigate = useNavigate();
  const { objectives, mapName, setMapName } = useContext(MapCreatorContext);

  const mapNameRef = useRef(null);

  useEffect(() => {
    mapNameRef.current.value = mapName;
  },[mapNameRef])



  function navTo(path) {
    setMapName(mapNameRef.current.value);

    navigate(path);
  }


  function hasValidInputs() {
    if (isEmpty(mapNameRef.current.value, "Please enter a map name.")) {
      return false;
    }
    return true;
  }


  async function createMap() {

    if (!hasValidInputs()) {
      return;
    }

    if (objectives.length != 9) {
      alert("Please ensure your map has 9 objectives.");
      return;
      }

    const createConfirm = confirm("Finish map creation?");
    if (!createConfirm) {
      return;
    }

    let map = new Map(mapName, objectives)

    const MAP_ID = await postMap(map);

    navigate(`../confirm/${MAP_ID}`);
  }

  return (
    <>
      <h2>Setup Map</h2>
      <ThemeTextField ref={mapNameRef} label="Map Name" placeholder="Enter a map name"/>
      <br></br>
      { objectives.length == 0 ? 
        <>
          <ThemeButton color={colors.YELLOW} onClick={() => navTo('../upload')}>Upload Images</ThemeButton>
          <br></br>
          <DummyMapCreator/> 
        </>:
        <ThemeButton color={colors.YELLOW} onClick={() => navTo('../objectives')}>Objectives</ThemeButton>
      }
      <br></br>
      
      <ThemeButton color={colors.GREEN} onClick={createMap}>Create Map</ThemeButton>
      <br></br>
      <NavigateAlertButton />
    </>
  );
}

export async function postMap(map) {
  let response = await fetch("http://127.0.0.1:3000/maps/create", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(map)
  }).catch(err => console.log(err));
  
  // Get map ID from response
  const mapId = await response.json();
  console.log(mapId)
  return mapId;
}
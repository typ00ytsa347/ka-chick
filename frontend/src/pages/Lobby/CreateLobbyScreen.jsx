import { NavLink, useNavigate } from "react-router-dom";
import ABS_PATHS from "../routes";
import BackButton from "../../components/BackButton";
import ThemeTextField from "../../components/ThemeTextField";
import { useRef } from "react";
import ThemeButton, { colors } from "../../components/ThemeButton";
import { isValidMap } from "../../data/InputChecking";

export default function CreateLobbyScreen() {
  const mapIdRef = useRef(null);
  const navigate = useNavigate();

  function setupLobby() {
    const id = mapIdRef.current.value;

    // Input checking
    if (!isValidMap(id)) {
      return;
    }

    // TODO: Map ID input will be pushed to context or local storage
    navigate(`../${id}/setup`);
  }

  return (
    <>
      <h2>Create Lobby</h2>
      <ThemeTextField ref={mapIdRef} label="Map ID" placeholder="Enter a map ID"/>
      <br></br>
      <ThemeButton color={colors.GREEN} onClick={setupLobby}>Setup</ThemeButton>
      <br></br>
      <BackButton />
    </>
  );
}
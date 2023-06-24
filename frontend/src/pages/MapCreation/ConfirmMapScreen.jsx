import { NavLink, useNavigate, useParams } from "react-router-dom";
import NavigateAlertButton from "../../components/NavigateAlertButton";
import BackButton from "../../components/BackButton";
import ThemeButton, { colors } from "../../components/ThemeButton";

export default function ConfirmMapScreen() {

  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <h2>Map Name</h2>
      <div>ID: {id}</div>
      <ThemeButton color={colors.GREEN} onClick={() => navigate(`/lobby/setup/${id}`)}>Create Lobby</ThemeButton>
      <br></br>
      <NavigateAlertButton />
    </>
  );
}
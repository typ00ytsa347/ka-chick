import { NavLink, useNavigate } from "react-router-dom";
import ABS_PATHS from "../routes";
import styles from "./Menu.module.css";
import ThemeButton, { colors } from "../../components/ThemeButton";
import Title from "./Title";

export default function MenuScreen() {
  const navigate = useNavigate();

  return (
    <div className={styles.menu}>
      <Title />
      <ThemeButton color={colors.BLUE} onClick={() => navigate('/lobby/join')}>Join Lobby</ThemeButton>
      <br></br>
      <ThemeButton color={colors.GREEN} onClick={() => navigate("/lobby/setup")}>Create Lobby</ThemeButton>
      <br></br>
      <ThemeButton color={colors.YELLOW} onClick={() => navigate("/map/setup")}>Map Creator</ThemeButton>
    </div>
  );
}
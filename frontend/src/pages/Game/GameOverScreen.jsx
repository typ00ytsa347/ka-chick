import { NavLink, useParams } from "react-router-dom";
import ABS_PATHS from "../routes";
import { GameContext } from "../../context/GameContextProvider";
import { useContext, useState } from "react";
import Timer from "../../assets/timer.svg"
import styles from "./GameOverScreen.module.css"

export default function GameOverScreen() {

  const {objectives} = useContext(GameContext);
  const [score, setScore] = useState("0");

  return (
    <>
      <h2>Time's Up!</h2>
      <img src={Timer} alt="Timer" className={styles.icon} />
      <p>0:00</p>
      <p>You found {score} of {objectives.length}</p>
      <NavLink to="../leaderboard">Fine</NavLink>
    </>
  );
}
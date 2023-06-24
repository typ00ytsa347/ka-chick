import { NavLink, useParams } from "react-router-dom";
import ABS_PATHS from "../routes";

export default function LeaderboardScreen() {
  return (
    <>
      <h2>Leaderboard</h2>
      <p>Player 1</p>
      <p>Player 2</p>
      <p>Player 3</p>
      <NavLink to="/">Back to Menu</NavLink>
    </>
  );
}
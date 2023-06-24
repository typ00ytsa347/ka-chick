import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { MapCreatorContext } from "../../context/MapCreatorContextProvider";
import styles from './MapObjectivesScreen.module.css'
import ThemeButton, { colors } from "../../components/ThemeButton";

export default function MapObjectivesScreen() {

  const context = useContext(MapCreatorContext);
  const navigate = useNavigate();

  // TODO: change map setup storage to local storage

  return (
    <>
      <div className={styles.top}>
        <h2>Map Objectives</h2>
      </div>
      
      <div className={context.objectives.length > 0 ? styles.list : null}>
        { context.objectives.map(objective => {
          return (
            <div className={styles.card} key={objective.id} onClick={() => navigate(`../objectives/${objective.id}`)}>
              <img src={`https://drive.google.com/uc?export=view&id=${objective.image}`}/>
              <div className={styles.details}>
                {objective.hint}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.bottom}>
        <ThemeButton color={colors.YELLOW} onClick={() => navigate("../upload")}>Add Objective</ThemeButton>
        <BackButton />
      </div>
    </>
  );
}
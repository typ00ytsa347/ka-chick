import { NavLink, useNavigate, useParams } from "react-router-dom";
import BackButton from '../../components/BackButton';
import { useContext, useEffect, useRef, useState } from "react";
import { MapCreatorContext } from "../../context/MapCreatorContextProvider";
import styles from './EditObjectiveScreen.module.css'
import ThemeButton, { colors } from "../../components/ThemeButton";
import ThemeTextField from "../../components/ThemeTextField";
import ImagePreview from "../../components/ImagePreview";
import { validObjectiveInputs } from "../../data/inputChecking";

export default function EditObjectiveScreen() {

  const { getObjective, removeObjective } = useContext(MapCreatorContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const hintInputRef = useRef(null);
  const letterInputRef = useRef(null);

  const [objective] = useState(getObjective(id));

  function saveObjective() {
    const letter = letterInputRef.current.value;
    const hint = hintInputRef.current.value;

    if (!validObjectiveInputs(letter, hint)) {
      return;
    }

    // Directly assign as this is provided by Context
    objective.letter = letter;
    objective.hint = hint;

    navigate(-1)
  }

  function deleteObjective() {
    const deleteConfirm = confirm("Delete this objective?");

    if (!deleteConfirm) {
      return;
    }
    removeObjective(id);
    navigate(-1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>Edit Objective</h2>
      </div>
      <div className={styles.middle}>
        <ImagePreview src={objective.image} />
      </div>

      <div className={styles.bottom}>
        <ThemeTextField ref={hintInputRef} startValue={objective.hint}/>
        <ThemeTextField ref={letterInputRef} startValue={objective.letter}/>
        
        <div className={styles.buttonRow}>
          <BackButton useReturnImg={true}/>
          <ThemeButton color={colors.GREEN} useThemeWidth={false} onClick={saveObjective}>Save</ThemeButton>
          <ThemeButton color={colors.RED} useThemeWidth={false} onClick={deleteObjective}>Delete</ThemeButton>
        </div>
      </div>
    </div>
  );
}
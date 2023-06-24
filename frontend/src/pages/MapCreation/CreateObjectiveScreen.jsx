import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/BackButton';
import Objective from "../../domain/Objective";
import { MapCreatorContext } from "../../context/MapCreatorContextProvider";
import ThemeButton, { colors } from "../../components/ThemeButton";
import ThemeTextField from "../../components/ThemeTextField";
import { isValidSrc, validObjectiveInputs } from '../../data/inputChecking'
import ImageInput from "../../components/ImageInput";
import UploadImageButton from "../../components/UploadImageButton";
import styles from './CreateObjectiveScreen.module.css';

export default function CreateObjectiveScreen() {

  const context = useContext(MapCreatorContext);
  const navigate = useNavigate();

  const [src, setSrc] = useState(null);
  const hintInputRef = useRef(null);
  const letterInputRef = useRef(null);
  const triggerLabelRef = useRef(null);
  const [isCreated, setIsCreated] = useState(false);

  async function addObjective() {
    const letter = letterInputRef.current.value;
    const hint = hintInputRef.current.value;

    if(isValidSrc(src)){
      return
    }

    if (!validObjectiveInputs(letter, hint)) {
      return;
    }

    setIsCreated(true);

    const fileId = await uploadImage(src);
    console.log(fileId)
      
    context.addObjective(new Objective(context.newObjectiveId(), fileId, letter, hint, false));
    navigate(-1);
  }

  async function uploadImage(src) {

    const form = new FormData();
    form.append('file', src) 
    let response = await fetch("http://127.0.0.1:3000/drive/upload", {
      method: "POST",
      body: form
    });
    
    const fileId = await response.json();
    return fileId;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>Create Objective</h2>
      </div>
      <div className={styles.middle}>
        <ImageInput setSrc={setSrc } label={triggerLabelRef} type='file' ></ImageInput>
      </div>

      <div className={styles.bottom}>
        <ThemeTextField ref={hintInputRef} placeholder="Enter a hint"/>
        <ThemeTextField ref={letterInputRef} placeholder="Enter the letter answer"/>
        
        <div className={styles.buttonRow}>
          <BackButton useReturnImg={true}/>
          <ThemeButton color={colors.GREEN} onClick={addObjective} disabled={isCreated}>Create Objective</ThemeButton>
          <UploadImageButton ref={triggerLabelRef}/>
        </div>
      </div>
    </div>
  );
}
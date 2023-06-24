import { forwardRef } from "react";
import styles from './UploadImageButton.module.css'
import CameraIcon from "../../public/Camera.jpg";

function UploadImageButton({}, ref) {
  return (
    <label className={styles.button} ref={ref} for="files" htmlFor="icon-button-file"> 
      <img src={CameraIcon} />
    </label>
  );
}

export default forwardRef(UploadImageButton);
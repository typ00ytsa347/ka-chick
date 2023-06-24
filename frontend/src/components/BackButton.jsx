import { useNavigate } from "react-router-dom"
import ThemeButton, {colors} from "./ThemeButton"
import { useEffect } from "react"
import BackIcon from '../assets/back.svg';
import styles from './BackButton.module.css'

export default function BackButton({children, useReturnImg}) {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(-1)}>
      {/* Render either Return icon or default ThemeButton */}
      {useReturnImg ? 
        <div className={styles.return}>
          <img src={BackIcon}></img>
        </div> : 
        
        <ThemeButton color={colors.PINK}>
          {/* Render children, or if not defined, write "Back" */}
          {children || "Back"}
        </ThemeButton>
      }
    </div>
  )
}
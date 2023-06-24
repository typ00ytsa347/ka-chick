import MapShapeImg from '../assets/map_shape.png'
import RunningManImg from '../assets/running_man.png'
import styles from './GameBackground.module.css';

export default function GameBackground() {
  return (
    <div className={styles.bg}>
      <img className={styles.mapShape} src={MapShapeImg} />
      <img className={styles.runningMan} src={RunningManImg} />
    </div>
  )
}
import styles from './Menu.module.css';
import Logo from '../../assets/logo.png';

export default function Title() {
  return (
    <div className={styles.titleContainer}>
      <img src={Logo} alt="Logo" />
      <h1>Ka-Chick</h1>
    </div>
  );
}
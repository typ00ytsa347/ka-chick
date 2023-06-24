import styles from './ThemeButton.module.css'

export const colors = { 
  BLUE: styles.blue, 
  GREEN: styles.green,
  YELLOW: styles.yellow,
  PINK: styles.pink,
  PURPLE: styles.purple,
  RED: styles.red,
};

export default function ThemeButton({children, color, onClick, disabled, useThemeWidth=true}) {
  return (
    <button className={`${styles.button + " " + color} ${useThemeWidth && styles.themeWidth}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}
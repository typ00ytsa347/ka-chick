import { forwardRef, useEffect, useState } from "react";
import styles from './ThemeSlider.module.css'

export default function ThemeSlider({label, min, max, defaultValue, onChange}) {

  const [value, setValue] = useState(defaultValue);

  function handleChange(e) {
    const newValue = e.target.value;
    
    setValue(newValue);
    onChange(newValue);
  }

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input type="range" min={min} max={max} value={value} onChange={handleChange}/>
    </div>
  );
}
import { forwardRef, useState } from 'react';
import styles from './ThemeTextField.module.css'

function ThemeTextField({label, disabled=false, placeholder, startValue=""}, ref) {

  const [value, setValue] = useState(startValue);
  
  return (
    <div className={styles.container}>
      {label ? <label>{label}</label> : null} { /* Create label only if label text is given */ }

      {/* Change style if label is given */}
      <input type="text" className={label ? styles.labeled : ""}
        disabled={disabled} 
        placeholder={placeholder} 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        ref={ref}/>
    </div>
  );
}

export default forwardRef(ThemeTextField);
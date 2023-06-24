import { useState } from 'react';
import styles from './ImagePreview.module.css'

export default function ImagePreview({src}) {
  return (
    <div className={styles.preview}>
      {src && <img src={src} style={{maxWidth:"100%"}}/>}
    </div>
  );
}
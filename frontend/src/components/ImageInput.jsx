import { useState } from 'react';
import ImagePreview from './ImagePreview';

export default function ImageInput({setSrc, triggerLabel}) {

  const [source, setSource] = useState()

  const getImageUrl = (target) => {
    if(target.files){
      if(target.files !== 0){
        const file = target.files[0];
        const newURL = URL.createObjectURL(file);
        setSource(newURL);
        setSrc(file);
      }
    }
  }

  return (
    <div>
      <ImagePreview src={source}/>

      <div>
        <input style={{display:"none"}} accept="image/*" id="icon-button-file" type="file" capture="environment" 
          onChange={(e) => getImageUrl(e.target)} />

        {triggerLabel}
      </div>
    </div>
  );
}
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ABS_PATHS from "../routes";
import BackButton from "../../components/BackButton";
import { useState, useEffect, useContext, useRef } from "react";
import { GameContext } from "../../context/GameContextProvider";
import ImageInput from "../../components/ImageInput";
import ThemeButton, { colors } from "../../components/ThemeButton";
import ImageParser from 'react-image-parser';
import { getImageSize } from "react-image-size";
import styles from "./GameObjectiveScreen.module.css"
import { WebsocketContext } from "../../context/WebSocketContextProvider";
import UploadImageButton from "../../components/UploadImageButton";

import ConfirmMapScreen from "../MapCreation/ConfirmMapScreen";

export default function GameObjectiveScreen() {

  const [imageData, setImageData] = useState(null);
  const [src, setSrc] = useState(null);
  let ranOnce = true;

  const triggerLabelRef = useRef(null);

    const { foundObjective, getObjective, getPlayerName, getRoomPasscode } = useContext(GameContext);
    const { objective } = useParams();
    const [jsonPayload, setJsonPayload] = useState(null);

    console.log(objective);

  const [ready, val, send] = useContext(WebsocketContext);

  const navigate = useNavigate();

    //Small function which handles the event of the image parser
    const onImageParsed = ({ data }) => {
        ranOnce = !ranOnce;
        if (ranOnce == false) {
            setImageData(data);
        }
    }

    useEffect(() => {

        processAndSendData(imageData);

    }, [imageData]);

    //Function to handle sending the data to the server
    const processAndSendData = async (imageData) => {
        //Only attempt sending if imageData has been set
        if (imageData != null) {
            let sendArray = Array.prototype.slice.call(imageData);

            //Get width and height of image
            let { width, height } = await getImageSize(src);

            //While any dimension in the image is bigger than 1000
            while (width > 1000 || height > 1000) {

                let newSendArray = [];
                let newSendArrayIndex = 0;
                let currentColourIndex = 0;
                let currentHeightIndex = 0;
                let currentWidthIndex = 0;

                //Loop through array, missing out in every even index for the image
                //Essentially, this removes every 2nd row and column in the image data
                sendArray.forEach((pixel) => {

                    //Only assign each odd row
                    if (currentWidthIndex % 2 == 1 && currentHeightIndex % 2 == 1) {
                        newSendArray[newSendArrayIndex] = pixel;
                        newSendArrayIndex++;
                    }

                    //Update index values
                    currentColourIndex++;
                    if (currentColourIndex > 3) {
                        currentColourIndex = 0;
                        currentWidthIndex++;
                        if (currentWidthIndex > width - 1) {
                            currentWidthIndex = 0;
                            currentHeightIndex++;
                        }
                    }
                });

                //Update width and height, as well as array
                width = Math.floor(width / 2);
                height = Math.floor(height / 2);
                sendArray = newSendArray;
            }

            const name = getPlayerName();
            const code = getRoomPasscode();

            //Create and send payload
            const payload = {
                type: "checkPhoto",
                data: {
                    roomPasscode: code,
                    player: name,
                    width: width,
                    height: height,
                    photoData: sendArray,
                }
            }

            setJsonPayload(payload);

            if (ready && payload) {
                send(JSON.stringify(payload));
            }

            
        }
    };

    useEffect(() => {
        if (jsonPayload) {

            if (val[0] <= "0" || val[0] >= "9")

            console.log("Received data:");
            console.log(val);

            if (objective.toUpperCase() === val) {

                console.log("Objective Found");
                foundObjective(objective.toUpperCase());

            }
        }
    }, [val]);


//style={{position:"absolute", top:"20px", justifySelf:"center"}}
//style={{position:"absolute", justifySelf:"center", bottom:"10px",width: "50%"}}
  return (
    <div className={styles.container} >
      <div className={styles.top}>
        <h2>Hint: {getObjective(objective).hint}</h2>
      </div>

      <div className={styles.middle}>
        <ImageInput setSrc={setSrc} label={triggerLabelRef}/>
      </div>

      <div className={styles.bottom}>
              <UploadImageButton ref={triggerLabelRef}/>
        <BackButton useReturnImg={true}/>
      </div>
      <ImageParser img={src} maxImageSideSize={800} onImageParsed={onImageParsed} />
    </div>
    );
}
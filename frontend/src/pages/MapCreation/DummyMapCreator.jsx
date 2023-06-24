import { useEffect, useState } from "react";
import ThemeButton from "../../components/ThemeButton";
import Map from "../../domain/Map";
import Objective from "../../domain/Objective";
import { postMap } from "./SetupMapScreen";

// Unprocessed links
const LINKS = [
  "https://drive.google.com/file/d/1Ywwa-zgOexxJMxPuYZp3O3I5ulckKXa1/view?usp=share_link",
  "https://drive.google.com/file/d/10-pF2Uoajo4Xdcf4nPUCNNGtLdyZSNUO/view?usp=share_link",
  "https://drive.google.com/file/d/1W9yUGjrVaWRr2pikyurpo4NB7VoCf5mX/view?usp=share_link",
  "https://drive.google.com/file/d/1yDiZcUdIKueDfnKbZA51CvXwFXDn2gdT/view?usp=share_link",
  "https://drive.google.com/file/d/1laOX4pFMNj7067CgneqQMANooU-V-7J2/view?usp=share_link",
  "https://drive.google.com/file/d/1c0DgjogfQ6LwQe4wVthbw0NM0Gj_XnqX/view?usp=share_link",
  "https://drive.google.com/file/d/1FyhSANaTj8kXJYrcgobDEbweTT-p6hs-/view?usp=share_link",
  "https://drive.google.com/file/d/1tkPifkOiogh0WmogNRkW3fx0KIu9D4dk/view?usp=share_link",
  "https://drive.google.com/file/d/1l0YKzQ9072y58Y5EkYtXa9TTTfogzrnc/view?usp=share_link"
]

export const LETTERS = [
  "A",
  "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "I",
    "J"
]

const IDS = LINKS.map(link => {
  return link.replace("https://drive.google.com/file/d/", "")
    .replace("/view?usp=share_link", "");
})

let map = new Map("map1", 
  IDS.map((id, index) => {
    return new Objective(
      index, 
      id,
      LETTERS[index], 
      `This is the hint for ${LETTERS[index]}`, false)
  })
)

export default function DummyMapCreator() {

  const [mapId, setMapId] = useState();

  async function generateDummyMap() {
    // console.log(map)
    setMapId(await postMap(map))
  } 

  return (
    <>
      {mapId && <p>Dummy map ID: {mapId}</p>}
      <ThemeButton onClick={generateDummyMap} useThemeWidth={false}>Create Dummy Map</ThemeButton>
    </>
  );
}
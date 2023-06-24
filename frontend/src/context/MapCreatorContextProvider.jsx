import React, { useRef, useState } from "react";

const MapCreatorContext = React.createContext(undefined);


function MapCreatorContextProvider(props) {

  const objectiveCounter = useRef(0);
  const [objectives, setObjectives] = useState([]);

  const [mapName, setMapNameState] = useState("");

  const addObjective = (objective) => {
    setObjectives([...objectives, objective]);
  };

  const getObjective = (id) => {
    let objective = objectives.find(objective => objective.id == id);
    return objective;
  }

  const removeObjective = (id) => {
    let currentObj = [...objectives];
    currentObj.splice(
      currentObj.findIndex(objective => objective.id == id), 1);

    setObjectives(currentObj);
  };

  const newObjectiveId = () => {
    const oldCount = objectiveCounter.current;
    objectiveCounter.current++;

    return oldCount;
  }

  const setMapName = (name) => {
    setMapNameState(name);

    console.log(name)
  }

  return (
    <MapCreatorContext.Provider value={
      {
        objectives,
        addObjective,
        getObjective,
        removeObjective,
        newObjectiveId,
        mapName,
        setMapName,
      } 
    }>
      {props.children}
    </MapCreatorContext.Provider>
  );
}

export {
  MapCreatorContext,
  MapCreatorContextProvider
};

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const GameContext = React.createContext({});

// Create the context
const intialObjectives = [
    {letter: "H", hint: "big hint"},
    {letter: "H", hint: "big hint"},
    {letter: "H", hint: "big hint"},
    {letter: "H", hint: "big hint"},
    {letter: "H", hint: "big hint"},
    {letter: "H", hint: "big hint"},
    {letter: "H", hint: "big hint"},
    {letter: "H", hint: "big hint"},
    {letter: "H", hint: "big hint"}];

function GameContextProvider({ children }) {

    const {id, name} = useParams();
    const location = useLocation();

    var mapId;

    if(location.state){
        mapId = location.state.mapId;
    }

    // Stateful value initialization
    const [objectives, setObjectives] = useState(() => {
        try {
            //id is used as key to update the local storage based on the game 
            const data = window.localStorage.getItem(id);
            return data ? JSON.parse(data) : intialObjectives;                                                     
        } catch {
            return intialObjectives;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(id, JSON.stringify(objectives));
    },[objectives,setObjectives])

    function getObjective(letter){
        var objective;
        objectives.forEach(element => {
            if(element.letter === letter){
                objective = element;
            }
        });

        return objective;
    }

    function getPlayerName() { return name; }

    function getRoomPasscode() { return id; }

    function foundObjective(letter){
        objectives.forEach(element => {
            if(element.letter.toUpperCase() === letter.toUpperCase()){
                element.found = true;
                element.hint = "Congratulations! You have found this objective!";
            }
        });

        setObjectives([...objectives]);

        console.log(" Found: " + letter);
    }

    const context = {
        objectives,
        setObjectives,
        foundObjective,
        getObjective,
        getPlayerName,
        getRoomPasscode
    }

    return (
        <GameContext.Provider value={context}>
            {children}
        </GameContext.Provider>
    );
}

export {
    GameContext,
    GameContextProvider
};
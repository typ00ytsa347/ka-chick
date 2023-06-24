import { LETTERS } from "../pages/MapCreation/DummyMapCreator";

export function validObjectiveInputs(letter, hint) {
  if (isEmpty(letter, "Please enter a letter.")) {
    return false;
  } else if (letter.length > 1) {
    alert("The answer should only contain a single letter.")
    return false;
  } else if (!LETTERS.includes(letter.toUpperCase())) {
    alert("The answer should be either A, B, C, D, E, F, G, I, J")
    return false;
  }
  
  if (isEmpty(hint, "Please enter a hint.")) {
    return false;
  }
  return true;
}


export function isEmpty(value, message="Input cannot be empty!") {
  if (!value) {
    alert(message)
    return true;
  }
  return false;
}

export function isValidSrc(value, message="Please choose a valid image."){
  if (!value) {
    alert(message)
    return true;
  }
  return false;
}

export function isValidLobby(id) {
  if (isEmpty(id, "Please enter a lobby ID.")) {
    return false;
  } else if (!checkForLobbies(id)) {
    alert(`Cannot find lobby with ID: ${id}.`);
    return false;
  }
  return true;
}

function checkForLobbies(id) {
  // TODO: Fetch existing lobbies
  return true;
}



export function isValidMap(id) {
  if (isEmpty(id, "Please enter a map ID.")) {
    return false;
  } else if (!checkForMaps(id)) {
    alert(`Cannot find map with ID: ${id}.`);
    return false;
  }
  return true;
}

function checkForMaps(id) {
  // TODO: Fetch existing maps
  return true;
}
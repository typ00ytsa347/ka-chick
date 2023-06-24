import { Map } from '../database/models/Map.js';


function generateRandomNumber() {
    var minNum = 100000;
    var maxNum = 999999;
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

async function checkIdExists(mapId) {
    return await Map.find({map_id: mapId}).limit(1).then(number => {
        return number.length;
    })
}

async function createMapId() {
    let mapId = generateRandomNumber();

    while (true) {
        let number = await checkIdExists(mapId);

        if (number === 1) {
            mapId = generateRandomNumber();
        } 
        break;
    }
    return mapId;
}

export { createMapId };

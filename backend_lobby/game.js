import { PythonShell } from "python-shell";
import fs from "fs";
import { stringify } from "querystring";

const PlayerData = class {
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
        this.score = 0;
    }
}

const MapData = class {
    constructor(pictures) {
        this.pictures = pictures;
    }
}

// This contains all the game logic associated with a room
// It will keep track of players scores, as well as the "map" data
class Game {
    // Current method for "getting" the map ID from mongo DB
    getMapByID(mapID) {
        // TO DO: Make a mongo DB call to get the map data
        
        return new MapData([]);
    }
    // Scores
    constructor(playerList, roomName, mapID, numPlayers, timeLimit) {
        this.playersData = [];
        this.winner = null;

        // Get the map data from the database through the id
        this.mapData = this.getMapByID(mapID);
        this.timeLimit = parseInt(timeLimit);

        this.timer = this.timeLimit * 60;
        // Keep a timer

        console.log(this.timer);
        // Initialize the list of the players
        playerList.forEach(x=>{
            this.playersData.push(new PlayerData(x.username, x.socket));
        })

        this.startGame();
    }

    startGame() {
        console.log(this.playersData);

        for(var i = 0; i < this.playersData.length; i++) {
            this.playersData[i].socket.send(JSON.stringify("Game has started!"));
        }
        

        this.timerId = setInterval(
            this.handleTimer.bind(this),
        1000);


    }
    handleTimer() {
        this.timer--;
        console.log("" + this.timer);
        for(var i = 0; i < this.playersData.length; i++) {
            this.playersData[i].socket.send(""+this.timer);
        }
        if(this.timer == 0) {
            clearInterval(this.timerId);
            this.gameOver();
        }
    }
    getPlayerByName(username) {
        for(var i = 0; i < this.playersData.length; i++) {
            if(this.playersData[i].username == username) {
                return this.playersData[i];
            }
        }
        return null;
    }


    broadcastScores() {
        for(var i = 0; i < this.playersData.length; i++) {
            this.playersData[i].socket.send(this.playersData);
        }
    }

    async checkPhoto(username, width, height, photoData, ws) {

        //Get width and height
        var correctPhoto;

        //Value of photo based on python script returns
        let photoValue;

        //Run OCSVM python file
        const resultOCSVM = await this.runSVM("OCSVM", photoData, width, height);

        //Run SVM python file
        const resultSVM = await this.runSVM("SVM", photoData, width, height);

        if (resultOCSVM <= -50000) {
            photoValue = "NO";
        } else {
            switch (resultSVM) {
                case 0:
                    photoValue = "A";
                    break;
                case 1:
                    photoValue = "B";
                    break;
                case 2:
                    photoValue = "C";
                    break;
                case 3:
                    photoValue = "D";
                    break;
                case 4:
                    photoValue = "E";
                    break;
                case 5:
                    photoValue = "F";
                    break
                case 6:
                    photoValue = "G";
                    break;
                case 7:
                    photoValue = "NO";
                    break;
                case 8:
                    photoValue = "I";
                    break;
                case 9:
                    photoValue = "J";
                    break
                default:
                    photoValue = "NO";
            }
        }

        if (photoValue != "NO") {
            correctPhoto = true;
        } else {
            correctPhoto = false;
        }

        if (correctPhoto) {
            // If correct, then update the score, and broadcast to all users the new scores
            var player = this.getPlayerByName(username);
            player.score++;

            // Check if the player has achieved all the photos
            if (player.score == this.mapData.pictures.length) {
                // If so, then end the game
                this.winner = player;
                this.gameOver();
                photoValue = "ALL";
            }
            // Otherwise, broadcast all scores
            else {
                this.broadcastScores();
            }
        }
        
        console.log(photoValue);
        ws.send(photoValue);
    }

    runSVM(type, pixelData, width, height) {

        return new Promise(resolve => {

            let result = "";

            var options = {
                args: [width, height]
            }

            this.writeToFile(type, pixelData.toString());

            let pyShell;

            if (type == "SVM") {
                pyShell = new PythonShell("../python/ModelRunning.py", options);
            } else {
                pyShell = new PythonShell("../python/ModelRunningOneClass.py", options);
            }
            pyShell.on('message', function (message) {
                result = result + message;
            });

            pyShell.end(function (err, code, signal) {
                console.log("Exit code: " + code);
                console.log("Exit signal: " + signal);
                console.log("Exit error: " + err);
                let data = parseInt(result);
                console.log(data);
                resolve(data);

            })

        })

    }

    writeToFile(location, data) {

        fs.writeFile("../python/imageTextDump" + location + ".txt", data, function (err) {

            if (err) {
                return console.log(err);
            };

        });

    }


    // For debugging purpose
    printGameStatus() {
        this.playersData.forEach(x=>{
        })
    }

    // Game is over once the timer has run out
    // Or when someone has found all the photos
    gameOver() {
        var winnerName = "No one";
        if(this.winner != null) {
            winnerName = this.winner.username;
        }
        console.log("Someone has won: " + winnerName);
        var msg = {
            type: "gameOver",
            data: winnerName,
        }

        this.playersData.forEach(x=> {
            x.socket.send(JSON.stringify(msg));
        });

        // Ideally should destroy the room after use
    }
}

export default Game;
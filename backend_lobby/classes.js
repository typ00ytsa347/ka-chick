import { v4 as uuidv4 } from 'uuid';
import Game from './game.js';

const RoomManager = class {
    constructor() {
        this.rooms = [];
    }

    createRoom(roomName, mapID, numPlayers, timeLimit, socket) {
        var room = new Room(roomName, mapID, numPlayers, timeLimit, socket);
        this.rooms.push(room);
        return room;
    }


    getRoomByName(roomName) {
        const results = this.rooms.filter(x=> x.roomName == roomName);
        if(results.length > 0) {
            return results[0];
        }
        return null;
    }

    getRoomById(id) {
        const results = this.rooms.filter(x=> x.id == id);
        if(results.length > 0) {
            return results[0];
        }
        return null;
    }
    getRoomByPasscode(passcode) {
        const results = this.rooms.filter(x=> x.passcode == passcode);
        if(results.length > 0) {
            return results[0];
        }
        return null;
    }

}

const Room = class {
    constructor(roomName, mapID, numPlayers, timeLimit, socket) {
        this.id = uuidv4();
        this.clients = [];
        // Generate it randomly
        this.passcode = this.generatePasscode();
        this.roomName = roomName;
        this.mapID = mapID;
        this.numPlayers = numPlayers;
        this.timeLimit = timeLimit;
        this.host = socket;
        this.game = null;
        // The game data structure will handle the processing of moves, keep track of scores etc

    }

    getPasscode() {
        return this.passcode;
    }
    
    startGame() {
        // When we start the game
        // Broadcast to all users that the game has started, so their views can be updated
        // Start the timer

     
        this.game = new Game(this.clients, this.roomName, this.mapID, this.numPlayers, this.timeLimit);
    }

    generatePasscode() {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = 6;
        var passcode = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            passcode += chars.substring(randomNumber, randomNumber +1);
        }
        return passcode;
    }

    join(player) {
        this.clients.push(player);
        console.log("A new user has joined! Name: " + player.username);

        // Broadcast to all players that a new user has joined
        var usernames = [];
        this.clients.forEach(x => usernames.push(x.username));
  
        var message = {
            type: "roomJoined",
            data: {roomName: this.roomName, roomID: this.id, users: usernames, mapID: this.mapID},
        }
        

        this.clients.forEach(x => {
            // console.log(x);
            if(x.socket != null) {
                x.socket.send(JSON.stringify(message));
            }
        });

        if(this.host != null) {
            this.host.send(JSON.stringify(message));
        }
        console.log(this.clients);
    }

    containsClient(id) {
        for(var i = 0; i < this.clients.length; i++) {
            if(this.clients[i].id == id) {
                return true;
            }
        }
        return false;
    }

    containsUsername(username) {
        for(var i = 0; i < this.clients.length; i++) {
            if(this.clients[i].username == username) {
                return true;
            }
        }
        return false;
    }

}

const Player = class {
    constructor(id, username, socket) {
        this.username = username;
        this.id = id;
        this.socket = socket;
    }
}

class Lobby {
    constructor(playersPerRoom) {
        this.lobbyList = [];
        this.playersPerRoom = playersPerRoom;
    }
    addClient(player) {
        this.lobbyList.push(player);
    }
    deleteClient(player) {
        this.lobbyList.pop(player);
    }
    getClient(index) {
        return this.lobbyList[index];
    }
    printLobbyList() {
        console.log(this.lobbyList);
    }

    joinLobby(player) {
        this.lobbyList.push(player);
    }
}

export { Room, Player, Lobby, RoomManager };

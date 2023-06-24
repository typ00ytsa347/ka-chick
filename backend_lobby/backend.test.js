import Game from "./game";
import {Lobby, RoomManager, Room, Player} from "./classes.js";


describe("Room tests", () => {
    var room;
    beforeEach(()=> {
        room = new Room("Test Room", 100, 5, 5, null);
    });

    it('Test room passcode', () => {
        var passcode = room.getPasscode();
        expect(passcode.length).toBe(7);
    })
    
    it('Test room join method', () => {
    
        expect(room.clients.length).toBe(0);
    
        var player = new Player(1, "Yuewei", null);
        room.join(player);
        expect(room.clients.length).toBe(1);
    })
    
    it('Test room contains method', () => {
        var player = new Player(1, "Yuewei", null);
        room.join(player);
        expect(room.containsClient(1)).toBe(true);
    
        expect(room.containsUsername("Yuewei")).toBe(true);
        expect(room.containsUsername("John")).toBe(false);
    
    })
    
});


it('Test room creation', () => {
    var roomManager = new RoomManager();
    expect(roomManager.rooms.length).toBe(0);
    roomManager.createRoom("Test room", 1, 1, 1, null);
    expect(roomManager.rooms.length).toBe(1);
})

it('Test room getter methods', () => {
    var roomManager = new RoomManager();
    var room = roomManager.createRoom("Test room", 1, 1, 1, null);
    var passcode = room.getPasscode();
    expect(roomManager.getRoomById(room.id)).not.toBe(null);
    expect(roomManager.getRoomById(69)).toBe(null);

    expect(roomManager.getRoomByName("Test room")).not.toBe(null);
    expect(roomManager.getRoomByName("Johnnys Shack")).toBe(null);

    expect(roomManager.getRoomByPasscode(passcode)).not.toBe(null);
    expect(roomManager.getRoomByPasscode(69420)).toBe(null);
})


// Test the game class
// Test the lobby stuff
// Test the room creation stuff

import * as PIXI from "pixi.js";
import * as _ from "lodash";
import { io } from "socket.io-client";
import { Button } from "./Button";
import { TitleDeed } from "./TitleDeed";
import { data } from "./CardTest";
import { chance } from "./ChanceCardTest";
import { risk } from "./RiskCardTest";
import { ChanceCard } from "./ChanceCard";
import { RiskCard } from "./RiskCard";
import { config } from "./config";
import { RoomsList } from "./RoomsList";
import { UI } from "./UI";
import { BoardStuff } from "./BoardStuff";

const player_name = Math.random()
    .toString(36)
    .replace(/[^a-z0-9]+/g, "")
    .substr(2, 7);

const socket = io();

socket.on("rooms", (rooms) => {
    console.log("rooms", rooms);
    Rooms.state.list = rooms;
});

socket.on("new_room", (rooms) => {
    console.log("new_room");
    Rooms.state.list = rooms;
});

socket.on("entered_room", (room) => {
    console.log("entered_room");
    Board.state.room = room;
    App.state.inGame = true;
});

socket.on("new_player", (players) => {
    console.log("new_player");
    Board.state.players = players;
});

socket.on("turn", (turn, players, event) => {
    console.log("turn", turn, players[turn].name, player_name);
    Board.state.turn = turn;
    Board.state.my_turn = players[turn].name == player_name;
    Board.state.players = players;
    Board.state.end_turn_event = event;
});

socket.on("left_room", (rooms) => {
    console.log("left_room");
    Rooms.state.list = rooms;
    App.state.inGame = false;
});

socket.on("player_left", (players) => {
    console.log("player_left");
    Board.state.players = players;
});

socket.on("rolled_dice", (players, event) => {
    console.log("rolled_dice");
    Board.state.players = players;
    Board.state.end_turn_event = event;
});

socket.on("deleted_room", (rooms) => {
    console.log("deleted room");
    Rooms.state.list = rooms;
});

socket.on("buy", (players) => {
    console.log("buy", players);
    Board.state.players = players;
});

function create_UUID() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
}

const app = new PIXI.Application({
    width: config.canvasWidth,
    height: config.canvasHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
});
document.getElementById("app").appendChild(app.view);

const App = new PIXI.Container();
const Board = new PIXI.Container();
const Rooms = new PIXI.Container();

app.stage.addChild(App);
App.addChild(Board, Rooms);

// Ustawianie stanów początkowych
App.state = {
    inGame: false,
    // inGame: true,
};

Board.state = {
    players: [],
    turn: 0,
    my_turn: false,
    room: "",
    end_turn_event: undefined
};

Rooms.state = {
    list: [],
};

// Głęboka kopia stanu
// Robienie głębokiej kopii wymaga uzycia JSON parse i stringify
// bo inaczej kopiowane są referencje zamiast wartości
// i przy zmianie state automatycznie zmianiał się prev_state
App.prev_state = JSON.parse(JSON.stringify(App.state));
Board.prev_state = JSON.parse(JSON.stringify(Board.state));
Rooms.prev_state = JSON.parse(JSON.stringify(Rooms.state));

// Jeśli jesteś w gre wyświetl planszę
// Jeśli nie, wyświetl listę pokoi
app.ticker.add(() => {
    if (App.state.inGame) {
        Board.visible = true;
        Rooms.visible = false;
    } else {
        Board.visible = false;
        Rooms.visible = true;
    }
});

// Jeśli stan planszy albo listy pokoi się zmienił to zbuduj od nowa widok
app.ticker.add(() => {
    if (!_.isEqual(Rooms.state, Rooms.prev_state)) {
        rebuildRooms();
        Rooms.prev_state = JSON.parse(JSON.stringify(Rooms.state));
    }
    if (!_.isEqual(Board.state, Board.prev_state)) {
        rebuildBoard();
        Board.prev_state = JSON.parse(JSON.stringify(Board.state));
    }
});

// Do testowania czy widok się zmienia po zmianie stanu
// setTimeout(() => {
//     Board.state.players[0].name = "Pope";
// }, 3000);

// Funkcja budująca widok planszy
function rebuildBoard() {
    Board.removeChildren();

    // const a = new PIXI.Graphics();
    // a.lineStyle(0);
    // a.beginFill(0xde3249, 0.8);
    // a.drawCircle(865, 700, 10);
    // a.endFill();

    const b = new PIXI.Sprite.from("http://localhost:8080/board.png");
    b.x = 452;

    const ui = UI(Board, App, socket, player_name);

    const board_stuff = BoardStuff(Board, App, socket, player_name);

    Board.addChild(b, ui, board_stuff);
}

// Funkcja budująca widok listy pokoi
function rebuildRooms() {
    Rooms.removeChildren();

    const createBtn = Button(
        config.canvasWidth / 2 - 320,
        config.canvasHeight * 0.1,
        "New room",
        () => {
            const name = Math.random()
                .toString(36)
                .replace(/[^a-z0-9]+/g, "")
                .substr(2, 7);
            socket.emit("create_room", name);
        }
    );
    Rooms.addChild(createBtn);

    const list = RoomsList(Rooms.state.list, socket, player_name);
    Rooms.addChild(list);
    // const card = TitleDeed(200, 200, data.jezyce2);
    // Rooms.addChild(card);
    // const card2 = TitleDeed(400, 200, data.wilda2);
    // // Rooms.addChild(card2);
    // const card3 = ChanceCard(400, 200, chance.chance16);
    // Rooms.addChild(card3);
    // const card4 = RiskCard(100, 200, risk.risk16);
    // Rooms.addChild(card4);
}

// Pierwszy raz trzeba ręcznie wywołać budowanie, później zmiany w stanie
// elementów automatycznie triggerują ponowne zbudowanie
rebuildBoard();
rebuildRooms();

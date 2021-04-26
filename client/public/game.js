import * as PIXI from "pixi.js";
import * as _ from "lodash";
import { config } from "./config";
import { Button } from "./Button";
import { TitleDeed } from "./TitleDeed";
import { data } from "./CardTest";
import { RoomsList } from "./RoomsList";

let socket;

function newSocket(room) {
    socket = new WebSocket("ws://localhost:8080/ws");
    socket.onopen = () => {
        setTimeout(
            () =>
                socket.send(
                    JSON.stringify({
                        type: "register_client",
                        data: JSON.stringify({
                            room: room,
                            name: "Default Player",
                        }),
                    })
                ),
            1000
        );
        App.state.inGame = true;
    };
    socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log(msg);
        switch (msg.type) {
            case "players":
                Board.state.players = msg.data.players;
        }
    };
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
};
// Głęboka kopia stanu
// Robienie głębokiej kopii wymaga uzycia JSON parse i stringify
// bo inaczej kopiowane są referencje zamiast wartości
// i przy zmianie state automatycznie zmianiał się prev_state
App.prev_state = JSON.parse(JSON.stringify(App.state));
Board.state = {
    players: [],
};
Board.prev_state = JSON.parse(JSON.stringify(Board.state));
Rooms.state = {
    list: [],
};
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
    const list = new PIXI.Container();
    list.x = 0;
    list.y = 0;
    for (let i = 0; i < Board.state.players.length; i++) {
        const btn = Button(0, i * 40, Board.state.players[i].name);
        list.addChild(btn);
    }
    Board.addChild(list);
}

// Funkcja budująca widok listy pokoi
function rebuildRooms() {
    Rooms.removeChildren();

    const createBtn = Button(
        config.canvasWidth / 2 - 320,
        config.canvasHeight * 0.1,
        "New room",
        () => {
            let name = Math.random()
                .toString(36)
                .replace(/[^a-z0-9]+/g, "")
                .substr(2, 7);
            fetch("http://localhost:8080/room/" + name, {
                method: "POST",
            })
                .then((response) => {
                    if (response.status == 200) {
                        fetch("http://localhost:8080/rooms", {
                            method: "GET",
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                const list = JSON.parse(data);
                                Rooms.state.list = list;
                            });
                    }
                })
                .catch((reason) => console.log(reason));
        }
    );
    Rooms.addChild(createBtn);

    const refreshBtn = Button(
        config.canvasWidth / 2 + 120,
        config.canvasHeight * 0.1,
        "Refresh",
        () => {
            fetch("http://localhost:8080/rooms", {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    const list = JSON.parse(data);
                    Rooms.state.list = list;
                });
        }
    );
    Rooms.addChild(refreshBtn);

    const list = RoomsList(Rooms.state.list, newSocket);
    Rooms.addChild(list);
    // const card = TitleDeed(200, 200, data.jezyce2);
    // Rooms.addChild(card);
    // const card2 = TitleDeed(400, 200, data.wilda2);
    // Rooms.addChild(card2);
}

// Pierwszy raz trzeba ręcznie wywołać budowanie, później zmiany w stanie
// elementów automatycznie triggerują ponowne zbudowanie
rebuildBoard();
rebuildRooms();

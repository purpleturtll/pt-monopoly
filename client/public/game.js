import * as PIXI from "pixi.js";
import * as _ from "lodash";

export let app = new PIXI.Application({
    width: 700,
    height: 700,
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
    inGame: true,
};
// Głęboka kopia stanu
// Robienie głębokiej kopii wymaga uzycia JSON parse i stringify
// bo inaczej kopiowane są referencje zamiast wartości
// i przy zmianie state automatycznie zmianiał się prev_state
App.prev_state = JSON.parse(JSON.stringify(App.state));
Board.state = {
    players: [
        { name: "xD" },
        { name: "hmm" },
        { name: "ricardo" },
        { name: "billy harrington" },
    ],
};
Board.prev_state = JSON.parse(JSON.stringify(Board.state));
Rooms.state = {
    list: ["Room1", "Room2", "Room3"],
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

//Do testowania czy widok się zmienia po zmianie stanu
setTimeout(() => {
    Board.state.players[0].name = "Pope";
}, 3000);

// Funkcja budująca widok planszy
function rebuildBoard() {
    Board.removeChildren();
    const list = new PIXI.Container();
    list.x = 0;
    list.y = 0;
    for (let i = 0; i < Board.state.players.length; i++) {
        const background = new PIXI.Graphics();
        background.beginFill(0xde3249);
        background.drawRect(0, i * 40, 200, 30);
        background.endFill();
        const text = new PIXI.Text(Board.state.players[i].name);
        text.x = 10;
        text.y = i * 40;
        background.addChild(text);
        list.addChild(background);
    }
    Board.addChild(list);
}

// Funkcja budująca widok listy pokoi
function rebuildRooms() {
    Rooms.removeChildren();
    const list = new PIXI.Container();
    list.x = 0;
    list.y = 0;
    for (let i = 0; i < Rooms.state.list.length; i++) {
        const background = new PIXI.Graphics();
        background.beginFill(0xde3249);
        background.drawRect(0, i * 40, 200, 30);
        background.endFill();
        const text = new PIXI.Text(Rooms.state.list[i]);
        text.x = 10;
        text.y = i * 40;
        background.addChild(text);
        list.addChild(background);
    }
    Rooms.addChild(list);
}

// Pierwszy raz trzeba ręcznie wywołać budowanie, później zmiany w stanie
// elementów automatycznie triggerują ponowne zbudowanie
rebuildBoard();
rebuildRooms();

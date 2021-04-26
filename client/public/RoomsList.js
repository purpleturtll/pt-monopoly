import * as PIXI from "pixi.js";
import { config } from "./config";
import { Button } from "./Button";

const elementWidth = 200;
const elementHeight = 50;

export const RoomsList = (rooms = [], newSocket = () => {}) => {
    const cont = new PIXI.Container();
    cont.x = config.canvasWidth / 2 - elementWidth / 2;
    cont.y = config.canvasHeight * 0.1;

    for (let i = 0; i < rooms.length; i++) {
        const btn = Button(0, i * 40, rooms[i].name, () => {
            newSocket(rooms[i].name);
        });
        cont.addChild(btn);
    }

    return cont;
};

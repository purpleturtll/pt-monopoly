/* eslint-disable camelcase */
import * as PIXI from "pixi.js";
import { Button } from "./Button";
import { BoardPositions } from "./config";

const Piece = (x, y, color) => {
    const circle = new PIXI.Graphics();
    circle.beginFill(color);
    circle.drawCircle(x, y, 11);
    circle.endFill();
    return circle;
};

export const BoardStuff = (board, app, socket, player_name) => {
    const cont = new PIXI.Container();

    // PIECES
    for (let i = 0; i < 4; i++) {
        const p = Piece(1325 - 71 * board.state.turn, 690, 0xff0000);
        cont.addChild(p);
    }

    return cont;
};

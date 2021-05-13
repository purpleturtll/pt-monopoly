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
        const p = Piece(
            BoardPositions[board.state.turn].x + 452,
            BoardPositions[board.state.turn].y,
            0xff0000
        );
        cont.addChild(p);
    }

    return cont;
};

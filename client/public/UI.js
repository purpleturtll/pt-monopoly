/* eslint-disable camelcase */
import * as PIXI from "pixi.js";
import { Button } from "./Button";
import { ButtonInactive } from "./ButtonInactive";
import { BoardPositions } from "./config";
import { data } from "./CardTest";

const UserFrame = (player_name = "-", c = "0", x, y) => {
    const frame = new PIXI.Graphics();
    frame.x = x;
    frame.y = y;
    frame.beginFill(0xb5bdb5);
    frame.drawRect(0, 0, 211, 80);
    frame.endFill();
    const name = new PIXI.Text(player_name, {
        align: "center",
        fontSize: 24,
        fontWeight: "600",
    });
    name.resolution = 3;
    name.x = frame.width / 2 - name.width / 2;
    const cash = new PIXI.Text(c, {
        align: "center",
        fontSize: 24,
        fontWeight: "200",
    });
    cash.resolution = 3;
    cash.x = frame.width / 2 - cash.width / 2;
    cash.y = 40;

    frame.addChild(name, cash);

    return frame;
};

export const UI = (board, app, socket, player_name, field) => {
    const cont = new PIXI.Container();

    let my_pos = 0;

    // QUIT BUTTON
    const quit = Button(10, 400, "QUIT", () => {
        socket.emit("exit_room", board.state.room, player_name);
        app.state.inGame = false;
    });

    // USER FRAMES
    for (let i = 0; i < 4; i++) {
        if (board.state.players[i] != undefined) {
            if (board.state.players[i].name === player_name) {
                my_pos = board.state.players[i].pos;
            }
            const uf = UserFrame(
                board.state.players[i].name,
                board.state.players[i].cash,
                i == 0 || i == 2 ? 10 : 231,
                i == 0 || i == 1 ? 40 : 130
            );
            cont.addChild(uf);
        } else {
            const uf = UserFrame(
                "-",
                "0",
                i == 0 || i == 2 ? 10 : 231,
                i == 0 || i == 1 ? 40 : 130
            );
            cont.addChild(uf);
        }
    }

    if (board.state.my_turn) {
        // ROLL DICE
        const roll = Button(10, 300, "ROLL", () => {
            socket.emit("roll_dice", board.state.room, player_name);
        });

        // END TURN
        const end_turn = Button(240, 300, "END TURN", () => {
            socket.emit("end_turn", board.state.room, player_name);
        });

        const buy = Button(470, 300, "BUY", () => {
            if (BoardPositions[my_pos].name != "start") {
                console.log(
                    player_name,
                    BoardPositions[my_pos].name,
                    data[BoardPositions[my_pos].name].price
                );
                socket.emit(
                    "buy",
                    board.state.room,
                    player_name,
                    BoardPositions[my_pos].name,
                    data[BoardPositions[my_pos].name].price
                );
            }
        });

        cont.addChild(roll, end_turn, buy);
    } else {
        // ROLL DICE
        const roll = ButtonInactive(10, 300, "ROLL");

        // END TURN
        const end_turn = ButtonInactive(240, 300, "END TURN");

        // BUY
        const buy = ButtonInactive(470, 300, "BUY");

        cont.addChild(roll, end_turn, buy);
    }

    cont.addChild(quit);

    return cont;
};

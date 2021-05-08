const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { Game, Player } = require("./logic");

app.use(express.static("./client/public"));

let rooms = {};

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.emit("rooms", Object.keys(rooms));

    socket.on("create_room", (room) => {
        console.log("create_room");
        if (rooms[room] === undefined) {
            rooms[room] = new Game(room);
        }
        io.emit("new_room", Object.keys(rooms));
    });

    socket.on("enter_room", (room, name) => {
        console.log("enter_room");
        if (!rooms[room].is_full()) {
            socket.join(room);
            rooms[room].take_seat(name);
            socket.emit("entered_room", room);
            io.to(room).emit("new_player", rooms[room].players);
        } else {
            rooms[room].start();
            io.to(room).emit(
                "turn",
                rooms[room].turn,
                rooms[room].players[rooms[room].turn]
            );
        }
    });

    socket.on("exit_room", (room, name) => {
        console.log("exit_room");
        socket.leave(room);
        rooms[room].leave_seat(name);
        io.to(room).emit("player_left", rooms[room].players);
        if (rooms[room].is_empty()) {
            delete rooms[room];
            io.emit("deleted_room", Object.keys(rooms));
        }
        socket.emit("left_room", Object.keys(rooms));
    });

    socket.on("roll_dice", (room, name) => {
        console.log("roll_dice");
        rooms[room].roll_dice();
        io.to(room).emit("rolled_dice", rooms[room].players);
    });

    socket.on("end_turn", (room, name) => {
        console.log("end_turn");
        rooms[room].end_turn();
        io.to(room).emit("turn", rooms[room].turn);
    });
});

server.listen(8080, () => {
    console.log("listening on 127.0.0.1:8080");
});

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
            console.log(rooms[room]);
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
        }
        if (rooms[room].is_full()) {
            rooms[room].start();
            io.to(room).emit(
                "turn",
                rooms[room].turn,
                rooms[room].players,
                rooms[room].end_turn_event
            );
        }
    });

    socket.on("exit_room", (room, name) => {
        console.log("exit_room");
        socket.leave(room);
        rooms[room].leave_seat(name);
        io.to(room).emit("player_left", rooms[room].players);
        socket.emit("left_room", Object.keys(rooms));
        console.log(rooms[room].is_empty());
        if (rooms[room].is_empty()) {
            delete rooms[room];
            io.emit("deleted_room", Object.keys(rooms));
        }
    });

    socket.on("roll_dice", (room, name) => {
        console.log("roll_dice");
        rooms[room].roll_dice();
        io.to(room).emit("rolled_dice", rooms[room].players, rooms[room].end_turn_event);
    });

    socket.on("end_turn", (room, name) => {
        console.log("end_turn");
        rooms[room].end_turn();
        io.to(room).emit(
            "turn",
            rooms[room].turn,
            rooms[room].players,
            rooms[room].end_turn_event
        );
    });

    socket.on("buy", (room, name, deed, cost) => {
        console.log("buy");
        rooms[room].buy(name, deed, cost);
        io.to(room).emit("buy", rooms[room].players);
    });

    socket.on("house_buy", (room, name, deed, cost) => {
        console.log("house_buy");
        rooms[room].house_buy(name, deed, cost);
        io.to(room).emit("house_buy", rooms[room].players);
    })

    socket.on("hotel_buy", (room, name, deed, cost) => {
        console.log("hotel_buy");
        rooms[room].hotel_buy(name, deed, cost);
        io.to(room).emit("hotel_buy", rooms[room].players);
    })
});

server.listen(8080, () => {
    console.log("listening on 127.0.0.1:8080");
});

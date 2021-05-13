class Player {
    constructor(name) {
        this.name = name;
        this.pos = 0;
        this.cash = 500;
    }
}

class Game {
    constructor(room) {
        this.room = room;
        this.players = {
            0: undefined,
            1: undefined,
            2: undefined,
            3: undefined,
        };
        this.turn = 0;
    }

    take_seat(name) {
        let k = Object.keys(this.players).find(
            (key) => this.players[key] == undefined
        );
        this.players[k] = new Player(name);
    }

    leave_seat(name) {
        let k = Object.keys(this.players).find(
            (key) => this.players[key].name === name
        );
        this.players[k] = undefined;
    }

    start() {}

    roll_dice() {
        this.players[this.turn].pos += Math.floor(Math.random() * 7);
    }

    end_turn() {
        if (this.turn < 4) this.turn++;
        if (this.turn === 4) this.turn = 0;
    }

    is_full() {
        return Object.values(this.players).every((v, i, a) => v != undefined);
    }

    is_empty() {
        return Object.values(this.players).every((v, i, a) => v == undefined);
    }
}

module.exports = { Game, Player };
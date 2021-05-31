class Player {
    constructor(name) {
        this.name = name;
        this.pos = 0;
        this.cash = 500;
        this.deeds = [];
        this.diceNr = 1;
        this.didRoll = false;
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
        let k = Object.keys(this.players).find((key) => {
            if (this.players[key] !== undefined) {
                this.players[key].name === name;
            }
        });
        this.players[k] = undefined;
    }

    start() {
        this.turn = 0;
    }

    roll_dice() {
        let rolled = Math.floor(Math.random() * 6 + 1);
        this.players[this.turn].diceNr = rolled;
        this.players[this.turn].didRoll = true;
        this.players[this.turn].pos += rolled;
        this.players[this.turn].pos = this.players[this.turn].pos % 42;
    }

    end_turn() {
        for (let i = 0; i < 4; i++) {
            this.players[i].didRoll = false;
        }
        if (this.turn < 4) this.turn++;
        if (this.turn === 4) this.turn = 0;
    }

    buy(name, deed, cost) {
        let k = Object.keys(this.players).find(
            (key) => this.players[key].name === name
        );
        console.log(this.players, k, name, deed, cost);
        if (this.players[k].deeds[deed] === undefined) {
            this.players[k].deeds.push(deed);
            this.players[k].cash -= cost;
        } else {
            return;
        }
    }

    is_full() {
        return Object.values(this.players).every((v, i, a) => v != undefined);
    }

    is_empty() {
        return Object.values(this.players).every((v, i, a) => v == undefined);
    }
}

module.exports = { Game, Player };

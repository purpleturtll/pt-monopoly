class Player {
    constructor(name) {
        this.name = name;
        this.pos = 0;
        this.cash = 500;
        this.deeds = [];
    }

    is_owner(deed) {
        return this.deeds.some((vd) => vd === deed);
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
                return this.players[key].name === name;
            }
        });
        this.players[k] = undefined;
    }

    start() {
        this.turn = 0;
    }

    roll_dice() {
        this.players[this.turn].pos += Math.floor(Math.random() * 6 + 1);
        this.players[this.turn].pos = this.players[this.turn].pos % 42;
    }

    end_turn() {
        if (this.turn < 4) this.turn++;
        if (this.turn === 4) this.turn = 0;
    }

    buy(name, deed, cost) {
        let k = Object.keys(this.players).find(
            (key) => this.players[key].name === name
        );

        // Sprawdzenie czy nikt inny nie ma kupionej tej nieruchomości

        if (!this.is_taken(deed)) {
            
            console.log(`${name} buys ${deed} for ${cost}`);
            this.players[k].deeds.push(deed);
            this.players[k].cash -= cost;
        } else {
            console.log(`${name} can't buy ${deed} - taken by ${this.get_owner(deed).name}`);
            return;
        }
    }

    is_full() {
        return Object.values(this.players).every((v, i, a) => v != undefined);
    }

    is_empty() {
        return Object.values(this.players).every((v, i, a) => v == undefined);
    }

    is_taken(deed) {
        return Object.values(this.players).some((v) => {
            return v.is_owner(deed);
        });
    }

    get_owner(deed) {
        if(this.is_taken(deed)) 
        {
            return Object.values(this.players).find((player) => {
                return player.is_owner(deed);
            });
        }
        else return undefined;
    }
}

module.exports = { Game, Player };

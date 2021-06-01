const data = require("./client/public/CardTest");

const BoardPositions = {
    0: { x: 900, y: 692, name: 'start', type: 'start' },
    1: { x: 815, y: 692, name: 'wilda1', type: 'deed' },
    2: { x: 746, y: 692, name: 'ryzyko', type: 'chest' },
    3: { x: 680, y: 692, name: 'wilda2', type: 'deed' },
    4: { x: 607, y: 692, name: 'wilda3', type: 'deed' },
    5: { x: 542, y: 692, name: 'szansa', type: 'chance' },
    6: { x: 477, y: 692, name: 'lazarz1', type: 'deed' },
    7: { x: 406, y: 692, name: 'lazarz2', type: 'deed' },
    8: { x: 337, y: 692, name: 'lazarz3', type: 'deed' },
    9: { x: 267, y: 692, name: 'ryzyko', type: 'chest' },
    10: { x: 201, y: 692, name: 'ogrody1', type: 'deed' },
    11: { x: 132, y: 692, name: 'ogrody2', type: 'deed' },
    12: { x: 48, y: 692, name: 'wizyta', type: 'visitors' },
    13: { x: 48, y: 609, name: 'solacz1', type: 'deed' },
    14: { x: 48, y: 541, name: 'solacz2', type: 'deed' },
    15: { x: 48, y: 472, name: 'ryzyko', type: 'chest' },
    16: { x: 48, y: 404, name: 'winogrady1', type: 'deed' },
    17: { x: 48, y: 334, name: 'winogrady2', type: 'deed' },
    18: { x: 48, y: 268, name: 'szansa', type: 'chance' },
    19: { x: 48, y: 199, name: 'piatkowo1', type: 'deed' },
    20: { x: 48, y: 132, name: 'piatkowo2', type: 'deed' },
    21: { x: 48, y: 48, name: 'parking', type: 'parking' },
    22: { x: 132, y: 48, name: 'winiary1', type: 'deed' },
    23: { x: 200, y: 48, name: 'szansa', type: 'chance' },
    24: { x: 267, y: 48, name: 'winiary2', type: 'deed' },
    25: { x: 338, y: 48, name: 'winiary3', type: 'deed' },
    26: { x: 405, y: 48, name: 'ryzyko', type: 'chest' },
    27: { x: 472, y: 48, name: 'jezyce1', type: 'deed' },
    28: { x: 541, y: 48, name: 'jezyce2', type: 'deed' },
    29: { x: 611, y: 48, name: 'jezyce3', type: 'deed' },
    30: { x: 678, y: 48, name: 'szansa', type: 'chance' },
    31: { x: 747, y: 48, name: 'lacina1', type: 'deed' },
    32: { x: 817, y: 48, name: 'lacina2', type: 'deed' },
    33: { x: 901, y: 48, name: 'wiezienie', type: 'jail' },
    34: { x: 901, y: 131, name: 'piotrowo1', type: 'deed' },
    35: { x: 901, y: 203, name: 'piotrowo2', type: 'deed' },
    36: { x: 901, y: 270, name: 'ryzyko', type: 'chest' },
    37: { x: 901, y: 337, name: 'centrum1', type: 'deed' },
    38: { x: 901, y: 407, name: 'centrum2', type: 'deed' },
    39: { x: 901, y: 475, name: 'szansa', type: 'chance' },
    40: { x: 901, y: 542, name: 's_miasto1', type: 'deed' },
    41: { x: 901, y: 612, name: 's_miasto2', type: 'deed' }
}

class Player {
    constructor(name) {
        this.name = name;
        this.pos = 0;
        this.cash = 500;
        this.deeds = [];
    }

    is_deed_owner(deed) {
        return this.deeds.some((d) => d.name === deed);
    }

    get_deed(deed) {
        return this.deeds.find((d) => {return d.name === deed;});
    }
}

class Deed {
    constructor(name) {
        this.name = name;
        this.houses = 0;
        this.hotel = false;
    }

    get_rent() {
        if(this.hotel) return data[this.name].with_hotel;
        else {
            switch(this.houses)
            {
                case 0:
                    return data[this.name].rent;
                case 1:
                    return data[this.name].with_1;
                case 2:
                    return data[this.name].with_2;
                case 3:
                    return data[this.name].with_3;
                case 4:
                    return data[this.name].with_4;
            }
        }
    }

    buy_house() {
        if(this.houses < 4) {
            this.houses++;
            console.log(`Player now owns ${this.houses} houses on ${this.name}`);
        }
        else console.log(`House limit reached for ${this.name}, can't buy next`);
        return this.houses;
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
        let prevPos = this.players[this.turn].pos;
        this.players[this.turn].pos += Math.floor(Math.random() * 6 + 1);
        this.players[this.turn].pos = this.players[this.turn].pos % 42;
        
        //Gracz przekroczył pole Start
        if(prevPos > this.players[this.turn].pos)
            this.players[this.turn].cash += 200;
    }

    end_turn() {
        var fieldName = BoardPositions[this.players[this.turn].pos].name;
        var fieldType = BoardPositions[this.players[this.turn].pos].type;

        if(fieldType == 'deed')
        {
            let owner = this.get_deed_owner(fieldName);
            let currPlayer = this.players[this.turn];

            // Gracz płaci na polu własności innego gracza
            if( owner != undefined
                && this.is_deed_taken(fieldName)
                && owner.name != currPlayer.name)
            {
                let rentValue = owner.get_deed(fieldName).get_rent();
                console.log(`${currPlayer.name} should pay ${rentValue} to ${owner.name}`);
                //Gracz zbankrutował
                if(currPlayer.cash <= rentValue) {
                    console.log(`${currPlayer.name} is broke - GAME OVER`);
                    rentValue = currPlayer.cash;
                    currPlayer.cash = 0;
                }
                else {
                    console.log(`${currPlayer.name} pays ${rentValue} to ${owner.name}`);
                    currPlayer.cash -= rentValue;    
                }
                owner.cash += rentValue;
                
            }
        }
        

        if (this.turn < 4) this.turn++;
        if (this.turn === 4) this.turn = 0;
    }

    buy(name, deed, cost) {
        let k = Object.keys(this.players).find(
            (key) => this.players[key].name === name
        );

        // Sprawdzenie czy nikt inny nie ma kupionej tej nieruchomości

        if (!this.is_deed_taken(deed)) {
            // Sprawdzenie czy gracza stać na kupno
            if(this.players[k].cash >= cost) {
                console.log(`${name} buys ${deed} for ${cost}`);
                this.players[k].deeds.push(new Deed(deed));
                this.players[k].cash -= cost;
            }
            else {
                console.log(`${name} hasn't enough money to buy ${deed} for ${cost}`);
            }
            
        } else {
            console.log(`${name} can't buy ${deed} - taken by ${this.get_deed_owner(deed).name}`);
            return;
        }
    }

    house_buy(name, deed, cost) {
        //Jeżeli gracz jest właścicielem
        if(this.get_deed_owner(deed).name == name)
        {
            let d = this.get_deed_owner(deed).get_deed(deed);
            let prevHouses = d.houses;
            console.log(`${name} buys a house No. ${d.houses + 1} on ${deed} for ${cost}`);
            d.buy_house();
            //Jeżeli dokonano zakupu
            if(prevHouses < d.houses)
            {
                this.get_deed_owner(deed).cash -= cost;
            }
        }
    }

    is_full() {
        return Object.values(this.players).every((v, i, a) => v != undefined);
    }

    is_empty() {
        return Object.values(this.players).every((v, i, a) => v == undefined);
    }

    is_deed_taken(deed) {
        return Object.values(this.players).some((player) => {
            return player.is_deed_owner(deed);
        });
    }

    get_deed_owner(deed) {
        if(this.is_deed_taken(deed)) 
        {
            return Object.values(this.players).find((player) => {
                return player.is_deed_owner(deed);
            });
        }
        else return undefined;
    }
}

module.exports = { Game, Player };
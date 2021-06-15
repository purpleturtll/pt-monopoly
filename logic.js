const { risk, chance } = require("./riskAndChanceCards");

const data = {
    wilda1: {
        title: "Powiatowy Urząd Pracy",
        color: "0xffff00",
        price: 60,
        rent: 2,
        with_1: 10,
        with_2: 30,
        with_3: 90,
        with_4: 160,
        with_hotel: 250,
        house_cost: 50,
        hotel_cost: 70,
    },
    wilda2: {
        title: "AWF",
        color: "0xffff00",
        price: 80,
        rent: 4,
        with_1: 20,
        with_2: 60,
        with_3: 180,
        with_4: 320,
        with_hotel: 400,
        house_cost: 50,
        hotel_cost: 70,
    },
    wilda3: {
        title: "Avenida",
        color: "0xffff00",
        price: 90,
        rent: 6,
        with_1: 30,
        with_2: 90,
        with_3: 270,
        with_4: 400,
        with_hotel: 550,
        house_cost: 50,
        hotel_cost: 70,
    },

    lazarz1: {
        title: "Park Wilsona",
        color: "0xff2a2a",
        price: 100,
        rent: 6,
        with_1: 30,
        with_2: 90,
        with_3: 270,
        with_4: 400,
        with_hotel: 550,
        house_cost: 50,
        hotel_cost: 80,
    },
    lazarz2: {
        title: "Palmiarnia",
        color: "0xff2a2a",
        price: 130,
        rent: 8,
        with_1: 40,
        with_2: 100,
        with_3: 300,
        with_4: 450,
        with_hotel: 550,
        house_cost: 50,
        hotel_cost: 80,
    },
    lazarz3: {
        title: "MTP",
        color: "0xff2a2a",
        price: 150,
        rent: 10,
        with_1: 50,
        with_2: 150,
        with_3: 450,
        with_4: 625,
        with_hotel: 750,
        house_cost: 100,
        hotel_cost: 130,
    },

    ogrody1: {
        title: "Ogród UAM",
        color: "0x008000",
        price: 130,
        rent: 8,
        with_1: 40,
        with_2: 100,
        with_3: 300,
        with_4: 450,
        with_hotel: 550,
        house_cost: 50,
        hotel_cost: 80,
    },
    ogrody2: {
        title: "Rusałka",
        color: "0x008000",
        price: 150,
        rent: 10,
        with_1: 50,
        with_2: 150,
        with_3: 450,
        with_4: 625,
        with_hotel: 750,
        house_cost: 100,
        hotel_cost: 130,
    },

    solacz1: {
        title: "Uniwersytet Przyrodniczy",
        color: "0x660080",
        price: 160,
        rent: 12,
        with_1: 60,
        with_2: 180,
        with_3: 500,
        with_4: 700,
        with_hotel: 900,
        house_cost: 100,
        hotel_cost: 140,
    },
    solacz2: {
        title: "Park Sołacki",
        color: "0x660080",
        price: 180,
        rent: 14,
        with_1: 70,
        with_2: 200,
        with_3: 550,
        with_4: 700,
        with_hotel: 900,
        house_cost: 100,
        hotel_cost: 130,
    },

    winogrady1: {
        title: "Pływalnia Miejska",
        color: "0xff6600",
        price: 150,
        rent: 10,
        with_1: 50,
        with_2: 150,
        with_3: 450,
        with_4: 625,
        with_hotel: 750,
        house_cost: 100,
        hotel_cost: 130,
    },
    winogrady2: {
        title: "Cytadela",
        color: "0xff6600",
        price: 200,
        rent: 16,
        with_1: 80,
        with_2: 220,
        with_3: 600,
        with_4: 800,
        with_hotel: 1000,
        house_cost: 100,
        hotel_cost: 160,
    },

    piatkowo1: {
        title: "Orlik Chrobrego",
        color: "0x000080",
        price: 200,
        rent: 16,
        with_1: 80,
        with_2: 220,
        with_3: 600,
        with_4: 800,
        with_hotel: 1000,
        house_cost: 100,
        hotel_cost: 160,
    },
    piatkowo2: {
        title: "Wieża RTV",
        color: "0x000080",
        price: 220,
        rent: 18,
        with_1: 90,
        with_2: 250,
        with_3: 700,
        with_4: 875,
        with_hotel: 1050,
        house_cost: 150,
        hotel_cost: 170,
    },

    winiary1: {
        title: "Szpital Wojewódzki",
        color: "0xffcc00",
        price: 200,
        rent: 16,
        with_1: 80,
        with_2: 220,
        with_3: 600,
        with_4: 800,
        with_hotel: 1000,
        house_cost: 100,
        hotel_cost: 160,
    },
    winiary2: {
        title: "Pestka",
        color: "0xffcc00",
        price: 220,
        rent: 18,
        with_1: 90,
        with_2: 250,
        with_3: 700,
        with_4: 875,
        with_hotel: 1050,
        house_cost: 150,
        hotel_cost: 170,
    },
    winiary3: {
        title: "Plaza",
        color: "0xffcc00",
        price: 240,
        rent: 20,
        with_1: 100,
        with_2: 300,
        with_3: 750,
        with_4: 925,
        with_hotel: 1100,
        house_cost: 150,
        hotel_cost: 190,
    },

    jezyce1: {
        title: "Rynek Jeżycki",
        color: "0x00d400",
        price: 220,
        rent: 18,
        with_1: 90,
        with_2: 250,
        with_3: 700,
        with_4: 875,
        with_hotel: 1050,
        house_cost: 150,
        hotel_cost: 170,
    },
    jezyce2: {
        title: "Stare ZOO",
        color: "0x00d400",
        price: 250,
        rent: 20,
        with_1: 110,
        with_2: 330,
        with_3: 800,
        with_4: 975,
        with_hotel: 1150,
        house_cost: 150,
        hotel_cost: 190,
    },
    jezyce3: {
        title: "Hotel Mercure",
        color: "0x00d400",
        price: 280,
        rent: 24,
        with_1: 120,
        with_2: 360,
        with_3: 850,
        with_4: 1025,
        with_hotel: 1200,
        house_cost: 150,
        hotel_cost: 220,
    },

    lacina1: {
        title: "Malta",
        color: "0xc837ab",
        price: 250,
        rent: 20,
        with_1: 110,
        with_2: 330,
        with_3: 800,
        with_4: 975,
        with_hotel: 1150,
        house_cost: 150,
        hotel_cost: 190,
    },
    lacina2: {
        title: "Posnania",
        color: "0xc837ab",
        price: 280,
        rent: 24,
        with_1: 120,
        with_2: 360,
        with_3: 850,
        with_4: 1025,
        with_hotel: 1200,
        house_cost: 150,
        hotel_cost: 230,
    },

    piotrowo1: {
        title: "DS 1",
        color: "0xd45500",
        price: 280,
        rent: 24,
        with_1: 120,
        with_2: 360,
        with_3: 850,
        with_4: 1025,
        with_hotel: 1200,
        house_cost: 150,
        hotel_cost: 230,
    },
    piotrowo2: {
        title: "PUT Pozanań",
        color: "0xd45500",
        price: 330,
        rent: 28,
        with_1: 150,
        with_2: 450,
        with_3: 1000,
        with_4: 1200,
        with_hotel: 1400,
        house_cost: 200,
        hotel_cost: 250,
    },

    centrum1: {
        title: "Kino Apollo",
        color: "0xaa0000",
        price: 320,
        rent: 28,
        with_1: 150,
        with_2: 450,
        with_3: 1000,
        with_4: 1200,
        with_hotel: 1400,
        house_cost: 200,
        hotel_cost: 260,
    },
    centrum2: {
        title: "Teatr Wielki",
        color: "0xaa0000",
        price: 350,
        rent: 35,
        with_1: 175,
        with_2: 500,
        with_3: 1100,
        with_4: 1300,
        with_hotel: 1500,
        house_cost: 200,
        hotel_cost: 290,
    },

    s_miasto1: {
        title: "Stary Browar",
        color: "0x0066ff",
        price: 350,
        rent: 35,
        with_1: 175,
        with_2: 500,
        with_3: 1100,
        with_4: 1300,
        with_hotel: 1500,
        house_cost: 200,
        hotel_cost: 290,
    },
    s_miasto2: {
        title: "Ratusz",
        color: "0x0066ff",
        price: 400,
        rent: 50,
        with_1: 200,
        with_2: 600,
        with_3: 1400,
        with_4: 1700,
        with_hotel: 2000,
        house_cost: 200,
        hotel_cost: 300,
    },
};

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

function bankrupt_player(player) {
    player.cash = 0
    console.log(`${player.name} is bankrupt`);
    for (const k in player.deeds) {
        player.deeds[k].houses = 0
    }
    player.deeds.length = 0
    return player.deeds
}

class Player {
    constructor(name) {
        this.name = name;
        this.pos = 0;
        this.cash = 500;
        this.deeds = [];
        this.diceNr = 1;
        this.didRoll = [false, false];  // 1: czy już rzucał w tej turze, 2: czy właśnie rzucił
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

    buy_hotel() {
        if(this.houses == 4) {
            this.hotel = true;
            console.log(`Player now owns a hotel on ${this.name}`);
        }
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
        this.end_turn_event = "";
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
        let rolled = Math.floor(Math.random() * 6 + 1);
        this.players[this.turn].diceNr = rolled;
        this.players[this.turn].didRoll[0] = true;
        this.players[this.turn].didRoll[1] = true;
        this.players[this.turn].pos += rolled;
        this.players[this.turn].pos = this.players[this.turn].pos % 42;

        //Gracz przekroczył pole Start
        if(prevPos > this.players[this.turn].pos)
            this.players[this.turn].cash += 200;
            
        this.end_turn_event = ""
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
                    rentValue = currPlayer.cash;
                    bankrupt_player(currPlayer)
                }
                else {
                    console.log(`${currPlayer.name} pays ${rentValue} to ${owner.name}`);
                    currPlayer.cash -= rentValue;    
                }
                owner.cash += rentValue;
                
            }
        }

        // Pole szansy i ryzyka
        if (fieldType == "chance" || fieldType == "chest") {
            if (fieldType == "chance") {
                var randCard = chance[Math.floor(Math.random() * chance.length)]
            }
            else {
                var randCard = risk[Math.floor(Math.random() * risk.length)]
            }
            console.log("Card: ", randCard)

            // Sprawdzenie nowej pozycji
            let newPos = this.players[this.turn].pos
            if (randCard.position != undefined) {
                newPos = randCard.position
            }
            if (randCard.posRelative != undefined) {
                newPos += randCard.posRelative
                if (newPos < 0) {
                    newPos += 42
                }
                else if (newPos > 41) {
                    newPos -= 42
                }
            }
            // Pieniądze od innych graczy (póki co zawsze od 3)
            if (randCard.fromOthers != 0) {
                let sumFrom = 0
                for (let i = 0; i < 4; i++) {
                    console.log("turn: ", this.turn, "i: ", i)
                    if (i != this.turn) {
                        if (this.players[i].cash <= randCard.fromOthers) {
                            sumFrom += this.players[i].cash
                            bankrupt_player(this.players[i])
                        }
                        else {
                        this.players[i].cash -= randCard.fromOthers
                        sumFrom += randCard.fromOthers
                        }
                    }
                }
                    this.players[this.turn].cash += sumFrom
            }
            // Nagroda za przejście przez start
            if (newPos < this.players[this.turn].pos && randCard.doStart) {
                this.players[this.turn].cash += 200;
            }

            // Aktualizacja pozycji
            this.players[this.turn].pos = newPos
            // Aktualizacji ilości pieniędzy
            this.players[this.turn].cash += randCard.cashChange
            if (this.players[this.turn].cash <= 0) {
                bankrupt_player(this.players[this.turn])
            }
            this.end_turn_event = randCard
        }
        else {
            
            this.end_turn_event = ""
        }
        
        for (let i = 0; i < 4; i++) {
            this.players[i].didRoll[0] = false;
            this.players[i].didRoll[1] = false;
        }
        
        if (this.turn < 4) this.turn++;
        if (this.turn === 4) this.turn = 0;
        for (let i = 0; i < 4; i++) {   // tylko 4 razy dla uniknięcia nieskończonej pętli przy 4 bankrutach
            if (this.players[this.turn].cash <= 0) {
                this.turn++
                if (this.turn === 4) this.turn = 0
            }
        }

        let bankrupted = 0
        let winnerName = ""
        for (let i = 0; i < 4; i++) {
            if (this.players[i].cash > 0) {
                winnerName = this.players[i].name
            } 
            else {
                bankrupted++
            }
        }
        if (bankrupted == 3) {
            this.end_turn_event = winnerName
        }
    }

    buy(name, deed, cost) {
        let k = Object.keys(this.players).find(
            (key) => this.players[key].name === name
        );

        // Oznaczenie, że nie rzuca kością
        this.players[k].didRoll[1] = false;

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

        // Oznaczenie, że nie rzuca kością
        let k = Object.keys(this.players).find(
            (key) => this.players[key].name === name
        );
        this.players[k].didRoll[1] = false;
        
        //Jeżeli gracz jest właścicielem
        if( this.is_deed_taken(deed) 
            && this.get_deed_owner(deed).name == name 
            && this.get_deed_owner(deed).cash >= cost)
        {
            let d = this.get_deed_owner(deed).get_deed(deed);
            let prevHouses = d.houses;
            d.buy_house();
            //Jeżeli dokonano zakupu
            if(prevHouses < d.houses)
            {
                console.log(`${name} buys a house No. ${d.houses + 1} on ${deed} for ${cost}`);
                this.get_deed_owner(deed).cash -= cost;
            }
        }
    }

    hotel_buy(name, deed, cost) {

        // Oznaczenie, że nie rzuca kością
        let k = Object.keys(this.players).find(
            (key) => this.players[key].name === name
        );
        this.players[k].didRoll[1] = false;
 
        if( this.is_deed_taken(deed))
        {
            var owner = this.get_deed_owner(deed);
            if( owner.name == name 
                && owner.cash >= cost
                && !owner.get_deed(deed).hotel
                && owner.get_deed(deed).houses == 4)
            {
                owner.get_deed(deed).buy_hotel();
                owner.cash -= cost;
                console.log(`${name} buys a hotel on ${deed} for ${cost}`);
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

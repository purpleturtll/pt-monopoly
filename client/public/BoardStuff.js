/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { BoardPositions } from './config'
import { CardPopup, WinPopup } from "./CardPopup";

const Piece = (x, y, color) => {
  const circle = new PIXI.Graphics()
  circle.beginFill(color)
  circle.drawCircle(x, y, 11)
  circle.endFill()
  return circle
}

const House = (x, y, color, vertical) => {
  const rect = new PIXI.Graphics()
  rect.beginFill(color)
  if(vertical)
    rect.drawRoundedRect(x, y, 10, 20, 6)
  else
    rect.drawRoundedRect(x, y, 20, 10, 6)
  rect.endFill()
  return rect
}

export const BoardStuff = (board, app, socket, player_name) => {
  const cont = new PIXI.Container()

  // PIECES

  if (board.state.players[0] != undefined) {
    const p1 = Piece(
      BoardPositions[board.state.players[0].pos].x + 432,
      BoardPositions[board.state.players[0].pos].y + 20,
      0xff0000
    )
    cont.addChild(p1)
  }
  if (board.state.players[1] != undefined) {
    const p2 = Piece(
      BoardPositions[board.state.players[1].pos].x + 472,
      BoardPositions[board.state.players[1].pos].y + 20,
      0xff00ff
    )
    cont.addChild(p2)
  }
  if (board.state.players[2] != undefined) {
    const p3 = Piece(
      BoardPositions[board.state.players[2].pos].x + 432,
      BoardPositions[board.state.players[2].pos].y - 20,
      0x00ff00
    )
    cont.addChild(p3)
  }
  if (board.state.players[3] != undefined) {
    const p4 = Piece(
      BoardPositions[board.state.players[3].pos].x + 472,
      BoardPositions[board.state.players[3].pos].y - 20,
      0x1111ff
    )
    cont.addChild(p4)
  }

 // HOUSES

  // Dla 4 graczy renderuje domki każdego z nich na posiadanych polach
  var p;
  const houseOffset = 12;
  for(p = 0; p < 4; p++)
  {
    if(board.state.players[p] != undefined)
    {
      board.state.players[p].deeds.forEach(deed => {
        let x, y, horizontal, addOffset;
        switch(deed.name)
        {
          case 'wilda1':
            x = 1221;
            y = 647;
            horizontal = true;
            addOffset = true;
            break;
          case 'wilda2':
            x = 1085;
            y = 647;
            horizontal = true;
            addOffset = true;
            break;
          case 'wilda3':
            x = 1015;
            y = 647;
            horizontal = true;
            addOffset = true;
            break;
          case 'lazarz1':
            x = 883;
            y = 647;
            horizontal = true;
            addOffset = true;
            break;
          case 'lazarz2':
            x = 813;
            y = 647;
            horizontal = true;
            addOffset = true;
            break;
          case 'lazarz3':
            x = 740;
            y = 647;
            horizontal = true;
            addOffset = true;
            break;
          case 'ogrody1':
            x = 608;
            y = 647;
            horizontal = true;
            addOffset = true;
            break;
          case 'ogrody2':
            x = 537;
            y = 649;
            horizontal = true;
            addOffset = true;
            break;
          case 'solacz1':
            x = 529;
            y = 565;
            horizontal = false;
            addOffset = true;
            break;
          case 'solacz2':
            x = 529;
            y = 496;
            horizontal = false;
            addOffset = true;
            break;
          case 'winogrady1':
            x = 529;
            y = 360;
            horizontal = false;
            addOffset = true;
            break;
          case 'winogrady2':
            x = 529;
            y = 290;
            horizontal = false;
            addOffset = true;
            break;
          case 'piatkowo1':
            x = 529;
            y = 155;
            horizontal = false;
            addOffset = true;
            break;
          case 'piatkowo2':
            x = 529;
            y = 85;
            horizontal = false;
            addOffset = true;
            break;
          case 'winiary1':
            x = 623;
            y = 77;
            horizontal = true;
            addOffset = false;
            break;
          case 'winiary2':
            x = 753;
            y = 77;
            horizontal = true;
            addOffset = false;
            break;
          case 'winiary3':
            x = 830;
            y = 77;
            horizontal = true;
            addOffset = false;
            break;
          case 'jezyce1':
            x = 959;
            y = 77;
            horizontal = true;
            addOffset = false;
            break;
          case 'jezyce2':
            x = 1029;
            y = 77;
            horizontal = true;
            addOffset = false;
            break;
          case 'jezyce3':
            x = 1100;
            y = 77;
            horizontal = true;
            addOffset = false;
            break;
          case 'lacina1':
            x = 1233;
            y = 77;
            horizontal = true;
            addOffset = false;
            break;
          case 'lacina2':
            x = 1303;
            y = 77;
            horizontal = true;
            addOffset = false;
            break;
          case 'piotrowo1':
            x = 1303;
            y = 168;
            horizontal = false;
            addOffset = false;
            break;
          case 'piotrowo2':
            x = 1303;
            y = 238;
            horizontal = false;
            addOffset = false;
            break;
          case 'centrum1':
            x = 1303;
            y = 372;
            horizontal = false;
            addOffset = false;
            break;
          case 'centrum2':
            x = 1303;
            y = 442;
            horizontal = false;
            addOffset = false;
            break;
          case 's_miasto1':
            x = 1303;
            y = 578;
            horizontal = false;
            addOffset = false;
            break;
          case 's_miasto2':
            x = 1303;
            y = 648;
            horizontal = false;
            addOffset = false;
            break;
          default:
            x = 0;
            y = 0;
            horizontal = true;
            addOffset = true;
            break;
        }

        var houseColor;
        switch(p)
        {
          case 0:
            houseColor = 0xff0000;
            break;
          case 1:
            houseColor = 0xff00ff;
            break;
          case 2:
            houseColor = 0x00ff00;
            break;
          case 3: 
            houseColor = 0x1111ff;
            break;
        }

        if(deed.houses > 0)
        {
          var houseIndex;
          for(houseIndex = 1; houseIndex <= deed.houses; houseIndex++)
          {
            if(horizontal && addOffset)
            {
              const h = House(x + houseIndex * houseOffset, y, houseColor, horizontal)
              cont.addChild(h)
            }
            else if (!horizontal && addOffset)
            {
              const h = House(x, y + houseIndex * houseOffset, houseColor, horizontal)
              cont.addChild(h)
            }
            else if (horizontal && !addOffset)
            {
              const h = House(x - houseIndex * houseOffset, y, houseColor, horizontal)
              cont.addChild(h)
            }
            else
            {
              const h = House(x, y - houseIndex * houseOffset, houseColor, horizontal)
              cont.addChild(h)
            }
          }
        }
      });
    }
  }

  // Karta szansy/ryzyka
  if (board.state.end_turn_event != "") {
    if (typeof(board.state.end_turn_event) == "string") {
      const winPopup = WinPopup(0, 0, board.state.end_turn_event)
      cont.addChild(winPopup)
    }
    else {
      let playerNum = board.state.turn - 1
      if (playerNum < 0) {
        playerNum = 3
      }
      const cardPopup = CardPopup(0, 0, board.state.end_turn_event, board.state.players[playerNum].name)
      cont.addChild(cardPopup)
    }
  }

  return cont
}

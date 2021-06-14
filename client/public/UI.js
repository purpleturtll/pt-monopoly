/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { ButtonInactive } from './ButtonInactive'
import { BoardPositions } from './config'
import { data } from './CardTest'
import { Dice } from './Dice'

// Pionek przy UserFrame
const Piece = (x, y, color) => {
  const circle = new PIXI.Graphics()
  circle.beginFill(color)
  circle.drawCircle(x, y, 15)
  circle.endFill()
  return circle
}

const ActiveFrame = (x, y) => {
  const frame = new PIXI.Graphics()
  frame.x = x
  frame.y = y
  frame.beginFill(0x000)
  frame.drawRect(0, 0, 216, 85)
  frame.endFill()
  return frame
}

const UserFrame = (player_name = '-', c = '0', x, y) => {
  const frame = new PIXI.Graphics()
  frame.x = x
  frame.y = y
  frame.beginFill(0xb5bdb5)
  frame.drawRect(0, 0, 211, 80)
  frame.endFill()
  const name = new PIXI.Text(player_name, {
    align: 'center',
    fontSize: 24,
    fontWeight: '600'
  })
  name.resolution = 3
  name.x = frame.width / 2 - name.width / 2
  const cash = new PIXI.Text(c, {
    align: 'center',
    fontSize: 24,
    fontWeight: '200'
  })
  cash.resolution = 3
  cash.x = frame.width / 2 - cash.width / 2
  cash.y = 40

  frame.addChild(name, cash)

  return frame
}

export const UI = (board, app, socket, player_name, field) => {
  const cont = new PIXI.Container()

  let my_pos = 0

  // QUIT BUTTON
  const quit = Button(30, 380, 'WYJDŹ', () => {
    socket.emit('exit_room', board.state.room, player_name)
  })
  console.log(board)

  const af = ActiveFrame(
    board.state.turn == 0 || board.state.turn == 2 ? 10 : 231,
    board.state.turn == 0 || board.state.turn == 1 ? 40 : 130
  )
    cont.addChild(af)
  // USER FRAMES
  for (let i = 0; i < 4; i++) {
    console.log(board.state.players[i])
    if (board.state.players[i] != undefined) {
      if (board.state.players[i].name === player_name) {
        my_pos = board.state.players[i].pos
      }
      const uf = UserFrame(
        board.state.players[i].name,
        board.state.players[i].cash,
        i == 0 || i == 2 ? 10 : 231,
        i == 0 || i == 1 ? 40 : 130
      )
      switch (i) {
        case 0:
          var pieceColor = 0xff0000
          break
        case 1:
          var pieceColor = 0xff00ff
          break
        case 2:
          var pieceColor = 0x00ff00
          break
        default:
          var pieceColor = 0x1111ff
      }
      const piece = Piece(
        i == 0 || i == 2 ? 40 : 261,
        i == 0 || i == 1 ? 80 : 170,
        pieceColor
      )
      cont.addChild(uf, piece)
    } else {
      const uf = UserFrame(
        '-',
        '0',
        i == 0 || i == 2 ? 10 : 231,
        i == 0 || i == 1 ? 40 : 130
      )
      cont.addChild(uf)
    }
  }

  let rolledNr = 0
  let didRoll = [false, false]
  for (let i = 0; i < 4; i++) {
    if (board.state.players[i] != undefined) {
      if (board.state.players[i].name === player_name) {
        rolledNr = board.state.players[i].diceNr
        didRoll = board.state.players[i].didRoll
      }
    }
  }

  if (board.state.my_turn) {
    // ROLL DICE and BUY
    if (didRoll[0]) {
      if (BoardPositions[my_pos].type == 'deed') {
        const buy = Button(30, 340, 'KUP POLE', () => {
          console.log(
            player_name,
            BoardPositions[my_pos].name,
            data[BoardPositions[my_pos].name].price
          )
          socket.emit(
            'buy',
            board.state.room,
            player_name,
            BoardPositions[my_pos].name,
            data[BoardPositions[my_pos].name].price
          )
        })
        cont.addChild(buy)
      } else {
        const buy = ButtonInactive(30, 340, 'KUP POLE')
        cont.addChild(buy)
      }
      const roll = ButtonInactive(30, 300, 'RZUT KOSTKĄ')
      cont.addChild(roll)
    } else {
      const buy = ButtonInactive(30, 340, 'KUP POLE')
      const roll = Button(30, 300, 'RZUT KOSTKĄ', () => {
        socket.emit('roll_dice', board.state.room, player_name)
      })
      cont.addChild(roll, buy)
    }

    // END TURN
    if (didRoll[0]) {
        const end_turn = Button(240, 300, 'ZAKOŃCZ TURĘ', () => {
            socket.emit('end_turn', board.state.room, player_name)
          })
        cont.addChild(end_turn)
    } 
    else {
        const end_turn = ButtonInactive(255, 300, 'ZAKOŃCZ TURĘ')
        cont.addChild(end_turn)
    }

    // DICE
    const dice = Dice(30, 460, rolledNr, didRoll[1])

    const buy_house = Button(240, 340, 'KUP DOM', () => {
      socket.emit(
        'house_buy',
        board.state.room,
        player_name,
        BoardPositions[my_pos].name,
        data[BoardPositions[my_pos].name].house_cost
      )
    })

    cont.addChild(dice, buy_house)
  } else {
    // ROLL DICE
    const roll = ButtonInactive(30, 300, 'RZUT KOSTKĄ')

    // END TURN
    const end_turn = ButtonInactive(255, 300, 'ZAKOŃCZ TURĘ')

    // BUY
    const buy = ButtonInactive(30, 340, 'KUP POLE')

    // DICE
    const dice = Dice(30, 460, rolledNr, false)

    // BUY HOUSE
    const buy_house = ButtonInactive(255, 340, 'KUP DOM')

    cont.addChild(roll, end_turn, buy, dice, buy_house)
  }

  cont.addChild(quit)

  return cont
}

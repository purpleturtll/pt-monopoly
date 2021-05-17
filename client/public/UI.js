/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { ButtonInactive } from './ButtonInactive'
import { BoardPositions } from './config'

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

  // QUIT BUTTON
  const quit = Button(10, 400, 'QUIT', () => {
    socket.emit('exit_room', board.state.room, player_name)
    app.state.inGame = false
  })

  // USER FRAMES
  for (let i = 0; i < 4; i++) {
    if (board.state.players[i] != undefined) {
      const uf = UserFrame(
        board.state.players[i].name,
        board.state.players[i].cash,
        i == 0 || i == 2 ? 10 : 231,
        i == 0 || i == 1 ? 40 : 130
      )
      cont.addChild(uf)
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

  if (board.state.my_turn) {
    // ROLL DICE
    const roll = Button(10, 300, 'ROLL', () => {
      socket.emit('roll_dice', board.state.room, player_name)
    })

    // END TURN
    const end_turn = Button(240, 300, 'END TURN', () => {
      socket.emit('end_turn', board.state.room, player_name)
    })
    cont.addChild(roll, end_turn)
  } else {
    // ROLL DICE
    const roll = ButtonInactive(10, 300, 'ROLL')

    // END TURN
    const end_turn = ButtonInactive(240, 300, 'END TURN')
    cont.addChild(roll, end_turn)
  }

  cont.addChild(quit)

  return cont
}

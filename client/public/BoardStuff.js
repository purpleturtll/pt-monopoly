/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { BoardPositions } from './config'

const Piece = (x, y, color) => {
  const circle = new PIXI.Graphics()
  circle.beginFill(color)
  circle.drawCircle(x, y, 11)
  circle.endFill()
  return circle
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
  return cont
}

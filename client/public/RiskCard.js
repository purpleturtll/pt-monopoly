/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'

const scale = 3

export const RiskCard = (x = 0, y = 0, risk) => {
  const cont = new PIXI.Container()
  cont.x = x
  cont.y = y

  // Tło
  const bg = new PIXI.Graphics()
  bg.beginFill(0xffd42a)
  bg.drawRect(0, 0, 87 * scale, 56 * scale)
  bg.endFill()
  bg.interactive = true
  bg.buttonMode = true
  bg.on('pointerdown', () => {})

  // Prostokąt tytułowy
  const title = new PIXI.Graphics()
  title.x = bg.width * 0.05
  title.y = bg.height * 0.1
  title.beginFill(0xffffff)
  title.drawRect(0, 0, bg.width * 0.9, bg.height * 0.8)
  title.endFill()

  const titleText = new PIXI.Text('RYZYKO', {
    align: 'center',
    fontSize: 16,
    fontWeight: '600'
  })
  titleText.resolution = scale
  titleText.x = title.width / 2 - titleText.width / 2
  titleText.y = (title.height * 0.1)
  title.addChild(titleText)

  const description = new PIXI.Text(risk.info, {
    align: 'center',
    fontSize: 15,
    fontWeight: 'normal'
  })
  description.resolution = scale
  description.x = title.width / 2 - description.width / 2
  description.y = (title.height - description.height) / 2 + description.height * 0.1
  title.addChild(description)

  cont.addChild(bg, title)
  return cont
}

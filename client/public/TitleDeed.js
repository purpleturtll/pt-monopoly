/* eslint-disable camelcase */
import * as PIXI from 'pixi.js'

const scale = 3

export const TitleDeed = (x = 0, y = 0, data) => {
  const cont = new PIXI.Container()
  cont.x = x
  cont.y = y

  // Tło
  const bg = new PIXI.Graphics()
  bg.beginFill(0xffffff)
  bg.drawRect(0, 0, 56 * scale, 87 * scale)
  bg.endFill()
  bg.interactive = true
  bg.buttonMode = true
  bg.on('pointerdown', () => {})

  // Prostokąt tytułowy
  const title = new PIXI.Graphics()
  title.x = bg.width * 0.05
  title.y = bg.height * 0.05
  title.beginFill(data.color)
  title.drawRect(0, 0, bg.width * 0.9, bg.height * 0.2)
  title.endFill()

  const titleText = new PIXI.Text(data.title.toUpperCase(), {
    align: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  })
  titleText.x = title.width / 2 - titleText.width / 2
  titleText.y = (title.height - titleText.height) / 2
  title.addChild(titleText)

  const rent = new PIXI.Text('CZYNSZ $' + data.rent, {
    align: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  })
  rent.y = bg.height * 0.26
  rent.x = bg.width / 2 - rent.width / 2
  bg.addChild(rent)

  const with_1 = new PIXI.Text('Z jednym domem', {
    fontSize: 12
  })
  with_1.y = bg.height * 0.33
  with_1.x = bg.width * 0.05
  bg.addChild(with_1)

  const with_1_cost = new PIXI.Text('$' + data.with_1, {
    fontSize: 12
  })
  with_1_cost.anchor.set(1, 0)
  with_1_cost.y = bg.height * 0.33
  with_1_cost.x = bg.width * 0.95
  bg.addChild(with_1_cost)

  const with_2 = new PIXI.Text('Z dwoma domami', {
    fontSize: 12
  })
  with_2.y = bg.height * 0.4
  with_2.x = bg.width * 0.05
  bg.addChild(with_2)

  const with_2_cost = new PIXI.Text('$' + data.with_2, {
    fontSize: 12
  })
  with_2_cost.anchor.set(1, 0)
  with_2_cost.y = bg.height * 0.4
  with_2_cost.x = bg.width * 0.95
  bg.addChild(with_2_cost)

  const with_3 = new PIXI.Text('Z trzema domami', {
    fontSize: 12
  })
  with_3.y = bg.height * 0.47
  with_3.x = bg.width * 0.05
  bg.addChild(with_3)

  const with_3_cost = new PIXI.Text('$' + data.with_3, {
    fontSize: 12
  })
  with_3_cost.anchor.set(1, 0)
  with_3_cost.y = bg.height * 0.47
  with_3_cost.x = bg.width * 0.95
  bg.addChild(with_3_cost)

  const with_4 = new PIXI.Text('Z czterema domami', {
    fontSize: 12
  })
  with_4.y = bg.height * 0.54
  with_4.x = bg.width * 0.05
  bg.addChild(with_4)

  const with_4_cost = new PIXI.Text('$' + data.with_4, {
    fontSize: 12
  })
  with_4_cost.anchor.set(1, 0)
  with_4_cost.y = bg.height * 0.54
  with_4_cost.x = bg.width * 0.95
  bg.addChild(with_4_cost)

  const with_hotel = new PIXI.Text('Z HOTELEM', {
    fontSize: 12
  })
  with_hotel.y = bg.height * 0.61
  with_hotel.x = bg.width * 0.05
  bg.addChild(with_hotel)

  const with_hotel_cost = new PIXI.Text('$' + data.with_hotel, {
    fontSize: 12
  })
  with_hotel_cost.anchor.set(1, 0)
  with_hotel_cost.y = bg.height * 0.61
  with_hotel_cost.x = bg.width * 0.95
  bg.addChild(with_hotel_cost)

  const house_cost = new PIXI.Text(
    'Ceny domów: $' + data.house_cost + ' każdy',
    {
      fontSize: 12
    }
  )
  house_cost.y = bg.height * 0.7
  house_cost.x = bg.width / 2 - house_cost.width / 2
  bg.addChild(house_cost)

  const hotel_cost = new PIXI.Text(
    'Ceny hoteli: $' + data.hotel_cost + ' każdy\nplus wartość 4 domów',
    {
      align: 'center',
      fontSize: 12
    }
  )
  hotel_cost.y = bg.height * 0.8
  hotel_cost.x = bg.width / 2 - hotel_cost.width / 2
  bg.addChild(hotel_cost)

  cont.addChild(bg, title)
  return cont
}

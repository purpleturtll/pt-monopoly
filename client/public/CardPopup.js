import * as PIXI from 'pixi.js'
import { ChanceCard } from './ChanceCard.js'
import { RiskCard } from './RiskCard.js'

export const CardPopup = (x, y, card, playerName) => {
    const cont = new PIXI.Container()
    cont.interactive = true;
    cont.buttonMode = true;
    cont.on('pointerdown', onClick)
  
    // przy kliknięciu
    function onClick() {
      cont.removeChildren()
      cont.visible = false
  }

    // Screen dim
    const alphafilter = new PIXI.filters.AlphaFilter()
    const dim = new PIXI.Graphics()
    dim.beginFill(0x0a0a0a)
    dim.drawRect(x, y, 1400, 744)
    dim.filters = [alphafilter]
    alphafilter.alpha = 0.5
    dim.endFill()
  
    // Card
    if (card.type == 'risk') {
      var sCard = RiskCard(dim.width / 2 - 130, dim.height / 2 - 84, card)
    }
    else {
      var sCard = ChanceCard(dim.width / 2 - 130, dim.height / 2 - 84, card)
    }
  
    // Player name
    const name = new PIXI.Text(playerName, {
      fontSize: 36,
      fill: ['#ffffff'],
    });
    name.resolution = 3
    name.x = dim.width / 2 - name.width / 2
    name.y = dim.height / 2 - 134
    cont.addChild(dim)
    cont.addChild(sCard)
    cont.addChild(name)

    return cont
  }

  const WinCard = (x = 0, y = 0, playerName) => {
    const cont = new PIXI.Container()
    cont.x = x
    cont.y = y
  
    // Tło
    const bg = new PIXI.Graphics()
    bg.beginFill(0x8660f0)
    bg.drawRect(0, 0, 260, 170)
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
  
    const titleText = new PIXI.Text('WYGRYWA\n' + playerName, {
      align: 'center',
      fontSize: 16,
      fontWeight: '600'
    })
    titleText.resolution = 3
    titleText.x = title.width / 2 - titleText.width / 2
    titleText.y = (title.height * 0.1)
    title.addChild(titleText)
    cont.addChild(bg, title)
    return cont
  }

export const WinPopup = (x, y, playerName) => {
  const cont = new PIXI.Container()
      cont.interactive = true;
      cont.buttonMode = true;
      cont.on('pointerdown', onClick)
    
      // przy kliknięciu
      function onClick() {
        cont.removeChildren()
        cont.visible = false
    }
  
      // Screen dim
      const alphafilter = new PIXI.filters.AlphaFilter()
      const dim = new PIXI.Graphics()
      dim.beginFill(0x0a0a0a)
      dim.drawRect(x, y, 1400, 744)
      dim.filters = [alphafilter]
      alphafilter.alpha = 0.5
      dim.endFill()
    
      // Player name
      const name = new PIXI.Text(playerName + "\nWYGRYWA", {
        fontSize: 60,
        fill: ['#ff0000'],
        stroke: '#050505',
        strokeThickness: 3,
        align : 'center',
      });
      name.resolution = 3
      name.x = dim.width / 2 - name.width / 2
      name.y = dim.height / 2 - 134

      cont.addChild(dim)
      cont.addChild(name)
  
      return cont
  }
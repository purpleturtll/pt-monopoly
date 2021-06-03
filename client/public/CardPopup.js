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

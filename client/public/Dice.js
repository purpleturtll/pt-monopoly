import * as PIXI from 'pixi.js'

export const Dice = (x, y, num, doAnim=false) => {
    const cont = new PIXI.Container()
    cont.x = x
    cont.y = y
  
    var textures = [
        PIXI.Texture.from('./dice/dice-01.png'),
        PIXI.Texture.from('./dice/dice-02.png'),
        PIXI.Texture.from('./dice/dice-03.png'),
        PIXI.Texture.from('./dice/dice-04.png'),
        PIXI.Texture.from('./dice/dice-05.png'),
        PIXI.Texture.from('./dice/dice-06.png')
    ]
    
    const dice = new PIXI.Sprite(textures[num - 1])
    dice.x = 0
    dice.y = 0
    cont.addChild(dice)

    function Shuffle(i) {
        var r = Math.floor(Math.random() * 6);
        dice.texture = textures[r]
        if (i > 0) {
            setTimeout(function() {Shuffle(i-1)}, 120 + (11-i) * (11-i))
        }
        else if (i == 0) {
            dice.texture = textures[num - 1]
        }
    }

    if (doAnim) {
        Shuffle(10)
    }

    return cont
  }
  
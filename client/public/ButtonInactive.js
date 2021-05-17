import * as PIXI from "pixi.js";

export const ButtonInactive = (
    x = 0,
    y = 0,
    text = "",
    onclick = () => {},
    w = 200,
    h = 30,
    color = 0xde3249
) => {
    const cont = new PIXI.Container();
    cont.x = x;
    cont.y = y;
    const bg = new PIXI.Graphics();
    bg.lineStyle(3, 0x111111, 1);
    bg.beginFill(color);
    bg.drawRect(0, 0, w, h);
    bg.endFill();
    //bg.interactive = true;
    bg.buttonMode = true;
    //bg.on("pointerdown", onclick);
    const txt = new PIXI.Text(text);
    cont.addChild(bg, txt);
    return cont;
};

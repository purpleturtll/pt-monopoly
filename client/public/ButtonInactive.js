import * as PIXI from "pixi.js";

export const ButtonInactive = (
    x = 0,
    y = 0,
    text = "",
    onclick = () => {},
    w = 160,
    h = 30,
    color = 0xfcbf49
) => {
    const cont = new PIXI.Container();
    cont.x = x;
    cont.y = y;
    const bg = new PIXI.Graphics();
    bg.lineStyle(3, 0x111111, 1);
    bg.beginFill(color);
    bg.drawRoundedRect(0, 0, w, h, 15);
    bg.endFill();
    //bg.interactive = true;
    bg.buttonMode = true;
    //bg.on("pointerdown", onclick);

    const style = new PIXI.TextStyle({
        fontFamily: 'Tahoma',
        fontSize: 18,
    });

    const txt = new PIXI.Text(text, style);
    txt.x = 10;
    txt.y = 5;
    cont.addChild(bg, txt);
    return cont;
};

import * as PIXI from "pixi.js";

export let app = new PIXI.Application({
  width: 700,
  height: 700,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

document.getElementById("app").appendChild(app.view);

const board = new PIXI.Container();

import Tiles from './tiles.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;


let tiles = new Tiles(15, canvas, ctx);
tiles.randomTile.v = Math.random() > 0.9 ? 4 : 2;
tiles.randomTile.v = Math.random() > 0.9 ? 4 : 2;
tiles.draw();

let arrows = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
}

window.onkeydown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === arrows.up) {
        tiles.upArrow()
    }
    if (e.keyCode === arrows.left) {
        tiles.leftArrow()
    }
}

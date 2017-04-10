let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/** Fin de definicion de Globales y clases */
let moves = [];
let i = 0;
let ball1 = new Ball({ x: 100, y: 100 }, 5, 'red');
let ball2 = new Ball({ x: 125, y: 100 }, 5, 'blue');
moves.push(new BallMove(ball1, { x: 100, y: 101 }, 0, ctx));
moves.push(new BallMove(ball2, { x: 125, y: 100 }, 0, ctx));
let req = window.requestAnimationFrame(draw);
function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    i++;
    moves.forEach((move) => {
        move.newPos();
    });
    if (i > 100000000) {
        window.cancelAnimationFrame(req);
        return;
    }
    window.requestAnimationFrame(draw);
}
document.getElementById('set').addEventListener('click', () => {
    let x = parseInt(document.getElementById('x').value);
    let y = parseInt(document.getElementById('y').value);
    let s = parseInt(document.getElementById('s').value);
    moves[0].setTarget({ x: x, y: y }, s);
    console.log(moves[0].speedX);
}, false);

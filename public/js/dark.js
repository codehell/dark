let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/** Fin de definicion de Globales y clases */
let balls = [];
let i = 0;
function genBalls() {
    let ballPoint = new Point(canvas.width - 10, canvas.height - 10);
    let color = Math.random() < 0.5 ? 'grey' : 'blue';
    let ball = new Ball(ballPoint, 10, color);
    let target = new Point(Math.random() * canvas.width, Math.random() * canvas.height);
    let mov = new BallMove(ball, target, 5, ctx);
    balls.push(mov);
}
let req = window.requestAnimationFrame(draw);
function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (i % 3 == 0 && i < 50) {
        genBalls();
    }
    balls.forEach(function (mov) {
        let collisioners = balls.slice(0);
        collisioners.splice(balls.indexOf(mov), 1);
        mov.newPos();
        collisioners.forEach(function (m) {
            console.log(m);
            //mov.ballCollision()
        });
    });
    i++;
    if (i > 10) {
        window.cancelAnimationFrame(req);
        return;
    }
    window.requestAnimationFrame(draw);
}

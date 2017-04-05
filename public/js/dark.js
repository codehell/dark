let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Move {
    constructor(element, target, speed, ctx) {
        this.element = element;
        this.setTarget(target, speed);
        this.ctx = ctx;
    }
    setTarget(target, speed) {
        this.xRange = target.x - this.element.point.x;
        this.yRange = target.y - this.element.point.y;
        this.speed = speed;
        this.line = Math.sqrt(Math.pow(this.xRange, 2) + Math.pow(this.yRange, 2));
        this.delay = this.line / this.speed;
        this.speedX = this.xRange / this.delay;
        this.speedY = this.yRange / this.delay;
    }
    newPos() {
        this.element.point.x += this.speedX;
        this.element.point.y += this.speedY;
        this.element.draw(this.ctx);
    }
}
class Ball {
    constructor(point, rad) {
        this.point = point;
        this.rad = rad;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, this.rad, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.closePath();
        ctx.fill();
    }
}
let balls = [];
let bottom = canvas.height;
let i = 0;
function generate() {
    let point = new Point(canvas.width - 10, canvas.height - 10);
    let ball = new Ball(point, 10);
    let target = new Point(20, bottom = bottom - 10);
    let mov = new Move(ball, target, 1, ctx);
    balls.push(mov);
}
function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (i % 100 == 0) {
        generate();
    }
    balls.forEach(function (mov) {
        mov.newPos();
    });
    console.log(time);
    i++;
    if (i > 100000)
        return;
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

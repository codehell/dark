class Move {
    constructor(figure, target, speed, ctx) {
        this.figure = figure;
        this.target = target;
        this.setTarget(this.target, speed);
        this.ctx = ctx;
    }
    setTarget(target, speed) {
        let xRange = this.target.x - this.figure.point.x;
        let yRange = this.target.y - this.figure.point.y;
        this.speed = speed;
        let line = Math.sqrt(Math.pow(xRange, 2) + Math.pow(yRange, 2));
        let delay = 0;
        if (this.speed === 0) {
            delay = 0;
        }
        else {
            delay = line / this.speed;
        }
        if (delay === 0) {
            this.speedX = 0;
            this.speedY = 0;
        }
        else {
            this.speedX = xRange / delay;
            this.speedY = yRange / delay;
        }
    }
    newPos() {
        this.figure.point.x += this.speedX;
        this.figure.point.y += this.speedY;
        this.figure.draw(this.ctx);
        this.wallCollision();
    }
}
class BallMove extends Move {
    constructor(figure, target, speed, ctx) {
        super(figure, target, speed, ctx);
        this.collisioned = false;
    }
    wallCollision() {
        if (this.figure.point.x - this.figure.rad < 0
            || this.figure.point.x + this.figure.rad > 800) {
            this.speedX = -this.speedX;
        }
        if (this.figure.point.y - this.figure.rad < 0
            || this.figure.point.y + this.figure.rad > 600) {
            this.speedY = -this.speedY;
        }
    }
}

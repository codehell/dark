class Figure {
    constructor(point, color) {
        this.point = point;
        this.color = color;
    }
}
class Ball extends Figure {
    constructor(point, rad, color) {
        super(point, color);
        this.rad = rad;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, this.rad, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.fill();
    }
}
class Rectangle extends Figure {
    constructor(point, width, height, color) {
        super(point, color);
        this.width = width;
        this.height = height;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.point.x, this.point.y, this.width, this.height);
        ctx.closePath();
    }
}

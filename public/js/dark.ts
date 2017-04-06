let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas')
let ctx = canvas.getContext('2d')
class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
class Move {
  figure: Figure
  target: Point
  speed: number
  speedX: number
  speedY: number
  ctx: CanvasRenderingContext2D
  constructor (figure, target, speed, ctx) {
    this.figure = figure
    this.target = target
    this.setTarget(this.target, speed)
    this.ctx = ctx
  }
  setTarget (target: Point, speed:number) {
    let xRange = this.target.x - this.figure.point.x
    let yRange = this.target.y - this.figure.point.y
    this.speed = speed
    let line = Math.sqrt(Math.pow(xRange, 2) + Math.pow(yRange, 2))
    let delay = line / this.speed
    this.speedX = xRange / delay
    this.speedY = yRange / delay
  }
  newPos () {
    this.figure.point.x += this.speedX
    this.figure.point.y += this.speedY
    this.figure.draw(this.ctx)
    this.wallCollision()
  }
  wallCollision () {
    if (this.figure.point.x - 10 < 0 || this.figure.point.x + 10 > 800) {
      this.speedX = -this.speedX
    }
    if (this.figure.point.y - 10 < 0 || this.figure.point.y + 10 > 600) {
      this.speedY = -this.speedY
    }
  }
}

class MoveBall extends Move {

}
abstract class Figure {
  point: Point
  color: string
  constructor (point, color) {
    this.point = point
    this.color = color
  }
  abstract draw (ctx): void
}
class Rectangle extends Figure {
  point: Point
  color: string
  width: number
  height: number
  constructor (point, width, height, color) {
    super (point, color)
    this.width = width
    this.height = height
  }
  draw (ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.point.x, this.point.y, this.width, this.height)
    ctx.closePath()
  }
}
class Ball extends Figure{
  point: Point
  rad: number
  color: string
  constructor (point, rad, color) {
    super (point, color)
    this.rad = rad

  }
  draw (ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.point.x, this.point.y, this.rad, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.closePath()
    ctx.fill()
  }
}

/** Fin de definicion de Globales y clases */
let balls: Move[] = []
let squares: Move[] = []
let i = 0;
function genSquares () {
  let squarePoint = new Point(canvas.width - 10, canvas.height - 10)
  let square = new Rectangle(squarePoint, 10, 10, 'red')
  let target = new Point(Math.random() * canvas.width, Math.random() * canvas.height)

  console.log(target.x)
  let mov = new Move(square, target, 2, ctx)
  squares.push(mov)
}

function genBalls () {
  let ballPoint: Point = new Point(canvas.width - 10, canvas.height - 10)
  let color = Math.random() < 0.5 ? 'grey' : 'white'
  let ball: Figure = new Ball(ballPoint, 10, color)

  let target = new Point(Math.random() * canvas.width, Math.random() * canvas.height)
  let mov = new Move(ball, target, 3, ctx)
  balls.push(mov)
}

let req = window.requestAnimationFrame(draw)

function draw (time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (i % 3 == 0) {
    genBalls()
    genSquares()
  }
  balls.forEach(function (mov) {
    mov.newPos()
  })
  squares.forEach(function (mov) {
    mov.newPos()
  })
  i++;
  if (i > 10000) {
    window.cancelAnimationFrame(req);
    return
  }
  window.requestAnimationFrame(draw);
}

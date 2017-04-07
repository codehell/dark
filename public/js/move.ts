abstract class Move {
  figure: Figure
  target: Point
  speed: number
  speedX: number
  speedY: number
  ctx: CanvasRenderingContext2D
  collisioned: boolean
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
  abstract wallCollision ()
}

class BallMove extends Move {
  figure: Ball
  target: Point
  speed: number
  speedX: number
  speedY: number
  ctx: CanvasRenderingContext2D
  collisioned: boolean = false
  constructor (figure, target, speed, ctx) {
    super(figure, target, speed, ctx)
  }
  wallCollision () {
    if (
      this.figure.point.x - this.figure.rad < 0
      || this.figure.point.x + this.figure.rad > 800
    ) {
      this.speedX = -this.speedX
    }
    if (
      this.figure.point.y - this.figure.rad < 0
      || this.figure.point.y + this.figure.rad > 600
    ) {
      this.speedY = -this.speedY
    }
  }
  ballCollision (move: Move) {
    if ((Math.abs(this.figure.point.x) - Math.abs(move.figure.point.x)) < this.figure.rad) {
      this.collisioned = true
    }
  }
}

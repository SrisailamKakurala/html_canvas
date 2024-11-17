
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

var gravity = 1;
var friction = 0.8;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', () => {
  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.stroke();
    c.strokeStyle = 'white'
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy * friction;
    }else{
      this.dy += gravity;
    }

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

// Implementation
var ball;
var ballArray = []
var colorArray= ['#D99B84', '#F2C6B6', '#A60303', '#730202', '#400101']
function init() {
  // to prevent from ball overlow when page resize event is occured 
  ballArray = []
  for(var i=0; i<200; i++){
    var x = randomIntFromRange(radius+10, canvas.width - radius);
    var y = randomIntFromRange(0, canvas.height - radius);
    var dx = randomIntFromRange(-2,2);
    var radius = randomIntFromRange(10, 25)
    var color = (Math.floor(Math.random() * 10)) - 5; 
    ballArray.push(new Ball(x, y, dx, 2, radius, colorArray[color]));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height)

  for(var i=0; i<ballArray.length; i++){
    ballArray[i].update();
  }
}

init()
animate()



// utils

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

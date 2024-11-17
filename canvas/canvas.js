var canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// // c = context
var c = canvas.getContext('2d');
// // c.fillRect(x ,y, width, height)
// // x = from left of x-axis
// // y = from top of y-axis
// // rect width and height
// // c.fillStyle = 'red';
// // c.fillRect(100, 100, 200, 200)
// // c.fillStyle = 'green';
// // c.fillRect(300, 300, 200, 200)
// // c.fillStyle = '#000';
// // c.fillRect(500, 100, 200, 200)


// // line

// // c.beginPath();
// // c.moveTo(50, 350); // x,y
// // c.lineTo(350, 50); // x,y
// // c.lineTo(350, 350);
// // c.lineTo(50, 350);
// // c.lineTo(50, 50);
// // c.lineTo(350, 50);
// // c.strokeStyle = 'white'
// // c.stroke();




// // Arc / circle
// // c.beginPath();
// // c.strokeStyle = 'black'
// // c.arc(300, 300, 30, 0, Math.PI * 2, false);
// // c.stroke();

// let colors = ['red', 'blue', 'lime', 'black', 'yellow', 'pink', 'violet', 'green', 'purple', 'orange'];
// for (var i = 0; i < 200; i++) {
//     var x = Math.random()*window.innerWidth;
//     var y = Math.random()*window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.fillStyle = colors[Math.floor(Math.random() * 10)]; // Use fillStyle instead of strokeStyle for filling
//     c.fill(); // Fill the circle
//     c.stroke();
// }


var mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('mousemove', (dets) => {
    mouse.x = dets.x;
    mouse.y = dets.y;
})

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    inti();
})

var circleMaxHoverRadius = 50;

function Circle(x, y, dx, dy, radius, Color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.Color = Color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.Color;
        c.fill();
        c.stroke();
    }



    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 50) {
                this.radius += 1;
            }
        }
        else if (this.radius > Math.floor(Math.random() * 10)) {
            this.radius -= 1;
        }

        this.draw();
    }
}



var circleArray = [];
function init() {

    circleArray = [];
    for (var i = 0; i < 1500; i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() * 2);
        var dy = (Math.random() * 2);
        var radius = Math.floor(Math.random() * 10);
        let colors = ['#304EF2', '#061440', '#142B73', '#3574F2', '#032026'];
        var circle = new Circle(x, y, dx, dy, radius, colors[Math.floor(Math.random() * colors.length)]);
        circleArray.push(circle);
    }

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}


animate();
init();

//Setup
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//Function to generate a random number
function randomBetween(min, max){
    return Math.random()* (max - min) + min;
}

//Array for circles
let circles = [];

//Colors
const colors = ["#800080", "#0F0F0F", "#EFBF04"];
document.body.style.backgroundColor = "black";

//Circle data
function initCircles(){
    //make circle, count per screen width
    circles = [];
    let circleCount = window.innerWidth / 100;

    //loop for circles
    for (let i = 0; i < circleCount; i++){
        let radius = window.innerWidth /4;

        //Random Position
        let x = randomBetween(radius, canvas.width -  radius);
        let y = randomBetween(radius, canvas.height -  radius);

        //Speed
        let dx = randomBetween(window.innerWidth / -2000, window.innerWidth / 2000);
        let dy = randomBetween(window.innerWidth / -2000, window.innerWidth / 2000);
        let color = colors[Math.floor(Math.random() * colors.length)];

        //New Data for Array
        circles.push({x, y, dx, dy, radius, color});
    }
}

//Draw Circles
function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

//Animation
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Loop
    circles.forEach(circle => {
        //Edge bounce X
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0){
            circle.dx = -circle.dx;
        }
        //Edge bounce Y
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0){
            circle.dy = -circle.dy;
        }
        //Keep moving if else
        circle.x += circle.dx;
        circle.y += circle.dy;
        //Redraw for continues motion
        drawCircle(circle);
    });
}

//Fullscreen (slightly over scale)
function resizeCanvas(){
    canvas.width = window.innerWidth * 1.5;
    canvas.height = window.innerHeight * 1.5;
    initCircles();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
initCircles();
animate();
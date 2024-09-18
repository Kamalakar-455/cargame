const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load the car images
const playerCar = new Image();
playerCar.src = 'download.png'; 

const obstacleImages = [new Image(), new Image()];
obstacleImages[0].src = 'kka.png'; 
obstacleImages[1].src = 'kka.png'; 

const friendNames = ['Bunty', 'Ramu', 'Vinod']; 

let carWidth = 100;
let carHeight = 100;
let carX = canvas.width / 2 - carWidth / 2; 
let carY = canvas.height - carHeight - 10;  

let leftPressed = false;
let rightPressed = false;

const obstacles = [];
let obstacleSpeed = 2;
let gameOver = false;
let score = 0;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowLeft') leftPressed = true;
    else if (e.key === 'ArrowRight') rightPressed = true;
}

function keyUpHandler(e) {
    if (e.key === 'ArrowLeft') leftPressed = false;
    else if (e.key === 'ArrowRight') rightPressed = false;
}

function drawCar() {
    ctx.drawImage(playerCar, carX, carY, carWidth, carHeight);

    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.strokeText('kamalakar', carX + carWidth / 2, carY + carHeight - 10);
    ctx.fillText('kamalakar', carX + carWidth / 2, carY + carHeight - 10);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        const obstacleImage = obstacleImages[obstacle.imageIndex];
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'green'; 
        ctx.textAlign = 'center';

        ctx.fillStyle = 'black'; 
        ctx.fillRect(obstacle.x + obstacle.width / 2 - 30, obstacle.y + obstacle.height / 2 - 20, 60, 30);

        ctx.shadowColor = 'black';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 3;

        ctx.fillStyle = 'green'; 
        ctx.fillText(obstacle.name, obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2 + 5);

        ctx.shadowColor = 'transparent';

        obstacle.y += obstacleSpeed;
    });
}

function createObstacle() {
    const obstacleWidth = 50;
    const obstacleX = Math.floor(Math.random() * (canvas.width - obstacleWidth));
    const imageIndex = Math.floor(Math.random() * obstacleImages.length);
    const name = friendNames[Math.floor(Math.random() * friendNames.length)];

    obstacles.push({
        x: obstacleX,
        y: 0,
        width: obstacleWidth,
        height: 100,
        imageIndex: imageIndex,
        name: name
    });
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (carX < obstacle.x + obstacle.width &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacle.height &&
            carY + carHeight > obstacle.y) {
            gameOver = true;
        }
    });
}

function moveCar() {
    if (leftPressed && carX > 0) {
        carX -= 5;
    }
    if (rightPressed && carX < canvas.width - carWidth) {
        carX += 5;
    }
}

function update() {
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.fillText(`Game Over! Your score: ${score}`, canvas.width / 2, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    drawObstacles();
    moveCar();
    checkCollision();

    score += 1;
    document.querySelector('h1').innerText = `Score: ${score}`;

    requestAnimationFrame(update);
}

setInterval(createObstacle, 2000);

update();

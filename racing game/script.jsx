const car = document.getElementById('car');
const gameArea = document.getElementById('gameArea');
const gameAreaWidth = gameArea.clientWidth;
const carWidth = car.clientWidth;

let carPosition = (gameAreaWidth / 2) - (carWidth / 2); // Center the car initially
car.style.left = carPosition + 'px';

let obstacles = [];
let gameInterval;
let obstacleInterval;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveCar(-10);
    } else if (event.key === 'ArrowRight') {
        moveCar(10);
    }
});

function moveCar(direction) {
    carPosition += direction;

    // Prevent the car from going out of bounds
    if (carPosition < 0) {
        carPosition = 0;
    } else if (carPosition > gameAreaWidth - carWidth) {
        carPosition = gameAreaWidth - carWidth;
    }

    car.style.left = carPosition + 'px';
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (gameAreaWidth - 50) + 'px'; // Random horizontal position
    obstacle.style.top = '0px'; // Start from the top
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        let obstacleTop = parseInt(obstacle.style.top);
        obstacleTop += 5; // Move downwards

        // Check for collision with the car
        if (obstacleTop + 100 >= 600 && 
            parseInt(obstacle.style.left) < carPosition + carWidth && 
            parseInt(obstacle.style.left) + 50 > carPosition) {
            alert('Game Over!'); // Simple game over alert
            clearInterval(gameInterval);
            clearInterval(obstacleInterval);
            return;
        }

        // Remove the obstacle if it goes out of bounds
        if (obstacleTop > 600) {
            obstacle.remove();
            obstacles.splice(index, 1);
        } else {
            obstacle.style.top = obstacleTop + 'px';
        }
    });
}

// Start the game
function startGame() {
    gameInterval = setInterval(moveObstacles, 100);
    obstacleInterval = setInterval(createObstacle, 1000);
}

startGame();
// Define the canvas and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById('play-button');
const menu = document.getElementById('menu');


// Define the snake's properties
let snake = [{ x: 10, y: 10 }];
let dx = 10;
let dy = 0;
let food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;


playButton.addEventListener('click', function () {
    menu.style.display = 'none';
    canvas.style.display = "block";
    // start the game here

    // Define the game loop
    function gameLoop() {
        // Move the snake
        let head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
            score++;
        } else {
            snake.pop();
        }

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the food
        ctx.fillStyle = "transparent";
        ctx.fillRect(food.x, food.y, 10, 10);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(food.x + 5, food.y + 5, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fillRect(food.x + 3, food.y + 3, 4, 4);

        // Draw the snake
        snake.forEach((segment, index) => {
            if (index === 0) {
                // Determine the angle of rotation based on the direction of movement
                let angle = 0;
                if (dx > 0) {
                    angle = 0;
                } else if (dx < 0) {
                    angle = Math.PI;
                } else if (dy < 0) {
                    angle = -Math.PI / 2;
                } else if (dy > 0) {
                    angle = Math.PI / 2;
                }

                // Draw the snake head with rotation
                ctx.save();
                ctx.translate(segment.x + 5, segment.y + 5);
                ctx.rotate(angle);
                ctx.fillStyle = "darkgreen";
                ctx.beginPath();
                ctx.arc(0, 0, 8, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = "lightgreen";
                ctx.beginPath();
                ctx.arc(1, -2, 1, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(1, 2, 1, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(4, 0, 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            } else {
                ctx.fillStyle = "green";
                ctx.fillRect(segment.x, segment.y, 10, 10);
            }
        });



        // Check for game over
        if (head.x < 0 || head.x > 390 || head.y < 0 || head.y > 390) {
            clearInterval(intervalId);
            showModal();
        } else {
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    clearInterval(intervalId);
                    showModal();
                }
            }
        }
    }

    // Show the modal when the game is over
    function showModal() {
        const modal = document.getElementById("myModal");
        const scoreText = document.getElementById("score");
        scoreText.textContent = score;
        modal.style.display = "block";
    }

    // Restart the game
    function restartGame() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
        snake = [{ x: 10, y: 10 }];
        dx = 10;
        dy = 0;
        food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
        score = 0;
        intervalId = setInterval(gameLoop, 100);
    }

    // Handle keyboard input
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && dx !== 10) {
            dx = -10;
            dy = 0;
        } else if (event.key === "ArrowRight" && dx !== -10) {
            dx = 10;
            dy = 0;
        } else if (event.key === "ArrowUp" && dy !== 10) {
            dx = 0;
            dy = -10;
        } else if (event.key === "ArrowDown" && dy !== -10) {
            dx = 0;
            dy = 10;
        }
    });

    // Handle restart button click
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", restartGame);

    // Start the game loop
    let intervalId = setInterval(gameLoop, 100);
});


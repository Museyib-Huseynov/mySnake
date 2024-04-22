// Get DOM elements
const board = document.querySelector('.board');
const image = document.querySelector('.image');
const gameInstruction = document.querySelector('.gameInstruction');

// Game variables
let gameStarted = false;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'left';
let interval;
let gameSpeed = 200;
let lastKeyPressTime = 0;
const debounceTime = 1;

// Draw snake
function drawSnake() {
  snake.forEach((element) => {
    const snakeElement = document.createElement('div');
    snakeElement.className = 'snake';
    snakeElement.style.gridColumnStart = element.x;
    snakeElement.style.gridRowStart = element.y;
    board.appendChild(snakeElement);
  });
}

//Generate random food
function generateFood() {
  let x = Math.floor(Math.random() * 20) + 1;
  let y = Math.floor(Math.random() * 20) + 1;
  return { x, y };
}

// Draw food
function drawFood() {
  const foodElement = document.createElement('div');
  foodElement.className = 'food';
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  board.appendChild(foodElement);
}

// Move snake
function moveSnake() {
  let head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
  }
  if (head.y < 1) head.y = 20;
  if (head.y > 20) head.y = 1;
  if (head.x < 1) head.x = 20;
  if (head.x > 20) head.x = 1;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }
}

document.addEventListener('keydown', (event) => {
  const currentTime = Date.now();

  if (currentTime - lastKeyPressTime < debounceTime) return;

  if (event.key === 'Enter') {
    gameStarted = true;
    image.style.display = 'none';
    gameInstruction.style.display = 'none';
  }
  if (gameStarted) {
    if (event.key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
    } else if (event.key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
    }
  }
  lastKeyPressTime = currentTime;
});

function loop() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (gameStarted) {
      board.innerHTML = '';
      moveSnake();
      drawSnake();
      drawFood();
    }
  }, gameSpeed);
}

loop();

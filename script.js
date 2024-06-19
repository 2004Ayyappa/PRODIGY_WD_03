const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const playerXTimer = document.getElementById('playerXTimer');
const playerOTimer = document.getElementById('playerOTimer');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let timer;
const timerDuration = 10; // Timer duration in seconds

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || checkWinner()) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        clearInterval(timer);
    } else if (gameState.every(cell => cell !== '')) {
        alert('It\'s a draw!');
        clearInterval(timer);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        resetTimer();
    }
};

const checkWinner = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
};

const resetGame = () => {
    gameState.fill('');
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    resetTimer();
};

const resetTimer = () => {
    clearInterval(timer);
    if (currentPlayer === 'X') {
        playerXTimer.textContent = timerDuration;
        playerOTimer.textContent = timerDuration;
        timer = setInterval(() => updateTimer(playerXTimer), 1000);
    } else {
        playerXTimer.textContent = timerDuration;
        playerOTimer.textContent = timerDuration;
        timer = setInterval(() => updateTimer(playerOTimer), 1000);
    }
};

const updateTimer = (timerElement) => {
    let time = parseInt(timerElement.textContent);
    if (time > 0) {
        timerElement.textContent = time - 1;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        resetTimer();
    }
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

resetTimer();
 
let score = 0;
let level = 1;
let objectsCaught = 0;
let objectsMissed = 0;
let gameArea = document.getElementById('gameArea');
let catcher = document.getElementById('catcher');
let scoreDisplay = document.getElementById('score');
let levelDisplay = document.getElementById('level');
let missedDisplay = document.getElementById('missed');
let movingInterval;
let createInterval = 2222; // One object every 2222ms initially
let createIntervalId;
let moveObjectsInterval;
let isDragging = false;

let startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    level = 1;
    objectsCaught = 0;
    objectsMissed = 0;
    scoreDisplay.innerText = score;
    levelDisplay.innerText = 'Level ' + level;
    missedDisplay.innerText = 'Missed: ' + objectsMissed;
    clearInterval(createIntervalId);
    clearInterval(moveObjectsInterval);
    createInterval = 2222; // Reset interval for a slower start

    document.addEventListener('keydown', startMovingCatcher);
    document.addEventListener('keyup', stopMovingCatcher);

    catcher.addEventListener('touchstart', onTouchStart);
    catcher.addEventListener('touchmove', onTouchMove);
    catcher.addEventListener('touchend', onTouchEnd);

    createIntervalId = setInterval(createFallingObject, createInterval);
    moveObjectsInterval = setInterval(moveFallingObjects, 20);

    startButton.disabled = true;
}

function startMovingCatcher(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        clearInterval(movingInterval);
        movingInterval = setInterval(() => moveCatcher(event.key), 10); // Move every 10ms
    }
}

function stopMovingCatcher() {
    clearInterval(movingInterval);
}

function moveCatcher(direction) {
    let catcherLeft = parseInt(window.getComputedStyle(catcher).getPropertyValue('left'));
    if (direction === "ArrowLeft" && catcherLeft > 0) {
        moveCatcherToPosition(catcherLeft - 5);
    } else if (direction === "ArrowRight" && catcherLeft < (gameArea.offsetWidth - catcher.offsetWidth)) {
        moveCatcherToPosition(catcherLeft + 5);
    }
}

function moveCatcherToPosition(newLeft) {
    newLeft = Math.max(0, Math.min(newLeft, gameArea.offsetWidth - catcher.offsetWidth));
    catcher.style.left = newLeft + 'px';
}

function onTouchStart(event) {
    isDragging = true;
    event.preventDefault();
}

function onTouchMove(event) {
    if (isDragging) {
        let touchX = event.touches[0].clientX;
        let newLeft = touchX - catcher.offsetWidth / 2;
        moveCatcherToPosition(newLeft);
        event.preventDefault();
    }
}

function onTouchEnd() {
    isDragging = false;
}

function createFallingObject() {
    let object = document.createElement('div');
    object.classList.add('falling-object');
    object.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 20)) + 'px';
    gameArea.appendChild(object);
}

function moveFallingObjects() {
    let objects = document.querySelectorAll('.falling-object');
    objects.forEach(function(object) {
        let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));
        object.style.top = objectTop + 2 + 'px';

        if (collision(catcher, object)) {
            object.remove();
            score++;
            scoreDisplay.innerText = score;
            objectsCaught++;

            if (objectsCaught % 8 === 0) {
                levelUp();
            }
        } else if (objectTop > gameArea.offsetHeight) {
            object.remove();
            objectsMissed++;
            missedDisplay.innerText = 'Missed: ' + objectsMissed;

            if (objectsMissed >= 8) {
                gameOver();
            }
        }
    });
}

function collision(catcher, object) {
    let catcherBounds = catcher.getBoundingClientRect();
    let objectBounds = object.getBoundingClientRect();

    return !(catcherBounds.top > objectBounds.bottom || 
             catcherBounds.right < objectBounds.left || 
             catcherBounds.bottom < objectBounds.top || 
             catcherBounds.left > objectBounds.right);
}

function levelUp() {
    level++;
    objectsCaught = 8;
    levelDisplay.innerText = 'Level ' + level;
    clearInterval(createIntervalId);
    createInterval /= 1.5; // Increase the rate of falling objects
    createIntervalId = setInterval(createFallingObject, createInterval);

    let levelUpMessage = document.createElement('div');
    levelUpMessage.innerText = 'Level ' + level;
    levelUpMessage.className = 'level-up-message';
    gameArea.appendChild(levelUpMessage);
    setTimeout(() => levelUpMessage.remove(), 2000); // Remove message after 2 seconds
}

function gameOver() {
    clearInterval(createIntervalId);
    clearInterval(moveObjectsInterval);
    document.removeEventListener('keydown', startMovingCatcher);
    document.removeEventListener('keyup', stopMovingCatcher);

    catcher.removeEventListener('touchstart', onTouchStart);
    catcher.removeEventListener('touchmove', onTouchMove);
    catcher.removeEventListener('touchend', onTouchEnd);

    let gameOverMessage = document.createElement('div');
    gameOverMessage.innerText = 'Game Over! Missed: ' + objectsMissed;
    gameOverMessage.className = 'game-over-message';
    gameArea.appendChild(gameOverMessage);
    setTimeout(() => {
        gameOverMessage.remove();
        startButton.disabled = false;
        gameArea.innerHTML = '';
        gameArea.appendChild(catcher); // Re-add the catcher for next game
    }, 3000); // Display message for 3 seconds before resetting
}

setInterval(moveFallingObjects, 20);

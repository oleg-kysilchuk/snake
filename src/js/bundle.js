import '../styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start');
    const scoreDisplay = document.getElementById('score');
    const grids = document.querySelectorAll('.game-grid div');

    const width = 10; // width of game field
    let currentIndex = 0; // first div on game field
    let appleIndex = 0;
    let currentSnake = [0,1,2]; // 2 (3rd element in game filed divs array) - snake's head and 0 (first div) - snake's tail
    let direction = 1; // snake always goes on 1 div
    let score = 0;
    let speed = 0.9; //speed multiplier
    let intervalTime = 0;
    let interval = 0;


    function startGame() {
       currentSnake.forEach(index => {
           grids[index].classList.remove('snake');
       })
       grids[appleIndex].classList.remove('apple');
       clearInterval(interval);
       score = 0;
       scoreDisplay.textContent = score;
       randomizeApple();
       direction = 1;
       intervalTime = 1000;
       currentSnake = [2,1,0];
       currentIndex = 0; // reseting all game properties

       currentSnake.forEach((index) => {
           grids[index].classList.add('snake');
       }) // adding snake to start position

       interval = setInterval(snakeOut, intervalTime);
    }

    function snakeOut() {
        if(
            (currentSnake[0] + width >= width*width && direction === width) ||
            (currentSnake[0] % width === width-1 && direction === 1) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width) ||
            grids[currentSnake[0] + direction].classList.contains('snake')
        ) { 
            scoreDisplay.textContent = `Game over! You got ${score} scores!`
            return clearInterval(interval)
        }

        const snakeTail = currentSnake.pop();
        grids[snakeTail].classList.remove('snake'); // remove 1 block from snake (the tail)
        currentSnake.unshift(currentSnake[0] + direction);

        if(grids[currentSnake[0]].classList.contains('apple')) {
            grids[currentSnake[0]].classList.remove('apple');
            grids[snakeTail].classList.add('snake');
            currentSnake.push(snakeTail);
            randomizeApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime *= speed;
            interval = setInterval(snakeOut, intervalTime);
        }

        grids[currentSnake[0]].classList.add('snake');
    }


    function randomizeApple() {
        do {
            appleIndex = Math.floor(Math.random() * grids.length)
        } while (grids[appleIndex].classList.contains('snake'));
        grids[appleIndex].classList.add('apple');
    }


    function snakeControl(e){
        grids[currentIndex].classList.remove('snake');

        switch(e.keyCode) {
            case 39:
                direction = 1; // RIGHT arrow button moves snake to 1 div right
                break;
            case 40:
                direction = +width; // DOWN arrow - to 10 divs down (1row)
                break;
            case 37:
                direction = -1; // LEFT arrow - 1 div left
                break;
            case 38:
                direction = -width; // UP arrow - 1 row up (10 divs)
                break
        }
    }

    document.addEventListener('keyup', snakeControl);
    startBtn.addEventListener('click', startGame);
})
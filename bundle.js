/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style.scss */ "./src/styles/style.scss");

document.addEventListener('DOMContentLoaded', function () {
  var startBtn = document.getElementById('start');
  var scoreDisplay = document.getElementById('score');
  var grids = document.querySelectorAll('.game-grid div');
  var width = 10; // width of game field

  var currentIndex = 0; // first div on game field

  var appleIndex = 0;
  var currentSnake = [0, 1, 2]; // 2 (3rd element in game filed divs array) - snake's head and 0 (first div) - snake's tail

  var direction = 1; // snake always goes on 1 div

  var score = 0;
  var speed = 0.9; //speed multiplier

  var intervalTime = 0;
  var interval = 0;

  function startGame() {
    currentSnake.forEach(function (index) {
      grids[index].classList.remove('snake');
    });
    grids[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    scoreDisplay.textContent = score;
    randomizeApple();
    direction = 1;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0; // reseting all game properties

    currentSnake.forEach(function (index) {
      grids[index].classList.add('snake');
    }); // adding snake to start position

    interval = setInterval(snakeOut, intervalTime);
  }

  function snakeOut() {
    if (currentSnake[0] + width >= width * width && direction === width || currentSnake[0] % width === width - 1 && direction === 1 || currentSnake[0] % width === 0 && direction === -1 || currentSnake[0] - width < 0 && direction === -width || grids[currentSnake[0] + direction].classList.contains('snake')) {
      scoreDisplay.textContent = "Game over! You got ".concat(score, " scores!");
      return clearInterval(interval);
    }

    var snakeTail = currentSnake.pop();
    grids[snakeTail].classList.remove('snake'); // remove 1 block from snake (the tail)

    currentSnake.unshift(currentSnake[0] + direction);

    if (grids[currentSnake[0]].classList.contains('apple')) {
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
      appleIndex = Math.floor(Math.random() * grids.length);
    } while (grids[appleIndex].classList.contains('snake'));

    grids[appleIndex].classList.add('apple');
  }

  function snakeControl(e) {
    grids[currentIndex].classList.remove('snake');

    switch (e.keyCode) {
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

        break;
    }
  }

  document.addEventListener('keyup', snakeControl);
  startBtn.addEventListener('click', startGame);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
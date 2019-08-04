/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./src/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = [\n      [null, null, null],\n      [null, null, null],\n      [null, null, null]\n    ];\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      // safety in case someone makes a grid w/ too many squares\n      throw new MoveError('Is not valid position!');\n    }\n\n    return (this.grid[pos[0]][pos[1]] === null);\n  }\n\n  isOver() {\n    if (Boolean(this.winner()) || this.isFull()) {\n      return true;\n    }\n\n    return false;\n  }\n\n  isFull() {\n    return !this.grid.flat().some(el => el == null);\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError('Is not an empty position!');\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  buildDiagonals() {\n    return [\n      [this.grid[0][0], this.grid[1][1], this.grid[2][2]],\n      [this.grid[0][2], this.grid[1][1], this.grid[2][0]]\n    ];\n  }\n\n  buildColumns() {\n    return [\n      [this.grid[0][0], this.grid[1][0], this.grid[2][0]],\n      [this.grid[0][1], this.grid[1][1], this.grid[2][1]],\n      [this.grid[0][2], this.grid[1][2], this.grid[2][2]]\n    ]\n  }\n\n  allLines() {\n    return this.grid.concat(this.buildColumns()).concat(this.buildDiagonals());\n  }\n\n  winner() {\n    let winner = null;\n\n    this.allLines().some(row => {\n      const str = row.join('');\n\n      if (str === 'XXX' || str === 'OOO') {\n        winner = (str === 'XXX') ? 'X' : 'O';\n      }\n\n      return Boolean(winner);\n    });\n\n    return winner;\n  }\n\n  static isValidPos(pos) {\n    const range = [0, 1, 2];\n    return range.includes(pos[0]) && range.includes(pos[1]);\n  }\n}\n\nBoard.marks = ['X', 'O'];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/computerPlayer.js":
/*!*******************************!*\
  !*** ./src/computerPlayer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\nclass ComputerPlayer {\n  constructor(marker) {\n    this.marker = marker;\n    this.oppMarker = (marker === 'X') ? 'O' : 'X';\n    this.board = null;\n  }\n\n  makeMove(board) {\n    this.board = board;\n    return this.choose();\n  }\n\n  emptySpaces(board = this.board) {\n    let spaces = [];\n\n    board.grid.forEach((row, y) => {\n      row.forEach((space, x) => {\n        if (space == null) spaces.push([y, x]);\n      });\n    });\n\n    return spaces;\n  }\n\n  choose() {\n    let bestSpace;\n    let bestScore = null;\n\n    const empties = this.emptySpaces();\n\n    if (empties.length === 9) {\n      return this.randomSpace([[1, 1], [0, 0], [0, 2], [2, 0], [2, 2]]);\n    }\n\n    empties.forEach((coords => {\n      let score = this.scoreSpace(coords);\n      \n      if (bestScore === null || (score > bestScore)) {\n        bestScore = score;\n        bestSpace = coords;\n      }\n    }));\n\n    return bestSpace;\n  }\n\n  scoreSpace(pos, board = this.board, marker = this.marker, weight = 100) {\n    const bcopy = new Board();\n    bcopy.grid = this.deepDup(board.grid);\n    bcopy.placeMark(pos, marker);\n    \n    if (bcopy.winner()) {\n      return (bcopy.winner() === this.marker) ? 1 * weight : -10 * weight;\n    }\n\n    let score = 0;\n    marker = (marker === this.marker) ? this.oppMarker : this.marker;\n\n    this.emptySpaces(bcopy).forEach((coords) => {\n      score += this.scoreSpace(coords, bcopy, marker, weight / 2);\n    });\n\n    return score;\n  }\n\n  deepDup(arr) {\n    if (!(arr instanceof Array)) return arr;\n    return arr.map((el) => this.deepDup(el));\n  }\n\n  randomSpace(empties) {\n    const choice = Math.floor(Math.random() * empties.length);\n    return empties[choice];\n  }\n}\n\nmodule.exports = ComputerPlayer;\n\n\n//# sourceURL=webpack:///./src/computerPlayer.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = Board.marks[0];\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos) {\n    this.board.placeMark(pos, this.currentPlayer);\n  }\n\n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const View = __webpack_require__(/*! ./ttt-view */ \"./src/ttt-view.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n  $(() => {\n    let view = new View(new Game(), $('.ttt'));\n\n    $('#new-game').on('click', () => {\n      view.clearBoard();\n      view = new View(new Game(), $('.ttt'));\n    });\n  });\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moveError.js":
/*!**************************!*\
  !*** ./src/moveError.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class MoveError extends Error {\n  constructor(msg) {\n    if (Error.captureStackTrace) {\n      Error.captureStackTrace(this, MoveError);\n    }\n\n    this.name = 'MoveError';\n    this.msg = msg;\n    this.date = new Date();\n  }\n}\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./src/moveError.js?");

/***/ }),

/***/ "./src/ttt-view.js":
/*!*************************!*\
  !*** ./src/ttt-view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ComputerPlayer = __webpack_require__(/*! ./computerPlayer */ \"./src/computerPlayer.js\");\n\nclass View {\n  constructor(game, $el) {\n    this.game = game;\n    this.display = $el;\n    this.computerPlayer = new ComputerPlayer('O');\n    this.setupBoard();\n    this.bindEvents();\n  }\n\n  clearBoard() {\n    this.display.off('click');\n    this.display.html('');\n    $('#game-end-text').remove();\n  }\n\n  bindEvents() {\n    this.display.on('click', 'li', (event) => {\n      if (this.game.currentPlayer === 'X') {\n        const didMove = this.makeMove($(event.currentTarget));\n\n        if (this.gameOver()) {\n          return;\n        }\n\n        if (didMove) {\n          this.moveComputer();\n        }\n      }\n    });\n  }\n\n  gameOver() {\n    if(this.game.isOver()) {\n      const winner = this.game.winner();\n\n      if(winner != null) {\n        $('body').append(`<h1 id=\"game-end-text\">${winner} wins!</h1>`);\n      } else {\n        $('body').append('<h1 id=\"game-end-text\">Tie! Nobody wins!</h1>');\n      }\n\n      this.showEnd(winner);\n      this.display.off('click');\n      return true;\n    }\n\n    return false;\n  }\n\n  showEnd(winner) {\n    $('li').each(function (idx, el) {\n      const $el = $(el);\n\n      if ($el.text() === winner) {\n        $el.addClass('winner');\n      } else {\n        $el.addClass('loser');\n      }\n    });\n  }\n\n  makeMove($square) {\n    let pos = $square.data('pos').split(' ').map(char => parseInt(char, 10));\n\n    try {\n      this.game.playMove(pos);\n      $square.text(this.game.currentPlayer);\n      $square.addClass('occupied');\n      this.game.swapTurn();\n      return true;\n    } catch(err) {\n      alert('That space is taken!');\n      return false;\n    }\n  }\n\n  moveComputer() {\n    const pos = this.computerPlayer.makeMove(this.game.board);\n\n    this.makeMove($(`li[data-pos=\"${pos[0]} ${pos[1]}\"]`));\n    this.gameOver();\n  }\n\n  setupBoard() {\n    const board = $('<ul></ul>');\n\n    for (let i = 0; i < 3; i++) {\n      for (let j = 0; j < 3; j++) {\n        let li = $(`<li data-pos=\"${i} ${j}\"></li>`);\n        board.append(li);\n      }\n    }\n\n    this.display.append(board);\n  }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/ttt-view.js?");

/***/ })

/******/ });
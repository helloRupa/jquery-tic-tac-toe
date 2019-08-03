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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./src/moveError.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = Board.marks[0];\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos) {\n    this.board.placeMark(pos, this.currentPlayer);\n  }\n\n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const View = __webpack_require__(/*! ./ttt-view */ \"./src/ttt-view.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n  $(() => {\n    const game = new Game();\n    const view = new View(game, $('.ttt'));\n  });\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moveError.js":
/*!**************************!*\
  !*** ./src/moveError.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./src/moveError.js?");

/***/ }),

/***/ "./src/ttt-view.js":
/*!*************************!*\
  !*** ./src/ttt-view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class View {\n  constructor(game, $el) {\n    this.game = game;\n    this.display = $el;\n    this.setupBoard();\n    this.bindEvents();\n  }\n\n  bindEvents() {\n    this.display.on('click', 'li', (event) => {\n      this.makeMove($(event.currentTarget));\n\n      if(this.game.isOver()) {\n        const winner = this.game.winner();\n\n        if(winner != null) {\n          $('body').append(`<h1>${winner} wins the round!</h1>`);\n        } else {\n          $('body').append('<h1>Tie! Nobody wins!</h1>');\n        }\n\n        this.showEnd(winner);\n        this.display.off('click');\n      }\n    });\n  }\n\n  showEnd(winner) {\n    $('li').each(function (idx, el) {\n      const $el = $(el);\n\n      if ($el.text() === winner) {\n        $el.addClass('winner');\n      } else {\n        $el.addClass('loser');\n      }\n    });\n  }\n\n  makeMove($square) {\n    let pos = $square.data('pos').split(' ').map(char => parseInt(char, 10));\n\n    try {\n      this.game.playMove(pos);\n      $square.text(this.game.currentPlayer);\n      $square.addClass('occupied');\n      this.game.swapTurn();\n    } catch(err) {\n      alert('That space is taken!');\n    }\n  }\n\n  setupBoard() {\n    const board = $('<ul></ul>');\n\n    for (let i = 0; i < 3; i++) {\n      for (let j = 0; j < 3; j++) {\n        let li = $(`<li data-pos=\"${i} ${j}\"></li>`);\n        board.append(li);\n      }\n    }\n    \n    this.display.append(board);\n  }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/ttt-view.js?");

/***/ })

/******/ });